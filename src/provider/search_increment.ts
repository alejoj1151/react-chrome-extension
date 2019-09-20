import clickElement from './helpers/clickElement'; // click boton
import isUserOnPage from './helpers/isUserOnPage'; // ubicación en la página
import clickBuyNowButton from './helpers/clickBuyNowButton'; // click boton para comprar
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog'; // confirmar compra del botón del cuadro de dialog
import { logError } from '../utils/logger';

export default function search_increment() {
    // si el usuario está en una ubicación que no sea el mercado de compras
    if (!isUserOnPage('Buscar en Mercado')) {

        // si el usuario está en la lista de objetos a comprar
        if (isUserOnPage('Resultados de la búsqueda')) {
            try {
                clickBuyNowButton();
                confirmConfirmationDialog();
            } catch (error) {
                logError(`Un erros se ha presentado, no podrás comprar este articulo.`);
            }
        }
        else {
            logError(`Error tú debes estar en la página con título "Buscar en Mercado" para ejecutar esta acción.`);
        }
        // fin compra con esta misma acción

        return;
    }

    //aumentar el precio antes de hacer la busqueda para asi actualizar el mercado
    if (isUserOnPage('Buscar en Mercado')) {
        const button = document.getElementsByClassName('increment-value')[0];
        clickElement(button);
    }
    // fin aumentar valor precio

    const searchButton = document.getElementsByClassName('btn-standard call-to-action')[0];
    clickElement(searchButton);
}
