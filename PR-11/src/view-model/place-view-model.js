'use strict';

let PlaceViewModel = (function () {
    /**
     * Place VM.
     */
    class PlaceViewModel {
        /**
         * Inits new place view model.
         *
         * @param {PlaceModel} model
         * Underlying place model.
         *
         * @param {ImagePopup} imagePopup
         * Popup to show place’s photo in.
         */
        constructor(model, imagePopup) {
            this._model = model;
            this._imagePopup = imagePopup;

            this.cardElement = _createHtml(this._model.name, this._model.link);

            this._likeButton =
                this.cardElement.querySelector('.place-card__like-icon');

            this._likeButton
                .addEventListener('click', _ => this.like());

            // delete card
            this.cardElement
                .querySelector('.place-card__delete-icon')
                .addEventListener('click', event => {
                    // TODO: fire event for a place to be deleted in the repo model.
                    this.remove();
                    event.stopPropagation();
                });

            // view place photo in a popup
            this.cardElement
                .querySelector('.place-card__image')
                .addEventListener('click', _ => this.showBigPhoto());
        }

        /**
         * Toggles “like” state.
         */
        like() {
            this._likeButton.classList.toggle('place-card__like-icon_liked');
        }

        /**
         * Deletes card from the DOM.
         */
        remove() {
            this.cardElement.remove();
        }

        /**
         * Shows a popup with a card’s photo.
         */
        showBigPhoto() {
            this._imagePopup.setImage(this._model.link);
            this._imagePopup.show();
        }
    }

    /**
     * Creates HTML for a new card.
     *
     * @param {string} name
     * Name of the place to be shown on the card.
     *
     * @param {string} imageUrl
     * Link to the place‘s photo to be shown as a card background.

     * @returns {HTMLDivElement}
     * “New place” element ready to be inserted into the DOM.
     * @private
     */
    function _createHtml(name, imageUrl) {
        /*
         Card layout:
         |- photo
         |  |- deleteCardButton
         |
         |- descriptionWrapper
            |- placeName
            |- likeButton

        */

        // Init all of the elements above

        const photo = document.createElement('div');
        photo.classList.add('place-card__image');
        photo.style.backgroundImage = `url(${imageUrl})`;

        const deleteCardButton = document.createElement('button');
        deleteCardButton.classList.add('place-card__delete-icon');

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('place-card__description');

        const placeName = document.createElement('h3');
        placeName.classList.add('place-card__name');
        placeName.textContent = name;

        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');

        const card = document.createElement('div');
        card.classList.add('place-card');


        // Stitch items together

        card.append(photo);
        photo.append(deleteCardButton);

        card.append(descriptionWrapper);
        descriptionWrapper.append(placeName);
        descriptionWrapper.append(likeButton);

        return card;
    }

    return PlaceViewModel;
})();
