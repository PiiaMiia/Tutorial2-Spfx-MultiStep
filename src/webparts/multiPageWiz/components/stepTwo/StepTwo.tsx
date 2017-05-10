import * as React from 'react';
import styles from '../MultiPageWiz.module.scss';
import MultiPageWiz from '../MultiPageWiz';
import Main from '../main/Main';
import StepOne from '../stepOne/StepOne';

export default class StepTwo extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <div>
                <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                    <span className="ms-font-xl ms-fontColor-white">
                        <b>Welcome to step two! Click next to confirm your choice.</b>
                    </span>
                </div>
            </div>
        );
    }
}