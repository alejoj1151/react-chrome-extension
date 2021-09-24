import * as React from 'react';
import { observer } from 'mobx-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import './Header.scss';

export interface HeaderProps {
    isNativeShortcuts: boolean;
    onShortcutsModeToggled: (isNativeShortcuts: boolean) => void;
}

@observer
export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className="header">
                <span className="headerTitle">Filtros Project CO v2.0.0</span>
                <Toggle
                    checked={ this.props.isNativeShortcuts }
                    offText="Configuración básica (Automática)"
                    onChanged={ this.onToggleChanged }
                    onText="Teclas nativas de chrome (Configurable)"
                />
            </div>
        );
    }

    private onToggleChanged = (value: boolean) => {
        this.props.onShortcutsModeToggled(value);
    };
}
