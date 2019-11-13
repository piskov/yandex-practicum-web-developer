﻿import * as ValidationHelper from './tools/validation-helper.js';

/**
 * Describes a form validator object.
 */
export class FormValidator {
    /**
     * Inits a validator for the form.
     * @param {HTMLFormElement} form - Form to validate.
     */
    constructor(form) {
        this.form = form;

        this.inputs = [];
        this.submitButton = null;

        for (let item of [...form.elements]) {
            if (item.type === "submit") {
                this.submitButton = item;
            } else {
                this.inputs.push(item);
            }
        }

        this.inputs.forEach(input =>
            input.addEventListener('input',
                event => this.validateInput.call(this, event.target))
        );
    }

    /**
     * Deletes all error messages and updates submit button state.
     */
    resetErrors() {
        for (let input of this.inputs) {
            const errorSpanId =
                ValidationHelper.getErrorElementId(this.form.name, input.name);

            ValidationHelper.showError('', errorSpanId);
        }

        this.updateSubmitButtonState();
    }

    /**
     * Enables/disables submit button based on the form’s validity.
     */
    updateSubmitButtonState() {
        if (this.submitButton === null) {
            return;
        }

        let isFormValid = true;

        for (let input of this.inputs) {
            if (!input.validity.valid) {
                isFormValid = false;
                break;
            }
        }

        ValidationHelper.changeButtonState(this.submitButton, isFormValid);
    }

    /**
     * Checks element’s validity, displays custom error and disables
     * submit button if necessary.
     * @param {Element} input - Form input to validate.
     */
    validateInput(input) {
        if (input === undefined) {
            return;
        }

        const validationResult = input.validity;

        const errorSpanId =
            ValidationHelper.getErrorElementId(this.form.name, input.name);

        const errorMessage = ValidationHelper.getErrorMessage(validationResult);
        ValidationHelper.showError(errorMessage, errorSpanId);

        this.updateSubmitButtonState();
    }
}
