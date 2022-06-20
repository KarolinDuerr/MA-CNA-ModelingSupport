class FormGroup {

    #formGroupId = "";

    #formContext = "";

    #inputGroupItem = "";

    #labelBeforeInputGroup = "";

    #helpText = "";
    #feedbackText = "";

    constructor(formGroupId = "", formContext = "") {
        this.#formGroupId = formGroupId;
        this.#formContext = formContext;
    }

    getCreatedFormTemplate(includeFormCheck = false, createSeparationLine = "", checkboxLabelFormGroup = false) {
        const formClass = includeFormCheck ? `class="form-group needs-validation ${checkboxLabelFormGroup ? 'form-check' : ''}" novalidate` : 'class="form-group"';
        const divClass = includeFormCheck ? 'class="input-group has-validation"' : 'input-group';
        const form = `<form id="${this.#formGroupId}-form" ${formClass}>
            ${"before".localeCompare(createSeparationLine?.toLowerCase()) === 0 ? '<hr>' : ''}
            ${this.#labelBeforeInputGroup}
            <div id="${this.#formGroupId}-inputGroup" ${divClass}>
                ${this.#inputGroupItem}
            </div>
            ${this.#helpText}
            ${this.#feedbackText}
            ${"after".localeCompare(createSeparationLine?.toLowerCase()) === 0 ? '<hr>' : ''}
        </form>`;

        return form;
    }

    addDropdownElementWithLabelAndOptions(formItemLabelText, inputAttributes, inputProperties, inputOptions) {
        this.#labelBeforeInputGroup = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes);

        const selectionOptions = this.#createOptionElementsForInputElement(inputOptions, inputAttributes.placeholder);
        const selectionProperties = this.#createInputProperties(inputProperties, inputOptions.length === 0);

        const selectionBox = `<select class="custom-select" id="${this.#formGroupId}" size="${inputAttributes.size ?? 1}" ${inputAttributes.multiple ? 'multiple="multiple"' : ''} 
           data-property-type="${this.#formContext}" ${selectionProperties}>
                ${selectionOptions}
        </select>`;

        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = selectionBox;
    }

    _addDataListElementWithLabel(formItemLabelText, inputAttributes, inputProperties) {
        this.#labelBeforeInputGroup = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes);
        const datalistProperties = this.#createInputProperties(inputProperties);

        const inputBox = `<input class="form-control" id="${this.#formGroupId}" list="${this.#formGroupId}-datalist" 
            ${inputAttributes.placeholder ? `placeholder="${inputAttributes.placeholder}"` : ''}   
            data-property-type="${this.#formContext}" ${datalistProperties}>`;

        const dataListItems = this.#createDataListElementsForInputElement(inputAttributes);
        const dataListItem = `<datalist id="${this.#formGroupId}-datalist">
                ${dataListItems}
        </datalist>`;

        const additionalButton = inputAttributes.provideEditButton ? this.#createEditButton(inputProperties.additionalButton) : this.#createEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${inputBox}${dataListItem}${additionalButton}`;
    }

    _addButtonElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        const label = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes);

        const buttonIcon = inputAttributes.buttonIconClass ? `<i id="${this.#formGroupId}-buttonIcon" class="${inputAttributes.buttonIconClass}"></i>` : "";
        const buttonProperties = this.#createInputProperties(inputProperties);

        const button = `<button id="${this.#formGroupId}" class="btn btn-dark btn-block" type="button" ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''} 
            data-property-type="${this.#formContext}" ${buttonProperties}>
                ${buttonIcon}
                ${buttonIcon && inputAttributes.buttonText ? " " : ""} 
                ${inputAttributes.buttonText}
        </button>`;

        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${label}${button}`;
    }

    addSwitchElementWithLabels(formItemLabelTexts = {}, inputAttributes = {}, inputProperties = {}) {
        const isChecked = inputProperties.checked ? true : false;
        const labelLeftSide = `<label id="${this.#formGroupId}-leftLabel" class="detailsSidebar-toggle-leftLabel user-select-none ${isChecked ? 'text-muted' : ''}" for="${this.#formGroupId}">${formItemLabelTexts.leftLabel}</label>`;

        const labelRightSide = `<label id="${this.#formGroupId}-rightLabel" class="detailsSidebar-toggle-rightLabel custom-control-label user-select-none" for="${this.#formGroupId}">${formItemLabelTexts.rightLabel}</label>`;
        const toggleProperties = this.#createInputProperties(inputProperties);

        const toggleElement = `<input id="${this.#formGroupId}" class="custom-control-input detailsSidebar-toggle" type="checkbox" ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''}
            data-property-type="${this.#formContext}" ${toggleProperties}>`;

        const toggleGroup = `<div class="custom-control custom-switch toggle-group">${toggleElement}${labelRightSide}</div>`;

        this.#labelBeforeInputGroup = this.#createLabelForInputGroupElement(formItemLabelTexts.headLabel, inputAttributes);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${labelLeftSide}${toggleGroup}`;
    }

    _addTextAreaElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        this.#labelBeforeInputGroup = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes);

        const textInputProperties = this.#createInputProperties(inputProperties);

        const textAreaElement = `<textarea id="${this.#formGroupId}" class="form-control" type="text" 
            ${inputAttributes.rows ? `rows="${inputAttributes.rows}` : 'rows="1"'}
            ${inputAttributes.maxlength ? `maxlength="${inputAttributes.maxlength}"` : ''}
            ${inputAttributes.value ? `value="${inputAttributes.value}"` : ''}
            ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''}
            ${inputAttributes.title ? `title="${inputAttributes.title}"` : ''}
            data-property-type="${this.#formContext}" ${textInputProperties}></textarea>`;

        const additionalButton = inputAttributes.provideEditButton ? this.#createEditButton(inputProperties.additionalButton) : this.#createEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${textAreaElement}${additionalButton}`;
    }

    addTextElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        this.#labelBeforeInputGroup = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes);

        const textInputProperties = this.#createInputProperties(inputProperties);

        const textElement = `<input id="${this.#formGroupId}" class="form-control" type="text" 
            ${inputAttributes.placeholder ? `placeholder="${inputAttributes.placeholder}"` : ''}
            ${inputAttributes.maxlength ? `maxlength="${inputAttributes.maxlength}"` : ''}
            ${inputAttributes.value ? `value="${inputAttributes.value}"` : ''}
            ${inputAttributes.pattern ? `pattern="${inputAttributes.pattern}"` : ''}
            ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''}
            ${inputAttributes.title ? `title="${inputAttributes.title}"` : ''}
            data-property-type="${this.#formContext}" ${textInputProperties}>`;

        const additionalButton = inputAttributes.provideEditButton ? this.#createEditButton(inputProperties.additionalButton) : this.#createEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${textElement}${additionalButton}`;
    }

    addTextElementWithPrependLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        const prependGroup = `<div class="input-group-prepend">
            <span class="input-group-text">
                ${inputAttributes.labelIcon ? `<i class="${inputAttributes.labelIcon}"></i>`: ''}
                <span class="modalInputLabel">${formItemLabelText}</span>
            </span>
        </div>`;

        const textInputProperties = this.#createInputProperties(inputProperties);

        const textElement = `<input id="${this.#formGroupId}" class="form-control" type="text" 
            ${inputAttributes.placeholder ? `placeholder="${inputAttributes.placeholder}"` : ''}
            ${inputAttributes.maxlength ? `maxlength="${inputAttributes.maxlength}"` : ''}
            ${inputAttributes.value ? `value="${inputAttributes.value}"` : ''}
            ${inputAttributes.pattern ? `pattern="${inputAttributes.pattern}"` : ''}
            ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''}
            ${inputAttributes.title ? `title="${inputAttributes.title}"` : ''}
            data-property-type="${this.#formContext}" ${textInputProperties}>`;

        const additionalButton = inputAttributes.provideEditButton ? this.#createEditButton(inputProperties.additionalButton) : this.#createEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${prependGroup}${textElement}${additionalButton}`;
    }

    addNumberElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        this.#labelBeforeInputGroup = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes);

        const numberInputProperties = this.#createInputProperties(inputProperties);

        const numberElement = `<input id="${this.#formGroupId}" class="form-control" type="number" 
            ${inputAttributes.min ? `min="${inputAttributes.min}"` : ''}
            ${inputAttributes.max ? `max="${inputAttributes.max}"` : ''}
            ${inputAttributes.step ? `step="${inputAttributes.step}"` : ''}
            ${inputAttributes.maxlength ? `maxlength="${inputAttributes.maxlength}"` : ''}
            ${inputAttributes.value ? `value="${inputAttributes.value}"` : ''}
            ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''}
            ${inputAttributes.title ? `title="${inputAttributes.title}"` : ''}
            data-property-type="${this.#formContext}" ${numberInputProperties}>`;

        const additionalButton = inputAttributes.provideEditButton ? this.#createEditButton(inputProperties.additionalButton) : this.#createEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        this.#inputGroupItem = `${numberElement}${additionalButton}`;
    }

    _addCheckboxElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        const labelElement = this.#createLabelForInputGroupElement(formItemLabelText, inputAttributes, "form-check-label");

        const checkboxInputProperties = this.#createInputProperties(inputProperties);

        const checkboxElement = `<input id="${this.#formGroupId}" class="form-check-input" type="checkbox"
            ${inputAttributes.helpText ? `aria-describedby="${this.#formGroupId}-helpText"` : ''}
            ${inputAttributes.title ? `title="${inputAttributes.title}"` : ''}
            data-property-type="${this.#formContext}" ${checkboxInputProperties}>`;

        // TODO needed?
        // const additionalButton = inputAttributes.provideEditButton ? this.#createEditButton(inputProperties.additionalButton) : this.#createEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#helpText = this.#createHelpTextForElementIfProvided(inputAttributes.helpText);
        // checkbox has to be combined with label placeholder in order to show the checkbox in front of the label
        this.#labelBeforeInputGroup = `${checkboxElement}${labelElement}`;
    }

    _addFormFeedbackSection(invalidFeedbackText = "Reset: Invalid input provided", validFeedbackText = "Sucessfully changed") {
        const invalidFeedback = createInvalidFeedbackDiv(invalidFeedbackText);
        const validFeedback = createValidFeedbackDiv(validFeedbackText);

        this.#feedbackText = `${invalidFeedback}${validFeedback}`;
    }

    // TODO realize differently?
    configureEnterButtonBehaviour() {
        $("#" + this.#formGroupId + "-enterButton").click((event) => {
            // trigger enter keydown event
            var keydownEvent = $.Event("keydown", { which: 13 });
            $("#" + this.#formGroupId).trigger(keydownEvent);
            $(":focus").blur();
            // TODO check if better mechanism --> otherwise feedback stays due to focus issues
            $("#" + this.#formGroupId).focus();
        });

        $("#" + this.#formGroupId).focusout((event) => {
            this.#hideFeedbackElements();
        });

        $("#" + this.#formGroupId).on("change input", () => {
            this.#hideFeedbackElements();
        });
    }

    #createLabelForInputGroupElement(labelText = "", inputAttributes = {}, labelClass="") {
        return `<label id="${this.#formGroupId}-label" for="${this.#formGroupId}" ${labelClass ? `class="${labelClass}"` : ''}>
            ${inputAttributes.svgRepresentation ? `<span id="${this.#formGroupId}-svgRepresentation">${inputAttributes.svgRepresentation}</span>` : ''}
            ${inputAttributes.iconClass ? `<i id="${this.#formGroupId}-labelIcon" class="${inputAttributes.iconClass}"></i>` : ''}
            ${labelText}
        </label>`;
    }

    #createInputProperties(inputProperties = {}, disabled = "", checked = "", required = "", selected = "", readonly = "") { // TODO second element with options
        if (!inputProperties || !(joint.util.isObject(inputProperties)) || (Object.keys(inputProperties).length <= 0)) {
            return '';
        }
        let shouldBeDisabled = inputProperties.disabled ? true : (disabled ? disabled : false);
        let shouldBeChecked = inputProperties.checked ? true : (checked ? checked : false);
        let shouldBeRequired = inputProperties.required ? true : (required ? required : false);
        let shouldBeSelected = inputProperties.selected ? true : (selected ? selected : false);
        let shouldBeReadonly = inputProperties.readonly ? true : (readonly ? readonly : false);

        // TODO check if same behaviour.... 
        return `${shouldBeDisabled ? "disabled" : ''} ${shouldBeChecked ? "checked" : ''} ${shouldBeRequired ? "required" : ''} ${shouldBeSelected ? "selected" : ''} ${shouldBeReadonly ? "readonly" : ''}`;
    }

    #createHelpTextForElementIfProvided(helpText = {}) {
        if (!helpText || !(joint.util.isObject(helpText)) || (Object.keys(helpText).length <= 0)) {
            return '';
        }
        return `<small id="${this.#formGroupId}-helpText" class="form-text text-muted">${helpText.text}</small>`;
    }

    #createEditButton(inputProperties = {}, provideEditButton = true) { // TODO more information?
        if (!inputProperties || provideEditButton === false) {
            return '';
        }

        const buttonProperties = this.#createInputProperties(inputProperties);
        const editButton = `<div class="input-group-append">
            <button id="${this.#formGroupId}-editButton" class="editPropertyButton btn btn-outline-secondary" type="button" ${buttonProperties}>
                <i class="editPropertyButtonIcon fa-solid fa-pencil"></i>
            </button>
        </div>`;

        return editButton;
    }

    #createEnterButton(inputProperties = {}, provideEnterButton = true) {
        if (!inputProperties || inputProperties.disabled || provideEnterButton === false) {
            return '';
        }

        const buttonProperties = this.#createInputProperties(inputProperties);
        // TODO make content modifiable?
        const enterButton = `<div class="input-group-append">
            <button id="${this.#formGroupId}-enterButton" class="enterPropertyButton btn btn-outline-secondary" type="button" ${buttonProperties}>
                <i class="enterPropertyButtonIcon fa-solid fa-check"></i>
            </button>
        </div>`;

        // TODO click action....
        return enterButton;
    }

    #createOptionElementsForInputElement(inputOptions, placeholder) {
        if (!inputOptions || Array.isArray(inputOptions) === false) {
            return `<option value="" disabled selected hidden>${placeholder ? placeholder : "Choose..."}</option>`;
        }

        let options = `<option value="" disabled selected hidden>${placeholder ? placeholder : "Choose..."}</option>`;

        for (const option of inputOptions) {
            if (!option.optionValue && !option.optionText) {
                continue;
            }

            const optionProperties = this.#createInputProperties(option);

            options = options + `<option value="${option.optionValue}" 
            ${option.optionTitle ? `title="${option.optionTitle}"` : ''} 
            ${option.optionRepresentationClass ? `class="${option.optionRepresentationClass}"` : ''}
            ${optionProperties}>
                ${option.optionText}
            </option>`;
        }
        return options;
    }    

    #createDataListElementsForInputElement(inputAttributes) {
        if (!inputAttributes || Array.isArray(inputAttributes.datalistItems) === false || inputAttributes.datalistItems.length <= 0) {
            return "";
        }

        let dataList = "";

        for(const dataItem of inputAttributes.datalistItems) {
            dataList = dataList + `<option value="${dataItem.value}">${dataItem.text}</option>`;
        }
        return dataList;
    }

    /**
     * Hide visible validation feedback and remove valid classes from elements.
     */
    #hideFeedbackElements() {
        $("#" + this.#formGroupId + "-form .valid-feedback").hide();
        $("#" + this.#formGroupId + "-form .invalid-feedback").hide();
        $("#" + this.#formGroupId + "-form .is-valid").removeClass("is-valid");
        $("#" + this.#formGroupId + "-form .is-invalid").removeClass("is-invalid");
    }


    //#region old version
    // old part

    /**
     * Creates Bootstrap-based Form HTML string that can be appended to a document element.
     * 
     * @param {boolean} includeFormCheck Identifies if the included form includes valid checks
     * @returns {string} HTML string for the form element
     */
    create(includeFormCheck = false) {
        let formClass = includeFormCheck ? 'class="form-group needs-validation" novalidate' : 'class="form-group"';
        let divClass = includeFormCheck ? 'class="input-group has-validation"' : 'input-group';
        return `<form id="${this.#formGroupId}-form" ${formClass}><div id="${this.#formGroupId}-inputGroup" ${divClass}></div></form>`;
    }

    addInputRangeElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
        this.#addLabelToFormGroup(formItemLabelText);
        let currentValue = '<span id="' + this.#formGroupId + '-currentValue" class="rangeBoxCurrentValue ml-2 align-baseline badge badge-primary badge-pill">' + inputAttributes.defaultValue + ' px</span>';
        $("#" + this.#formGroupId + "-label").append(currentValue);
        let inputRange = '<input class="col px-md-2 form-control-range form-check" id="' + this.#formGroupId + '">';
        $("#" + this.#formGroupId + "-inputGroup").append(inputRange);

        $("#" + this.#formGroupId).attr({
            type: "range",
            min: inputAttributes.min ?? 0,
            max: inputAttributes.max ?? 100,
            value: inputAttributes.defaultValue ?? null,
            step: inputAttributes.step ?? 1,
            "aria-describedby": inputAttributes.helpText ? this.#formGroupId + "-helpText" : null,
            "data-property-type": this.#formContext
        });

        this.#setInputProperties(inputProperties);
        this.#addEnterButton(inputProperties, inputAttributes.provideEnterButton);
        this.#addHelpTextForElementIfProvided(inputAttributes.helpText);

        $("#" + this.#formGroupId + "-enterButton").addClass("ml-2 btn-sm");

        $("#" + this.#formGroupId).on("change input", () => {
            $("#" + this.#formGroupId + "-currentValue").text($("#" + this.#formGroupId).val() + " px");
        });
    }

    // addDropdownElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
    //     let span = '<span id="' + this.#formGroupId + '-svgRepresentation">' + inputAttributes.svgRepresentation + '</span>';
    //     let label = '<label id="' + this.#formGroupId + '-label" for="' + this.#formGroupId + '">' + span + formItemLabelText + '</label>';
    //     $("#" + this.#formGroupId + "-inputGroup").append(label);
    //     let selectionBox = '<select class="custom-select" id="' + this.#formGroupId + '"></select>';
    //     $("#" + this.#formGroupId + "-inputGroup").append(selectionBox);

    //     this.#addOptionElementToInputElement(this.#formGroupId, "", (inputAttributes.placeholder ?? "Choose..."));

    //     $("#" + this.#formGroupId).attr({
    //         size: inputAttributes.size ?? 1,
    //         multiple: inputAttributes.multiple ?? false,
    //         "data-property-type": this.#formContext
    //     });

    //     this.#setInputProperties(inputProperties);
    //     this.#addHelpTextForElementIfProvided(inputAttributes.helpText);
    // }

    // addDataListElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
    //     this.#addLabelToFormGroup(formItemLabelText);
    //     let inputBox = '<input class="form-control" id="' + this.#formGroupId + '" list="' + this.#formGroupId + '-datalist">';
    //     $("#" + this.#formGroupId + "-inputGroup").append(inputBox);

    //     let dataListItem = '<datalist id="' + this.#formGroupId + '-datalist"></datalist>';
    //     $("#" + this.#formGroupId + "-inputGroup").append(dataListItem);

    //     $("#" + this.#formGroupId).attr({
    //         placeholder: inputAttributes.placeholder,
    //         "data-property-type": this.#formContext
    //     });

    //     for (const dataItem of inputAttributes.datalistItems) {
    //         this.#addOptionElementToInputElement(this.#formGroupId + "-datalist", dataItem.value, dataItem.text);
    //     }

    //     this.#setInputProperties(inputProperties);
    //     this.#addEnterButton(inputProperties, inputAttributes.provideEnterButton);
    //     this.#addHelpTextForElementIfProvided(inputAttributes.helpText);
    // }

    // addButtonElementWithLabel(formItemLabelText = "", inputAttributes = {}, inputProperties = {}) {
    //     let span = '<span id="' + this.#formGroupId + '-svgRepresentation">' + inputAttributes.svgRepresentation + '</span>';
    //     let label = '<label id="' + this.#formGroupId + '-label" for="' + this.#formGroupId + '">' + span + formItemLabelText + '</label>';
    //     $("#" + this.#formGroupId + "-inputGroup").append(label);
    //     let buttonIcon = inputAttributes.buttonIconClass ? '<i id="' + this.#formGroupId + '-buttonIcon" class="' + inputAttributes.buttonIconClass + '"></i> ' : "";
    //     let button = '<button id="' + this.#formGroupId + '" class="btn btn-dark btn-block">' + buttonIcon + inputAttributes.buttonText + '</button>'
    //     $("#" + this.#formGroupId + "-inputGroup").append(button);

    //     $("#" + this.#formGroupId).attr({
    //         type: "button",
    //         "aria-describedby": inputAttributes.helpText ? this.#formGroupId + "-helpText" : null,
    //         "data-property-type": this.#formContext
    //     });

    //     $("#" + this.#formGroupId).click(() => { inputAttributes.action() });

    //     this.#setInputProperties(inputProperties);
    //     this.#addHelpTextForElementIfProvided(inputAttributes.helpText);
    // }

    addFormFeedbackSection(invalidFeedbackText = "", validFeedbackText = "") {
        let invalidFeedback = createInvalidFeedbackDiv(invalidFeedbackText);
        let validFeedback = createValidFeedbackDiv(validFeedbackText);
        $("#" + this.#formGroupId + "-form").append(validFeedback);
        $("#" + this.#formGroupId + "-form").append(invalidFeedback);

        $("#" + this.#formGroupId).focusout((event) => {
            this.#hideFeedbackElements();
        });

        $("#" + this.#formGroupId).on("change input", () => {
            this.#hideFeedbackElements();
        });
    }

    #addLabelToFormGroup(formItemLabelText = "") {
        let label = '<label id="' + this.#formGroupId + '-label" for="' + this.#formGroupId + '">' + formItemLabelText + '</label>';
        $("#" + this.#formGroupId + "-form").prepend(label);
    }

    #setInputProperties(inputProperties = {}, elementId = this.#formGroupId) {
        if (!inputProperties || !(joint.util.isObject(inputProperties)) || (Object.keys(inputProperties).length <= 0)) {
            return;
        }

        $("#" + elementId).prop({
            disabled: inputProperties.disabled ?? false,
            checked: inputProperties.checked ?? false,
            required: inputProperties.required ?? false
        });
    }

    #addHelpTextForElementIfProvided(helpText = {}) {
        if (!helpText || !(joint.util.isObject(helpText)) || (Object.keys(helpText).length <= 0)) {
            return;
        }

        // TODO consider max e.g. for x and y position
        let helpTextInfo = '<small id="' + this.#formGroupId + '-helpText" class="form-text text-muted">' + helpText.text + '</small>';
        $("#" + this.#formGroupId + "-form").append(helpTextInfo);
    }

    #addEnterButton(inputProperties = {}, provideEnterButton = true) {
        if (!inputProperties || inputProperties.disabled || provideEnterButton === false) {
            return;
        }

        let enterButton = '<button id="' + this.#formGroupId + '-enterButton" class="enterPropertyButton btn btn-outline-secondary" type="button"><i class="enterPropertyButtonIcon fa-solid fa-check"></i></button>';
        let appendDiv = '<div class="input-group-append">' + enterButton + '</div>';
        $("#" + this.#formGroupId + "-inputGroup").append(appendDiv);

        this.#setInputProperties(inputProperties, this.#formGroupId + "-enterButton");

        $("#" + this.#formGroupId + "-enterButton").click((event) => {
            // trigger enter keydown event
            var keydownEvent = $.Event("keydown", { which: 13 });
            $("#" + this.#formGroupId).trigger(keydownEvent);
            $(":focus").blur();
            // TODO check if better mechanism --> otherwise feedback stays due to focus issues
            $("#" + this.#formGroupId).focus();
        });
    }
}

/**
 * Create a Bootstrap-based textarea HTML string.
 * @example <textarea class="form-control" id="labelText" rows="1"></textarea>
 * 
 * @param {string} providedFeature The feature to identify the item. This string is used as ID for the html element.
 * @param {number} numberOfRows The number of rows showing without modification. Default to 1. 
 * @returns {string} HTML string for textarea element
 */
const createTextAreaFormControlHtmlString = (providedFeature = "", numberOfRows = 1) => {
    return `<textarea class="form-control" id="${providedFeature}" rows="${numberOfRows}"></textarea>`;
}

/**
 * Create a Bootstrap-based input CheckBox HTML string but without a label, has to be added to the form-group extra. 
 * @example <input class="form-check-input" type="checkbox" id="checkBox">
 * 
 * @param {string} providedFeature The feature to identify the item. This string is used as ID for the html element.
 * @returns {string} HTML string for textarea element
 */
const createCheckBoxFormControlHtmlString = (providedFeature = "") => {
    return `<input class="form-check-input" type="checkbox" id="${providedFeature}">`;
}

/**
 * Create a Bootstrap-based invalid feedback string which is normall shown for form elements. 
 * @example <div class="invalid-feedback>Invalid</div>
 * 
 * @param {string} invalidFeedbackText The feedback text.
 * @returns {string} HTML string for invalid feedback element
 */
const createInvalidFeedbackDiv = (invalidFeedbackText = "") => {
    return `<div class="invalid-feedback">${invalidFeedbackText}</div>`;
}

/**
 * Create a Bootstrap-based valid feedback string which is normall shown for form elements. 
 * @example <div class="valid-feedback>Valid</div>
 * 
 * @param {string} invalidFeedbackText The feedback text.
 * @returns {string} HTML string for valid feedback element
 */
const createValidFeedbackDiv = (validFeedbackText = "") => {
    return `<div class="valid-feedback">${validFeedbackText}</div>`;
}


// TODO keep?

/**
 * Create a Bootstrap-based Alert HTML string.
 * 
 * @param {string} alertId An ID for the alert element.
 * @param {string} alertText The text that should be used for this alert.
 * @returns {string} HTML string for alert element
 */
const createAlertItemWithCloseButton = (alertId = "", alertText = "") => {
    let closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    return '<div id="' + alertId + '" class="alert alert-success alert-dismissible fade show" role="alert">' + alertText + closeButton + '</div>';
    // return '<div id="' + alertId + '" class="alert alert-dismissible fade show" role="alert">' + alertText + closeButton + '</div>';
}

export { FormGroup, createTextAreaFormControlHtmlString, createCheckBoxFormControlHtmlString };