'use strict';

(function () {
    // # ------ Fields ------ #

    const _addPlacePopup = initPopup('new-place-popup');
    const _cardsContainer = document.querySelector('.places-list');
    const _addPlaceForm = document.forms.newPlace;

    const _showAddPlacePopupButton =
        document.querySelector('button.user-info__button_type_new-place');

    const _validationHelper = initValidation(_addPlaceForm, _addPlacePopup.submitButton);
    const _viewPlaceImage = document.querySelector('.popup__image');
    const _viewPlacePopup = initPopup('view-place-popup');


    // # ------ Main code ------ #

    _cardsContainer.addEventListener('click', cardsContainer_Click);
    _addPlaceForm.addEventListener('submit', form_Submit);
    _showAddPlacePopupButton.addEventListener('click', showAddPlacePopupButton_Click);

    const initialData = loadInitialData();
    createCardsFromJson(initialData);


    // # ------ Event handlers ------ #

    /**
     * Handles clicks on cards.
     */
    function cardsContainer_Click(event) {
        const target = event.target;

        // “delete card” button click
        if (target.classList.contains('place-card__delete-icon')) {
            // deleteCardButton → photo → card
            const cardToDelete = target.parentNode.parentNode;
            cardToDelete.remove();
        }

        // “image” click
        else if (target.classList.contains('place-card__image')) {
            const urlString = target.style.backgroundImage;
            _viewPlaceImage.src = urlString.substring(5, urlString.length - 2);

            _viewPlacePopup.show();
        }

        // “like” button click
        else if (target.classList.contains('place-card__like-icon')) {
            target.classList.toggle('place-card__like-icon_liked');
        }
    }

    /**
     * Adds new place.
     */
    function form_Submit(event) {
        event.preventDefault();

        const placeName = _addPlaceForm.elements.placeName.value;
        const placePhotoUrl = _addPlaceForm.elements.placeUrl.value;

        const card = createCardElement(placeName, placePhotoUrl);
        _cardsContainer.append(card);

        _addPlacePopup.close();
    }

    /**
     * Shows popup window for adding new place.
     */
    function showAddPlacePopupButton_Click() {
        _addPlaceForm.reset();
        _validationHelper.resetErrors();

        _addPlacePopup.show();
    }


    // # ------ Functions ------ #

    /**
     * Creates HTML for a new card.
     *
     * @param {String} name - Name of the place to be shown on the card.
     * @param {String} imageLink - Link to the place photo to be shown
     * as card background.
     * @returns {HTMLDivElement} New card ready to be inserted into the DOM.
     */
    function createCardElement(name, imageLink) {
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
        photo.style.backgroundImage = `url(${imageLink})`;

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

    /**
     * Creates cards from the data and adds them to the DOM.
     *
     * @param jsonData {[Object.<string, string>]}
     * Collection of places names and links to photos.
     */
    function createCardsFromJson(jsonData) {
        for (let item of jsonData) {
            const card = createCardElement(item.name, item.link);
            _cardsContainer.append(card);
        }
    }
})();
