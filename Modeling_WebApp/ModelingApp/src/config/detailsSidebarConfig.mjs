import EntityTypes from "./entityTypes.mjs";

const PropertyContentType = Object.freeze({
    BUTTON: "button",
    CHECKBOX: "checkbox",
    CHECKBOX_WITHOUT_LABEL: "checkbox-without-label",
    INPUT_TEXTBOX: "text",
    INPUT_TEXTBOX_LABEL_PREPEND: "text-label-prepend",
    INPUT_NUMBERBOX: "number",
    INPUT_RANGE: "range",
    TEXTAREA: "textarea",
    INFO: "info",
    DROPDOWN: "select",
    INPUT_LIST: "list",
    TABLE_DIALOG: "table-dialog",
    TABLE: "table",
    TOGGLE: "toggle",
    FORMGROUP: "formgroup"
});

const ParentRelation = Object.freeze({
    USED: "used",
    PERSISTED: "persisted"
});

const dataAggregateSvgRepresentation = (svgElementId = "", fillColour = "white", opacity = 1) => {
    return `<ellipse ${svgElementId ? `id="${svgElementId}"` : ''} cx="13" cy="9" rx="12" ry="6" stroke="black" fill="${fillColour}" opacity="${opacity}"/>`;
};

const backingDataSvgRepresentation = (svgElementId = "", fillColour = "white", opacity = 1) => {
    return `<path ${svgElementId ? `id="${svgElementId}"` : ''} d="M 0 0 L 16.8 0 Q 24 0 24 7.2 Q 24 14.4 16.8 14.4 L 0 14.4 Z" transform="translate(1, 1.5)" opacity="${opacity}" stroke-width="1" stroke-dasharray="0" stroke="black" fill="${fillColour}"></path>`;
};

const DetailsSidebarConfig = {
    EntityHighlighting: [
        {
            type: EntityTypes.DATA_AGGREGATE,
            labelText: "Data Aggregate",
            svgRepresentation: `<svg width="30" height="20">${dataAggregateSvgRepresentation("data-aggregate-highlightingRepresentation", "gold", 0.4)}</svg>`,
            highlightColour: "gold"
        },
        {
            type: EntityTypes.BACKING_DATA,
            labelText: "Backing Data",
            svgRepresentation: `<svg width="30" height="20">${backingDataSvgRepresentation("backing-data-highlightingRepresentation", "limegreen", 0.4)}</svg>`,
            highlightColour: "limegreen"
        }
    ],
    GeneralProperties: {
        entity: {
            headline: "Entity Specific",
            iconClass: "fa-solid fa-sliders",
            options: [
                {
                    providedFeature: "entity-specific-info",
                    contentType: PropertyContentType.INFO,
                    content: {
                        iconClass: "fa-solid fa-info",
                        text: "Properties included here will not change any presentation details but provide additional information, which is especially relevant for a TOSCA transformation."
                    }
                }
            ]
        },
        label: {
            headline: "Entity Label",
            iconClass: "fa-solid fa-font",
            options: [
                {
                    providedFeature: "entity-text",
                    contentType: PropertyContentType.TEXTAREA,
                    label: "Text:",
                    properties: {
                        disabled: false
                    },
                    attributes: {
                        rows: 1,
                        maxlength: 200,
                        helpText: {
                            text: "Use enter key to submit change."
                        },
                        provideEnterButton: false
                    }
                },
                {
                    providedFeature: "entity-font-size",
                    contentType: PropertyContentType.INPUT_RANGE,
                    label: "Font Size:",
                    properties: {
                        disabled: false
                    },
                    attributes: {
                        min: 8,
                        max: 24,
                        defaultValue: 14,
                        step: 1,
                        helpText: {
                            text: "Use enter key to submit change."
                        },
                        provideEnterButton: false
                    },
                }
            ]
        },
        size: {
            headline: "Entity Size",
            iconClass: "fa-solid fa-vector-square",
            options: [
                {
                    providedFeature: "entity-width",
                    contentType: PropertyContentType.INPUT_NUMBERBOX,
                    label: "Width:",
                    properties: {
                        disabled: false
                    },
                    attributes: {
                        min: 40,
                        maxlength: 5
                    }
                },
                {
                    providedFeature: "entity-height",
                    contentType: PropertyContentType.INPUT_NUMBERBOX,
                    label: "Height:",
                    properties: {
                        disabled: true
                    },
                    attributes: {
                        min: 40,
                        maxlength: 5,
                        helpText: {
                            text: "The value will be calculated based on the given width to preserve the aspect ratio of the entity shape"
                        }
                    }
                },
                {
                    providedFeature: "entity-aspect-ratio",
                    contentType: PropertyContentType.CHECKBOX,
                    label: "Preserve aspect ratio",
                    properties: {
                        disabled: true,
                        checked: true
                    }
                }
            ]
        },
        position: {
            headline: "Entity Position",
            iconClass: "fa-solid fa-crosshairs",
            options: [
                // {
                //     providedFeature: "entity-position-info",
                //     contentType: PropertyContentType.INFO,

                // },
                {
                    providedFeature: "entity-x-position",
                    contentType: PropertyContentType.INPUT_NUMBERBOX,
                    label: "X-Coordinate:",
                    properties: {
                        disabled: false
                    },
                    attributes: {
                        min: 21
                        // TODO max?
                    }
                },
                {
                    providedFeature: "entity-y-position",
                    contentType: PropertyContentType.INPUT_NUMBERBOX,
                    label: "Y-Coordinate:",
                    properties: {
                        disabled: false
                    },
                    attributes: {
                        min: 21
                        // TODO max?
                    }
                }
            ]
        }
    }
};

const EntityGeneralProperties = {
    "entity-text": {
        // to identify whether to use element.attr() or element.prop() later
        isProperty: false,
        modelPath: "label/textWrap/text",
        defaultPropPath: "",
        min: ""
    },
    "entity-font-size": {
        isProperty: false,
        modelPath: "label/fontSize",
        defaultPropPath: "defaults/fontSize",
        min: "6"
    },
    "entity-width": {
        isProperty: true,
        hasProvidedMethod: true,
        modelPath: "size/width",
        defaultPropPath: "defaults/size/width",
        minPath: "defaults/size/width"
    },
    "entity-height": {
        isProperty: true,
        hasProvidedMethod: true,
        modelPath: "size/height",
        defaultPropPath: "defaults/size/height",
        minPath: "defaults/size/height"
    },
    "entity-aspect-ratio": {
        isProperty: true,
        modelPath: "defaults/size",
        defaultPropPath: "",
        helpText: "The value will be calculated based on the given width to preserve the aspect ratio of the entity shape",
        min: ""
    },
    "entity-x-position": {
        isProperty: true,
        hasProvidedMethod: true,
        modelPath: "position/x",
        defaultPropPath: "",
        min: "21"
    },
    "entity-y-position": {
        isProperty: true,
        hasProvidedMethod: true,
        modelPath: "position/y",
        defaultPropPath: "",
        min: "21"
    }
};

const linkSvgRepresentation = () => {
    // let marker = '<defs><marker id="arrowHead" orient="auto" overflow="visible" markerUnits="userSpaceOnUse"><path id="v-66" stroke="black" fill="black" transform="rotate(180)" d="M 10 -5 0 0 10 5 z"></path></marker></defs>';
    let marker = '<defs><marker id="arrowHead" orient="auto" overflow="visible" markerUnits="userSpaceOnUse"><path id="v-66" stroke="black" fill="black" transform="rotate(180)" d="M 8 -4.5 0 0 8 4.5 z"></path></marker></defs>';
    let pathElement = '<path d="M 1 8 L 27 8" marker-end="url(#arrowHead)" fill="none" stroke="black" stroke-dasharray="none" stroke-width="2" stroke-line-join="round" stroke-linejoin="round"</path>';
    return marker + pathElement;
}

const EntityDetailsConfig = {
    Component: {
        type: EntityTypes.COMPONENT,
        specificProperties: []
    },
    Service: {
        type: EntityTypes.SERVICE,
        specificProperties: []
    },
    BackingService: {
        type: EntityTypes.BACKING_SERVICE,
        specificProperties: [
            {
                providedFeature: "providedFunctionality",
                contentType: PropertyContentType.INPUT_TEXTBOX,
                label: "Provided Functionality:",
                properties: {
                    disabled: false,
                    required: false
                },
                attributes: {
                    placeholder: "e.g. Logging",
                    helpText: {
                        text: "A short description of the provided functionality."
                    }
                }
            }
        ]
    },
    StorageBackingService: {
        type: EntityTypes.STORAGE_BACKING_SERVICE,
        specificProperties: [
            {
                providedFeature: "databaseName",
                contentType: PropertyContentType.INPUT_TEXTBOX,
                label: "Database Name:",
                properties: {
                    disabled: false,
                    required: false
                },
                attributes: {
                    placeholder: "e.g. Order"
                }
            },
            {
                providedFeature: "databasePort",
                contentType: PropertyContentType.INPUT_NUMBERBOX,
                label: "Port:",
                properties: {
                    disabled: false,
                    required: false
                },
                attributes: {
                    placeholder: "e.g. 3306",
                    maxlength: 4
                }
            }
        ]
    },
    Endpoint: {
        type: EntityTypes.ENDPOINT,
        specificProperties: [
            // {
            //     providedFeature: "protocol"
            // },
            {
                providedFeature: "endpointType",
                contentType: PropertyContentType.INPUT_LIST,
                label: "Endpoint Type:",
                properties: {
                    disabled: false,
                    required: true
                },
                attributes: {
                    placeholder: "e.g. GET",
                    datalistItems: [
                        {
                            value: "GET",
                            text: "GET"
                        },
                        {
                            value: "POST",
                            text: "POST"
                        },
                        {
                            value: "Topic send-to",
                            text: "Topic send-to"
                        },
                        {
                            value: "Topic receive-from",
                            text: "Topic receive-from"
                        }
                    ]
                }
            },
            {
                providedFeature: "endpointPath",
                contentType: PropertyContentType.INPUT_TEXTBOX,
                label: "Endpoint Path:",
                properties: {
                    disabled: false,
                    required: true
                },
                attributes: {
                    placeholder: "e.g. /orders"
                }
            },
            {
                providedFeature: "port",
                contentType: PropertyContentType.INPUT_NUMBERBOX,
                label: "Port:",
                properties: {
                    disabled: false,
                    required: false
                },
                attributes: {
                    placeholder: "e.g. 3306",
                    maxlength: 4
                }
            }
        ]
    },
    ExternalEndpoint: {
        type: EntityTypes.EXTERNAL_ENDPOINT,
        specificProperties: [
            // {
            //     providedFeature: "protocol"
            // },
            {
                providedFeature: "endpointType",
                contentType: PropertyContentType.INPUT_LIST,
                label: "Endpoint Type:",
                properties: {
                    disabled: false,
                    required: true
                },
                attributes: {
                    placeholder: "e.g. GET",
                    datalistItems: [
                        {
                            value: "GET",
                            text: "GET"
                        },
                        {
                            value: "POST",
                            text: "POST"
                        },
                        {
                            value: "Topic send-to",
                            text: "Topic send-to"
                        },
                        {
                            value: "Topic receive-from",
                            text: "Topic receive-from"
                        }
                    ]
                }
            },
            {
                providedFeature: "endpointPath",
                contentType: PropertyContentType.INPUT_TEXTBOX,
                label: "Endpoint Path:",
                properties: {
                    disabled: false,
                    required: true
                },
                attributes: {
                    placeholder: "e.g. /orders"
                }
            },
            {
                providedFeature: "port",
                contentType: PropertyContentType.INPUT_NUMBERBOX,
                label: "Port:",
                properties: {
                    disabled: false,
                    required: false
                },
                attributes: {
                    placeholder: "e.g. 3306",
                    maxlength: 4 // does not work...
                }
            }
        ]
    },
    Link: {
        type: EntityTypes.LINK,
        specificProperties: [
            {
                providedFeature: "relationType",
                contentType: PropertyContentType.INPUT_TEXTBOX,
                label: "Relation Type:",
                properties: {
                    disabled: false,
                    required: false
                },
                attributes: {
                    placeholder: "e.g. subscribes to"
                }
            }
        ]
    },
    Infrastructure: {
        type: EntityTypes.INFRASTRUCTURE,
        specificProperties: [/* currently no properties */]
    },
    DeploymentMapping: {
        type: EntityTypes.DEPLOYMENT_MAPPING,
        specificProperties: [/* currently no properties */]
    },
    DataAggregate: {
        type: EntityTypes.DATA_AGGREGATE,
        specificProperties: [

            // TODO remove
            // {
            //     providedFeature: "used",
            //     contentType: PropertyContentType.INPUT_TEXTBOX,
            //     label: "Relation to Parent:",
            //     disabled: false,
            //     placeholder: "e.g. subscribes to",
            //     required: false
            // }
        ]
    },
    BackingData: {
        type: EntityTypes.BACKING_DATA,
        specificProperties: [

        ]
    }
};

const ColourConfig = {
    // entityHighlighting: "aqua"
    // entityHighlighting: "cyan"
    // entityHighlighting: "coral"
    entityHighlighting: "orange"
}

export {
    PropertyContentType, ParentRelation, DetailsSidebarConfig,
    EntityGeneralProperties, EntityDetailsConfig, ColourConfig,
    dataAggregateSvgRepresentation, backingDataSvgRepresentation
};