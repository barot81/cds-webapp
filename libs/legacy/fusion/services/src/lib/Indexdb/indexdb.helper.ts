export class IndexedDBAngular {
  private readonly utils: Utils;
  private dbWrapper: DbWrapper;

  constructor(dbName: string, version: number) {
    this.utils = new Utils();
    this.dbWrapper = new DbWrapper(dbName, version);
  }

  createStore(version: number, upgradeCallback: Function) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.dbVersion = version;
      const request = this.utils.indexedDB.open(this.dbWrapper.dbName, version);
      request.onsuccess = () => {
        this.dbWrapper.db = request.result;
        resolve();
      };

      request.onerror = (e) => {
        reject(`IndexedDB error: ${(e.target as any).errorCode}`);
      };

      request.onupgradeneeded = (e) => {
        upgradeCallback(e, this.dbWrapper.db);
      };
    });
  }

  getByKey(storeName: string, key: any) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.getReadonlyTransactionInstance(this, storeName, reject),
        objectStore = transaction.objectStore(storeName);
      const request: IDBRequest = objectStore.get(key);
      request.onsuccess = function(event: Event) {
        resolve((event.target as any).result);
      };
    });
  }

  getAll(
    storeName: string,
    keyRange?: IDBKeyRange,
    indexDetails?: IndexDetails
  ) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const getTransactionInstance = this.getReadonlyTransactionInstance(this, storeName, reject), 
          transaction = getTransactionInstance,
        objectStore = transaction.objectStore(storeName),
        result: Array<any> = [];
      let request: IDBRequest;
      if (indexDetails) {
        const index = objectStore.index(indexDetails.indexName);
        const order = indexDetails.order === 'desc' ? 'prev' : 'next';
        request = index.openCursor(keyRange, order);
      } else {
        request = objectStore.openCursor(keyRange);
      }

      request.onerror = function(e) {
        reject(e);
      };

      request.onsuccess = function(evt: Event) {
        const cursor = (evt.target as IDBOpenDBRequest).result;
        if (cursor) {
          result.push(cursor['value']);
          cursor['continue']();
        } else {
          resolve(result);
        }
      };
    });
  }

    private getReadonlyTransactionInstance(self: this, storeName: string, reject: (reason?: any) => void) {
        return self.dbWrapper.createTransaction({
            storeName: storeName,
            dbMode: self.utils.dbMode.readOnly,
            error: (e: Event) => {
                reject(e);
            },
            complete: (e: Event) => { }
        });
    }

  add(storeName: string, value: any, key?: any) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.getReadonlyTransactionInstance(this, storeName, reject),
        objectStore = transaction.objectStore(storeName);

      const request = objectStore.add(value, key);
      request.onsuccess = (evt: any) => {
        key = evt.target.result;
      };
    });
  }

  update(storeName: string, value: any, key?: any) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.getTransactionInstanceForUpdate(storeName, reject, resolve, value),
        objectStore = transaction.objectStore(storeName);

      objectStore.put(value, key);
    });
  }

  private getTransactionInstanceForUpdate(storeName: string, reject: (reason?: any) => void, resolve: (value?: any) => void, value: any) {
    return this.dbWrapper.createTransaction({
      storeName: storeName,
      dbMode: this.utils.dbMode.readWrite,
      error: (e: Event) => {
        reject(e);
      },
      complete: (e: Event) => {
        resolve(value);
      },
      abort: (e: Event) => {
        reject(e);
      }
    });
  }

  delete(storeName: string, key: any) {
    
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.getTransactionInstanceforDelete(this, storeName, reject, resolve),
        objectStore = transaction.objectStore(storeName);

      objectStore['delete'](key);
    });
  }

  private getTransactionInstanceforDelete(self: this, storeName: string, reject: (reason?: any) => void, resolve: (value?: any) => void) {
    return self.dbWrapper.createTransaction({
      storeName: storeName,
      dbMode: self.utils.dbMode.readWrite,
      error: (e: Event) => {
        reject(e);
      },
      complete: (e: Event) => {
        resolve();
      },
      abort: (e: Event) => {
        reject(e);
      }
    });
  }

  openCursor(
    storeName: string,
    cursorCallback: (evt: Event) => void,
    keyRange?: IDBKeyRange
  ) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: this.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
            resolve();
          },
          abort: (e: Event) => {
            reject(e);
          }
        }),
        objectStore = transaction.objectStore(storeName),
        request = objectStore.openCursor(keyRange);

      request.onsuccess = (evt: Event) => {
        cursorCallback(evt);
        resolve();
      };
    });
  }

  clear(storeName: string) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.getTransactionInstanceforDelete(this,storeName,reject, resolve),
        objectStore = transaction.objectStore(storeName);
      objectStore.clear();
      resolve();
    });
  }

  getByIndex(storeName: string, indexName: string, key: any) {
    return new Promise<any>((resolve, reject) => {
      this.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = this.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: this.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          abort: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {}
        }),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName),
        request = index.get(key);

      request.onsuccess = event => {
        resolve((event.target as IDBOpenDBRequest).result);
      };
    });
  }
}

class Utils {
  dbMode: DbMode;
  indexedDB: IDBFactory;

  constructor() {
    this.indexedDB =
      window.indexedDB ||
      (window as any).mozIndexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).msIndexedDB;
    this.dbMode = {
      readOnly: 'readonly',
      readWrite: 'readwrite'
    };
  }
}

export interface IndexDetails {
  indexName: string;
  order: string;
}

interface DbMode {
  readOnly: string;
  readWrite: string;
}

class DbWrapper {
  dbName: string;
  dbVersion: number;
  db: IDBDatabase;

  constructor(dbName: string, version: number) {
    this.dbName = dbName;
    this.dbVersion = version || 1;
    this.db = null;
  }

  validateStoreName(storeName: string) {
    return this.db.objectStoreNames.contains(storeName);
  }

  validateBeforeTransaction(storeName: string, reject: Function) {
    if (!this.db) {
      reject(
        'You need to use the createStore function to create a database before you query it!'
      );
    }
    if (!this.validateStoreName(storeName)) {
      reject(`objectStore does not exists: ${storeName}`);
    }
  }

  createTransaction(options: {
    storeName: string;
    dbMode: any;
    error: (e: Event) => any;
    complete: (e: Event) => any;
    abort?: (e: Event) => any;
  }): IDBTransaction {
    const trans: IDBTransaction = this.db.transaction(
      options.storeName,
      options.dbMode
    );
    trans.onerror = options.error;
    trans.oncomplete = options.complete;
    trans.onabort = options.abort;
    return trans;
  }
}
