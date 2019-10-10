'use strict';

/**
 * Initializes a popup from the id.
 *
 * @param {String} popupId - Popup html id.
 * @returns {Object.<Function, Function, Element>} - Popup helper object with:
 * 1) close and 2) show functions; 3) submit button reference (if popup contains a form).
 */
function initPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup === undefined) {
        console.log(`No popup with such id="${popupId}".`);
        return undefined;
    }

    // it’s ok _not_ to have a submit button
    const submitButton = popup.querySelector('.popup__button');

    const closeButton = popup.querySelector('.popup__close');
    if (closeButton === undefined) {
        console.log('No close button in the popup.');
        return undefined;
    }

    closeButton.addEventListener('click', close);

    /**
     * Closes a popup.
     */
    function close() {
        popup.classList.remove('popup_is-opened');
    }

    /**
     * Opens a popup.
     */
    function show() {
        popup.classList.add('popup_is-opened');
    }

    return {
        /**
         * Close popup function.
         */
        close,

        /**
         * Open popup function.
         */
        show,

        /**
         * Optional. Submit button reference (if popup contains a form).
         */
        submitButton
    };
}
