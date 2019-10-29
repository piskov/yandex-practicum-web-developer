'use strict';

/**
 * Describes a popup with an image.
 */
class ImagePopup extends Popup {
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
     * @param {String} imageUrl - Link to the image.
     */
    setImage(imageUrl) {
        if (imageUrl === undefined) {
            return;
        }

        this.imageElement.src = imageUrl;
    }
}
