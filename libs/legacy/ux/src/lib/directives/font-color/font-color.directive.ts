/* eslint-disable @angular-eslint/directive-selector */
import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

export interface colorType {
  value: string;
  isDark: boolean;
  hexCode: string;
  rgbCode: string;
}

export const colorTypes: Array<colorType> = [
  {
    value: 'red',
    isDark: true,
    hexCode: 'F44336',
    rgbCode: 'rgb(244, 67, 54)'
  },
  {
    value: 'warn',
    isDark: false,
    hexCode: 'f81201',
    rgbCode: 'rgb(248, 18, 1)'
  },
  {
    value: 'pink',
    isDark: true,
    hexCode: 'ec268f',
    rgbCode: 'rgb(236, 38, 143)'
  },
  {
    value: 'purple',
    isDark: true,
    hexCode: '9C27B0',
    rgbCode: 'rgb(156, 39, 176)'
  },
  {
    value: 'deep-purple',
    isDark: true,
    hexCode: '673AB7',
    rgbCode: 'rgb(103, 58, 183)'
  },
  {
    value: 'accent',
    isDark: true,
    hexCode: '7b1fa2',
    rgbCode: 'rgb(123, 31, 162)'
  },
  {
    value: 'primary',
    isDark: true,
    hexCode: '8d480f',
    rgbCode: 'rgb(141, 72, 15)'
  },
  {
    value: 'indigo',
    isDark: true,
    hexCode: '3F51B5',
    rgbCode: 'rgb(63, 81, 181)'
  },
  {
    value: 'blue',
    isDark: false,
    hexCode: '2196F3',
    rgbCode: 'rgb(33, 150, 243)'
  },
  {
    value: 'light-blue',
    isDark: false,
    hexCode: '03A9F4',
    rgbCode: 'rgb(3, 169, 244)'
  },
  {
    value: 'cyan',
    isDark: false,
    hexCode: '00BCD4',
    rgbCode: 'rgb(0, 188, 212)'
  },
  {
    value: 'teal',
    isDark: true,
    hexCode: '03a1a0',
    rgbCode: 'rgb(3, 161, 160)'
  },
  {
    value: 'green',
    isDark: true,
    hexCode: '4CAF50',
    rgbCode: 'rgb(76, 175, 80)'
  },
  {
    value: 'light-green',
    isDark: false,
    hexCode: '8BC34A',
    rgbCode: 'rgb(139, 195, 74)'
  },
  {
    value: 'lime',
    isDark: false,
    hexCode: 'CDDC39',
    rgbCode: 'rgb(205, 220, 57)'
  },
  {
    value: 'yellow',
    isDark: false,
    hexCode: 'FFEB3B',
    rgbCode: 'rgb(255, 235, 59)'
  },
  {
    value: 'deep-orange',
    isDark: false,
    hexCode: 'FF5722',
    rgbCode: 'rgb(255, 87, 34)'
  },
  {
    value: 'brown',
    isDark: true,
    hexCode: '795548',
    rgbCode: 'rgb(121, 85, 72)'
  },
  {
    value: 'fuse-white',
    isDark: false,
    hexCode: 'FFFFFF',
    rgbCode: 'rgb(255, 255, 255)'
  },
  {
    value: 'white',
    isDark: false,
    hexCode: 'FFFFFF',
    rgbCode: 'rgb(255, 255, 255)'
  },
  {
    value: 'fuse-black',
    isDark: true,
    hexCode: '000000',
    rgbCode: 'rgb(0, 0, 0)'
  },
  { value: 'black', isDark: true, hexCode: '000000', rgbCode: 'rgb(0, 0, 0)' },
  {
    value: 'picaso',
    isDark: false,
    hexCode: 'FFF59E',
    rgbCode: 'rgb(255, 245, 158)'
  },
  {
    value: 'picasso',
    isDark: false,
    hexCode: 'FFF59E',
    rgbCode: 'rgb(255, 245, 158)'
  },
  {
    value: 'persian-green',
    isDark: true,
    hexCode: '009688',
    rgbCode: 'rgb(0, 150, 136)'
  },
  {
    value: 'tall-poppy',
    isDark: true,
    hexCode: 'BF342A',
    rgbCode: 'rgb(191, 52, 42)'
  },
  {
    value: 'silver-chalice-dark',
    isDark: false,
    hexCode: '9E9E9E',
    rgbCode: 'rgb(158, 158, 158)'
  },
  {
    value: 'san-marino',
    isDark: true,
    hexCode: '3F51B5',
    rgbCode: 'rgb(63, 81, 181)'
  },
  {
    value: 'orange-peel',
    isDark: false,
    hexCode: 'FF9800',
    rgbCode: 'rgb(255, 152, 0)'
  },
  {
    value: 'bay-leaf',
    isDark: false,
    hexCode: '72AA7E',
    rgbCode: 'rgb(114, 170, 126)'
  },
  {
    value: 'gorse',
    isDark: false,
    hexCode: 'FFEB3B',
    rgbCode: 'rgb(255, 235, 59)'
  },
  {
    value: 'mandy',
    isDark: true,
    hexCode: 'E85D67',
    rgbCode: 'rgb(232, 93, 103)'
  },
  {
    value: 'amber',
    isDark: false,
    hexCode: 'FFC107',
    rgbCode: 'rgb(255, 193, 7)'
  },
  {
    value: 'pomegranate',
    isDark: true,
    hexCode: 'F44336',
    rgbCode: 'rgb(244, 67, 54)'
  },
  {
    value: 'lynch',
    isDark: true,
    hexCode: '607D8B',
    rgbCode: 'rgb(96, 125, 139)'
  },
  {
    value: 'robin-egg-blue',
    isDark: false,
    hexCode: '00BCD4',
    rgbCode: 'rgb(0, 188, 212)'
  },
  {
    value: 'tapestry',
    isDark: true,
    hexCode: 'B85792',
    rgbCode: 'rgb(184, 87, 146)'
  },
  {
    value: 'sushi',
    isDark: false,
    hexCode: '8BC34A',
    rgbCode: 'rgb(139, 195, 74)'
  },
  {
    value: 'orange',
    isDark: false,
    hexCode: 'FF5722',
    rgbCode: 'rgb(255, 87, 34)'
  },
  {
    value: 'dodger-blue-dark',
    isDark: false,
    hexCode: '2196F3',
    rgbCode: 'rgb(33, 150, 243)'
  },
  {
    value: 'amaranth',
    isDark: true,
    hexCode: 'E91E63',
    rgbCode: 'rgb(233, 30, 99)'
  },
  {
    value: 'fruit-salad',
    isDark: true,
    hexCode: '4CAF50',
    rgbCode: 'rgb(76, 175, 80)'
  },
  {
    value: 'keppel',
    isDark: false,
    hexCode: '34AEAD',
    rgbCode: 'rgb(52, 174, 173)'
  }
];

@Directive({
  selector: '[fontColor]'
})
export class FontColorDirective implements AfterViewInit {
  private el: Element;
  private backgroundColor: string;
  private classList: Array<string>;

  constructor(
    private readonly elRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.setElement();
  }

  ngAfterViewInit(): void {
    this.setElement();
    this.setBackGroundColor();
    this.setFontClass();
  }

  ngAfterViewChecked(): void {
    this.setElement();
    this.setBackGroundColor();
    this.setFontClass();
  }

  setElement() {
    if (this.elRef && this.elRef.nativeElement) {
      this.el = this.elRef.nativeElement;
    }
  }

  setBackGroundColor() {
    this.classList = this.el.getAttribute('class').split(' ');
    if (
      this.classList &&
      this.classList !== null &&
      this.classList.length > 0
    ) {
      this.classList.forEach((element) => {
        if (element.endsWith('-500-bg')) {
          this.backgroundColor = element;
          this.backgroundColor = this.backgroundColor
            .substring(0, this.backgroundColor.indexOf('-500-bg'))
            .toLowerCase();
        } else if (element.endsWith('-bg') && !element.startsWith('exxat-')) {
          this.backgroundColor = element;
          this.backgroundColor = this.backgroundColor
            .substring(0, this.backgroundColor.indexOf('-bg'))
            .toLowerCase();
        } else if (element.endsWith('-bg') && element.startsWith('exxat-')) {
          this.backgroundColor = element.replace('exxat-', '');
          this.backgroundColor = this.backgroundColor
            .substring(0, this.backgroundColor.indexOf('-bg'))
            .toLowerCase();
        } else {
          this.setColorCode();
        }
      });
    } else {
      this.setColorCode();
    }
  }

  setColorCode() {
    let styleList = [];

    if (
      this.el.getAttribute('style') &&
      this.el.getAttribute('style') !== null
    ) {
      styleList = this.el.getAttribute('style').split(';');

      if (styleList && styleList !== null && styleList.length > 0) {
        styleList.forEach((element) => {
          if (element.startsWith('background-color:')) {
            const colorCode = element
              .replace('background-color: ', '')
              .toString()
              .trim();
            if (
              colorCode &&
              colorCode !== null &&
              colorCode.startsWith('rgb(')
            ) {
              const colorType = colorTypes.find(
                (a) =>
                  a.rgbCode.toString().toLowerCase().trim() ===
                  colorCode.toString().toLowerCase().trim()
              );
              if (colorType && colorType !== null) {
                this.backgroundColor = colorType.value;
              }
            } else if (colorCode && colorCode !== null) {
              const colorType = colorTypes.find(
                (a) =>
                  a.hexCode.toString().toLowerCase().trim() ===
                  colorCode.toString().replace('#', '').toLowerCase().trim()
              );
              if (colorType && colorType !== null) {
                this.backgroundColor = colorType.value;
              }
            }
          }
        });
      }
    }
  }

  setFontClass() {
    if (this.backgroundColor && this.backgroundColor !== null) {
      const color: colorType = colorTypes.find(
        (x) => x.value.toLowerCase() === this.backgroundColor
      );

      if (color && color.isDark) {
        this.renderer.removeClass(this.el, 'dark-fg');
        this.renderer.addClass(this.el, 'light-fg');
      } else {
        this.renderer.removeClass(this.el, 'light-fg');
        this.renderer.addClass(this.el, 'dark-fg');
      }
    }
  }
}
