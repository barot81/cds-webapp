import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
    id: string;
    children: FileNode[];
    filename: string;
    type: any;
  }

  /** Flat node with expandable and level information */
  export class FileFlatNode {
    constructor(
      public expandable: boolean,
      public filename: string,
      public level: number,
      public type: any,
      public id: string
    ) {}
  }

  /**
   * The file structure tree data in string. The data could be parsed into a Json object
   */
  const TREE_DATA = JSON.stringify({
    Applications: {
      Calendar: 'app',
      Chrome: 'app',
      Webstorm: 'app'
    },
    Documents: {
      angular: {
        src: {
          compiler: 'ts',
          core: 'ts'
        }
      },
      material2: {
        src: {
          button: 'ts',
          checkbox: 'ts',
          input: 'ts'
        }
      }
    },
    Downloads: {
      October: 'pdf',
      November: 'pdf',
      Tutorial: 'html'
    },
    Pictures: {
      'Photo Booth Library': {
        Contents: 'dir',
        Pictures: 'dir'
      },
      Sun: 'png',
      Woods: 'jpg'
    }
  });

  /**
   * File database, it can build a tree structured Json object from string.
   * Each node in Json object represents a file or a directory. For a file, it has filename and type.
   * For a directory, it has filename and children (a list of files or directories).
   * The input will be a json object string, and the output is a list of `FileNode` with nested
   * structure.
   */
  @Injectable({providedIn: 'any'})
  export class FileDatabase {
    dataChange = new BehaviorSubject<FileNode[]>([]);

    get data(): FileNode[] { return this.dataChange.value; }

    constructor() {
      this.initialize();
    }

    initialize() {
      // Parse the string to json object.
      const dataObject = JSON.parse(TREE_DATA);

      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      const data = this.buildFileTree(dataObject, 0);

      // Notify the change.
      this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    buildFileTree(obj: {[key: string]: any}, level: number, parentId: string = '0'): FileNode[] {
      return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
        const value = obj[key];
        const node = new FileNode();
        node.filename = key;
        /**
         * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
         * By passing parentId to buildFileTree, it constructs a path of indexes which make
         * it possible find the exact sub-array that the node was grabbed from when dropped.
         */
        node.id = `${parentId}/${idx}`;

        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildFileTree(value, level + 1, node.id);
          } else {
            node.type = value;
          }
        }

        return accumulator.concat(node);
      }, []);
    }
  }
