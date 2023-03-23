export interface BrowserStorage{
    storageType: any;
}

export class LocalStorage implements BrowserStorage {
    storageType: any = localStorage;
}

export class SessionStorage implements BrowserStorage {
    storageType: any = sessionStorage;
}