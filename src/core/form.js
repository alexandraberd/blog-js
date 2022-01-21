export class Form {
    constructor(container, controls) {
        this.container = container;
        this.controls = controls;
    }

    value() {
        const value = {};

        Object.keys(this.controls).forEach((control) => {
            value[control] = this.container[control].value;
        });
        return value;
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.controls).forEach((control) => {
            const validators = Array.from(this.controls[control]);

            let isValid = true;
            validators.forEach((validator) => {
                isValid = validator(this.container[control].value) && isValid;
            });

            isValid
                ? clearError(this.container[control])
                : setError(this.container[control]);

            isFormValid = isFormValid && isValid;
        });

        return isFormValid;
    }

    clear() {
        Object.keys(this.controls).forEach((control) => {
            this.container[control].value = '';
        });
    }
}

function setError(control) {
    clearError(control);
    const error = '<p class="validation-error">Enter a valid value</p>';
    control.classList.add('invalid');
    control.insertAdjacentHTML('afterend', error);
}
function clearError(control) {
    control.classList.remove('invalid');
    if (control.nextSibling) {
        control.closest('div.form-control').removeChild(control.nextSibling);
    }
}
