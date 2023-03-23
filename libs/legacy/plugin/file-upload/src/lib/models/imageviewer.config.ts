import { Injectable, InjectionToken } from '@angular/core';

export class ImageViewerConfig {
  width?: number;
  height?: number;
  bgStyle?: string;
  scaleStep?: number;
  rotateStepper?: boolean;
  buttonStyle?: ButtonStyle;
  loadingMessage?: string;
  tooltips?: {
    enabled?: boolean,
    bgStyle?: string,
    bgAlpha?: number,
    textStyle?: string,
    textAlpha?: number,
    padding?: number,
    radius?: number
  };
  nextPageButton?: ButtonConfig;
  beforePageButton?: ButtonConfig;
  zoomOutButton?: ButtonConfig;
  zoomInButton?: ButtonConfig;
  downloadButton?: ButtonConfig;
  rotateLeftButton?: ButtonConfig;
  rotateRightButton?: ButtonConfig;
  resetButton?: ButtonConfig;
}

export interface ButtonStyle {
  iconFontFamily?: string;
  alpha?: number;
  hoverAlpha?: number;
  bgStyle?: string;
  iconStyle?: string;
  borderStyle?: string;
  borderWidth?: number;
}

export interface ButtonConfig {
  icon?: string;
  tooltip?: string;
  sortId?: number;
  show?: boolean;
}

export function createButtonConfig(icon?: string, tooltip?: string, sortId: number = 0, show: boolean = true) {
  return { icon: icon, tooltip: tooltip, sortId: sortId, show: show };
}

export const IMAGEVIEWER_CONFIG = new InjectionToken<ImageViewerConfig>('imageviewer.config', { providedIn : 'root', factory: () => new ImageViewerConfig() });

export const IMAGEVIEWER_CONFIG_DEFAULT: ImageViewerConfig = {
  width: 800, // component default width
  height: 600, // component default height
  bgStyle: '#ECEFF1', // component background style
  scaleStep: 0.1, // zoom scale step (using the zoom in/out buttons)
  rotateStepper: false,
  loadingMessage: 'Loading...',

  buttonStyle: {
    iconFontFamily: 'material-outline-icons', // font used to render the button icons
    alpha: 0.5, // buttons' transparence value
    hoverAlpha: 0.7, // buttons' transparence value when mouse is over
    bgStyle: '#000000', //  buttons' background style
    iconStyle: '#ffffff', // buttons' icon colors
    borderStyle: '#000000', // buttons' border style
    borderWidth: 0 // buttons' border width (0 == disabled)
  },
  tooltips: {
    enabled: false, // enable or disable tooltips for buttons
    bgStyle: '#000000', // tooltip background style
    bgAlpha: 0.5, // tooltip background transparence
    textStyle: '#ffffff', // tooltip's text style
    textAlpha: 0.9, // tooltip's text transparence
    padding: 15, // tooltip padding
    radius: 20 // tooltip border radius
  },
  nextPageButton: createButtonConfig(String.fromCharCode(0xE805), 'Next page', 0),
  beforePageButton: createButtonConfig(String.fromCharCode(0xE905), 'Previous page', 1),
  zoomOutButton: createButtonConfig(String.fromCharCode(0xECF4), 'Zoom out', 0),
  zoomInButton: createButtonConfig(String.fromCharCode(0xECF2), 'Zoom in', 1),
  rotateLeftButton: createButtonConfig(String.fromCharCode(0xEBF4), 'Rotate left', 2),
  rotateRightButton: createButtonConfig(String.fromCharCode(0xEBF5), 'Rotate right', 3),
  resetButton: createButtonConfig(String.fromCharCode(0xE954), 'Reset', 4),
  downloadButton: createButtonConfig(String.fromCharCode(0xE9C2), 'Download', 4),

};
