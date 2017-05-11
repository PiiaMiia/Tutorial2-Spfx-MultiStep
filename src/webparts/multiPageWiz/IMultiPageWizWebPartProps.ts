import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface IMultiPageWizWebPartProps {
    spHttpClient: SPHttpClient;
    httpClient: HttpClient;
    siteUrl: string;
}