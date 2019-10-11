'use strict';

(function () {
    // # ------ Fields ------ #

    const _editProfileForm = document.forms.editProfile;
    const _formValidator = new FormValidator(_editProfileForm);

    const _aboutField = _editProfileForm.elements.userDescription;
    const _nameField = _editProfileForm.elements.userName;

    const _aboutLabel = document.querySelector('.user-info__job');
    const _nameLabel = document.querySelector('.user-info__name');

    const _popup = new Popup(document.getElementById('edit-profile-popup'));

    const _showPopupButton =
        document.querySelector('button.user-info__button_type_edit-profile');


    // # ------ Main code ------ #

    _editProfileForm.addEventListener('submit', editProfileForm_Submit);
    _showPopupButton.addEventListener('click', showPopupButton_Click);


    // # ------ Event handlers ------ #

    /**
     * Saves user details.
     */
    function editProfileForm_Submit(event) {
        event.preventDefault();

        _aboutLabel.textContent = _aboutField.value;
        _nameLabel.textContent = _nameField.value;

        _popup.close();
    }

    /**
    * Shows popup window for editing user profile.
    */
    function showPopupButton_Click() {
        _aboutField.value = _aboutLabel.textContent;
        _nameField.value = _nameLabel.textContent;

        _formValidator.resetErrors();

        _popup.show();
    }
})();
