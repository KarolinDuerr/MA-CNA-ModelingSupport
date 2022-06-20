import { SectionContentType } from "../config/actionDialogConfig.mjs";

class ModalDialog {

    #modalDialogId;

    #standardTitleIcon = "fa-solid fa-info";

    constructor() {
        let staticModal = '<div class="modal" id="staticModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true"></div>';
        $("#app").append(staticModal);
        // let modalDialog = '<div class="modal-dialog modal-dialog-centered"><div class="modal-content"></div></div>';
        let modalDialog = '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"><div class="modal-content"></div></div>';
        $("#staticModal").append(modalDialog);
        let modalHeader = '<div class="modal-header"></div>';
        $("#staticModal .modal-content").append(modalHeader);

        let modalIcon = '<h5 class="modalTitleIcon modal-title"><i id="modalTitleIcon" class="' + this.#standardTitleIcon + '"></i></h5>'
        let modalTitle = '<h5 class="modal-title" id="modalTitle"></h5>';
        let modalCloseButton = '<button type="button" id="closeModalButton" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        $("#staticModal .modal-header").append(modalIcon, modalTitle, modalCloseButton);

        let modalBody = '<div class="modal-body"></div>';
        let modalFooter = '<div class="modal-footer"></div>';
        $("#staticModal .modal-content").append(modalBody, modalFooter);

        // todo decide css classes
        let modalCancelButton = '<button id="modalCancelButton" type="button" class="btn btn-secondary" data-dismiss="modal" tabindex="0"></button>';
        let modalSaveButton = '<button id="modalSaveButton" type="button" class="btn btn-primary" tabindex="0"><i id="modalSaveButtonIcon"></i><span id="modalSaveButtonText"></span></button>';
        $("#staticModal .modal-footer").append(modalCancelButton, modalSaveButton);

        this.#modalDialogId = "staticModalWindow";
        this.hide();
        $("#closeModalButton").click(() => { this.resetDialog(); });
        $("#staticModal").keydown((event) => { this.#handleEnterKey(event); });
        $("#staticModal button").on("click", () => { $(':focus').blur(); });
    }

    renderDialogBasics(title = "", cancelButtonText = "Cancel", saveButton = "", contentContainerIdToUse = "", modalSize="") {
        this.#configureTitle(title);
        this.#configureCancelButton(cancelButtonText);

        let actionContainer = '<div id="' + contentContainerIdToUse + '-modalDialog" class="modalDialogActionContainer container-fluid"></div>';
        $(".modal-body").append(actionContainer);
        console.log(modalSize);
        $(".modal-dialog-centered").addClass(modalSize);

        this.#configureSaveButton(saveButton);
    }

    renderDialog(title = "", content = "", cancelButtonText = "Cancel", saveButton = "") {
        this.#configureTitle(title);
        this.#configureCancelButton(cancelButtonText);

        let modalBodyText = '<p id="modalBodyText"></p>';
        $(".modal-body").append(modalBodyText);
        $("#modalBodyText").text(content);

        this.#configureSaveButton(saveButton);
    }

    renderActionDialog(title = "", actionContent = {}, cancelButtonText = "Cancel", saveButton = "") {
        this.#configureTitle(title);
        this.#configureCancelButton(cancelButtonText);
        this.#configureSaveButton(saveButton);

        let actionContainer = '<div class="modalDialogActionContainer container-fluid"></div>';
        $(".modal-body").append(actionContainer);

        Object.keys(actionContent).forEach((contentElement) => {
            let sectionRow = '<div id="' + actionContent[contentElement].id + '-row"></div>';
            $(".modalDialogActionContainer").append(sectionRow);
            let sectionRowHeading = '<h5>' + actionContent[contentElement].heading + '</h5>';
            $("#" + actionContent[contentElement].id + "-row").append(sectionRowHeading);

            // let contentForm = '<div class="modalElementGroup"><form id="' + actionContent[contentElement].id + '-form"></form></div>';
            let contentForm = '<div class="modalElementGroup" id="' + actionContent[contentElement].id + '-form"></div>';
            // let contentForm = '<div id="' + contentElement.id + '-form"></div>';            
            $("#" + actionContent[contentElement].id + "-row").append(contentForm);

            let sectionElements = actionContent[contentElement].sectionContent;
            Object.keys(sectionElements).forEach((sectionElement) => {
                this.#renderSectionContent(sectionElements[sectionElement], actionContent[contentElement].id + "-form");
            });
        });

        let groupDivider = "<hr>";
        $(".modalElementGroup:not(:last)").after(groupDivider);
    }

    #renderSectionContent(sectionContent, appendToElement) {
        if (!(sectionContent instanceof Object)) {
            return;
        }

        let formGroupDiv = '<form id="' + sectionContent.providedFeature + '-div" class="form-group"></form>';
        $("#" + appendToElement).append(formGroupDiv);

        if (sectionContent.type === SectionContentType.INPUT_NUMBERBOX || sectionContent.type === SectionContentType.INPUT_TEXTBOX) {
            this.#renderInputBox(sectionContent);
        } else if (sectionContent.type === SectionContentType.INPUT_RANGE) {
            this.#renderRangeBox(sectionContent);
        }
    }

    #renderInputBox(sectionContent) {
        let inputGroup = '<div id="' + sectionContent.providedFeature + '-inputGroup" class="input-group"></div>';
        $("#" + sectionContent.providedFeature + "-div").append(inputGroup);
        let inputGroupIcon = '<div class="input-group-prepend"><span id="' + sectionContent.providedFeature + '-inputGroupIconText" class="input-group-text"></span></div>';
        $("#" + sectionContent.providedFeature + "-inputGroup").append(inputGroupIcon);
        let icon = '<i class="' + sectionContent.icon.trim() + '"></i>';
        $("#" + sectionContent.providedFeature + "-inputGroupIconText").append(icon);
        let text = '<span class="modalInputLabel">' + sectionContent.name + '</span>';
        $("#" + sectionContent.providedFeature + "-inputGroupIconText").append(text);

        let input = '<input id="' + sectionContent.providedFeature + '" class="form-control">';
        $("#" + sectionContent.providedFeature + "-inputGroup").append(input);

        $("#" + sectionContent.providedFeature).attr({
            type: sectionContent.type,
            placeholder: "Default: " + sectionContent.defaultValue,
            value: sectionContent.defaultValue,
            "aria-describedby": sectionContent.providedFeature + "-helpText",
            min: sectionContent.min
        });

        let helpText = '<small id="' + sectionContent.providedFeature + '-helpText" class="form-text text-muted">' + sectionContent.helpText + ' ' + sectionContent.min + '</small>'
        $("#" + sectionContent.providedFeature + "-inputGroup").append(helpText);

        for (const additionalItem of sectionContent.additionalItems) {
            let additionalButton = '<button id="' + sectionContent.providedFeature + '-resetButton" class="btn btn-outline-secondary" type="reset">' + additionalItem.text + '</button>';
            $("#" + sectionContent.providedFeature + "-helpText").before(additionalButton);
        }
    }

    #renderRangeBox(sectionContent) {
        let inputGroup = '<div id="' + sectionContent.providedFeature + '-inputGroup"></div>';
        $("#" + sectionContent.providedFeature + "-div").append(inputGroup);
        let label = '<label for="' + sectionContent.providedFeature + '" class="align-baseline">' + sectionContent.name + ':<span id="' + sectionContent.providedFeature + '-currentValue" class="rangeBoxCurrentValue ml-2 align-baseline badge badge-primary badge-pill">' + sectionContent.defaultValue + '</span></label>';
        $("#" + sectionContent.providedFeature + "-inputGroup").append(label);

        let inputRow = '<div id="' + sectionContent.providedFeature + '-inputRow" class="inputRow form-row"></div>';
        $("#" + sectionContent.providedFeature + "-inputGroup").append(inputRow);
        let input = '<input class="col px-md-2 form-control-range" id="' + sectionContent.providedFeature + '">'
        $("#" + sectionContent.providedFeature + "-inputRow").append(input);

        $("#" + sectionContent.providedFeature).attr({
            type: sectionContent.type,
            min: sectionContent.min,
            max: sectionContent.max,
            value: sectionContent.defaultValue,
            step: 1
        });

        $("#" + sectionContent.providedFeature).on("change input", (event) => {
            $("#" + sectionContent.providedFeature + "-currentValue").text($("#" + sectionContent.providedFeature).val());
        });

        for (const additionalItem of sectionContent.additionalItems) {
            let additionalButton = '<button id="' + sectionContent.providedFeature + '-resetButton" class="btn btn-outline-secondary" type="reset">' + additionalItem.text + '</button>';
            $("#" + sectionContent.providedFeature + "-inputRow").append(additionalButton);
            $("#" + sectionContent.providedFeature + "-resetButton").addClass("ml-2 btn-sm");
        }
    }

    #configureTitle(title = "") {
        if (title instanceof Object) {
            $("#modalTitleIcon").attr("data-type", (title.type ? title.type : "normal"));
            $("#modalTitleIcon").removeClass();
            $("#modalTitleIcon").addClass(title.icon);
            $("#modalTitle").text(title.text);
        } else {
            $("#modalTitle").text(title);
        }
    }

    #configureCancelButton(cancelButtonText = "Cancel") {
        $("#modalCancelButton").text(cancelButtonText);
        $("#modalCancelButton").click(() => { this.resetDialog(); });
    }

    #configureSaveButton(saveButton = "") {
        if (!saveButton || !(saveButton instanceof Object) || !saveButton.action) {
            $("#modalSaveButton").css("display", "none");
            return;
        }

        if (saveButton.action && !(typeof saveButton.action === "function")) {
            throw new TypeError("The provided action for the save button has to be a function.");
        }

        // $("#modalTitleIcon").attr("data-type", title.type);
        $("#modalSaveButtonIcon").removeClass();
        $("#modalSaveButtonIcon").addClass(saveButton.icon);
        $("#modalSaveButtonText").text(" " + saveButton.text);
        $("#modalSaveButton").click(() => { saveButton.action(); this.destroyDialog(); });
    }

    show() {        
        $("#staticModal button").on("click", () => { $(':focus').blur(); });
        $("#staticModal").modal("show");
    }

    hide() {
        $("#staticModal").modal("hide");
    }

    destroyDialog() {
        $("#staticModal").modal("hide");
        this.resetDialog();
    }

    resetDialog() {
        $("#staticModal input").off();
        $("#staticModal button").off();

        $("#modalTitleIcon").attr("data-type", "normal");
        $("#modalTitleIcon").removeClass();
        $("#modalTitleIcon").addClass(this.#standardTitleIcon);
        $("#modalTitle").text("");
        $(".modal-body").empty();
        $("#modalCancelButton").text("Cancel");
        $("#modalSaveButtonIcon").removeClass();
        $("#modalSaveButtonText").text("Save");
        $("#modalSaveButton").click(() => { this.hide(); });
    }

    get getModalDialogId() {
        return this.#modalDialogId;
    }

    #handleEnterKey(event) {
        if (event.which == 13) {
            let buttonId = event.target.type === "number" ? "modalSaveButton" : event.target.id;
            $("#" + buttonId).click();
            event.preventDefault();
        }
    }

}

export default ModalDialog;