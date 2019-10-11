'use strict';

(function () {
    // # ------ Fields ------ #

    const _addPlaceForm = document.forms.newPlace;
    const _addPlaceFormValidator = new FormValidator(_addPlaceForm);

    const _cardsList = new CardList(document.querySelector('.places-list'));

    const _addPlacePopup = new Popup(document.getElementById('new-place-popup'));
    const _viewPlacePopup = new ImagePopup(document.getElementById('view-place-popup'));


    // # ------ Main code ------ #


    // show “Add new place” popup
    document.querySelector('button.user-info__button_type_new-place')
        .addEventListener('click', showAddPlacePopupButton_Click);

    _addPlaceForm.addEventListener('submit', addPlaceForm_Submit);

    const cardsJsonData = loadInitialData();
    _cardsList.addCardsFromJson(cardsJsonData, _viewPlacePopup);


    // # ------ Event handlers ------ #

    /**
     * Adds new place.
     */
    function addPlaceForm_Submit(event) {
        event.preventDefault();

        const placeName = _addPlaceForm.elements.placeName.value;
        const placePhotoUrl = _addPlaceForm.elements.placeUrl.value;

        const card = new Card(placeName, placePhotoUrl, _viewPlacePopup);
        _cardsList.addCard(card);

        _addPlacePopup.close();
    }

    /**
     * Shows popup window for adding new place.
     */
    function showAddPlacePopupButton_Click() {
        _addPlaceForm.reset();
        _addPlaceFormValidator.resetErrors();

        _addPlacePopup.show();
    }
})();
