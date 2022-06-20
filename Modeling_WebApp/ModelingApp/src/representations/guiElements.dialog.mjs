import { PropertyContentType } from "../config/detailsSidebarConfig.mjs";
import { UIContentType } from "../config/toolbarConfiguration.mjs";
import { FormGroup } from "./guiElements.mjs";
import Table from "./guiElements.table.mjs";

// Bootstrap-provided classes
const DialogSize = Object.freeze({
    SMALL: "modal-sm",
    DEFAULT: "",
    LARGE: "modal-lg",
    EXTRA_LARGE: "modal-xl"
})

class UIModalDialog {

    $modalDialog;

    #context = "";

    #dialogId = "";

    #includedTables = new Map();

    #saveButtonAction = () => { this.#destroyDialog(); };
    #closeButtonsAction = () => { this.#destroyDialog(); };

    #standardTitleIcon = "fa-solid fa-info";

    #modalHeader = "";
    #modalBody = "";
    #modalFooter = "";

    constructor(context, dialogId) {
        this.#context = context;
        this.#dialogId = dialogId;
    }

    getCreatedDialogTemplate(staticDialog = false, dialogSize = "") {
        const ifStaticDialog = staticDialog ? 'data-backdrop="static" data-keyboard="false"' : "";
        return `<div class="modal" id="${this.#dialogId}-dialog" ${ifStaticDialog ? ifStaticDialog : ''} tabindex="-1" aria-labelledby="${this.#dialogId}-dialogTitle" aria-hidden="true">
            <div class="modal-dialog ${dialogSize} modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    ${this.#modalHeader}
                    ${this.#modalBody}
                    ${this.#modalFooter}
                </div>
            </div>
        </div>`;
    }

    render(appendToElementId, staticDialog = false, dialogSize = "") {
        const modal = this.getCreatedDialogTemplate(staticDialog, dialogSize);

        let containerElement = $("#" + appendToElementId);

        if (containerElement.length) {
            // ensure container exists
            $("#" + appendToElementId).append(modal);
            this.$modalDialog = $("#" + this.#dialogId + "-dialog");
            this.hide();
            $("#" + this.#dialogId + "-dialog [data-dismiss=modal]").click(this.#closeButtonsAction);
            this.$modalDialog.keydown((event) => { this.#handleEnterKey(event); });
            // $("#staticModal button").on("click", () => { $(':focus').blur(); });

            let saveButtonElement = $("#" + this.#dialogId + "-dialogSaveButton");
            if (saveButtonElement.length) {
                saveButtonElement.click(this.#saveButtonAction);
            }
        }
    }

    /**
     * 
     * @param {{header:{}, content:{}, footer:{}}} modalDialogConfig { }
     * @returns 
     */
    create(modalDialogConfig) {
        if (!modalDialogConfig || !(joint.util.isObject(modalDialogConfig)) ||
            !(modalDialogConfig.header) || !(modalDialogConfig.footer) || !(modalDialogConfig.content)) {
            return;
        }
        this.createHeader(modalDialogConfig.header);
        this.createContent(modalDialogConfig.content);
        this.createFooter(modalDialogConfig.footer);
    }

    /**
     * 
     * @param {{}} headerProperties  { }
     * @returns 
     */
    createHeader(headerProperties) {
        if (!headerProperties || !(joint.util.isObject(headerProperties))) {
            return;
        }

        const svgRepresentationElement = headerProperties.svgRepresentation ? '<span id="' + this.#dialogId + '-dialogTitleSvgRepresentation">' + headerProperties.svgRepresentation + '</span>' : "";
        const iconElement = headerProperties.iconClass ? `<i id="${this.#dialogId}-dialogTitleIcon" class="${headerProperties.iconClass}" data-type="${headerProperties.type ? headerProperties.type : "normal"}"></i>` : (svgRepresentationElement ? "" : `<i class="${this.#standardTitleIcon}"></i>`);
        const header = `<div id="${this.#dialogId}-dialogHeader" class="modal-header">
            <h5 class="modalTitleIcon modal-title">${svgRepresentationElement}${iconElement}</h5>
            <h5 class="modal-title">${headerProperties.text}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ${headerProperties.closeButton ? '' : 'style="visibility: hidden;"'}><span aria-hidden="true">&times;</span></button>
            </div>`;
        this.#modalHeader = header;
    }

    /**
     * 
     * @param {{}} footerProperties   { }
     * @returns 
     */
    createFooter(footerProperties) {
        if (!footerProperties || !(joint.util.isObject(footerProperties))) {
            return;
        }

        const saveButtonIcon = footerProperties.saveButtonIconClass ? `<i id="${this.#dialogId}-dialogSaveButtonIcon" class="${footerProperties.saveButtonIconClass}"></i>` : '';
        const footer = `<div id="${this.#dialogId}-dialogFooter" class="modal-footer">
            <button id="${this.#dialogId}-dialogCancelButton" type="button" class="btn btn-secondary" data-dismiss="modal" tabindex="0">${footerProperties.cancelButtonText ? footerProperties.cancelButtonText : 'Close'}</button>
            ${footerProperties.saveButtonText ? `<button id="${this.#dialogId}-dialogSaveButton" type="button" class="btn btn-primary" tabindex="0">${saveButtonIcon} <span id="${this.#dialogId}-dialogSaveButtonText">${footerProperties.saveButtonText}</span></button>` : ''}
        </div>`;
        this.#modalFooter = footer;
    }

    /**
     * Creates HTML string for Dialog Body Content if contentProperties as Object provided.
     * 
     * @example
     * // Option 1: Only a textblock as content
     * contentProperties: {
     *      contentType: UIContentType.SINGLE_TEXTBLOCK,
     *      text: "...."
     * } 
     * 
     * // Option 2: Several groups
     * contentProperties: {
     *      contentType: UIContentType.GROUP_FORMS,
     *      groups: [
     *          ....
     *      ]
     * } 
     * 
     * @param {{}} contentProperties { } 
     * @returns 
     */
    createContent(contentProperties) {
        if (!contentProperties || !(joint.util.isObject(contentProperties))) {
            return;
        }

        let dialogOverallBodyContent = "";
        switch (contentProperties.contentType) {
            case UIContentType.SINGLE_TEXTBLOCK:
                dialogOverallBodyContent = `<p>${contentProperties.text}</p>`;
                break;
            case UIContentType.GROUP_FORMS:
                dialogOverallBodyContent = this.#createContentGroup(contentProperties.groups);
                break;
            default:
                break;
        }

        const contentGroup = `<div class="container-fluid">${dialogOverallBodyContent}</div>`;
        const bodyContent = `<div class="modal-body">${contentGroup}</div>`;
        this.#modalBody = bodyContent;
    }


    /**
     * 
     * @param {[]} contentGroups [ ]
     */
    #createContentGroup(contentGroups) {
        if (!contentGroups || !Array.isArray(contentGroups)) {
            return;
        }

        let groupItem = "";

        for (const contentItem of contentGroups) {
            groupItem = groupItem + `<div data-group-context="${this.#context}">`;

            switch (contentItem.contentType) {
                case PropertyContentType.INFO:
                    groupItem = groupItem + this.#createInfoSection(contentItem);
                    break;
                case PropertyContentType.TABLE:
                    groupItem = groupItem + this.#createTableSection(contentItem);
                    break;
                case PropertyContentType.FORMGROUP:
                    groupItem = groupItem + this.#createFormGroup(contentItem);
                    break;
                default:
                    break;
            }

            groupItem = groupItem + "</div>";
        }

        return groupItem;
    }

    /**
     * 
     * @param {{headline: "", text: ""}} content {headline: "", text: ""} 
     */
    #createInfoSection(content) {
        return `<h5>${content.headline}</h5><p>${content.text}</p>`;
    }

    #createTableSection(content) {
        // headline
        const headline = `<h5>${content.headline}</h5>`;
        // description
        const description = `<p>${content.text}</p>`;
        // Table
        let table = new Table(this.#context, this.#dialogId);
        this.#includedTables.set(this.#dialogId, table)
        table.create(content);
        const tableTemplate = table.getCreatedTableTemplate();

        return `${headline}${content.text ? description : ''}${tableTemplate}`;
    }

    #createFormGroup(content) {
        // headline
        const headline = `<h5>${content.headline}</h5>`;

        let contentItems = "";
        for (const contentItem of content.contentItems) {
            const preparedPropertyFormTemplate = new FormGroup(contentItem.providedFeature, content.id);
            let formElement;
            switch (contentItem.contentType) {
                case PropertyContentType.INPUT_TEXTBOX:
                    preparedPropertyFormTemplate.addTextElementWithLabel(contentItem.label, contentItem.attributes, contentItem.properties);
                    preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                    formElement = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                    break;
                case PropertyContentType.INPUT_TEXTBOX_LABEL_PREPEND:
                    preparedPropertyFormTemplate.addTextElementWithPrependLabel(contentItem.label, contentItem.attributes, contentItem.properties);                    
                    preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                    formElement = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                    break;
                case PropertyContentType.BUTTON: 
                    formElement = `<button type="button" id="${contentItem.providedFeature}" class="btn btn-outline-dark">${contentItem.attributes.labelIcon ? `<i class="${contentItem.attributes.labelIcon}"></i> ` : ''}${contentItem.label}</button>`
                    break;
                default:
                    preparedPropertyFormTemplate.addTextElementWithLabel(contentItem.label, contentItem.attributes, contentItem.properties);
                    preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                    formElement = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                    break;
            }

            contentItems = contentItems + formElement;
        }

        return `<hr>${headline}<div id="${content.id}">${contentItems}</div>`;
    }

    getIncludedTable(tableId) {
        return this.#includedTables.get(tableId);
    }

    provideCloseButtonActionConfiguration(action) {
        if (action && ("close".localeCompare(action) === 0)) {
            this.#closeButtonsAction = () => { this.hide(); }
        } else if (action && ("destroy".localeCompare(action) === 0)) {
            this.#closeButtonsAction = () => { this.#destroyDialog(); }
        } else if (!action || !(typeof action === "function")) {
            throw new TypeError("The provided action for the close button has to be a function.");
        } else {
            this.#closeButtonsAction = () => { action(); }
        }
    }

    provideSaveButtonActionConfiguration(action, afterSave = "destroy", actionParentObject = {}) {
        let actionAfterSave = () => { this.#destroyDialog(); }
        if (afterSave && ("close".localeCompare(afterSave) === 0)) {
            actionAfterSave = () => { this.hide(); }
        } else if (afterSave && ("destroy".localeCompare(afterSave) === 0)) {
            actionAfterSave = () => { this.#destroyDialog(); }
        }

        if (!action || !(typeof action === "function")) {
            throw new TypeError("The provided action for the save button has to be a function.");
        }

        this.#saveButtonAction = () => { action(actionParentObject); actionAfterSave(); };

    }

    configureSaveButtonAction(action) {
        if (!action || !(typeof action === "function")) {
            throw new TypeError("The provided action for the save button has to be a function.");
        }

        let saveButtonElement = $("#" + this.#dialogId + "-dialogSaveButton");
        if (saveButtonElement.length) {
            // Ensure Save Button exists
            this.#saveButtonAction = () => { action(); this.#destroyDialog(); }
            saveButtonElement.click(this.#saveButtonAction);
        } else {
            this.#saveButtonAction = () => { action(); this.#destroyDialog(); }
        }
    }

    configureCloseButtonAction(action) {
        if (action && !(typeof action === "function")) {
            throw new TypeError("The provided action for the close button has to be a function.");
        }

        let closeButtonElements = $("#" + this.#dialogId + "-dialog [data-dismiss=modal]");
        if (closeButtonElements.length) {
            // Ensure Close Button exists
            this.#closeButtonsAction = () => { action(); }
            closeButtonsAction.click(this.#closeButtonsAction);
        }
    }

    show() {
        // $("#" + this.#dialogId).on("click", () => { $(':focus').blur(); });
        this.$modalDialog.modal("show");
    }

    hide() {
        this.$modalDialog.modal("hide");
    }

    #destroyDialog() {
        this.$modalDialog.modal("hide");
        this.$modalDialog.off(); // TODO check if enough
        this.$modalDialog.modal("dispose");
        this.$modalDialog.remove();
    }

    #handleEnterKey(event) {
        if (event.which == 13) { // TODO check
            // let buttonId = event.target.type === "number" ? "modalSaveButton" : event.target.id;
            // $("#" + buttonId).click();
            // event.preventDefault();
        }
    }

}

export { DialogSize };
export default UIModalDialog;