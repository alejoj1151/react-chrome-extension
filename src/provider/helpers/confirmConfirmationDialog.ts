import clickElement from './clickElement';
import { logError } from '../../utils/logger';

/**
 * Confirmación de compra en el boton comprar ahora
 */
export default function confirmConfirmationDialog() {
    setTimeout(() => {
        try {
            const dialogDocument = document.getElementsByClassName('ut-button-group')[0];
            //const okButton = findButtonbyTextContent("Aceptar");
            const okButton = findDialogButtonbyTextContent(dialogDocument, "Aceptar");
            clickElement(okButton);
        } catch (error) {
            logError(error);
            throw error;
        }
    }, 300);
}

// Obtener un contenido a partir del texto que contiene
/*function findButtonbyTextContent(text) {
    var buttons = document.querySelectorAll('button');
    for (var i=0, l=buttons.length; i<l; i++) {
      if (buttons[i].textContent == text)
        return buttons[i];
    }  
}*/

  // Obtener un contenido a partir del texto que contiene
function findDialogButtonbyTextContent(doc: Element, text: string) {
  var buttons = doc.querySelectorAll('button');
  for (var i=0, l=buttons.length; i<l; i++) {
    if (buttons[i].textContent == text)
      return buttons[i];
  }  
}
