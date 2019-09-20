import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import './Footer.scss';

export interface FooterProps {
    showChangeShortfutsButton: boolean;
}

export default class Footer extends React.Component<FooterProps, {}> {
    constructor(props: FooterProps, state: {}) {
        super(props, state);
    }

    render() {
        return (
            // Desing of index application
            <div className="footer">
                
                {/* This button redirect in a new page to Futbin market */}
                <ActionButton
                    iconProps = {
                        { iconName: 'DiamondSolid' }
                    }
                    onClick = { 
                        () => { window.open('https://www.futbin.com/market/','_blank'); }
                    }
                >
                Consultar mercado FUT en FUTBIN
                </ActionButton>
                
                {/* This button redirect to email for create new message */}
                <ActionButton
                    iconProps = {
                        { iconName: 'Mail' }
                    }
                    onClick = { 
                        () => { chrome.runtime.sendMessage( {
                            contactDeveloper: true // This open the function in eventPage.ts for send email to developer
                        });
                    }}
                >
                Contactar al desarollador
                </ActionButton>

            </div>
            // End code application
        );
    }
}
