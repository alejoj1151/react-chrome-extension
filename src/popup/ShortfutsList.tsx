import * as React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './ShortfutsList.scss';

// Aliases type to save typing.
type Command = chrome.commands.Command;

export interface ShortcutsListProps {
    isNativeShortcuts: boolean;
}

@observer
export default class ShortfutsList extends React.Component<
    ShortcutsListProps,
    {}
> {
    @observable
    private commands: Map<string, Command> = new Map<string, Command>();

    componentWillMount() {
        // Gets configured shortcuts for shortfuts.
        chrome.commands.getAll((commands: Command[]) => {
            for (const command of commands) {
                this.commands.set(command.name, command);
            }
        });
    }

    render() {
        // Don't render anything if commands haven't loaded yet.
        if (!this.commands) {
            return null;
        }

        // Build array from map.
        const commandArray = this.props.isNativeShortcuts
            ? Array.from(this.commands)
            : Array.from(this.buildLegacyShortcutsList());

        if (this.props.isNativeShortcuts) {
            commandArray.sort(
                (
                    [keyA, commandA]: [string, Command],
                    [keyB, commandB]: [string, Command]
                ) => {
                    // Push commands that aren't set to end.
                    if (!commandA.shortcut) {
                        return 1;
                    }

                    if (commandA.shortcut < commandB.shortcut) {
                        return -1;
                    } else if (commandA.shortcut > commandB.shortcut) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            );
        }

        return (
            <div className="shortfutsListContainer">
                <div className="shortfutsList">
                    {commandArray.map(this.renderShortfut)}
                </div>
            </div>
        );
    }

    /**
     * Renders an individual shortcut.
     */
    renderShortfut([key, command]: [string, Command]) {
        return (
            <div className="shortfut" key={command.name}>
                <span className="shortfutDescription">
                    {command.description ||
                        'Open extension popup (Activate the extension)'}
                </span>
                {command.shortcut ? (
                    <span className="ms-fontWeight-semibold shortfutShortcut">
                        {command.shortcut}
                    </span>
                ) : (
                    <Link
                        className="ms-fontWeight-semibold shortfutSetShortcut"
                        onClick={() => {
                            chrome.runtime.sendMessage({
                                changeShortcuts: true
                            });
                        }}
                    >
                        (Set)
                    </Link>
                )}
            </div>
        );
    }

    // Lista de comandos en el menu del aplicativo
    buildLegacyShortcutsList() {
        const map: Map<any, any> = new Map();

        map.set('altSpace', {
            description: 'Activa o desactiva el aplicativo',
            name: 'Alt+Space',
            shortcut: 'ALT+ESPACIO'
        });
        map.set('h', {
            description: `Acciones busqueda/compra/actualizar incrementando en el mercado`,
            name: 'h',
            shortcut: 'Tecla H'
        });
        map.set('y', {
            description: `Acciones busqueda/compra/actualizar decreciendo en el mercado`,
            name: 'y',
            shortcut: 'Tecla Y'
        });
        map.set('ctrl', {
            description: `Acción única para busqueda/compra/actualizar en el mercado`,
            name: 'ctrl',
            shortcut: 'Tecla CTRL'
        });
        return map;
    }
}
