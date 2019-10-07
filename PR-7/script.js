'use strict';

// # Fields #

const _cardsContainer = document.querySelector('.places-list');
const _closePopupButton = document.querySelector('.popup .popup__close');
const _newPlaceButton = document.querySelector('.popup .popup__button');
const _newPlaceForm = document.forms.new;
const _newPlacePopup = document.querySelector('.popup');
const _showPopupButton = document.querySelector('button.user-info__button');


// # Main code #

_cardsContainer.addEventListener('click', cardsContainer_Click);
_closePopupButton.addEventListener('click', closePopupButton_Click);
_newPlaceForm.addEventListener('input', newPlaceForm_Input);
_newPlaceForm.addEventListener('submit', newPlaceForm_Submit);
_showPopupButton.addEventListener('click', showPopupButton_Click);

const initialData = loadInitialData();
createCardsFromJson(initialData);


// # Event handlers #

/**
 * Handle clicks on cards
 */
function cardsContainer_Click(event) {
    // “delete card” button click
    if (event.target.classList.contains('place-card__delete-icon')) {
        // deleteCardButton → photo → card
        const cardToDelete = event.target.parentNode.parentNode;
        cardToDelete.remove();
        return;
    }

    // “like” button click
    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
        return;
    }
}

/**
 * Closes popup window for adding new place.
 */
function closePopupButton_Click() {
    resetFormAndClose();
}

/**
 * Handles logic for text input change in the “New place” form.
 */
function newPlaceForm_Input() {
    const placeName = _newPlaceForm.elements.name.value;
    const placePhotoUrl = _newPlaceForm.elements.link.value;

    if (placeName.length === 0
        || placePhotoUrl.length === 0) {
        _newPlaceButton.setAttribute('disabled', true);
    } else {
        _newPlaceButton.removeAttribute('disabled');
    }
}

/**
 * Adds new place to the DOM.
 */
function newPlaceForm_Submit(event) {
    event.preventDefault();

    const placeName = _newPlaceForm.elements.name.value;
    const placePhotoUrl = _newPlaceForm.elements.link.value;

    const card = createCardElement(placeName, placePhotoUrl);
    _cardsContainer.append(card);

    resetFormAndClose();
}

/**
 * Shows popup window for adding new place.
 */
function showPopupButton_Click() {
    _newPlacePopup.classList.add('popup_is-opened');
}


// # Functions #

/**
 * Creates HTML for a new card.
 *
 * @param name {String}
 * Name of the place to be shown on the card.
 *
 * @param imageLink {String}
 * Link to the place photo to be shown as card background.
 *
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

/**
 * Reset form inputs and hides the popup.
 */
function resetFormAndClose() {
    _newPlaceForm.reset();
    _newPlacePopup.classList.remove('popup_is-opened');
}
