'use strict';

let UserViewModel = (function () {
    /**
     * Describes a VM for a user model.
     */
    class UserViewModel {
        /**
         * Inits new user view model.
         * @param {UserModel} model - User’s model.
         */
        constructor(model) {
            this._model = model;
            this.render();

            _editProfileForm.addEventListener(
                'submit',
                event => _editProfileForm_Submit.call(this, event));

            _showEditProfilePopupButton.addEventListener(
                'click',
                _ => _showPopupButton_Click.call(this));
        }

        /**
         * Updates user info in the DOM.
         */
        render() {
            _aboutLabel.textContent = this._model.about;
            _nameLabel.textContent = this._model.name;
            _userPhotoElement.style.backgroundImage = `url(${this._model.avatar})`;
        }
    }


    // # ------ Fields ------ #

    const _editProfileForm = document.forms.editProfile;
    const _formValidator = new FormValidator(_editProfileForm);

    const _aboutField = _editProfileForm.elements.userDescription;
    const _nameField = _editProfileForm.elements.userName;

    const _aboutLabel = document.querySelector('.user-info__job');
    const _nameLabel = document.querySelector('.user-info__name');
    const _userPhotoElement = document.querySelector('.user-info__photo');

    const _editProfilePopup = new Popup(document.getElementById('edit-profile-popup'));
    const _showEditProfilePopupButton =
        document.querySelector('button.user-info__button_type_edit-profile');


    // # ------ Event handlers ------ #

    /**
     * Saves user details.
     */
    async function _editProfileForm_Submit(event) {
        event.preventDefault();
        this._model.about = _aboutField.value;
        this._model.name = _nameField.value;

        await this._model.saveProfile();

        this.render();

        _editProfilePopup.close();
    }

    /**
     * Shows popup window for editing user profile.
     */
    function _showPopupButton_Click() {
        _aboutField.value = this._model.about;
        _nameField.value = this._model.name;

        _formValidator.resetErrors();

        _editProfilePopup.show();
    }


    return UserViewModel;
})();
