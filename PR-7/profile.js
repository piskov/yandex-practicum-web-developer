'use strict';

(function () {
    // # ------ Fields ------ #

    const _form = document.forms.editProfile;

    const _aboutField = _form.elements.userDescription;
    const _nameField = _form.elements.userName;

    const _aboutLabel = document.querySelector('.user-info__job');
    const _nameLabel = document.querySelector('.user-info__name');

    const _popup = initPopup('edit-profile-popup');

    const _showPopupButton =
        document.querySelector('button.user-info__button_type_edit-profile');

    const _validationHelper = initValidation(_form, _popup.submitButton);


    // # ------ Main code ------ #

    _form.addEventListener('submit', form_Submit);
    _showPopupButton.addEventListener('click', showPopupButton_Click);


    // # ------ Event handlers ------ #

    /**
     * Saves user details.
     */
    function form_Submit(event) {
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

        _validationHelper.resetErrors();

        _popup.show();
    }
})();
