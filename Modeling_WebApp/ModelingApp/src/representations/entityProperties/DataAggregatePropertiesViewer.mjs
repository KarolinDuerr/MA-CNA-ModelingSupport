import { dataAggregateSvgRepresentation, ParentRelation, PropertyContentType } from "../../config/detailsSidebarConfig.mjs";
import EntityTypes from "../../config/entityTypes.mjs";
import { UIContentType } from "../../config/toolbarConfiguration.mjs";
import UIModalDialog, { DialogSize } from "../guiElements.dialog.mjs";
import { FormGroup } from "../guiElements.mjs";

const componentSvgRepresentation = () => {
    return '<rect width="24" height="12" rx="2" ry="2" transform="translate(2.2, 2)" stroke-dasharray="0" stroke-width="2" stroke="black" fill="white"></rect>';
};

const serviceSvgRepresentation = () => {
    return '<polygon points="5,0 15,0 20,8 15,16 5,16 0,8" transform="translate(7, 0.7)" stroke-dasharray="0" stroke-width="2" stroke="black" fill="white"></polygon>';
};

const backingServiceSvgRepresentation = () => {
    return '<polygon points="12.5,0 25,7.5 12.5,15 0,7.5" transform="translate(2, 0.8)" stroke-width="2" stroke="black" fill="white"></polygon>';
};

const storageBackingServiceSvgRepresentation = () => {
    const path = '<path transform="translate(6, 0.7) scale(0.27)" d="M 0 10 L 0 50 C 0 55.51784 17.928639999999998 60 40 60 C 62.07136 60 80 55.51784 80 50 L 80 10 C 80 4.4821599999999995 62.07136 0 40 0 C 17.928639999999998 0 0 4.4821599999999995 0 10 Z" stroke-width="5" stroke="black" fill="white"></path>';
    const ellipse = '<ellipse transform="translate(6, 0.7) scale(0.27)" cy="10" ry="10" cx="40" rx="40" stroke-width="5" stroke="black" fill="white"></ellipse>';
    return path + ellipse;
};

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
            text: `You have to embed the Data Aggregate entity in a Component, Service, Backing Service or Storage Backing Service first
            before you can edit embedded properties.`
        }
    }
}

class DataAggregatePropertiesViewer {

    #propertyGroupContainer = "entity";
    #selectedDataAggregateElement = {};

    #modalDialog = {};

    #embeddedMode = false;
    #hasParent = false;

    #currentParentId = "";

    #dataAggregateList = new Array();

    specificProperties = {
        "chooseEditMode": {
            providedFeature: "dataAggregate-chooseEditMode",
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
                    text: "Choose whether you want to modify the embedded element or the actual Data Aggregate entity."
                }
            }
        },
        "dataAggregate-parentRelation": {
            providedFeature: "dataAggregate-parentRelation",
            contentType: PropertyContentType.DROPDOWN,
            label: "Parent Relation:",
            properties: {
                disabled: false,
                required: true
            },
            attributes: {
                placeholder: "", // TODO keep assumption that "used" if nothing selected?
                svgRepresentation: "",
                helpText: {
                    text: "How the entity is utilized by its parent."
                }
            },
            dropdownOptions: [
                {
                    optionValue: ParentRelation.USED,
                    optionText: ParentRelation.USED,
                    selected: true
                },
                {
                    optionValue: ParentRelation.PERSISTED,
                    optionText: ParentRelation.PERSISTED,
                    selected: false
                }
            ]
        },
        "dataAggregate-assignedFamily": {
            providedFeature: "dataAggregate-assignedFamily",
            contentType: PropertyContentType.INPUT_TEXTBOX,
            label: `Assigned <span><svg width="30" height="20">${dataAggregateSvgRepresentation()}</svg></span>– Family:`,
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
                provideEditButton: false, // TODO only if time
            }

        },
        "dataAggregate-familyConfig": {
            providedFeature: "dataAggregate-familyConfig",
            contentType: PropertyContentType.TABLE_DIALOG,
            label: "– Family:",
            properties: {
                disabled: false,
                required: false
            },
            attributes: {
                svgRepresentation: `<svg width="30" height="20">${dataAggregateSvgRepresentation()}</svg>`,
                buttonText: "Edit Family",
                buttonIconClass: "fa-solid fa-pencil"
            },
            buttonActionContent: {
                // contentType: PropertyContentType // TODO modalDialog,
                dialogSize: DialogSize.LARGE,
                dialogContent: {
                    header: {
                        svgRepresentation: `<svg width="30" height="20">${dataAggregateSvgRepresentation()}</svg>`,
                        text: "Data Aggregate Family: ",
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
                                id: "dataAggregate-familyConfig-table",
                                contentType: PropertyContentType.TABLE,
                                headline: "Included Data Aggregate entities" + '  ( <svg width="30" height="20">' + dataAggregateSvgRepresentation() + '</svg>)',
                                text: `The following table shows all existing Data Aggregate entities within this System. You can select which ones of the following Data Aggregate entities you want to include in this
                                family. Note that if you select a Data Aggregate and save your changes, the labels of the selected Data Aggregate entities might change since they have to be equal to the family name.
                                Additionally, if you deselect entities that have previously been part of this family, their label will be reset to "Data Aggregate". However, your changes won't be adopted until you 
                                clicked "Save". In case you cancel and change your entity selection, all your changes will be lost. While you keep the selection of this Data Aggregate entity, your changes will be remembered.`,
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

    constructor(selectedDataAggregateElement, appendToPropertyGroup = "") {
        this.#propertyGroupContainer = appendToPropertyGroup;
        this.#selectedDataAggregateElement = selectedDataAggregateElement;
        this.#hasParent = this.#selectedDataAggregateElement?.parent() ? true : false;
        this.#currentParentId = this.#selectedDataAggregateElement?.parent();
        this.#embeddedMode = this.#hasParent;

        this.#selectedDataAggregateElement.on("change:parent", (dataAggregate, newParentElement) => { this.#updateProperties(dataAggregate, newParentElement, this); });
    }

    renderProperties(propertyDetailsContainer) {
        const templatedChooseEditMode = this.#createChooseEditMode();
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, templatedChooseEditMode);

        const templatedParentRelation = this.#createParentRelation();
        const templatedAssignedFamily = this.#createAssignedFamily();
        const templatedFamilyConfig = this.#createFamilyConfig();

        const templatedEmbeddedProperties = `<div id="dataAggregate-embeddedProps" data-group-context="${this.#propertyGroupContainer}">${templatedParentRelation}${templatedAssignedFamily}</div>`;
        const templatedOriginalProperties = `<div id="dataAggregate-originalProps" data-group-context="${this.#propertyGroupContainer}">${templatedFamilyConfig}</div>`;
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, `${templatedEmbeddedProperties}`);
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, `${templatedOriginalProperties}`);


        if (!this.#hasParent || !this.#embeddedMode) {
            $("#dataAggregate-embeddedProps").hide();
        }

        if (this.#embeddedMode) {
            propertyDetailsContainer.changeCollapsibleGroupVisibility("label", false);
            $("#dataAggregate-originalProps").hide();
        }

        $("#" + this.specificProperties["chooseEditMode"].providedFeature).on("change checked", (event) => { this.#handleEditModeChanged(event, propertyDetailsContainer, this); });
        $("#" + this.specificProperties["dataAggregate-familyConfig"].providedFeature).click(() => { this.#modalDialog.show(); });
    }

    #createChooseEditMode() {
        const specificProperty = this.specificProperties["chooseEditMode"];
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);

        specificProperty.properties.checked = this.#hasParent;
        propertyForm.addSwitchElementWithLabels(specificProperty.labels, specificProperty.attributes, specificProperty.properties);
        return propertyForm.getCreatedFormTemplate(true);
    }

    #createParentRelation() {
        const specificProperty = this.specificProperties["dataAggregate-parentRelation"];
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);

        // load saved values
        if (this.#hasParent) {
            const savedValues = this.#selectedDataAggregateElement.prop("entity/properties/embedded");
            if (savedValues.parentId && (savedValues.parentId === this.#selectedDataAggregateElement.parent())) {
                specificProperty.dropdownOptions.forEach((option) => {
                    if (option.optionValue.localeCompare(savedValues.parentRelation.toLowerCase()) === 0) {
                        option.selected = true;
                    }
                })
            } else {
                // parent changed --> reset saved values 
                this.#selectedDataAggregateElement.prop("entity/properties/embedded", {
                    parentId: "",
                    parentRelation: "" // TODO save with used per default?
                }, { rewrite: true, isolate: true });
            }
        }

        specificProperty.properties.disabled = !this.#hasParent;
        specificProperty.attributes.svgRepresentation = this.#chooseSvgRepresentation();
        propertyForm.addDropdownElementWithLabelAndOptions(specificProperty.label, specificProperty.attributes, specificProperty.properties, specificProperty.dropdownOptions);
        return propertyForm.getCreatedFormTemplate(true, "before");
    }

    #createAssignedFamily() {
        const specificProperty = this.specificProperties["dataAggregate-assignedFamily"];
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);

        const savedAssignedFamily = this.#selectedDataAggregateElement.prop("entity/properties/assignedFamily");
        specificProperty.attributes.value = savedAssignedFamily ?? "";
        specificProperty.attributes.title = savedAssignedFamily ? savedAssignedFamily : specificProperty.attributes.placeholder;
        propertyForm.addTextElementWithLabel(specificProperty.label, specificProperty.attributes, specificProperty.properties);
        return propertyForm.getCreatedFormTemplate(true);
    }

    #createFamilyConfig() {
        const specificProperty = this.specificProperties["dataAggregate-familyConfig"];
        // Create Button element
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);
        propertyForm._addButtonElementWithLabel(specificProperty.label, specificProperty.attributes, specificProperty.properties);

        // Prepare Table and Dialog Content
        let modalDialogConfig = specificProperty.buttonActionContent;
        const tableRows = this.#createFamilyConfigRows();
        modalDialogConfig.dialogContent.content.groups.forEach((groupElement) => {
            if (String("dataAggregate-familyConfig-table").localeCompare(groupElement.id) === 0) {
                groupElement.tableRows = tableRows;
            }
        });
        modalDialogConfig.dialogContent.header.text += ` ${this.#selectedDataAggregateElement.attr("label/textWrap/text")}`;

        // Create Modal Dialog for later Button Action
        this.#modalDialog = new UIModalDialog("entity", specificProperty.providedFeature);
        this.#modalDialog.create(modalDialogConfig.dialogContent);
        this.#modalDialog.provideCloseButtonActionConfiguration("close");
        this.#modalDialog.provideSaveButtonActionConfiguration(this.saveFamilyConfig, "close", this);
        this.#modalDialog.render("modals", true, modalDialogConfig.dialogSize);

        return propertyForm.getCreatedFormTemplate(true, "before");
    }

    #createFamilyConfigRows() {
        let existingElements = this.#selectedDataAggregateElement.graph.getElements();

        const tableRows = existingElements.filter((entityElement) => {
            return entityElement.prop("entity/type") === EntityTypes.DATA_AGGREGATE
        }).map((dataAggregate) => {
            this.#dataAggregateList.push(dataAggregate);

            let isInvalid = true;
            const parent = dataAggregate.getParentCell();
            let parentName = "-";
            if (parent) {
                isInvalid = false;
                parentName = parent.attr("label/textWrap/text");
            }

            let sameDataAggregate = dataAggregate.attr("label/textWrap/text").localeCompare(this.#selectedDataAggregateElement.attr("label/textWrap/text")) === 0;

            return {
                name: dataAggregate.attr("label/textWrap/text") ? dataAggregate.attr("label/textWrap/text") : "-",
                familyName: dataAggregate.prop("entity/properties/assignedFamily") ? dataAggregate.prop("entity/properties/assignedFamily") : "-",
                parent: parentName,
                previous: {
                    contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL,
                    disabled: true,
                    checked: sameDataAggregate,
                    id: dataAggregate.id
                },
                included: {
                    contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL,
                    disabled: isInvalid,
                    checked: sameDataAggregate,
                    id: dataAggregate.id
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
        const includedDataAggregateElements = $("#dataAggregate-familyConfig-table input[data-entity-property=dataAggregate-familyConfig-included]:checked").get();
        const newIncludedDataAggregateElements = includedDataAggregateElements.map((checkbox) => { return checkbox.value });
        const nonIncludedDataAggregateElements = $("#dataAggregate-familyConfig-table input[data-entity-property=dataAggregate-familyConfig-included]:not(:checked)").get();
        const newNonIncludedDataAggregateElements = nonIncludedDataAggregateElements.map((checkbox) => { return checkbox.value });

        const currentFamilyName = actionParentObject.getSelectedDataAggregateElement.attr("label/textWrap/text");
        for (const dataAggregate of actionParentObject.getDataAggregateList) {
            if (newIncludedDataAggregateElements.includes(dataAggregate.id)) {
                if (currentFamilyName.localeCompare(dataAggregate.attr("label/textWrap/text")) !== 0) {
                    dataAggregate.attr("label/textWrap/text", currentFamilyName);
                }
                dataAggregate.prop("entity/properties/assignedFamily", currentFamilyName);
            }

            if (newNonIncludedDataAggregateElements.includes(dataAggregate.id)) {
                if (currentFamilyName.localeCompare(dataAggregate.attr("label/textWrap/text")) === 0) {
                    // Reset label name
                    dataAggregate.attr("label/textWrap/text", "Data Aggregate");
                }
                dataAggregate.prop("entity/properties/assignedFamily", "");
            }
        }
    }

    #updateProperties(dataAggregate, newParentElement, actionParentObject) {
        if (!newParentElement) {
            // ignore since validateUnembedding prevents this as final result 
            return;
        }

        if (actionParentObject.getCurrentParentId && (actionParentObject.getCurrentParentId.localeCompare(newParentElement) === 0)) {
            // parent did not change e.g. when element was repositioned in parent
            return;
        }

        if (!dataAggregate.parent()) {
            // should not happen due to validateUnembedding method, nevertheless to be save handle
            $("#dataAggregate-embeddedProps").hide();
            // parent changed --> reset saved values 
            dataAggregate.prop("entity/properties/embedded", {
                parentId: "",
                parentRelation: "" // TODO save with used per default?
            }, { rewrite: true, isolate: true });
            actionParentObject.setCurrentParentId = "";
            return;
        }

        actionParentObject.setCurrentParentId = newParentElement; // TODO fix
        $("#dataAggregate-embeddedProps").empty();
        const templatedUpdatedEmbeddedProps = actionParentObject.#createParentRelation() + actionParentObject.#createAssignedFamily();
        $("#dataAggregate-embeddedProps").append(templatedUpdatedEmbeddedProps);
        $("#" + actionParentObject.specificProperties["chooseEditMode"].providedFeature).click();
    }

    #handleEditModeChanged(event, propertyDetailsContainer, actionParentObject) {
        $("#" + actionParentObject.specificProperties["chooseEditMode"].providedFeature + "-leftLabel").toggleClass("text-muted");

        if (event.target.checked) {
            if (!this.#hasParent) {
                let modalDialog = new UIModalDialog("dataAggregate-editMode", "change-dataAggregate-editMode");
                modalDialog.create(EditModelDialogConfig());
                modalDialog.render("modals", true);
                modalDialog.show();

                // reset toggle
                $("#" + event.target.id).prop("checked", false);
                return;
            }

            actionParentObject.setEmbeddedMode = true;
            propertyDetailsContainer.changeCollapsibleGroupVisibility("label", false);
            $("#dataAggregate-embeddedProps").show();
            $("#dataAggregate-originalProps").hide();

        } else {
            actionParentObject.setEmbeddedMode = false;
            propertyDetailsContainer.changeCollapsibleGroupVisibility("label", true);
            $("#dataAggregate-embeddedProps").hide();
            $("#dataAggregate-originalProps").show();
        }
    }

    #chooseSvgRepresentation() {
        if (!this.#hasParent) {
            return '';
        }

        const parent = this.#selectedDataAggregateElement.graph.getCell(this.#selectedDataAggregateElement.parent());
        switch (parent.prop("entity/type")) {
            case EntityTypes.COMPONENT:
                return `<svg width="30" height="20">${componentSvgRepresentation()}</svg>`;
            case EntityTypes.SERVICE:
                return `<svg width="30" height="20">${serviceSvgRepresentation()}</svg>`;
            case EntityTypes.BACKING_SERVICE:
                return `<svg width="30" height="20">${backingServiceSvgRepresentation()}</svg>`;
            case EntityTypes.STORAGE_BACKING_SERVICE:
                return `<svg width="30" height="20">${storageBackingServiceSvgRepresentation()}</svg>`;
            default:
                return '';
        }
    }

    get getCurrentParentId() {
        return this.#currentParentId;
    }

    get getDataAggregateList() {
        return this.#dataAggregateList;
    }

    get getSelectedDataAggregateElement() {
        // direct reference important here for save dialog action
        return this.#selectedDataAggregateElement;
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

export default DataAggregatePropertiesViewer;