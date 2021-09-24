/**
 * Simulates a click on an element.
 */
export default function clickElement(element) {
    sendTouchEvent(element, 'touchstart');
    sendTouchEvent(element, 'touchend');
}

/**
 * Dispatches a touch event on the element.
 * https://stackoverflow.com/a/42447620
 *
 * @param {HTMLElement} element
 * @param {string} eventType
 */
function sendTouchEvent(element, eventType) {
    /**
     * Touch constructor does take an object in Chrome, but typings aren't updated,
     * so it shows as an error when in reality it's fine.
     */
    // @ts-ignore
    const touch = new Touch({
        // Using a number like TS suggest breaks this..
        // @ts-ignore
        identifier: 'filtrosprojectco',
        target: element,
        clientX: 0,
        clientY: 0,
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5
    });

    const touchEvent = new TouchEvent(eventType, {
        cancelable: true,
        bubbles: true,
        touches: [touch],
        targetTouches: [touch],
        changedTouches: [touch],
        shiftKey: true
    });

    element.dispatchEvent(touchEvent);
}
