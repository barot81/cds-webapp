import { NavigationItem, ProductNavigation } from '@zhealthcare/fusion/models';

export class NavigationHelper {
  private static readonly dafaultNavigation: NavigationItem[] = [];

  private static readonly GoToV3Navigation: NavigationItem[] = [
    {
      id: "admin.GoToV3",
      title: "Go To V3",
      type: "menu-item",
      icon: "fas fa-file-alt",
      order: "5",
      url: "/account/v3redirect",
      children: []
    }
  ]

  static createNavMenu(productnavs: ProductNavigation[]): NavigationItem[] {
    var navitems: NavigationItem[] =JSON.parse(JSON.stringify(this.dafaultNavigation));
    var isV3V4 = JSON.parse(localStorage.getItem("isV3V4"));
    if(isV3V4)
      navitems = JSON.parse(JSON.stringify(this.GoToV3Navigation));

    for (let i = 0; i < productnavs.length; i++) {
      const element = productnavs[i];
      element.menus.forEach(menuItem => {
          const currentNavitem = navitems.find(x => x.id === menuItem.id);
          if (currentNavitem === undefined) {
            // menuItem.order = "4";
            navitems.push(menuItem);
          } else {
            navitems.find(x => x.id === menuItem.id).children.push(menuItem);
          }
      });
    }
    return navitems.sort(sortFunction);
  }
}

function sortFunction(a, b) {
  if (a['order'] === b['order']) {
    return 0;
  } else {
    return a['order'] < b['order'] ? -1 : 1;
  }
}
