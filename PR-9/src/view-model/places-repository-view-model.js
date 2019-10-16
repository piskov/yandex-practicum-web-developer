'use strict';

let PlacesRepositoryViewModel = (function () {
    /**
     * Describes a VM for a collection of places.
     */
    class PlacesRepositoryViewModel {
        /**
         * Inits new places VM.
         * @param {PlacesRepositoryModel} model - Places repository model.
         */
        constructor(model) {
            this._model = model;

            _showAddPlacePopupButton.addEventListener(
                'click',
                _ => _showAddPlacePopupButton_Click.call(this));

            _addPlaceForm.addEventListener(
                'submit',
                event => _addPlaceForm_Submit.call(this, event));

            _parseModel.call(this);
        }
    }

    // # ------ Fields ------ #

    const _addPlaceForm = document.forms.newPlace;
    const _addPlaceFormValidator = new FormValidator(_addPlaceForm);
    const _addPlacePopup = new Popup(document.getElementById('new-place-popup'));
    const _placesContainer = document.querySelector('.places-list');
    const _showAddPlacePopupButton = document.querySelector('button.user-info__button_type_new-place');
    const _viewPlacePopup = new ImagePopup(document.getElementById('view-place-popup'));


    // # ------ Functions ------ #

    /**
     * Creates new place VM and adds it to the DOM.
     * @param {PlaceModel} place - Place model.
     * @private
     */
    function _addPlace(place) {
        const placeVM = new PlaceViewModel(place, _viewPlacePopup);
        _placesContainer.append(placeVM.cardElement);
    }

    /**
     * Parses places from the model and adds them to the DOM.
     * @private
     */
    function _parseModel() {
        this._model.places.forEach(place => {
            _addPlace(place);
        });
    }


    // # ------ Event handlers ------ #

    /**
     * Adds new place.
     */
    function _addPlaceForm_Submit(event) {
        event.preventDefault();

        const placeName = _addPlaceForm.elements.placeName.value;
        const placePhotoUrl = _addPlaceForm.elements.placeUrl.value;

        const place = new PlaceModel(placeName, placePhotoUrl, 1);
        this._model.addPlace(place);
        _addPlace(place);

        _addPlacePopup.close();
    }

    /**
     * Shows popup window for adding new place.
     */
    function _showAddPlacePopupButton_Click() {
        _addPlaceForm.reset();
        _addPlaceFormValidator.resetErrors();

        _addPlacePopup.show();
    }


    return PlacesRepositoryViewModel;
})();
