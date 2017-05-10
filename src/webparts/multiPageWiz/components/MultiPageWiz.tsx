import * as React from 'react';
import styles from './MultiPageWiz.module.scss';
import { IMultiPageWizProps } from './IMultiPageWizProps';
import Main from './main/Main';

export default class SpGroup extends React.Component<IMultiPageWizProps, void> {
  public render(): JSX.Element {
    return (
      <div>
        <Main />
      </div>
    );
  }
}