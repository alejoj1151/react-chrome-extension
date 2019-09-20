import clickElement from './helpers/clickElement'; // click boton
import isUserOnPage from './helpers/isUserOnPage'; // ubicación en la página
import clickBuyNowButton from './helpers/clickBuyNowButton'; // click boton para comprar
import confirmConfirmationDialog from './helpers/confirmConfirmationDialog'; // confirmar compra del botón del cuadro de dialog
import { logError } from '../utils/logger';

// Configuración para la webapp versión latina (mx)
export default function search_automatic() {
    // si el usuario está en una ubicación que no sea el mercado de compras
    if (!isUserOnPage('Buscar en Mercado')) {

        // si el usuario está en la lista de objetos a comprar
        if (isUserOnPage('Resultados de la búsqueda')) {
            try {
                clickBuyNowButton();
                confirmConfirmationDialog();
            } catch (error) {
                logError(`Un error se ha presentado, no podrás comprar este articulo`);

                // Pantalla no encontrado ningún articulo
                const notResultsScreen = document.getElementsByClassName('ut-no-results-view')[0];
                // Si no se ha encontrado ningún articulo se automatiza el click para retroceder y así reiniciar la búsqueda
                if (notResultsScreen) {
                    clickElement(document.getElementsByClassName('ut-navigation-button-control')[0]);
                    logError(`No se ha encontrado ningún articulo, intenta denuevo`);
                }
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

    // Botón para búscar articulos en el mercado
    
    const searchButton = document.getElementsByClassName('btn-standard call-to-action')[0];
    clickElement(searchButton);

}
