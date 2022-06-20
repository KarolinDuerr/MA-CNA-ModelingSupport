import { ToolbarElementType } from "../representations/guiElements.toolbarTools.mjs";
import EntityTypes from "./entityTypes.mjs";

const ItemType = Object.freeze({
    BUTTON: "button",
    CHECKBOX: "checkbox"
});

const UIContentType = Object.freeze({
    SINGLE_TEXTBLOCK: "textBlock",
    GROUP_FORMS: "groupForms"
})

const ToolbarConfig = {
    Tools: [
        {
            buttonGroupId: "general-paper-actions",
            content: [
                {
                    providedFeature: "fullScreen",
                    tooltipText: "Open fullscreen",
                    text: "",
                    iconClass: "fa-solid fa-expand",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                },
                {
                    providedFeature: "closefullScreen",
                    tooltipText: "Close fullscreen",
                    text: "",
                    iconClass: "fa-solid fa-compress",
                    additionalCssClass: "buttonInitialHide",
                    buttonType: ToolbarElementType.BUTTON
                },
                {
                    providedFeature: "fitActivePaperToContent",
                    tooltipText: "Fit paper to content",
                    text: "",
                    iconClass: "fa-solid fa-crop",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                },
                // {
                //     providedFeature: "lockPaperInteractivity",
                //     tooltipText: "Lock modeling area and disable interactivity",
                //     text: "",
                //     iconClass: "fa-solid fa-lock",
                //     additionalCssClass: "",
                //     buttonType: ToolbarElementType.BUTTON
                // },
                // {
                //     providedFeature: "unlockPaperInteractivity",
                //     tooltipText: "Unlock modeling area and enable interactivity",
                //     text: "",
                //     iconClass: "fa-solid fa-unlock-keyhole",
                //     additionalCssClass: "buttonInitialHide",
                //     buttonType: ToolbarElementType.BUTTON
                // }
            ]
        },
        {
            buttonGroupId: "extern-clear",
            content: [
                {
                    providedFeature: "clearActivePaper",
                    tooltipText: "Clear current paper",
                    text: "",
                    iconClass: "fa-solid fa-trash-can",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                },
                {
                    providedFeature: "printActivePaper",
                    tooltipText: "Print current paper",
                    text: "",
                    iconClass: "fa-solid fa-print",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                },
                {
                    providedFeature: "convertModeledSystemEntity",
                    tooltipText: "Export modeled System",
                    text: "",
                    iconClass: "fa-solid fa-download",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON_DROPDOWN,
                    dropdownButtons: [
                        {
                            providedFeature: "convertModeledSystemEntityToJson",
                            tooltipText: "Export modeled System to JSON",
                            text: "Export to JSON",
                            iconClass: "bi bi-filetype-json",
                            additionalCssClass: ""
                        },
                        {
                            providedFeature: "convertModeledSystemEntityToTosca",
                            tooltipText: "Export modeled System to TOSCA",
                            text: "Transform to TOSCA",
                            iconClass: "bi bi-filetype-yml",
                            additionalCssClass: ""
                        }
                    ]
                }
            ]
        },
        {
            buttonGroupId: "zoom",
            content: [
                {
                    providedFeature: "zoomOutPaper",
                    tooltipText: "Zoom out from modeling area",
                    text: "",
                    iconClass: "fa-solid fa-magnifying-glass-minus",
                    additionalCssClass: "",
                    buttonType: "range-label-buttons"
                },
                {
                    providedFeature: "zoomInPaper",
                    tooltipText: "Zoom into modeling area",
                    text: "",
                    iconClass: "fa-solid fa-magnifying-glass-plus",
                    additionalCssClass: "",
                    buttonType: "range-label-buttons"
                }
            ]
        },
        {
            buttonGroupId: "paper-background",
            content: [
                {
                    providedFeature: "changeGrid",
                    // tooltipText: "Change grid appearance",
                    tooltipText: "Clear grid",
                    text: "",
                    iconClass: "fa-solid fa-border-all",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                },
                {
                    providedFeature: "fitAllElementsToEmbedded",
                    tooltipText: "Fit elements to embedded",
                    text: "",
                    // iconClass: "fa-solid fa-up-down-left-right",
                    iconClass: "bi bi-aspect-ratio-fill",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                }
            ]
        },
        // TODO keep here?
        {
            buttonGroupId: "paper-individual-elements",
            content: [
                {
                    providedFeature: "expandAll",
                    tooltipText: "Expand all entities",
                    text: "",
                    // iconClass: "fa-solid fa-circle-plus",
                    iconClass: "fa-regular fa-square-plus",
                    // iconClass: "fa-solid fa-arrows-left-right-to-line",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                },
                {
                    providedFeature: "collapseAll",
                    tooltipText: "Collapse all entities",
                    text: "",
                    // iconClass: "fa-solid fa-circle-minus",
                    iconClass: "fa-regular fa-square-minus",
                    // iconClass: "fa-solid fa-square-minus",
                    additionalCssClass: "",
                    buttonType: ToolbarElementType.BUTTON
                }
            ]
        },
        {
            buttonGroupId: "requestTraceView",
            content: [
                {
                    providedFeature: "exitRequestTraceView",
                    tooltipText: "Exit current Request Trace view",
                    iconClass: "fa-solid fa-arrow-right-from-bracket",
                    additionalCssClass: "buttonInitialHide btn-danger exitRequestTraceView",
                    buttonType: ToolbarElementType.BUTTON
                }
            ]
        }
    ],

    EntityConfig: [
        {
            entityType: EntityTypes.COMPONENT,
            labelText: "Component",
            tooltipText: "Show/Hide all Component entities"
        },
        {
            entityType: EntityTypes.SERVICE,
            labelText: "Service",
            tooltipText: "Show/Hide all Service entities"
        },
        {
            entityType: EntityTypes.BACKING_SERVICE,
            labelText: "Backing Service",
            tooltipText: "Show/Hide all Backing Service entities"
        },
        {
            entityType: EntityTypes.STORAGE_BACKING_SERVICE,
            labelText: "Storage Backing Service",
            tooltipText: "Show/Hide all Storage Backing Service entities"
        },
        {
            entityType: EntityTypes.ENDPOINT,
            labelText: "Endpoint",
            tooltipText: "Show/Hide all Endpoint entities"
        },
        {
            entityType: EntityTypes.EXTERNAL_ENDPOINT,
            labelText: "External Endpoint",
            tooltipText: "Show/Hide all External Endpoint entities"
        },
        {
            entityType: EntityTypes.LINK,
            labelText: "Link",
            tooltipText: "Show/Hide all Link entities"
        },
        {
            entityType: EntityTypes.INFRASTRUCTURE,
            labelText: "Infrastructure",
            tooltipText: "Show/Hide all Infrastructure entities"
        },
        {
            entityType: EntityTypes.DEPLOYMENT_MAPPING,
            labelText: "Deployment Mapping",
            tooltipText: "Show/Hide all Deployment Mapping entities"
        },
        {
            entityType: EntityTypes.REQUEST_TRACE,
            labelText: "Request Trace",
            tooltipText: "Show/Hide all Request Trace entities"
        },
        {
            entityType: EntityTypes.DATA_AGGREGATE,
            labelText: "Data Aggregate",
            tooltipText: "Show/Hide all Data Aggregate entities"
        },
        {
            entityType: EntityTypes.BACKING_DATA,
            labelText: "Backing Data",
            tooltipText: "Show/Hide all Backing Data entities"
        }
    ],

    ToolbarRowConfig: [
        {
            rowIndex: 1,
            tools: [
                {
                    groupId: "settings",
                    content: [
                        {
                            buttonType: ItemType.BUTTON,
                            providedFeature: "applicationSettings",
                            tooltipText: "Edit application settings",
                            text: "",
                            iconClass: "fa-solid fa-gear",
                            additionalCssClass: ""
                        }
                    ]
                },
                {
                    groupId: "additionalToolbar",
                    content: [
                        {
                            buttonType: ItemType.BUTTON,
                            providedFeature: "showEntityToolbarRow",
                            tooltipText: "Show entity specific options",
                            text: "",
                            iconClass: "fa-solid fa-angles-down",
                            additionalCssClass: "buttonInitialHide"
                        }
                    ]
                }
            ]
        },
        {
            rowIndex: 2,
            tools: [
                {
                    groupId: "entireToolbarSecondRow",
                    content: [
                        {
                            buttonType: ItemType.BUTTON,
                            providedFeature: "hideEntityToolbarRow",
                            tooltipText: "Hide entity specific options",
                            text: "",
                            iconClass: "fa-solid fa-angles-up",
                            additionalCssClass: ""
                        }
                    ]
                }
            ]
        }
    ],

    ToolbarButtonActionConfig: {
        "clearActivePaper": {
            type: "modalDialog",
            header: {
                iconClass: "fa-solid fa-triangle-exclamation",
                type: "warning",
                text: "Warning",
                closeButton: true
            },
            footer: {
                cancelButtonText: "No, cancel",
                saveButtonIconClass: "fa-solid fa-trash-can",
                saveButtonText: "Yes, clear paper"
            },
            content: {
                contentType: UIContentType.SINGLE_TEXTBLOCK,
                text: "Are you sure you want to clear the entire paper? You won't be able to undo this action."
            }
        },
        "convertToTosca": {
            type: "modalDialog",
            header: {
                iconClass: "fa-solid fa-triangle-exclamation",
                type: "warning",
                text: "Warning",
                closeButton: true
            },
            footer: {
                cancelButtonText: "No, cancel",
                saveButtonIconClass: "fa-solid fa-download",
                saveButtonText: "Yes, start TOSCA transformation."
            },
            content: {
                contentType: UIContentType.SINGLE_TEXTBLOCK,
                text: `The TOSCA export uses the labels of the respective entities as keys for the node_templates that represent the modeled entities. Therefore, please make sure, each entity
                has a unique label name, otherwise an entity might be missing in the export. Are you sure, you want to continue?`
            }
        }
    }
}

export { UIContentType };
export default ToolbarConfig;