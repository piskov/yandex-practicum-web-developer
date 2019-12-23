﻿import { Popup } from './popup.js';

/**
 * Describes a popup with an image.
 */
export class ImagePopup extends Popup {
    /**
     * Inits new image popup.
     * @param {Element} popupElement - DOM container for a popup.
     */
    constructor(popupElement) {
        super(popupElement);

        this.imageElement = this.popupElement.querySelector('.popup__image');
    }

    /**
     * Changes url for the image in the popup.
     * @param {string} imageUrl - Link to the image.
     */
    setImage(imageUrl) {
        if (imageUrl === undefined) {
            return;
        }

        this.imageElement.src = imageUrl;
    }
}
