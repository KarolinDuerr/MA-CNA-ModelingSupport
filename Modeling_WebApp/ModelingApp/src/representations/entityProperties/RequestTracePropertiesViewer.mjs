import { PropertyContentType } from "../../config/detailsSidebarConfig.mjs";
import EntityTypes from "../../config/entityTypes.mjs";
import { UIContentType } from "../../config/toolbarConfiguration.mjs";
import UIModalDialog, { DialogSize } from "../guiElements.dialog.mjs";
import { FormGroup } from "../guiElements.mjs";

const linkSvgRepresentation = () => {
    let marker = '<defs><marker id="arrowHead" orient="auto" overflow="visible" markerUnits="userSpaceOnUse"><path id="v-66" stroke="black" fill="black" transform="rotate(180)" d="M 8 -4.5 0 0 8 4.5 z"></path></marker></defs>';
    let pathElement = '<path d="M 1 8 L 27 8" marker-end="url(#arrowHead)" fill="none" stroke="black" stroke-dasharray="none" stroke-width="2" stroke-line-join="round" stroke-linejoin="round"</path>';
    return marker + pathElement;
}

class RequestTracePropertiesViewer {

    #propertyGroupContainer = "entity";
    #selectedRequestTraceElement = {};

    #modalDialog = {};

    specificProperties = {
        "referredEndpoint": {
            providedFeature: "referredEndpoint",
            contentType: PropertyContentType.DROPDOWN,
            label: "External Endpoint:",
            properties: {
                disabled: false,
                required: true
            },
            attributes: {
                placeholder: "Choose External Endpoint...",
                svgRepresentation: '<svg width="30" height="20"><circle id="request-trace-external-endpoint" cx="15" cy="9" r="4" stroke="black" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                helpText: {
                    text: "The referred External Endpoint."
                }
            }
        },
        "involvedLinks": {
            providedFeature: "involvedLinks",
            contentType: PropertyContentType.TABLE_DIALOG,
            label: "Involved Links:",
            properties: {
                disabled: false,
                required: true
            },
            attributes: {
                svgRepresentation: '<svg width="35" height="20">' + linkSvgRepresentation() + '</svg>',
                buttonText: "Add Link entities",
                buttonIconClass: "bi bi-window-plus"
            },
            buttonActionContent: {
                // contentType: PropertyContentType // TODO modalDialog,
                dialogSize: DialogSize.LARGE,
                dialogContent: {
                    header: {
                        // iconClass: "bi bi-window-plus", // TODO decide if this or SVG
                        svgRepresentation: '<svg width="35" height="20"><polygon points="0,0 28,0 35,7 28,14 0,14 7,7" transform="translate(0,1)" stroke-width="2" stroke="black" fill="white"></polygon></svg>',
                        text: "Request Trace: ",
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
                                id: "involved-links-table",
                                contentType: PropertyContentType.TABLE,
                                headline: "Involved Links" + '  ( <svg width="35" height="20">' + linkSvgRepresentation() + '</svg>)',
                                text: `The following table shows all Link entities that currently exist for this System. 
                                Invalid Links, such as non-connected ones or if they are connected to an Endpoint without
                                a parent entity cannot be selected and are thus deactived. By selecting the respective 
                                checkbox the Link entity will be added to this Request Trace. The selection at the beginning 
                                shows the currently saved state for this entity. Your changes won't be adopted until you 
                                clicked "Save". In case you cancel and change your entity selection, all your changes will be 
                                lost. While you keep the selection of this Request Trace entity, your changes will be remembered.`,
                                tableColumnHeaders: [
                                    {
                                        text: "From"
                                    },
                                    {
                                        text: "To Endpoint"
                                    },
                                    {
                                        text: "Endpoint Parent"
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

    constructor(selectedRequestTraceElement, appendToPropertyGroup = "") {
        this.#propertyGroupContainer = appendToPropertyGroup;
        this.#selectedRequestTraceElement = selectedRequestTraceElement;
    }

    renderProperties(propertyDetailsContainer) {
        const templatedReferredEndpoints = this.#createReferredEndpoint();
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, templatedReferredEndpoints);

        const templatedInvolvedLinks = this.#createInvolvedLinks();
        propertyDetailsContainer.addContentToAccordionGroup(this.#propertyGroupContainer, templatedInvolvedLinks);

        $("#" + this.specificProperties["involvedLinks"].providedFeature).click(() => { this.#modalDialog.show(); });
    }

    #createReferredEndpoint() {
        const specificProperty = this.specificProperties["referredEndpoint"];
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);

        const groupedElements = joint.util.groupBy(this.#selectedRequestTraceElement.graph.getElements(), (element) => {
            return element.prop("entity/type");
        });

        const externalEndpoints = groupedElements[EntityTypes.EXTERNAL_ENDPOINT];
        const savedExternalEndpointID = this.#selectedRequestTraceElement.prop("entity/properties/referredEndpoint");

        const dropdownOptions = externalEndpoints ? externalEndpoints.map((entity) => {
            let parentName = "";
            let representationClass = "";
            let invalid = true;

            if (entity.parent()) { // TODO: don't even show if not parent because then actually invalid?
                parentName = entity.graph.getCell(entity.parent()).attr("label/textWrap/text");
                representationClass = "validOption"
                invalid = false;
            } else {
                invalid = true;
                representationClass = "invalidOption";
            }

            return {
                optionValue: entity.id,
                optionText: entity.attr("label/textWrap/text"),
                optionTitle: `${parentName ? `(Parent: ${parentName})` : 'no parent: invalid option'}`,
                optionRepresentationClass: `${representationClass ? representationClass : ''}`,
                disabled: invalid,
                selected: savedExternalEndpointID ? savedExternalEndpointID === entity.id : false
            };
        }) : [];

        propertyForm.addDropdownElementWithLabelAndOptions(specificProperty.label, specificProperty.attributes, specificProperty.properties, dropdownOptions);

        return propertyForm.getCreatedFormTemplate(true);
    }

    #createInvolvedLinks() {
        const specificProperty = this.specificProperties["involvedLinks"];
        // Create Button element
        const propertyForm = new FormGroup(specificProperty.providedFeature, this.#propertyGroupContainer);
        propertyForm._addButtonElementWithLabel(specificProperty.label, specificProperty.attributes, specificProperty.properties);
        const involvedLinksForm = propertyForm.getCreatedFormTemplate(true);

        // Prepare Table and Dialog Content
        let modalDialogConfig = specificProperty.buttonActionContent;
        const tableRows = this.#createTableRowsForLinks();
        modalDialogConfig.dialogContent.content.groups.forEach((groupElement) => {
            if (String("involved-links-table").localeCompare(groupElement.id) === 0) {
                groupElement.tableRows = tableRows;
            }
        })
        modalDialogConfig.dialogContent.header.text += ` ${this.#selectedRequestTraceElement.attr("label/textWrap/text")}`;

        // Create Modal Dialog for later Button Action
        this.#modalDialog = new UIModalDialog("entity", specificProperty.providedFeature);
        this.#modalDialog.create(modalDialogConfig.dialogContent);
        this.#modalDialog.provideCloseButtonActionConfiguration("close");
        this.#modalDialog.provideSaveButtonActionConfiguration(this.saveInvolvedLinks, "close", this);
        this.#modalDialog.render("modals", true, modalDialogConfig.dialogSize);

        return involvedLinksForm;
    }

    #createTableRowsForLinks() {
        let existingLinks = this.#selectedRequestTraceElement.graph.getLinks();

        const entityInvolvedLinks = new Set(this.#selectedRequestTraceElement.prop("entity/properties/involvedLinks")[0]);

        const tableRows = existingLinks.filter((connection) => {
            return connection.prop("entity/type") === EntityTypes.LINK
        }).map((connection) => {
            if (connection.prop("entity/type") === EntityTypes.DEPLOYMENT_MAPPING) {
                return;
            }

            let isInvalid = true;
            let targetHasParent = false;
            let parentName = "-";

            if (connection.getTargetElement() && connection.getTargetElement().parent()) {
                parentName = connection.graph.getCell(connection.getTargetElement().parent()).attr("label/textWrap/text");
                targetHasParent = true;
            } else {
                targetHasParent = false;
            }

            if (connection.getSourceElement() && connection.getTargetElement()) {
                isInvalid = targetHasParent ? false : true;
            }

            const fromElement = connection.getSourceElement() ? connection.getSourceElement().attr("label/textWrap/text") : "-";
            const toElement = connection.getTargetElement() ? connection.getTargetElement().attr("label/textWrap/text") : "-";

            return {
                from: fromElement,
                to: toElement,
                parent: parentName,
                previous: {
                    contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL,
                    disabled: true,
                    checked: entityInvolvedLinks.has(connection.id),
                    id: connection.id
                },
                included: {
                    contentType: PropertyContentType.CHECKBOX_WITHOUT_LABEL,
                    disabled: isInvalid,
                    checked: entityInvolvedLinks.has(connection.id),
                    id: connection.id
                },
                attributes: {
                    representationClass: isInvalid ? "invalidOption" : "validOption",
                    disabled: isInvalid
                }
            };
        });

        return tableRows;
    }

    saveInvolvedLinks(actionParentObject) {
        const includedLinkElements = $("#involvedLinks-table input[data-entity-property=involvedLinks-included]:checked").get();
        const newInvolvedLinks = new Array(includedLinkElements.map((checkbox) => { return checkbox.value }));
        actionParentObject.getSelectedRequestTraceElement.prop("entity/properties/involvedLinks", newInvolvedLinks, { rewrite: true, isolate: true });
    }

    get getSelectedRequestTraceElement() {
        // direct reference important here for save dialog action
        return this.#selectedRequestTraceElement;
    }
}

export default RequestTracePropertiesViewer;