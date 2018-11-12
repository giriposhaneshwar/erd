import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppStorageService {
  store: any;
  lc: any;
  do: any;
  obj: any = {
    setKey: (key, data) => {
      this.lc = window.localStorage;
      //  alert("Storing Key ::: " + key + " -> " + JSON.stringify(data));
      console.log("At Set Key", key, data);
      if (key) {
        this.lc.setItem(key, this.obj.encode(JSON.stringify(data)));
      }
    },
    getKey: (key) => {
      this.lc = window.localStorage;
      let data = this.lc.getItem(key);
      if (data != null) {
        return { status: "success", data: JSON.parse(this.obj.decode(data)) };
      } else {
        const empty = {};
        this.obj.setKey(key, empty);
        return {};
        // return { status: "failed", message: "wrong key entered" };
      }
    },
    deleteKey: (key) => {
      this.lc = window.localStorage;
      this.lc.removeItem(key);
      console.log("Local Store Key '" + key + "' Deleted. Successfully...");
    },
    deleteAll: () => {
      this.lc = window.localStorage;
      this.lc.clear();
    },
    encode: (data) => {
      return btoa(data);
      // return data;
    },
    decode: (data) => {
      return atob(data);
      // return data;
    }
  };

  constructor() {
    this.store = { set: this.obj.setKey, get: this.obj.getKey, delete: this.obj.deleteKey, clear: this.obj.deleteAll };
  }


}
