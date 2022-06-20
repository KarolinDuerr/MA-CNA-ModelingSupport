const ToolbarElementType = Object.freeze({
    BUTTON: "button",
    BUTTON_DROPDOWN: "button-dropdown"
})

class ToolbarTools {

    #systemTitle = "";

    #toolbarTools = "";

    #entityTools = "";

    #firstRowConfigTools = "";
    #secondRowConfigTools = "";

    getCreatedToolbarTemplate() {
        const toolbar = `<div class="app-header-first-row">
            <div class="input-group app-title">
                ${this.#systemTitle}
            </div>
            <div id="modelAppToolbar" class="toolbar-container">
                <div class="app-toolbar">
                    <div class="app-toolbar-tools">
                        ${this.#toolbarTools}
                    </div>
                    <div class="button-group" data-group="first-row-config-button">
                        ${this.#firstRowConfigTools}
                    </div>
                </div>            
            </div>
        </div>
        <div class="app-header-second-row">
            <div class="entity-tools">
                <div class="entity-overall-group" data-group="entity-overall-group">
                ${this.#entityTools}
                </div>
            </div>
            <div class="second-row-tools" data-group="second-row-config-tools">
                ${this.#secondRowConfigTools}
            </div>
        </div>`;

        return toolbar;
    }

    addSystemTitle() { // TODO remove FTGO and choose default value
        const textBox = `<input id="appNameTitle" type="text" class="user-select-all form-control" value="" aria-label="Application name of current System entity"
        aria-describedby="app-title-description" disabled>`;

        const additionalSection = `<div class="input-group-append" id="app-title-description">
            <span class="user-select-none input-group-text">Current System</span>
            ${this.#createTitleButton("editApplicationNameBtn", "btn-outline-secondary", "fa-solid fa-pen-to-square", "Edit name of System entity")}
            ${this.#createTitleButton("cancelEditApplicationNameBtn", "btn-outline-danger submitEditApplicationNameBtnGroup", "fa-solid fa-xmark", "Cancel editing")}
            ${this.#createTitleButton("submitEditApplicationNameBtn", "btn-outline-success submitEditApplicationNameBtnGroup", "fa-solid fa-check", "Submit name of System entity")}
            ${this.#createTitleButton("addNewSystemEntity", "btn-outline-secondary", "fa-solid fa-plus", "Add new System entity")}
        </div>`;

        this.#systemTitle = `${textBox}${additionalSection}`;
    }

    addButtonGroup(groupConfig) {
        const newButtonGroup = this.#createToolbarButtonGroup(groupConfig.buttonGroupId, groupConfig);

        let hideButtonClass = "";
        if (groupConfig.content?.length <= 1) {
            hideButtonClass = "buttonInitialHide";
        }

        this.#toolbarTools = this.#toolbarTools + newButtonGroup + `<div class="${hideButtonClass} group-divider"></div>`;
    }

    addEntityCheckboxTool(entityType, labelText, tooltipText = "") {
        const checkbox = `<input id="${entityType}-checkBox" data-entity-type="${entityType}" class="entityCheckBox form-check-input" type="checkbox" value="${entityType}" checked>`;
        const label = `<label id="${entityType}-checkBoxLabel" class="user-select-none entityCheckBoxLabel form-check-label" for="${entityType}-checkBox">
            ${labelText}
            <span class="numberOfEntities badge badge-primary badge-pill" data-entity-type="${entityType}">0</span>
        </label>`;

        this.#entityTools += `<div class="entity-group form-check form-check-inline" data-group="${entityType}" ${tooltipText ? `title="${tooltipText}"` : ''} 
        data-toggle="tooltip" data-placement="bottom">
            ${checkbox}${label}
        </div>`;
    }

    addAdditionalFirstRowConfigTool(additionalRowToolContent) {
        let templatedToolGroup = "";

        for (const additionalToolGroup of additionalRowToolContent) {
            templatedToolGroup = templatedToolGroup + (templatedToolGroup ? `<div id="${additionalToolGroup.groupId}-groupDivider" class="group-divider buttonInitialHide"></div>` : '');
            templatedToolGroup = templatedToolGroup + this.#createToolbarButtonGroup(additionalToolGroup.groupId, additionalToolGroup);
        }

        this.#firstRowConfigTools = `${this.#firstRowConfigTools}${templatedToolGroup}`;
    }

    addAdditionalSecondRowConfigTool(additionalRowToolContent) {
        let templatedToolGroup = "";

        for (const additionalToolGroup of additionalRowToolContent) {
            templatedToolGroup = templatedToolGroup + this.#createToolbarButtonGroup(additionalToolGroup.groupId, additionalToolGroup);
        }

        this.#secondRowConfigTools = this.#secondRowConfigTools + '<div class="group-divider"></div>' + templatedToolGroup;
    }

    #createToolbarButtonGroup(groupId, groupConfig) {
        let includedGroupItems = "";
        
        for (const groupItem of groupConfig.content) {
            switch (groupItem.buttonType) {
                case ToolbarElementType.BUTTON:
                    includedGroupItems = includedGroupItems + this.#createToolbarButton(groupId, groupItem.providedFeature, groupItem.tooltipText, groupItem.text, groupItem.iconClass, groupItem.additionalCssClass);
                    break;
                case ToolbarElementType.BUTTON_DROPDOWN:
                    includedGroupItems = includedGroupItems + this.#createToolbarButtonDropdown(groupId, groupItem.providedFeature, groupItem.tooltipText, groupItem.text, groupItem.iconClass, groupItem.additionalCssClass, groupItem.dropdownButtons);
                    break;
                default:
                    includedGroupItems = includedGroupItems + this.#createToolbarButton(groupId, groupItem.providedFeature, groupItem.tooltipText, groupItem.text, groupItem.iconClass, groupItem.additionalCssClass);
                    break;
            }
        }

        return `<div class="button-group" ${groupConfig.buttonGroupId ? `data-group="${groupConfig.buttonGroupId}"` : ''}>
            ${includedGroupItems}
        </div>`;
    }

    #createToolbarButton(buttonGroupData, providedFeature, tooltipText = "", buttonText = "", buttonIconClass = "", additionalCssClass = "") {
        const requiredInfoProvided = buttonGroupData && providedFeature && (buttonText ? 1 : (buttonIconClass ? 1 : 0));
        if (!requiredInfoProvided) {
            return; // TODO error?
        }

        const button = `<button id="${providedFeature}-button" class="toolbarButton btn ${additionalCssClass}" type="button" title="${tooltipText}"
        data-toggle="tooltip" data-placement="bottom">
            ${buttonIconClass ? `<i class="${buttonIconClass}"></i>` : ''}
            ${buttonText ?? ''}
        </button>`;

        return button;
    }

    #createToolbarButtonDropdown(buttonGroupData, providedFeature, tooltipText = "", buttonText = "", buttonIconClass = "", additionalCssClass = "", dropdownButtons = []) {
        const requiredInfoProvided = buttonGroupData && providedFeature && Array.isArray(dropdownButtons) && dropdownButtons.length && (buttonText ? 1 : (buttonIconClass ? 1 : 0));
        if (!requiredInfoProvided) {
            return; // TODO error?
        }

        const dropdownItems = this.#createDropdownItemGroup(providedFeature, dropdownButtons);
        const dropdownButton = `<button id="${providedFeature}-buttonDropDown" class="toolbarDropdownButton btn dropdown-toggle ${additionalCssClass}" type="button" title="${tooltipText}"
        data-toggle="dropdown" data-tooltip-toggle="tooltip" data-placement="bottom" aria-expanded="false">
            ${buttonIconClass ? `<i class="${buttonIconClass}"></i>` : ''}
            ${buttonText ?? ''}
        </button>`;

        return `<div id="${providedFeature}-buttonDropDownGroup" class="buttonDropDownGroup dropdown">
            ${dropdownButton}
            ${dropdownItems}
        </div>`;
    }

    #createDropdownItemGroup(buttonDropdownId, dropdownButtonsConfig) {
        let dropdownButtons = "";

        for (const dropdownItem of dropdownButtonsConfig) {
            const button = `<button id="${dropdownItem.providedFeature}-dropdownItemButton" class="toolbarDropdownButtonItem btn dropdown-item ${dropdownItem.additionalCssClass}" type="button">
                ${dropdownItem.iconClass ? `<i class="${dropdownItem.iconClass}" style="font-size: 1.1em"></i>` : ''}
                ${dropdownItem.text ? `<span> ${dropdownItem.text}</span>` : ''}
            </button>`;
            dropdownButtons = dropdownButtons + button;
        }

        return `<div id="${buttonDropdownId}-dropdownItemsGroup" class="dropdown-menu" aria-labelledby="${buttonDropdownId}-buttonDropDown">
            ${dropdownButtons}
        </div>`;
    }

    #createTitleButton(buttonId, buttonAdditionalCssClass = "", buttonIconClass, tooltipText) {
        return `<button id="${buttonId}" class="btn ${buttonAdditionalCssClass}" type="button" data-toggle="tooltip" data-placement="bottom" title="${tooltipText}">
            <i class="${buttonIconClass}"></i>
        </button>`;
    }
}

export { ToolbarElementType };
export default ToolbarTools;