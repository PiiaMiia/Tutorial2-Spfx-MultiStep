import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface IMultiPageWizProps {
  spHttpClient: SPHttpClient;
  httpClient: HttpClient;
  siteUrl: string;
}
