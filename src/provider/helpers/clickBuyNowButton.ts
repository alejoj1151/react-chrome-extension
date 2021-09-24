import clickElement from './clickElement';
import { log, logError } from '../../utils/logger';

// Cick al botón de comprar ahora
export default function clickBuyNowButton() {
    const buyNowButton = document.getElementsByClassName('btn-standard buyButton currency-coins')[0];

    if (buyNowButton) {
        log("Elemento encontrado. Acción ejecutar compra");
        clickElement(buyNowButton);
    } else {
        logError(`No se ha encontrado el botón "Comprar ahora".`);
        throw 'No se encontró el botón "Comprar ahora".';
    }
}
