'use strict';

/**
 * Describes a card for a Place.
 */
class Card {
    /**
     * Inits a new card.
     *
     * @param {String} name
     * Name of the place to be shown on the card.
     *
     * @param {String} imageUrl
     * Link to the place‘s photo to be shown as a card background.
     *
     * @param {ImagePopup} imagePopup
     * Popup to show place’s photo in.
     */
    constructor(name, imageUrl, imagePopup) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.imagePopup = imagePopup;

        this.cardElement = this.create();

        this.likeButton = this.cardElement.querySelector('.place-card__like-icon');
        this.likeButton
            .addEventListener('click', _ => this.like.call(this));

        // delete card
        this.cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', event => {
                this.remove.call(this);
                event.stopPropagation();
            });

        // view place photo in a popup
        this.cardElement
            .querySelector('.place-card__image')
            .addEventListener('click', _ => this.showBigPhoto.call(this));
    }

    /**
     * Creates HTML for a new card.
     * @returns {HTMLDivElement} New card ready to be inserted into the DOM.
     */
    create() {
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
        photo.style.backgroundImage = `url(${this.imageUrl})`;

        const deleteCardButton = document.createElement('button');
        deleteCardButton.classList.add('place-card__delete-icon');

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('place-card__description');

        const placeName = document.createElement('h3');
        placeName.classList.add('place-card__name');
        placeName.textContent = this.name;

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

    /**
     * Toggles “like” state.
     */
    like() {
        this.likeButton.classList.toggle('place-card__like-icon_liked');
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
        this.imagePopup.setImage(this.imageUrl);
        this.imagePopup.show();
    }
}
