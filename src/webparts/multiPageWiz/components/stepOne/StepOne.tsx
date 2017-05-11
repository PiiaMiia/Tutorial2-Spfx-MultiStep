import * as React from 'react';
import styles from '../MultiPageWiz.module.scss';
import MultiPageWiz from '../MultiPageWiz';
import { IMultiPageWizProps } from '../IMultiPageWizProps';
import Main from '../main/Main';
import { IListItem } from '../main/Main';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class StepOne extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state =  {
            listItems: []
        }
        this.readItems();
    }

    public render(): JSX.Element {

        const items: JSX.Element[] = this.state.listItems.map(
            (item: IListItem, i: number): JSX.Element => {
                return (
                    <option value={item.Title}>{item.Title}</option>
                );
            }   
        );

        return (
            <div>
                <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                    <div>
                        <span className="ms-font-xl ms-fontColor-white">
                            <b>Good job! Your 'next' button worked!</b>
                        </span>
                    </div>
                    <select>
                        {items}
                    </select>
                </div>
            </div>
        );
    }

    private readItems(): void {
        this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('Clients')/items?$select=Title`,
        SPHttpClient.configurations.v1,
        {
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
            }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
            return response.json();
        })
        .then((response: { value: IListItem[] }): void => {
            this.setState({
                listItems: response.value
            });
        }, (error: any): void => {
            console.log(error);
        });
    }
}