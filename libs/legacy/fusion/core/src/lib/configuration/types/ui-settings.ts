type headerPosition='above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed';
type footerPosition= 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed';
export interface UiSettings
{
  colorTheme: string;
  customScrollbars: boolean;
  layout: {
      style: string,
      width: 'fullwidth' | 'boxed',
      navbar: {
          primaryBackground: string,
          secondaryBackground: string,
          hidden: boolean,
          folded: boolean,
          position: 'left' | 'right' | 'top',
          variant: string
      },
      header: {
          customBackgroundColor: boolean,
          background: string,
          hidden: boolean,
          position: headerPosition
      }
      footer: {
          customBackgroundColor: boolean,
          background: string,
          hidden: boolean,
          position: footerPosition
      },
      sidepanel: {
          hidden: boolean,
          position: 'left' | 'right'
      }
  };
}
