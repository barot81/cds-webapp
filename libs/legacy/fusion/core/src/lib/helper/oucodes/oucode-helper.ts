
import lodash from 'lodash';
export class OucodeHelper {
  static getOucodeList(oucodeArr, Oucodes, status) {
    if (Array.isArray(Oucodes)) {
      Oucodes.forEach((element, index) => {
        if (status) {
          // if not base tenant
          if (element.isSelected)
            // then take only selected
            oucodeArr.push(element.Oucode);
        } else {
          oucodeArr.push(element.Oucode);
        }
        if (element.hasOwnProperty('Children')) {
          this.getOucodeList(oucodeArr, element.Children, status);
        }
      });
    }
    return oucodeArr;
  }

  static getOuCodeFlatList(oucodeTree) {
    return this.convertOucodesFlatList([], oucodeTree, '', 0, '');
  }

  static convertOucodesFlatList(oucodeArr, Oucodes, OucodeStr, level, parent) {
    if (Array.isArray(Oucodes)) {
      level = level + 1;
      OucodeStr = this.setOucodeStr(level, OucodeStr, parent);

      Oucodes.forEach((element, index) => {
        const node = this.setNodeValue(level, [], OucodeStr, element);
        if (
          element.hasOwnProperty('Children') &&
          element['Children'].length > 0
        ) {
          oucodeArr.push(node);
          parent = this.getParentName(level, element, parent);
          this.convertOucodesFlatList(
            oucodeArr,
            element.Children,
            OucodeStr,
            level,
            parent
          );
        } else {
          oucodeArr.push(node);
        }
      });
    }
    return oucodeArr;
  }

  private static setOucodeStr(level: any, OucodeStr: any, parent: any) {
    if (level > 1) {
      OucodeStr = (OucodeStr === '' ? '' : `${OucodeStr}-`) + parent;
    }
    return OucodeStr;
  }

  private static getParentName(level, element, parent) {
    if (level > 1) {
      return element.Name;
    }
    return parent;
  }

  private static setNodeValue(level, node, OucodeStr, element) {
    node['key'] = element.Oucode;
    if (level > 2) {
      node['value'] = (OucodeStr === '' ? '' : `${OucodeStr}-`) + element.Name;
    } else {
      node['value'] = element.Name;
    }
    return node;
  }

  static getStatusList(_statusesWithCount, stautsCounts) {
    if (Array.isArray(stautsCounts)) {
      stautsCounts.forEach((element, index) => {
        const statusWithCount = [];
        statusWithCount['key'] = element.Name;
        statusWithCount['value'] = element?.Name;
        statusWithCount['count'] = element?.Oucode;
        statusWithCount['url'] = element?.caption;
        _statusesWithCount.push(statusWithCount);
      });
    }
    return _statusesWithCount;
  }

  static getFullName(element: any) {
    if (element && element.fullName && element.fullName.includes('.')) {
      if (element && element.caption) {
        return (
          element.fullName
            .split('.')
            ?.map(function (item) {
              return item == element.Name ? element.caption : item;
            })
            ?.join(' - ') ?? element?.fullName
        );
      } else return element.fullName.replace('.',' - ')
    } else {
      if (element && element.caption) {
        this.updateChildren(element);
        return element.caption;
      } else return element?.fullName;
    }
  }

  static updateChildren(element: any) {
    if (element.Children?.length > 0) {
      let children = element.Children.filter((x) =>
        x.fullName.includes(element.fullName)
      );
      children?.forEach((child) => {
        if (child?.fullName.includes('.')) {
          child.fullName = child.fullName
            .split('.')
            ?.map(function (item) {
              return item == element.Name ? element.caption : item;
            })
            ?.join('.');
        }
        this.updateChildren(child);
      });
    }
  }

  static flattenOUCodeTree(arr: any): any {
    return arr.flatMap(({ Children, ...o }: { Children: any; o: any }) => [
      o,
      ...this.flattenOUCodeTree(Children),
    ])
  }

  static replaceKeysDeep(obj, keysMap) {
    return lodash.transform(obj, function (result, value, key) {
      var currentKey = keysMap[key] || key;
      result[currentKey] = lodash.isObject(value)
        ? OucodeHelper.replaceKeysDeep(value, keysMap)
        : value;
    });
  }

  static customizer(objValue, srcValue, propertyName) {
    if (propertyName == 'Children') {
      lodash(objValue)
        .keyBy('Name')
        .mergeWith(lodash.keyBy(srcValue, 'Name'), OucodeHelper.customizer);
    }
  }
}
