import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, of } from 'rxjs';


import { Item } from "./item"

export class ItemsDataSource extends DataSource<Item> {
  public connect(collectionViewer: CollectionViewer): Observable<Item[]> {
    return of([
      { count : 1 ,code: "#FFF59E" ,name:"zhealthcare-picasso-bg", color: "FFF59E" },
      { count : 2,code: "#009688",name:"zhealthcare-persian-green-bg",color: "009688" },
      { count : 3,code: "#BF342A" ,name:"zhealthcare-tall-poppy-bg",color: "BF342A" },
      { count : 4,code: "#9E9E9E" ,name:"zhealthcare-silver-chalice-dark-bg", color: "9E9E9E" },
      { count : 5,code: "#3F51B5" ,name:"zhealthcare-san-marino-bg", color: "3F51B5" },
      { count : 6,code: "#FF9800" ,name:"zhealthcare-orange-peel-bg", color: "FF9800" },
      { count : 7,code: "#72AA7E" ,name:"zhealthcare-bay-leaf-bg", color: "72AA7E" },
      { count : 8,code: "#FFEB3B" ,name:"zhealthcare-gorse-bg", color: "FFEB3B" },
      { count : 9,code: "#E85D67" ,name:"zhealthcare-mandy-bg", color: "E85D67" },
      { count : 10,code: "#FFC107" ,name:"zhealthcare-amber-bg", color: "FFC107" },
      { count : 11,code: "#F44336" ,name:"zhealthcare-pomegranate-bg", color: "F44336" },
      { count : 12,code: "#607D8B" ,name:"zhealthcare-lynch-bg", color: "607D8B" },
      { count : 13,code: "#00BCD4" ,name:"zhealthcare-robin-egg-blue-bg", color: "00BCD4" },
      { count : 14,code: "#B85792" ,name:"zhealthcare-tapestry-bg", color: "B85792" },
      { count : 15,code: "#8BC34A" ,name:"zhealthcare-sushi-bg", color: "8BC34A" },
      { count : 16,code: "#FF5722" ,name:"zhealthcare-orange-bg", color: "FF5722" },
      { count : 17,code: "#2196F3" ,name:"zhealthcare-dodger-blue-dark-bg", color: "2196F3" },
      { count : 18,code: "#E91E63" ,name:"zhealthcare-amaranth-bg", color: "E91E63" },
      { count : 19,code: "#4CAF50" ,name:"zhealthcare-fruit-salad-bg", color: "4CAF50" },
      { count : 20,code: "#34AEAD" ,name:"zhealthcare-keppel-bg", color: "34AEAD" },

    ])
  }

  public disconnect(collectionViewer: CollectionViewer): void {
  }
}