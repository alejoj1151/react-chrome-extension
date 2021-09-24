import clickElement from './clickElement';
import { logError } from '../../utils/logger';

// Cick al botón de comprar ahora
export default function clickBuyNowButton() {
    const buyNowButton = document.getElementsByClassName('buyButton')[0];

    if (buyNowButton) {
        clickElement(buyNowButton);
    } else {
        logError(`No se ha encontrado el botón "Comprar ahora".`);
        throw 'No se encontró el botón "Comprar ahora".';
    }
}
