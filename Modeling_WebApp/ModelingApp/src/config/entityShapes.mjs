
import EntityTypes from "./entityTypes.mjs";

// TODO section:
/*  -   Icon on first load not on correct position --> with firefox for every F5, 
 *      for Chrome and edge only for first load
 *  -   Label position
*/

// TODO decide
const defaultTextFont = "sans-serif";
// const defaultTextFont = "Roboto Condensed"
const expandEntityIconPath = "icon/magnifying-glass-plus-solid.svg";

/**
 * Shape for a Component entity. Creates a regular rectangle shape using the value of 
 * the largest side (width/height) to calculate the size. Default size is { 160, 80 }.
 * It additionally includes a label for text, and an icon to indicate if embedded entities
 * should be shown or not. The only data that should be provided for this shape is the label
 * __text__ provided as a __textWrap__ and the __position__ and possibly the __size__.
 * 
 * @example let component = new joint.shapes.qualityModel.Component({
            position: { x: 50, y: 50 },
            size: { width: 160, height: 80 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'Restaurant Service',
                    }
                }
            }
        })
 */
const Component = joint.dia.Element.define("qualityModel.Component", {
    defaults: {
        size: {
            width: 160,
            height: 80
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 160,
        height: 80
    },
    attrs: {
        body: {
            width: "calc(l)",
            height: "calc(0.5*l)",
            rx: 2,
            ry: 2,
            strokeDasharray: 0,
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape" // TODO keep?

        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "top",
            refX: "50%",
            refY: "10%",
            textWrap: {
                text: "Component",
            },
            class: "entityLabel" // TODO keep?
        },
        icon: {
            title: "Expand to show included entities",
            ref: "body",
            href: expandEntityIconPath,
            class: "expandEntityIcon",
            transform: "scale(calc(0.0018 * h))",
            refX: "50%",
            refY: "90%",
            xAlignment: "middle",
            yAlignment: "bottom",
            preserveAspectRatio: 'xMidYMin',
            visibility: "hidden",
            event: "element:icon:pointerclick"
        }

    },
    collapsed: false,
    entityTypeHidden: false,
    entity: {
        type: EntityTypes.COMPONENT
    }
}, {
    markup: [{
        tagName: "rect",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }, {
        tagName: "image",
        selector: "icon"
    }]
});


/**
 * Shape for a Service entity. Creates a regular hexagon shape using the value of 
 * the largest side (width/height) to calculate the size. Default size is { 140, 120 }.
 * It additionally includes a label for text, and an icon to indicate if embedded entities
 * should be shown or not. The only data that should be provided for this shape is the label
 * __text__ provided as a __textWrap__ and the __position__ and possibly the __size__.
 * 
 * @example let service = new joint.shapes.qualityModel.Service({
            position: { x: 50, y: 50 },
            size: { width: 140, height: 120 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'Restaurant Service',
                    }
                }
            }
        })
 */
const Service = joint.dia.Element.define("qualityModel.Service", {
    defaults: {
        size: {
            width: 140,
            height: 120
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 140,
        height: 120
    },
    attrs: {
        body: {
            points: 'calc(0.25 * l),0 calc(0.75 * l),0 calc(l),calc(0.4 * l) calc(0.75 * l),calc(0.8 * l) calc(0.25 * l),calc(0.8 * l) 0,calc(0.4 * l)',
            strokeDasharray: 0,
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape" // TODO keep?
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "top",
            refX: "50%",
            refY: "10%",
            textWrap: {
                width: "80%",
                text: "Service",
            },
            class: "entityLabel" // TODO keep?
        },
        icon: {
            title: "Expand to show included entities",
            ref: "body",
            href: expandEntityIconPath,
            class: "expandEntityIcon",
            transform: "scale(calc(0.0014 * h))",
            refX: "50%",
            refY: "95%",
            xAlignment: "middle",
            yAlignment: "bottom",
            preserveAspectRatio: 'xMidYMin',
            visibility: "hidden",
            event: "element:icon:pointerclick"
        }
    },
    collapsed: false,
    entityTypeHidden: false,
    entity: {
        type: EntityTypes.SERVICE
    }
}, {
    markup: [{
        tagName: "polygon",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }, {
        tagName: "image",
        selector: "icon"
    }]
});


/**
 * Shape for a Backing Service entity. Creates a regular rhombus shape using the value of 
 * the largest side (width/height) to calculate the size. Default size is { 200, 120 }.
 * It additionally includes a label for text, and an icon to indicate if embedded entities
 * should be shown or not. The only data that should be provided for this shape is the label
 * __text__ provided as a __textWrap__ and the __position__ and possibly the __size__.
 * 
 * @example let backingService = new joint.shapes.qualityModel.BackingService({
            position: { x: 50, y: 50 },
            size: { width: 140, height: 140 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'Restaurant Service',
                    }
                }
            }
        })
 */
const BackingService = joint.dia.Element.define("qualityModel.BackingService", {
    defaults: {
        size: {
            width: 200,
            height: 120
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 200,
        height: 120
    },
    attrs: {
        body: {
            points: "calc(0.5 * l),0 calc(l),calc(0.3 * l) calc(0.5 * l),calc(0.6 * l) 0,calc(0.3 * l)",
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape" // TODO keep?
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "top",
            refX: "50%",
            refY: "40%", // TODO Fix me
            textWrap: {
                text: "Backing Service",
            },
            class: "entityLabel" // TODO keep?
        },
        icon: {
            title: "Expand to show included entities",
            ref: "body",
            href: expandEntityIconPath,
            class: "expandEntityIcon",
            transform: "scale(calc(0.0013 * h))",
            refX: "49%",
            refY: "90%",
            xAlignment: "middle",
            yAlignment: "bottom",
            preserveAspectRatio: 'xMidYMin',
            visibility: "hidden",
            event: "element:icon:pointerclick",
        }
    },
    collapsed: false,
    entityTypeHidden: false,
    entity: {
        type: EntityTypes.BACKING_SERVICE,
        properties: {
            providedFunctionality: ""
        }
    }
}, {
    markup: [{
        tagName: "polygon",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }, {
        tagName: "image",
        selector: "icon"
    }]
});


// TODO ensure aspect ratio
const StorageBackingService = joint.shapes.standard.Cylinder.define("qualityModel.StorageBackingService", {
    defaults: {
        size: {
            width: 160,
            height: 140
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 160,
        height: 140
    },
    attrs: {
        body: {
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape" // TODO keep?
        },
        top: {
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape"
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "top",
            refY: "12%",
            textWrap: {
                width: "95%",
                text: "Storage Backing Service",
            },
            class: "entityLabel" // TODO keep?
        },
        icon: {
            title: "Expand to show included entities",
            ref: "body",
            href: expandEntityIconPath,
            class: "expandEntityIcon",
            transform: "scale(calc(0.0011 * h))",
            refX: "49%",
            refY: "95%",
            xAlignment: "middle",
            yAlignment: "bottom",
            preserveAspectRatio: 'xMidYMin',
            visibility: "hidden",
            event: "element:icon:pointerclick"
        }
    },
    collapsed: false,
    entityTypeHidden: false,
    entity: {
        type: EntityTypes.STORAGE_BACKING_SERVICE,
        properties: {
            databaseName: "",
            port: ""
        }
    }
}, {
    markup: [{
        tagName: "path",
        selector: "body"
    }, {
        tagName: "ellipse",
        selector: "top"
    }, {
        tagName: "text",
        selector: "label"
    }, {
        tagName: "image",
        selector: "icon"
    }]
});


/**
 * Shape for an Endpoint entity. Creates a circle shape using the value of the smallest 
 * side (width/height) to calculate the size. Default size is { 50, 50 }. It additionally 
 * includes a label for text. The only data that should be provided for this shape is the label
 * __text__ provided as a __textWrap__ and the __position__ and possibly the __size__.
 * 
 * @example let endpoint = new joint.shapes.qualityModel.Endpoint({
            position: { x: 50, y: 50 },
            size: { width: 50, height: 50 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'POST /order',
                    }
                }
            }
        })
 */
const Endpoint = joint.shapes.standard.Circle.define("qualityModel.Endpoint", {
    defaults: {
        size: {
            width: 50,
            height: 50
        },
        fontSize: 11,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 50,
        height: 50
    },
    attrs: {
        body: {
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            strokeDasharray: '0'
        },
        label: {
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            textWrap: {
                text: "Endpoint"
            }
        }
    },
    entityTypeHidden: false,
    parentCollapsed: false,
    entity: {
        type: EntityTypes.ENDPOINT,
        isEmbedded: false,
        properties: {
            endpointType: "",
            endpointPath: "",
            port: ""
        }
    }
}, {
    markup: [{
        tagName: "circle",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }]
});


/**
 * Shape for an External Endpoint entity. Creates a black filled circle shape using the value 
 * of the smallest side (width/height) to calculate the size. Default size is { 50, 50 }. It 
 * additionally includes a label for text. The only data that should be provided for this shape 
 * is the label __text__ provided as a __textWrap__ and the __position__ and possibly the 
 * __size__.
 * 
 * @example let externalEndpoint = new joint.shapes.qualityModel.ExternalEndpoint({
            position: { x: 50, y: 50 },
            size: { width: 50, height: 50 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'POST /order',
                    }
                }
            }
        })
 */
const ExternalEndpoint = joint.shapes.standard.Circle.define("qualityModel.ExternalEndpoint", {
    defaults: {
        size: {
            width: 50,
            height: 50
        },
        fontSize: 11,
        fill: "black",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 50,
        height: 50
    },
    attrs: {
        body: {
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2,
            strokeDasharray: '0'
        },
        label: {
            fill: "white",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            textWrap: {
                text: "External Endpoint",
            },
        }
    },
    entityTypeHidden: false,
    parentCollapsed: false,
    entity: {
        type: EntityTypes.EXTERNAL_ENDPOINT,
        isEmbedded: false,
        properties: {
            endpointType: "",
            endpointPath: "",
            port: ""
        }
    }
}, {
    markup: [{
        tagName: "circle",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }]
});


/**
 * Shape for a Infrastructure entity. Creates an isosceles trapezoid shape using the value of 
 * the largest side (width/height) to calculate the size. Default size is { 180, 90 }.
 * It additionally includes a label for text, and an icon to indicate if embedded entities
 * should be shown or not. The only data that should be provided for this shape is the label
 * __text__ provided as a __textWrap__ and the __position__ and possibly the __size__.
 * 
 * @example let infrastructure = new joint.shapes.qualityModel.Infrastructure({
            position: { x: 50, y: 50 },
            size: { width: 180, height: 90 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'Docker Host',
                    }
                }
            }
        })
 */
const Infrastructure = joint.dia.Element.define("qualityModel.Infrastructure", {
    defaults: {
        size: {
            width: 180,
            height: 90
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 180,
        height: 90
    },
    attrs: {
        body: {
            points: 'calc(0.15 * l),0 calc(0.85 * l),0 calc(l),calc(0.5 * l) 0,calc(0.5 * l)',
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape" // TODO keep?
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "top",
            refX: "50%",
            // refY: "10%",
            y: "calc(y + 10)",
            textWrap: {
                text: "Backing Service",
            },
            class: "entityLabel" // TODO keep?
        },
        icon: {
            title: "Expand to show included entities",
            ref: "body",
            href: expandEntityIconPath,
            class: "expandEntityIcon",
            transform: "scale(calc(0.0017 * h))",
            refX: "49%",
            refY: "90%",
            xAlignment: "middle",
            yAlignment: "bottom",
            preserveAspectRatio: 'xMidYMin',
            visibility: "hidden",
            event: "element:icon:pointerclick"
        }
    },
    entityTypeHidden: false,
    collapsed: false,
    entity: {
        type: EntityTypes.INFRASTRUCTURE
    }
}, {
    markup: [{
        tagName: "polygon",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }, {
        tagName: "image",
        selector: "icon"
    }]
});


/**
 * Shape for a Request Trace entity. Creates an arrow-shaped polygon shape using the value of 
 * the largest side (width/height) to calculate the size. Default size is { 190, 76 }.
 * It additionally includes a label for text, and an icon which allows to inspect the details 
 * of the entity, which means showing all involved entities. The only data that should be provided 
 * for this shape is the label __text__ provided as a __textWrap__ and the __position__ and 
 * possibly the __size__.
 * 
 * @example let requestTrace = new joint.shapes.qualityModel.RequestTrace({
            position: { x: 50, y: 50 },
            size: { width: 190, height: 76 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'POST /orders',
                    }
                }
            }
        })
 */
const RequestTrace = joint.dia.Element.define("qualityModel.RequestTrace", {
    defaults: {
        size: {
            width: 190,
            height: 76
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 190,
        height: 76
    },
    attrs: {
        body: {
            points: '0,0 calc(0.8 * l),0 calc(l),calc(0.2 * l) calc(0.8 * l),calc(0.4 * l) 0,calc(0.4 * l) calc(0.2 * l),calc(0.2 * l)',
            strokeWidth: 2,
            stroke: "black",
            fill: "white",
            class: "entityShape" // TODO keep?
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "top",
            refX: "47%",
            refY: "10%",
            textWrap: {
                text: "Backing Service",
            },
            class: "entityLabel" // TODO keep?
        },
        icon: {
            title: "Expand to show included entities",
            ref: "body",
            href: expandEntityIconPath,
            class: "expandEntityIcon",
            transform: "scale(calc(0.0021 * h))",
            refX: "49%",
            refY: "90%",
            xAlignment: "middle",
            yAlignment: "bottom",
            preserveAspectRatio: 'xMidYMin',
            visibility: "visible",
            event: "requestTrace:icon:pointerclick"
        }
    },
    entityTypeHidden: false,
    collapsed: true,
    entity: {
        type: EntityTypes.REQUEST_TRACE,
        properties: {
            referredEndpoint: "",
            involvedLinks: []
        }
    }
}, {
    markup: [{
        tagName: "polygon",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }, {
        tagName: "image",
        selector: "icon"
    }]
});


/**
 * Shape for a Link entity. Creates a solid line with an arrow at the end. Normally not used as standalone 
 * but as a connection between to other entities. It additionally includes a label for text. The only data 
 * that should be provided for this shape is the label __text__ provided as a __textWrap__ and the 
 * __position__ and possibly the __size__.
 * 
 * @example let link = new joint.shapes.qualityModel.Link({
            source: new g.Point(30, 250),
            target: new g.Point(100, 250),
        })
        
        // To provide a label:
        link.appendLabel({
            attrs: {
                text: {
                    text: "connects-to"
                }
            }
        })
 */
const Link = joint.shapes.standard.Link.define("qualityModel.Link", {
    attrs: {
        root: {
            title: "Link"
        },
        line: {
            stroke: "black",
            strokeDasharray: "none",
            strokeWidth: 2,
            strokeLineJoin: "round",
            targetMarker: {
                type: "path",
                d: "M 10 -5 0 0 10 5 z"
            }
        }
    },
    entityTypeHidden: false,
    entity: {
        type: EntityTypes.LINK,
        properties: {
            relationType: ""
        }
    }
});


/**
 * Shape for a Deployment Mapping entity. Creates an dashed line. Normally not used as standalone but as
 * a connection between to other entities. It additionally includes a label for text. The only data that 
 * should be provided for this shape is the label __text__  provided as a __textWrap__ and the 
 * __position__ and possibly the __size__.
 * 
 * @example let deploymentMapping = new joint.shapes.qualityModel.DeploymentMapping({
            source: new g.Point(30, 250),
            target: new g.Point(100, 250),
        })

        // To provide a label:
        deploymentMapping.appendLabel({
            attrs: {
                text: {
                    text: "hosted-on"
                }
            }
        })
 */
const DeploymentMapping = joint.shapes.standard.Link.define("qualityModel.DeploymentMapping", {
    attrs: {
        root: {
            title: "Deployment Mapping"
        },
        line: {
            stroke: "black",
            strokeDasharray: 4,
            strokeLineJoin: "round",
            targetMarker: "none",
            markerEnd: "none"
        }
    },
    entityTypeHidden: false,
    entity: {
        type: EntityTypes.DEPLOYMENT_MAPPING
    }
});


/**
 * Shape for a Data Aggregate entity. Creates an ellipse shape using the value of the largest 
 * side (width/height) to calculate the size. Default size is { 50, 25 }. It additionally includes 
 * a label for text. The only data that should be provided for this shape is the label __text__ 
 * provided as a __textWrap__ and the __position__ and possibly the __size__.
 * 
 * @example let dataAggregate = new joint.shapes.qualityModel.DataAggregate({
            position: { x: 50, y: 50 },
            size: { width: 50, height: 25 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'Order',
                    }
                }
            }
        })
 */
const DataAggregate = joint.dia.Element.define("qualityModel.DataAggregate", {
    defaults: {
        size: {
            width: 50,
            height: 25
        },
        fontSize: 13,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 50,
        height: 25
    },
    attrs: {
        body: {
            rx: "calc(l)",
            ry: "calc(0.5 * l)",
            cx: "calc(l)",
            cy: "calc(0.5 * l)",
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            strokeDasharray: '0'
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            refX: '50%',
            refY: '50%',
            textWrap: {
                text: "Data Aggregate",
            }
        }
    },
    entityTypeHidden: false,
    parentCollapsed: false,
    entity: {
        type: EntityTypes.DATA_AGGREGATE,
        isEmbedded: false,
        properties: {
            /**
             * Identifies whether the Data Aggregate is contained 
             * in multiple entities and which ones belong together 
             */
            assignedFamily: "",
            embedded : {
                parentId: "",
                parentRelation: ""
            }
        }
    }
}, {
    markup: [{
        tagName: "ellipse",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }]
});


/**
 * Shape for a Backing Data entity. Creates the delay shape of flow chart diagrams using the value of 
 * the largest side (width/height) to calculate the size. Default size is { 100, 60 }.
 * It additionally includes a label for text, and an icon which allows to inspect the details 
 * of the entity, which means showing all involved entities. The only data that should be provided 
 * for this shape is the label __text__ provided as a __textWrap__ and the __position__ and 
 * possibly the __size__.
 * 
 * @example let backingData = new joint.shapes.qualityModel.BackingData({
            position: { x: 50, y: 50 },
            size: { width: 100, height: 60 },
            attrs: {
                label: {
                    textWrap: {
                        text: 'Database Configuration',
                    }
                }
            }
        })
 */
const BackingData = joint.dia.Element.define("qualityModel.BackingData", {
    defaults: {
        size: {
            width: 100,
            height: 60
        },
        fontSize: 14,
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    },
    size: {
        width: 100,
        height: 60
    },
    attrs: {
        body: {
            d: "M 0 0 L calc(0.7 * l) 0 Q calc(l) 0 calc(l) calc(0.3 * l) Q calc(l) calc(0.6 * l) calc(0.7 * l) calc(0.6 * l) L 0 calc(0.6 * l) Z",
            fill: "white",
            stroke: "black",
            strokeWidth: 2,
            strokeDasharray: "0"
        },
        label: {
            ref: "body",
            fill: "black",
            fontFamily: defaultTextFont,
            fontWeight: "Normal",
            fontSize: 14,
            strokeWidth: 0,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            refX: '50%',
            refY: '50%',
            textWrap: {
                text: "Backing Data",
            }
        }
    },
    entityTypeHidden: false,
    parentCollapsed: false,
    entity: {
        type: EntityTypes.BACKING_DATA,
        isEmbedded: false,
        properties: {
            includedData: [],
            /**
             * Identifies whether the Data Aggregate is contained 
             * in multiple entities and which ones belong together 
             */
            assignedFamily: "",
        }
    }
}, {
    markup: [{
        tagName: "path",
        selector: "body"
    }, {
        tagName: "text",
        selector: "label"
    }]
});


export {
    Component, Service, BackingService, StorageBackingService,
    Endpoint, ExternalEndpoint, Link,
    Infrastructure, DeploymentMapping,
    RequestTrace, DataAggregate, BackingData
};