﻿﻿﻿'use strict';

/**
 * Enables or disables a button.
 * @param {Element} button - Button reference.
 * @param {Boolean} isEnabled - Availability state.
 */
function changeButtonState(button, isEnabled) {
    if (button === null) {
        return;
    }

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
    } else if (validationResult.tooShort || validationResult.tooLong) {
        return 'Должно быть от 2 до 30 символов';
    } else if (validationResult.typeMismatch) {
        return 'Здесь должна быть ссылка';
    }

    return 'Проверьте данные в поле';
}

/**
 * Shows error message in the specified element.
 * @param {String} errorMessage - Error text to display.
 * @param {String} errorElementId - Span id to show the error in.
 */
function showError(errorMessage, errorElementId) {
    if (errorElementId === null
        || errorElementId === "") {
        return;
    }

    const errorLabel = document.getElementById(errorElementId);
    if (errorLabel === null) {
        return;
    }

    errorLabel.textContent = errorMessage;
}
