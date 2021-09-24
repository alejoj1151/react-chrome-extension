import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Announcement from './Announcement';
import getProvider from './provider/getProvider';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { log } from './utils/logger';

(function () {
    log('Se está cargando el contenido de la extensión');

    // Initialize OUFR icons.
    initializeIcons();

    setTimeout(() => {
        // Condicional para insertar diseño en la cabecera de la webapp
        const header = document.getElementsByClassName('ut-fifa-header-view')[0]; // Obtener la cabecera principal
        if (header) { // Cuando esté en la cabecera principal agregar el diseño

            // Html etiqueta <div></div> (id=appFiltrosContent)
            const appFiltrosContent = document.createElement('div');
            appFiltrosContent.id = 'appFiltrosContent';

            // Html etiqueta <a></a> de tipo linkText (href)
            const a1 = document.createElement('a');
            const linkText = document.createTextNode('FIFA 21 - Noticias FUT Ingresa aqui!');
            a1.appendChild(linkText);
            a1.href = 'https://www.todoultimateteam.com/'; // Propertys CSS
            a1.target = '_blank';
            a1.style.position = 'absolute';
            a1.style.top = '15px';
            a1.style.left = '110px';
            a1.style.color = 'white';

            header.appendChild(appFiltrosContent);  // Agregar en la cabecera la etiqueta <div = "appFiltrosContent"></div>
            header.appendChild(a1); // Agregar en la cabecera la etiqueta a1

            // Html etiqueta <a></a> de tipo linkText (href)
            const a2 = document.createElement('a');
            const linkText2 = document.createTextNode('Tienes alguna consulta? Contactame!');
            a2.appendChild(linkText2);
            a2.href = 'https://www.google.com'; // Propertys CSS
            a2.target = '_blank';
            a2.style.position = 'absolute';
            a2.style.top = '15px';
            a2.style.left = '560px';
            a2.style.color = 'white';

            // Insertar las etiquetas en la cabecera
            header.appendChild(appFiltrosContent);  // Agregar en la cabecera la etiqueta <div = "appFiltrosContent"></div>
            header.appendChild(a1); // Agregar en la cabecera la etiqueta a1
            header.appendChild(a2); // Agregar en la cabecera la etiqueta a2

            // Agregar en la etiqueta el modal para cuadro dialog
            ReactDOM.render(<Announcement />, document.getElementById('appFiltrosContent'));

            
            return;
        }
    }, 2000);

    // Update badge with current status.
    chrome.storage.sync.get('isActive', data => {
        // Make extension active on first run.
        if (data.isActive === undefined) {
            chrome.storage.sync.set({ isActive: true }, () => {
                chrome.runtime.sendMessage({ isActive: true });
            });
            return;
        }

        chrome.runtime.sendMessage({ isActive: data.isActive });
    });

    // Get provider that performs hotkey actions for correct version of web app.
    const provider = getProvider();

    // Sets up listeners for non-configurable shortcuts.
    window.addEventListener('keydown', ev => {
        const keyCode = ev.keyCode;

        // If user is typing in an input, ignore hotkeys.
        if (document.activeElement.tagName.toLocaleLowerCase() === 'input') {
            return;
        }

        chrome.storage.sync.get('isActive', data => {
            const isActive = data.isActive;
            chrome.runtime.sendMessage({ isActive: isActive });

            chrome.storage.sync.get('isNativeShortcuts', isNativeShortcuts => {
                if (isNativeShortcuts.isNativeShortcuts === false) {
                    if (ev.altKey && keyCode === 32 /* Alt + Space */) {
                        chrome.storage.sync.set({ isActive: !isActive }, function () {
                            chrome.runtime.sendMessage({
                                isActive: !isActive,
                            });
                        });
                        return;
                    }

                    // Si la extensión está desactivada no hacer nada
                    if (!isActive) {
                        return;
                    }

                    switch (keyCode) {
                       
                        case 72: // Teclear la tecla 'h' para incrementar/buscar/comprar
                            provider.search_increment();
                            break;
                        
                        case 89: // Teclear la tecla 'y' para decrementar/buscar/comprar
                            provider.search_decrement();
                            break;
                    
                        case 17: // Teclear la tecla 'ctrl' para incrementar/buscar/comprar
                            provider.search_automatic();
                            break;
                                
                        default:
                            break;
                    }
                } else {
                    // If extension "isn't active", don't handle any commands.
                    if (!isActive) {
                        log('La extensión está desactivada, así que se ignora el uso de teclas para acceso.');
                        return;
                    }
                }
            });
        });
    });

    // Sets up listeners for configurable shortcuts.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        chrome.storage.sync.get('isActive', data => {
            const isActive = data.isActive;
            chrome.runtime.sendMessage({ isActive: isActive });

            // Ignore all commands if native shortcuts aren't enabled.
            chrome.storage.sync.get('isNativeShortcuts', isNativeShortcuts => {
                if (
                    isNativeShortcuts.isNativeShortcuts ||
                    isNativeShortcuts.isNativeShortcuts === undefined
                ) {
                    /**
                     * This shortcut is checked prior to checking if extension "is active"
                     * because this one always gets handled.
                     */
                    if (request.toggleExtension) {
                        logHotkeyReceived('toggleExtension');

                        chrome.storage.sync.set({ isActive: !isActive }, () => {
                            log(`Extension is now ${!isActive ? 'active' : 'inactive'}.`);
                            chrome.runtime.sendMessage({ isActive: !isActive });
                        });

                        // Hotkey handled, so return.
                        return;
                    }

                    // If extension "isn't active", don't handle any commands.
                    if (!isActive) {
                        log('La extensión está desactivada, así que se ignora el uso de teclas para acceso.');
                        return;
                    }
                }
            });

            // Lets eventPage know if active element is an input.
            if (request.getActiveElement) {
                sendResponse(document.activeElement.tagName.toLowerCase() === 'input');
            }
        });

        // Necessary for asynchronous message passing.
        return true;
    });

    function logHotkeyReceived(hotkeyName: string) {
        log(`${hotkeyName} shortfut received in content script.`);
    }
})();
