import { Injectable } from '@angular/core';
import { Lookup } from '@zhealthcare/fusion/models';

@Injectable({providedIn: 'any'})
export class IndexDbService {
  table;
  lookupDb;
  transaction;
  GenderValue = {
    "description": "Gender",
    "top": "Male",
    "items": [
        {
            "itemId": "Male",
            "description": "He",
            "tag": {
                "color": "green"
            }
        },
        {
            "itemId": "Female",
            "description": "She",
            "tag": {
                "color": "green"
            }
        },
        {
            "itemId": "Unspecified",
            "description": "Unspecified",
            "tag": null
        },
        {
            "itemId": "Transgender",
            "description": "Transgender",
            "tag": null
        }
    ]
  };
  constructor() {}


    private ExtraCreateTable(tableName:string, event:any)
    {
      const lookupDb = event.target['result'];
      const transaction = lookupDb.transaction(tableName,'readwrite');
      transaction.createIndex('Unique_Lookups', 'key', { unique: true });
      this.table = transaction.createObjectStore(tableName, { keyPath: 'key' });
    }
    public CreateTable(tableName:string) {

      const request = self.indexedDB.open('Fusion', 1);

      request.onupgradeneeded = (event) => {
          this.ExtraCreateTable(tableName, event);
      }


    request.onsuccess = (event) => {
        this.ExtraCreateTable(tableName, event);
    }
    request.onerror = (event) => {
      alert(event.target['error']);
    }
  }

  public AddRecord(name:string,record: Lookup) {
    const item = {
      key:name,
      value:record
    };
    this.table.add(item);
  }

  public AddMulipleRecord(records: Lookup[]) {
    records.forEach(record => {
      this.table.add(record);
    });
  }

  public DeleteRecord(key: string) {
    this.table.delete(key);
  }

  public DeleteMulipleRecord(keys: string[]) {
    keys.forEach(key=> {
      this.table.delete(key);
    });
  }
}
