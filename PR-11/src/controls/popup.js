﻿/**
 * Describes a popup.
 */
export class Popup {
    /**
     * Inits a new popup.
     * @param {Element} popupElement - DOM container for a popup.
     */
    constructor(popupElement) {
        this.popupElement = popupElement;

        const closeButton = this.popupElement.querySelector('.popup__close');
        if (closeButton !== null) {
            closeButton.addEventListener('click', _ => this.close());
        }
    }

    /**
     * Closes a popup.
     */
    close() {
        this.popupElement.classList.remove('popup_is-opened');
    }

    /**
     * Opens a popup.
     */
    show() {
        this.popupElement.classList.add('popup_is-opened');
    }
}
