import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';

import * as strings from 'multiPageWizStrings';
import MultiPageWiz from './components/MultiPageWiz';
import { IMultiPageWizProps } from './components/IMultiPageWizProps';
import { IMultiPageWizWebPartProps } from './IMultiPageWizWebPartProps';

export default class MultiPageWizWebPart extends BaseClientSideWebPart<IMultiPageWizWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMultiPageWizProps > = React.createElement(
      MultiPageWiz,
      {
        spHttpClient: this.context.spHttpClient,
        httpClient: this.context.httpClient,
        siteUrl:  this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
