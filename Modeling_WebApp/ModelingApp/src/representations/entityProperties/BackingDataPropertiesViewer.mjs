import { backingDataSvgRepresentation, dataAggregateSvgRepresentation, ParentRelation, PropertyContentType } from "../../config/detailsSidebarConfig.mjs";
import EntityTypes from "../../config/entityTypes.mjs";
import { UIContentType } from "../../config/toolbarConfiguration.mjs";
import UIModalDialog, { DialogSize } from "../guiElements.dialog.mjs";
import { FormGroup } from "../guiElements.mjs";

const EditModelDialogConfig = () => {
    return {
        type: "modalDialog",
        header: {
            iconClass: "fa-solid fa-triangle-exclamation",
            type: "warning",
            text: "Warning",
            closeButton: true
        },
        footer: {
            cancelButtonText: "Ok, understood"
        },
        content: {
            contentType: UIContentType.SINGLE_TEXTBLOCK,
            text: `You have to embed the Backing Data entity in a Component, Service, Backing Service, Storage Backing Service or Infrastructure first
            before you can edit embedded properties.`
        }
    }
}

class BackingDataPropertiesViewer {

    #propertyGroupContainer = "entity";
    #selectedBackingDataElement = {};

    #modalDialog = {};
    #modalDialogIncludedData = {};

    #embeddedMode = false;
    #hasParent = false;

    #currentParentId = "";

    #backingDataList = new Array();

    specificProperties = {
        "chooseEditMode": {
            providedFeature: "backingData-chooseEditMode",
            contentType: PropertyContentType.TOGGLE,
            labels: {
                headLabel: "<U>Edit Mode:</U>",
                leftLabel: "Original",
                rightLabel: "Embedded"
            },
            properties: {
                disabled: false,
                required: false,
                checked: true
            },
            attributes: {
                helpText: {
                    text: "Choose whether you want to modify the embedded element or the actual Backing Data entity."
                }
            }
        },
        "backingData-includedData": {
            providedFeature: "backingData-includedData",
            contentType: PropertyContentType.TABLE_DIALOG,
            label: "Included Data:",
            properties: {
                disabled: false,
                required: false
            },
            attributes: {
                buttonText: "Edit Included Data",
                buttonIconClass: "fa-solid fa-pencil"
            },
            buttonActionContent: {
                // contentType: PropertyContentType // TODO modalDialog,
                dialogSize: DialogSize.LARGE,
                dialogContent: {
                    header: {
                        svgRepresentation: `<svg width="30" height="20">${backingDataSvgRepresentation()}</svg>`,
                        text: "Backing Data Included Data: ",
                        closeButton: false
                    },
                    footer: {
                        cancelButtonText: "Cancel",
                        saveButtonIconClass: "fa-regular fa-floppy-disk",
                        saveButtonText: "Save"
                    },
                    content: {
                        contentType: UIContentType.GROUP_FORMS,
                        groups: [
                            {
                                id: "backingData-includedData-table",
                                contentType: PropertyContentType.TABLE,
                                headline: "Included Backing Data entities" + '  ( <svg width="30" height="20">' + backingDataSvgRepresentation() + '</svg>)',
                                text: `The following table shows all data elements included in this Backing Data entity. In case you want to add a new entry, the following section provides two text element boxes you can use to 
                                provide the information and then add it using the plus button. However, your changes won't be saved or adopted until you clicked "Save". In case you cancel and change your entity selection, all 
                                your changes will be lost. While you keep the selection of this Backing Data entity, your changes will be remembered.`,
                                tableColumnHeaders: [
                                    {
                                        text: "Key"
                                    },
                                    {
                                        text: "Value"
                                    }
                                ],
                                tableRows: []
                            },
                            {
                                id: "backingData-includedData-form",
                                contentType: PropertyContentType.FORMGROUP,
                                headline: "Add New Data Item",
                                contentItems: [
                                    {
                                        providedFeature: "includedData-key",
                                        contentType: PropertyContentType.INPUT_TEXTBOX_LABEL_PREPEND,
                                        label: "Key",
                                        properties: {
                                            disabled: false,
                                            required: true
                                        },
                                        attributes: {
                                            labelIcon: "fa-solid fa-key",
                                            placeholder: "e.g. My_SQL_Password",
                                            helpText: {
                                                text: "The key that identifies the following value item."
                                            },
                                            provideEditButton: false,
                                            provideEnterButton: false
                                        }
                                    },
                                    {
                                        providedFeature: "includedData-value",
                                        contentType: PropertyContentType.INPUT_TEXTBOX_LABEL_PREPEND,
                                        label: "Value",
                                        properties: {
                                            disabled: false,
                                            required: true
                                        },
                                        attributes: {
                                            labelIcon: "bi bi-chat-square-text-fill",
                                            placeholder: "e.g. mysqlpw",
                                            helpText: {
                                                text: "The value of this data item."
                                            },
                                            provideEditButton: false,
                                            provideEnterButton: false
                                        }
                                    },
                                    {
                                        providedFeature: "includedData-submit",
                                        contentType: PropertyContentType.BUTTON,
                                        label: "Submit",
                                        properties: {
                                            disabled: false,
                                            required: true
                                        },
                                        attributes: {
                                            labelIcon: "fa-solid fa-plus",
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        "backingData-assignedFamily": {
            providedFeature: "backingData-assignedFamily",
            contentType: PropertyContentType.INPUT_TEXTBOX,
            label: `Assigned <span><svg width="30" height="20">${backingDataSvgRepresentation()}</svg></span>– Family:`,
            properties: {
                disabled: true,
                readonly: true,
                required: false,
                // additionalButton: { // TODO only if time
                //     disabled: false
                // }
            },
            attributes: {
                placeholder: "No family assigned",
                provideEditButton: false // TODO only if time
            }

        },
        "backingData-familyConfig": {
            providedFeature: "backingData-familyConfig",
            contentType: PropertyContentType.TABLE_DIALOG,
            label: "– Family:",
            properties: {
                disabled: false,
                required: false
            },
            attributes: {
                svgRepresentation: `<svg width="30" height="20">${backingDataSvgRepresentation()}</svg>`,
                buttonText: "Edit Family",
                buttonIconClass: "fa-solid fa-pencil"
            },
            buttonActionContent: {
                // contentType: PropertyContentType // TODO modalDialog,
                dialogSize: DialogSize.LARGE,
                dialogContent: {
                    header: {
                        svgRepresentation: `<svg width="30" height="20">${backingDataSvgRepresentation()}</svg>`,
                        text: "Backing Data Family: ",
                        closeButton: false
                    },
                    footer: {
                        cancelButtonText: "Cancel",
                        saveButtonIconClass: "fa-regular fa-floppy-disk",
                        saveButtonText: "Save"
                    },
                    content: {
                        contentType: UIContentType.GROUP_FORMS,
                        groups: [
                            {
                                id: "backingData-familyConfig-table",
                                contentType: PropertyContentType.TABLE,
                                headline: "Included Data",
                                text: `The following table shows all existing Backing Data entities within this System. You can select which ones of the following Backing Data entities you want to include in this
                                family. Note that if you select a Backing Data and save your changes, the labels of the selected Backing Data entities might change since they have to be equal to the family name.
                                Additionally, if you deselect entities that have previously been part of this family, their label will be reset to "Backing Data". However, your changes won't be adopted until you 
                                clicked "Save". In case you cancel and change your entity selection, all your changes will be lost. While you keep the selection of this Backing Data entity, your changes will be remembered.`,
                                tableColumnHeaders: [
                                    {
                                        text: "Name"
                                    },
                                    {
                                        text: "Family Name"
                                    },
                                    {
                                        text: "Parent"
                                    },
                                    {
                                        text: "Formerly Included"
                                    },
                                    {
                                        text: "Include"
                                    }
                                ],
                                tableRows: []
                            }
                        ]
                    }
                }
            }
        }
    }

    constructor(selectedBackingDataElement, appendToPropertyGroup = "") {
        this.#propertyGroupContainer = appendToPropertyGroup;
        this.#selectedBackingDataElement = selectedBackingDataElement;
        this.#hasParent = this.#selectedBackingDataElement?.parent() ? true : false;
        this.#currentParentId = this.#selectedBackingDataElement?.parent();
        this.#embeddedMode = this.#hasParent;

        // this.#selectedBackingDataElement.on("change:parent", (backingData, newParentElement) => { this.#updateProperties(backingData, newParentElement, this); });
    }

    renderProperties(propertyDetailsContainer) {
        const templatedChooseEditMode = this.#createChooseEditMode();
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, templatedChooseEditMode);

        const templatedIncludedData = this.#createIncludedData();
        const templatedAssignedFamily = this.#createAssignedFamily();
        const templatedFamilyConfig = this.#createFamilyConfig();

        const templatedEmbeddedProperties = `<div id="backingData-embeddedProps" data-group-context="${this.#propertyGroupContainer}">${templatedIncludedData}${templatedAssignedFamily}</div>`;
        const templatedOriginalProperties = `<div id="backingData-originalProps" data-group-context="${this.#propertyGroupContainer}">${templatedFamilyConfig}</div>`;
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, `${templatedEmbeddedProperties}`);
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, `${templatedOriginalProperties}`);


        if (!this.#hasParent || !this.#embeddedMode) {
            $("#backingData-embeddedProps").hide();
        }

        if (this.#embeddedMode) {
            propertyDetailsContainer.changeCollapsibleGroupVisibility("label", false);
            $("#backingData-originalProps").hide();
        }

        $("#" + this.specificProperties["chooseEditMode"].providedFeature).on("change checked", (event) => { this.#handleEditModeChanged(event, propertyDetailsContainer, this); });
        $("#" + this.specificProperties["backingData-familyConfig"].providedFeature).click(() => { this.#modalDialog.show(); });
        $("#" + this.specificProperties["backingData-includedData"].providedFeature).click(() => { this.#modalDialogIncludedData.show(); });
        $("#includedData-submit").click(() => { this.#handleSubmitIncludedData(this) });
    }

    #createChooseEditMode() {
        const specificProperty = this.specificProperties["chooseEditMode"];
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);

        specificProperty.properties.checked = this.#hasParent;
        propertyForm.addSwitchElementWithLabels(specificProperty.labels, specificProperty.attributes, specificProperty.properties);
        return propertyForm.getCreatedFormTemplate(true);
    }

    #createIncludedData() {
        const specificProperty = this.specificProperties["backingData-includedData"];
        // Create Button element
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);
        propertyForm._addButtonElementWithLabel(specificProperty.label, specificProperty.attributes, specificProperty.properties);

        // Prepare Table and Dialog Content
        let modalDialogConfig = specificProperty.buttonActionContent;
        const tableRows = this.#createIncludedDataRows(); // TODO
        modalDialogConfig.dialogContent.content.groups.forEach((groupElement) => {
            if (String("dataAggregate-familyConfig-table").localeCompare(groupElement.id) === 0) {
                groupElement.tableRows = tableRows;
            }
        });
        modalDialogConfig.dialogContent.header.text += ` ${this.#selectedBackingDataElement.attr("label/textWrap/text")}`;

        // // Create Modal Dialog for later Button Action
        this.#modalDialogIncludedData = new UIModalDialog("entity", specificProperty.providedFeature);
        this.#modalDialogIncludedData.create(modalDialogConfig.dialogContent);
        this.#modalDialogIncludedData.provideCloseButtonActionConfiguration("close");
        this.#modalDialogIncludedData.provideSaveButtonActionConfiguration(this.saveIncludedDataItems, "close", this);
        this.#modalDialogIncludedData.render("modals", true, modalDialogConfig.dialogSize);

        return propertyForm.getCreatedFormTemplate(true, "before");
    }

    #createIncludedDataRows() {
        let includedData = this.#selectedBackingDataElement.prop("entity/properties/includedData");

        const tableRows = includedData.map((dataItem) => { console.log(dataItem)
            return {
                key: dataItem.key,
                value: dataItem.value
            }
        });

        return tableRows;
    }

    #createAssignedFamily() {
        const specificProperty = this.specificProperties["backingData-assignedFamily"];
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);

        const savedAssignedFamily = this.#selectedBackingDataElement.prop("entity/properties/assignedFamily");
        specificProperty.attributes.value = savedAssignedFamily ?? "";
        specificProperty.attributes.title = savedAssignedFamily ? savedAssignedFamily : specificProperty.attributes.placeholder;
        propertyForm.addTextElementWithLabel(specificProperty.label, specificProperty.attributes, specificProperty.properties);
        return propertyForm.getCreatedFormTemplate(true);
    }

    #createFamilyConfig() {
        const specificProperty = this.specificProperties["backingData-familyConfig"];
        // Create Button element
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);
        propertyForm._addButtonElementWithLabel(specificProperty.label, specificProperty.attributes, specificProperty.properties);

        // Prepare Table and Dialog Content
        let modalDialogConfig = specificProperty.buttonActionContent;
        const tableRows = this.#createFamilyConfigRows();
        modalDialogConfig.dialogContent.content.groups.forEach((groupElement) => {
            if (String("backingData-familyConfig-table").localeCompare(groupElement.id) === 0) {
                groupElement.tableRows = tableRows;
            }
        });
        modalDialogConfig.dialogContent.header.text += ` ${this.#selectedBackingDataElement.attr("label/textWrap/text")}`;

        // Create Modal Dialog for later Button Action
        this.#modalDialog = new UIModalDialog("entity", specificProperty.providedFeature);
        this.#modalDialog.create(modalDialogConfig.dialogContent);
        this.#modalDialog.provideCloseButtonActionConfiguration("close");
        this.#modalDialog.provideSaveButtonActionConfiguration(this.saveFamilyConfig, "close", this);
        this.#modalDialog.render("modals", true, modalDialogConfig.dialogSize);

        return propertyForm.getCreatedFormTemplate(true, "before");
    }

    #createFamilyConfigRows() {
        let existingElements = this.#selectedBackingDataElement.graph.getElements();

        const tableRows = existingElements.filter((entityElement) => {
            return entityElement.prop("entity/type") === EntityTypes.BACKING_DATA
        }).map((backingData) => {
            this.#backingDataList.push(backingData);

            let isInvalid = true;
            const parent = backingData.getParentCell();
            let parentName = "-";
            if (parent) {
                isInvalid = false;
                parentName = parent.attr("label/textWrap/text");
            }

            let sameBackingData = backingData.attr("label/textWrap/text").localeCompare(this.#selectedBackingDataElement.attr("label/textWrap/text")) === 0;

            return {
                name: backingData.attr("label/textWrap/text") ? backingData.attr("label/textWrap/text") : "-",
                familyName: backingData.prop("entity/properties/assignedFamily") ? backingData.prop("entity/properties/assignedFamily") : "-",
                parent: parentName,
                previous: {
                    contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL,
                    disabled: true,
                    checked: sameBackingData,
                    id: backingData.id
                },
                included: {
                    contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL,
                    disabled: isInvalid,
                    checked: sameBackingData,
                    id: backingData.id
                },
                attributes: {
                    representationClass: isInvalid ? "invalidOption" : "validOption",
                    disabled: isInvalid
                }
            }
        });

        return tableRows;
    }

    saveFamilyConfig(actionParentObject) {
        const includedBackingDataElements = $("#backingData-familyConfig-table input[data-entity-property=backingData-familyConfig-included]:checked").get();
        const newIncludedBackingDataElements = includedBackingDataElements.map((checkbox) => { return checkbox.value });
        const nonIncludedBackingDataElements = $("#backingData-familyConfig-table input[data-entity-property=backingData-familyConfig-included]:not(:checked)").get();
        const newNonIncludedBackingDataElements = nonIncludedBackingDataElements.map((checkbox) => { return checkbox.value });

        const currentFamilyName = actionParentObject.getSelectedBackingDataElement.attr("label/textWrap/text");
        for (const backingData of actionParentObject.getBackingDataList) {
            if (newIncludedBackingDataElements.includes(backingData.id)) {
                if (currentFamilyName.localeCompare(backingData.attr("label/textWrap/text")) !== 0) {
                    backingData.attr("label/textWrap/text", currentFamilyName);
                }
                backingData.prop("entity/properties/assignedFamily", currentFamilyName);
            }

            if (newNonIncludedBackingDataElements.includes(backingData.id)) {
                if (currentFamilyName.localeCompare(backingData.attr("label/textWrap/text")) === 0) {
                    // Reset label name
                    backingData.attr("label/textWrap/text", "Backing Data");
                }
                backingData.prop("entity/properties/assignedFamily", "");
            }
        }
    }

    saveIncludedDataItems(actionParentObject) {
        let includedDataItems = new Array();
        let tableRows = $("#backingData-includedData-table").find("tr");
        if (tableRows.length > 0) {
            tableRows.each((index, rowElement) => {
                let rowKey = $(rowElement).find("[data-table-context=key]").text();
                let rowValue = $(rowElement).find("[data-table-context=value]").text();

                if (rowKey && rowValue) {
                    includedDataItems.push({
                        key: rowKey,
                        value: rowValue
                    })
                }
            });
        }

        actionParentObject.getSelectedBackingDataElement.prop("entity/properties/includedData", includedDataItems);
    }

    #handleSubmitIncludedData(actionParentObject) {
        const table = actionParentObject.getModalDialogIncludedData.getIncludedTable(this.specificProperties["backingData-includedData"].providedFeature);
        const newKey = $("#includedData-key").val();
        const newValue = $("#includedData-value").val();
        if (!newKey || !newValue) {
            return;
        }
        const row = table.createRow({
            key: newKey,
            value: newValue
        })
        $("#backingData-includedData-tableBody").append(row);
        $("#includedData-key").val("");
        $("#includedData-value").val("");
    }

    #updateProperties(backingData, newParentElement, actionParentObject) {
        if (!newParentElement) {
            // ignore since validateUnembedding prevents this as final result 
            return;
        }

        if (actionParentObject.getCurrentParentId && (actionParentObject.getCurrentParentId.localeCompare(newParentElement) === 0)) {
            // parent did not change e.g. when element was repositioned in parent
            return;
        }

        // if (!backingData.parent()) {
        //     // should not happen due to validateUnembedding method, nevertheless to be save handle
        //     $("#dataAggregate-embeddedProps").hide();
        //     // parent changed --> reset saved values 
        //     backingData.prop("entity/properties/embedded", {
        //         parentId: ""
        //     }, { rewrite: true, isolate: true });
        //     actionParentObject.setCurrentParentId = "";
        //     return;
        // }

        actionParentObject.setCurrentParentId = newParentElement; // TODO fix --> modals
        $("#backingData-embeddedProps").empty();
        const templatedUpdatedEmbeddedProps = actionParentObject.#createIncludedData() + actionParentObject.#createAssignedFamily();
        $("#backingData-embeddedProps").append(templatedUpdatedEmbeddedProps);
        $("#" + actionParentObject.specificProperties["chooseEditMode"].providedFeature).click();
    }

    #handleEditModeChanged(event, propertyDetailsContainer, actionParentObject) {
        $("#" + actionParentObject.specificProperties["chooseEditMode"].providedFeature + "-leftLabel").toggleClass("text-muted");

        if (event.target.checked) {
            if (!this.#hasParent) {
                let modalDialog = new UIModalDialog("backingData-editMode", "change-backingData-editMode");
                modalDialog.create(EditModelDialogConfig());
                modalDialog.render("modals", true);
                modalDialog.show();

                // reset toggle
                $("#" + event.target.id).prop("checked", false);
                return;
            }

            actionParentObject.setEmbeddedMode = true;
            propertyDetailsContainer.changeCollapsibleGroupVisibility("label", false);
            $("#backingData-embeddedProps").show();
            $("#backingData-originalProps").hide();

        } else {
            actionParentObject.setEmbeddedMode = false;
            propertyDetailsContainer.changeCollapsibleGroupVisibility("label", true);
            $("#backingData-embeddedProps").hide();
            $("#backingData-originalProps").show();
        }
    }

    get getCurrentParentId() {
        return this.#currentParentId;
    }

    get getBackingDataList() {
        return this.#backingDataList;
    }

    get getModalDialogIncludedData() {
        return this.#modalDialogIncludedData;
    }

    get getSelectedBackingDataElement() {
        // direct reference important here for save dialog action
        return this.#selectedBackingDataElement;
    }

    set setCurrentParentId(parentId) {
        this.#currentParentId = parentId;
        this.#hasParent = parentId ? true : false;
    }

    /**
     * @param {boolean} isEmbeddedMode
     */
    set setEmbeddedMode(isEmbeddedMode) {
        this.#embeddedMode = isEmbeddedMode;
    }
}

export default BackingDataPropertiesViewer;