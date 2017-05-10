declare interface IMultiPageWizStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'multiPageWizStrings' {
  const strings: IMultiPageWizStrings;
  export = strings;
}
