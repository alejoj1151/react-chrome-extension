import * as React from 'react';
import Footer from './popup/Footer';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { loadTheme } from '@uifabric/styling';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Announcement.scss';

// Replace OUFR default theme with FIFA 19 color theme.
loadTheme({
    palette: {
        themePrimary: '#06153d',
        themeLighterAlt: '#cfd5e8',
        themeLighter: '#a7b2d2',
        themeLight: '#8393bd',
        themeTertiary: '#6476a8',
        themeSecondary: '#495c92',
        themeDarkAlt: '#32467d',
        themeDark: '#1f3268',
        themeDarker: '#102253',
        neutralLighterAlt: '#9fe7da',
        neutralLighter: '#9de3d6',
        neutralLight: '#96dacd',
        neutralQuaternaryAlt: '#8ccbbf',
        neutralQuaternary: '#86c2b7',
        neutralTertiaryAlt: '#80baaf',
        neutralTertiary: '#f9c4d3',
        neutralSecondary: '#f38ba9',
        neutralPrimaryAlt: '#ed5983',
        neutralPrimary: '#ea4372',
        neutralDark: '#b23458',
        black: '#832641',
        white: '#a2ecde'
    }
});

const ANNOUNCEMENT_VERSION = 8;

@observer
export default class Announcement extends React.Component<{}, {}> {
    @observable
    private isOpen: boolean = false;

    private message: string;

    componentDidMount() {
        const appLanguage = document.getElementsByTagName('html')[0].lang;
            
        if (appLanguage && appLanguage.toLowerCase() !== 'es') {
            this.message = `This app was created for use in the FIFA WEB APP in lenguage Spanish `;
            this.isOpen = true;
            return;
        } else {
            this.message = `La extensión de filtros está ejecutandose en esta pestaña, esta aplicación facilita la compra de articulos en el mercado`;
            //this.isOpen = true;
        }

        chrome.storage.sync.get('announcementVersion', data => {
            if (
                data.announcementVersion === undefined ||
                data.announcementVersion < ANNOUNCEMENT_VERSION
            ) {
                this.isOpen = true;

                // Set current version to storage.
                chrome.storage.sync.set({
                    announcementVersion: ANNOUNCEMENT_VERSION
                });

                chrome.runtime.sendMessage({
                    announcementShown: true
                });
            }
        });
    }

    render() {
        return (
            <Modal isOpen={this.isOpen} onDismiss={this.onModalDismissed}>
                <div className="announcementContainer ms-Fabric">
                    <IconButton
                        className="announcementCloseButton"
                        iconProps={{ iconName: 'ChromeClose' }}
                        onClick={this.onModalDismissed}
                    />
                    <div className="announcementHeader">
                        <Icon
                            iconName="MegaphoneSolid"
                            className="announcementHeaderIcon"
                        />
                        <span>Filtros Project CO</span>
                        <Icon
                            iconName="MegaphoneSolid"
                            className="announcementHeaderIconRight"
                        />
                    </div>
                    <div className="announcementBody">
                        <div className="announcementBullet">
                            <div className="announcementMessage">
                                {this.message}
                            </div>
                        </div>
                    </div>
                    <Footer showChangeShortfutsButton={false} />
                </div>
            </Modal>
        );
    }

    private onModalDismissed = () => {
        this.isOpen = false;
    };
}
