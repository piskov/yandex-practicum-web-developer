'use strict';

/**
 * Creates a validation helper for the form.
 * @param {HTMLFormElement} form - Form to validate.
 * @param {Element} submitButton - Submit button reference.
 */
function initValidation(form, submitButton) {
    // # ------ Fields ------ #

    const _form = form;
    const _submitButton = submitButton;
    const _inputs = Array.from(form.elements)
                         .filter(item => item !== submitButton);


    // # ------ Main code ------ #

    _form.addEventListener('input', _ => updateSubmitButtonState);
    _inputs.forEach(input => input.addEventListener('input', input_Changed));


    // # ------ Event handlers ------ #

    function input_Changed(event) {
        const input = event.target;
        const validationResult = input.validity;

        const errorSpanId = getErrorElementId(_form.name, input.name);
        const errorMessage = getErrorMessage(validationResult);
        showError(errorMessage, errorSpanId);

        updateSubmitButtonState();
    }


    // # ------ Functions ------ #

    /**
     * Enables or disables a button.
     * @param {Boolean} isEnabled - Availability state.
     * @param {Element} button - Button reference.
     */
    function changeButtonState(isEnabled, button) {
        if (isEnabled) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', "true");
        }
    }

    /**
     * Constructs element’s id for the specified form and control.
     * @param {String} formName - Name of the form.
     * @param {String} inputName - Name of the input control in the form.
     * @returns {String} Span id for error message.
     */
    function getErrorElementId(formName, inputName) {
        return `error-${formName}-${inputName}`;
    }

    /**
     * Extracts error message from the validation result.
     * @param {ValidityState} validationResult - Validation state.
     * @return {String} - Error message.
     */
    function getErrorMessage(validationResult) {
        if (validationResult === undefined) {
            return undefined;
        }

        if (validationResult.valid) {
            return '';
        } else if (validationResult.valueMissing) {
            return 'Это обязательное поле';
        } else if (validationResult.tooShort
            || validationResult.tooLong) {
            return 'Должно быть от 2 до 30 символов';
        } else if (validationResult.typeMismatch) {
            return 'Здесь должна быть ссылка';
        }

        return 'Проверьте данные в поле';
    }

    /**
     * Deletes all error messages and updates submit button state.
     */
    function resetErrors() {
        _inputs.forEach(item => {
            const errorSpanId = getErrorElementId(_form.name, item.name);
            showError('', errorSpanId);
        });

        updateSubmitButtonState();
    }

    /**
     * Shows error message in the specified element.
     * @param {String} errorMessage - Error text to display.
     * @param {String} errorElementId - Span id to show the error in.
     */
    function showError(errorMessage, errorElementId) {
        if (errorElementId === undefined
            || errorElementId === "") {
            return;
        }

        const errorLabel = document.getElementById(errorElementId);
        if (errorLabel === null) {
            return;
        }

        errorLabel.textContent = errorMessage;
    }

    /**
     * Enables/disables submit button based on the form’s validity.
     */
    function updateSubmitButtonState() {
        let isFormValid = true;

        for (let i = 0; i < _inputs.length; i++) {
            if (!_inputs[i].validity.valid) {
                isFormValid = false;
                break;
            }
        }

        changeButtonState(isFormValid, _submitButton);
    }

    return {
        resetErrors
    }
}
