
import { DeploymentMapping, Link } from "../config/entityShapes.mjs";
import EntityTypes from "../config/entityTypes.mjs";
import { UIContentType } from "../config/toolbarConfiguration.mjs";
import UIModalDialog from "../representations/guiElements.dialog.mjs";
import ConnectionSelectionTools from "./tools/connectionSelectionTools.mjs";

const ModelingArea = joint.mvc.View.extend({

    className: "modelingArea",

    el: ".visible-modeling-area",

    _paper: null,

    _currentSelection: "",
    _currentRequestTraceViewSelection: "",

    _hiddenEntities: new Set(),

    options: {
        el: ".visible-modeling-area",
        graph: null,
        paper: null
    },

    init() {
        if (!(this.options.graph instanceof joint.dia.Graph)) {
            throw new TypeError("ModelingArea: The provided graph has to be a joint.dia.Graph element");
        }

        this._createModelingArea();
        this.$document = $(this.el.ownerDocument);

        let paper = new joint.dia.Paper({
            el: $("#jointPaper"),
            width: 1200,
            height: 3000,
            gridSize: 10,
            drawGrid: true,
            model: this.options.graph,
            embeddingMode: true,
            background: {
                color: "rgba(192, 192, 192, 0.3)"
            },
            async: true,
            sorting: joint.dia.Paper.sorting.APPROX,

            cellNamespace: joint.shapes,
            routerNamespace: joint.routers,

            // defaults:
            defaultLink: (cellView, magnet) => this.defaultLink(cellView, magnet),
            defaultRouter: {
                name: "manhattan"
            },
            defaultConnector: {
                name: "rounded",
                args: {
                    radius: 4
                }
            },
            defaultConnectionPoint: {
                name: "boundary",
                args: {
                    sticky: true,
                    stroke: true
                }
            },

            linkView: joint.dia.LinkView.extend({
                pointerdblclick: function (evt, x, y) {
                    this.addVertex(x, y);
                }
            }),

            // validation methods
            validateConnection: (cellViewS, magnetS, cellViewT, magnetT, end, linkView) => this.validateLinks(cellViewS, magnetS, cellViewT, magnetT, end, linkView),
            validateEmbedding: (chieldView, parentView) => this.validateEmbedding(chieldView, parentView),
            validateUnembedding: (chieldView) => this.validateUnembedding(chieldView),
            allowLink: (linkView, paper) => this.checkCreatedLink(linkView, paper),

            interactive: { labelMove: false, addLinkFromMagnet: true, linkMove: true, vertexAdd: false },
            // Restricts modeling area to defined paper width and height with a small padding because of tools
            restrictTranslate: true,
            // TODO fix Data Aggregate entity + FIX me for zoom
            // restrictTranslate: (elementView, x0, y0) => {
            //     let restrictedWidth = elementView.paper.options.width - 20 - 25;
            //     let restrictedHeight = elementView.paper.options.height - 20 - 15;
            //     console.log(restrictedWidth)
            //     console.log(elementView.paper.options.height)
            //     console.log(elementView.paper.getComputedSize())
            //     return { x: 20, y: 20, width: restrictedWidth, height: restrictedHeight };
            // },

            // Allows highlighting the entities to which validate connections can be made
            markAvailable: true,
            // prevent multiple links between same target and source
            multiLinks: false
        });

        this.options.paper = paper;
        this._paper = paper;
        this.configureHandlingPaperEvents();
    },

    _createModelingArea() {
        const modelingArea = `<div class="system-container" data-cursor=grab>
            <div class="system-container-modeling-area">
                <div class="paperArea">
                    <div id="jointPaper"></div>
                </div>
            </div>
        </div>`
        $('.visible-modeling-area').append(modelingArea);
    },

    render() {
        this._paper.render();
        return this;
    },

    validateLinks(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        if (!cellViewS || !cellViewT) {
            // check if the link was added by sidebar --> first time both ends are not connected
            return this.handleSidebarLink(cellViewS, cellViewT, end, linkView);
        }

        if (magnetS && magnetT && magnetS === magnetT) {
            // no self-linking
            return false;
        }

        if (cellViewT && cellViewS && (cellViewT.model.isLink() || cellViewS.model.isLink())) {
            // no link-to-link connections
            return false;
        }

        if (cellViewS === cellViewT) {
            return false;
        }

        if (this.checkIfConnectionAlreadyExists(cellViewS, cellViewT)) {
            return false;
        }

        if (!magnetS || (!magnetT && !magnetS)) {
            if (cellViewT && cellViewT.model.prop("entity/type") == EntityTypes.ENDPOINT ||
                cellViewT.model.prop("entity/type") == EntityTypes.EXTERNAL_ENDPOINT) {
                return this.connectableEntity(cellViewS) && !(cellViewT.model.isEmbeddedIn(cellViewS.model));
            }

            if (cellViewT && cellViewT.model.attributes.entity.type === EntityTypes.INFRASTRUCTURE) {
                return this.deployableEntity(cellViewS);
            }
        }

        // only target ends can be reconnected
        if (end === "source") {
            return false;
        }

        if (this.connectableEntity(cellViewS)) {
            if (cellViewT.model.attributes.entity.type === EntityTypes.ENDPOINT || cellViewT.model.attributes.entity.type === EntityTypes.EXTERNAL_ENDPOINT) {
                // if the target is an Endpoint or External Endpoint check that the Endpoint is a valid one, meaning it has a parent but also not the source entity as parent
                return !cellViewT.model.isEmbeddedIn(cellViewS.model) && cellViewT.model.getParentCell();
            }

            return cellViewT.model.attributes.entity.type === EntityTypes.INFRASTRUCTURE;
        }

        if (cellViewS.model.attributes.entity.type === EntityTypes.INFRASTRUCTURE) {
            return this.deployableEntity(cellViewT);
        }

        return false;
    },

    /**
     * Sidebar Links or Deployment Mappings can be moved from both sides and required therefore additional logic.
     * However, the original restrictions regarding target and source ends remains. This means that target ends can only 
     * connect to Endpoint or External Endpoint entities for Links and Infrastructure entities for Deployment Mappings. 
     * In contrast, source ends are allowed to connect to all Component entity types for Links and for Deployments Mappings
     * are Infrastructure entities additionally allowed.
     * 
     * @param {joint.dia.ElementView} cellViewS The ElementView that contains the required model data for the connected source element, if present.
     * @param {joint.dia.ElementView} cellViewT The ElementView that contains the required model data for the connected target end, if present.
     * @param {string} end Which side of the connection is currently being realized.
     * @param {joint.dia.LinkView} linkView The LinkView of the current connection.
     * @returns 
     */
    handleSidebarLink(cellViewS, cellViewT, end, linkView) {
        if (!cellViewS && cellViewT && end === "target") {
            // allow target connection side to connect only to endpoint or infrastructure entities
            if (linkView.model.prop("entity/type") === EntityTypes.DEPLOYMENT_MAPPING) {
                return cellViewT.model.attributes.entity.type === EntityTypes.INFRASTRUCTURE; // TODO allow all deployable entities?
            }

            return (cellViewT.model.attributes.entity.type === EntityTypes.ENDPOINT ||
                cellViewT.model.attributes.entity.type === EntityTypes.EXTERNAL_ENDPOINT) && cellViewT.model.getParentCell();
        }

        if (!cellViewT && cellViewS && end === "source") {
            // allow source connection side to connect only to connectable entities
            if (linkView.model.prop("entity/type") === EntityTypes.LINK) {
                return this.connectableEntity(cellViewS);
            }

            return this.deployableEntity(cellViewS);
        }

        return false;
    },

    /**
     * Checks if the given element is deployable using an Infrastructure entity. 
     * The element is identified by its included model. 
     * 
     * @param {joint.dia.ElementView} cellView The cellView of the element to check. 
     * @returns true if it is deployable
     */
    deployableEntity(cellView) {
        return cellView.model.attributes.entity.type === EntityTypes.COMPONENT ||
            cellView.model.attributes.entity.type === EntityTypes.SERVICE ||
            cellView.model.attributes.entity.type === EntityTypes.BACKING_SERVICE ||
            cellView.model.attributes.entity.type === EntityTypes.STORAGE_BACKING_SERVICE ||
            cellView.model.attributes.entity.type === EntityTypes.INFRASTRUCTURE;
    },

    /**
     * Checks if the given element can be connected to other entities. The element is identified
     * by its included model.
     * 
     * @param {joint.dia.ElementView} cellView The cellView of the element to check. 
     * @returns true if it can be connected
     */
    connectableEntity(cellView) {
        return cellView.model.attributes.entity.type === EntityTypes.COMPONENT ||
            cellView.model.attributes.entity.type === EntityTypes.SERVICE ||
            cellView.model.attributes.entity.type === EntityTypes.BACKING_SERVICE ||
            cellView.model.attributes.entity.type === EntityTypes.STORAGE_BACKING_SERVICE;
    },

    /**
     * Check if the connection between the target and the source element already exists,
     * just the other way round.
     * 
     * @param {joint.dia.ElementView} cellViewS The source cellView of the link to create. 
     * @param {joint.dia.ElementView} cellViewT The target cellView of the link to create. 
     * @returns true if this connection already exists
     */
    checkIfConnectionAlreadyExists(cellViewS, cellViewT) {
        let connectionAlreadyExists = false;
        this.options.graph.getConnectedLinks(cellViewT.model).forEach(connectedLink => {
            if (connectedLink.prop("target/id") === cellViewT.model.id &&
                connectedLink.prop("source/id") === cellViewS.model.id) {
                connectionAlreadyExists = true;
                return;
            } else if (connectedLink.prop("source/id") === cellViewT.model.id &&
                connectedLink.prop("target/id") === cellViewS.model.id) {
                connectionAlreadyExists = true;
                return;
            }
        });

        return connectionAlreadyExists;
    },

    validateEmbedding(childView, parentView) {
        switch (parentView.model.attributes.entity.type) {
            case EntityTypes.COMPONENT:
            case EntityTypes.SERVICE:
            case EntityTypes.BACKING_SERVICE:
            case EntityTypes.STORAGE_BACKING_SERVICE:
                if (this.checkIfConnectionAlreadyExists(childView, parentView)) {
                    // cannot embed entities to which a connection exists
                    return false;
                }

                // TODO check if dataaggregate or backingData already included?

                return childView.model.attributes.entity.type === EntityTypes.ENDPOINT ||
                    childView.model.attributes.entity.type === EntityTypes.EXTERNAL_ENDPOINT ||
                    childView.model.attributes.entity.type === EntityTypes.DATA_AGGREGATE ||
                    childView.model.attributes.entity.type === EntityTypes.BACKING_DATA;
            case EntityTypes.INFRASTRUCTURE:
                return childView.model.attributes.entity.type === EntityTypes.BACKING_DATA;
            default:
                return false;
        }
    },

    validateUnembedding(childView) {
        return !childView.model.attributes.entity.type === EntityTypes.ENDPOINT ||
            !childView.model.attributes.entity.type === EntityTypes.EXTERNAL_ENDPOINT ||
            !childView.model.attributes.entity.type === EntityTypes.DATA_AGGREGATE ||
            !childView.model.attributes.entity.type === EntityTypes.BACKING_DATA;
    },

    checkCreatedLink(linkView, paper) {
        if ((linkView.targetBBox.x === 0) && (linkView.targetBBox.y === 0)) {
            // element selected and not just any point on paper
            return true;
        }

        if ((linkView.sourceBBox.x === 0) && (linkView.sourceBBox.y === 0)) {
            // element selected and not just any point on paper
            return true;
        }

        return false;
    },

    defaultLink(cellView, magnet) {
        if (cellView.model.attributes.entity.type === EntityTypes.INFRASTRUCTURE) {
            return new DeploymentMapping();
        }

        return new Link();
    },

    getPaper() {
        return this._paper;
    },

    configureHandlingPaperEvents() {

        this._paper.on({
            'element:pointerdown': function (cellView, evt, x, y) {
                this.hideTools();
                let currentPaper = this;
                this.model.getLinks().forEach(function (link) {
                    joint.highlighters.stroke.remove(link.findView(currentPaper));
                });
                // TODO if lock mechanism is included 
                // if (cellView.paper.options.interactive == false) {
                //     return;
                // }
                cellView.showTools();
            },
            'blank:pointerdown': function (evt, x, y) {
                this.hideTools();
                let currentPaper = this;
                this.model.getLinks().forEach(function (link) {
                    joint.highlighters.stroke.remove(link.findView(currentPaper));
                });
            },
            'element:contextmenu': function (cellView, evt, x, y) {
                cellView.showTools();
            },
            "link:pointerclick": function (linkView, evt) {
                linkView.unhighlight();

                if (linkView.hasTools()) {
                    linkView.highlight();
                    linkView.showTools();
                    return;
                }

                linkView.highlight();
                let toolsView = new ConnectionSelectionTools();
                linkView.addTools(toolsView);
            },
            "cell:highlight": function (cellView, node, options) {
                if (cellView.model.isLink()) {
                    this.hideTools();
                    this.model.getLinks().forEach(function (link) {
                        if (!(link === cellView.model)) {
                            joint.highlighters.stroke.remove(link.findView(cellView.paper));
                            return;
                        }
                    });
                }
            },
            "link:connect": (linkView, evt, elementViewConnected, magnet, arrowhead) => this.configureLink(linkView, evt, elementViewConnected, magnet, arrowhead),

            "element:icon:pointerclick": (elementView, evt) => this.onEntityCollapsed(evt, elementView),
            "requestTrace:icon:pointerclick": (elementView, evt, x, y) => this.onShowRequestTraceIncludedEntities(elementView, evt),
            // "cell:pointerdbclick": function (elementView, evt, x, y) {
            //     console.log("Double click"); // doesn't work at the moment
            // },
            // "blank:mousewheel": function (event, x, y, delta) {
            //     console.log("mousewheel");
            //     if (event.shiftKey) {
            //         console.log("Todo zoom") // TODO zoom?
            //         event.stopPropagation();
            //     }
            // },
            // "blank:pointermove": function (event, x, y) {
            //     console.log("move");
            //     console.log(event.data)
            //     console.log(x)
            //     console.log(y)
            // }
        });

        this.listenTo(this.options.graph, "change:parent", (cell) => {
            cell.prop("entity/isEmbedded", true);
        });
    },

    onEntityCollapsed(evt, elementView) {
        // Stop further event propagation --> e.g. element cannot be dragged when clicking on icon
        evt.stopPropagation();
        elementView.model.prop("collapsed", false);
        elementView.model.attr("icon/visibility", "hidden");

        // show embedded entities
        let embeddedCells = elementView.model.getEmbeddedCells({ deep: true });
        embeddedCells.forEach(embeddedElement => {
            const entityTypeHidden = embeddedElement.prop("entityTypeHidden");
            const newItemVisibility = entityTypeHidden ? "hidden" : "visible";
            embeddedElement.attr("root/visibility", newItemVisibility, { isolate: true });
            embeddedElement.prop("parentCollapsed", false);
        });
    },

    onShowRequestTraceIncludedEntities(elementView, evt) {
        // Stop further event propagation --> e.g. element cannot be dragged when clicking on icon
        evt.stopPropagation();
        elementView.model.prop("collapsed", false);
        elementView.model.attr("icon/visibility", "hidden");
        elementView.model.attr("body/fill", "gold");

        // provide exit button
        $("#exitRequestTraceView-button").show();
        $("#exitRequestTraceView-button").click((event) => { this.onExitRequestTraceView(event) });
        this._currentRequestTraceViewSelection = elementView.model;

        // get involved Links
        const involvedLinks = elementView.model.prop("entity/properties/involvedLinks");

        let allInvolvedEntities = new Set(involvedLinks[0]);
        // add Request Trace entity itself 
        allInvolvedEntities.add(elementView.model.id);
        // add referred External Endpoint
        allInvolvedEntities.add(elementView.model.prop("entity/properties/referredEndpoint"));

        if (involvedLinks && involvedLinks.length > 0) {
            for (const involvedLink of involvedLinks[0]) {
                const linkEntity = this.options.graph.getCell(involvedLink);
                allInvolvedEntities.add(linkEntity.getTargetElement().id);
                allInvolvedEntities.add(linkEntity.getTargetElement().parent());
                allInvolvedEntities.add(linkEntity.getSourceElement().id);
            }
        }

        // hide all other entities
        const allSystemEntities = this.options.graph.getCells();
        this._hiddenEntities = new Set();
        for (const entity of allSystemEntities) {
            if (allInvolvedEntities.has(entity.id)) {
                continue;
            }
            this._hiddenEntities.add(entity.id); // TODO keep?
            entity.attr("root/visibility", "hidden", { isolate: true }); // TODO check isolate
        }
    },

    onExitRequestTraceView(event) {
        $("#exitRequestTraceView-button").hide();
        this._currentRequestTraceViewSelection?.attr("body/fill", "white");
        this._currentRequestTraceViewSelection?.attr("icon/visibility", "visible");
        this._currentRequestTraceViewSelection?.prop("collapsed", true);

        const allSystemEntities = this.options.graph.getCells();
        for (const entity of allSystemEntities) {
            entity.attr("root/visibility", "visible", { isolate: true });
        }
    },

    configureLink(linkView, evt, elementViewConnected, magnet, arrowhead) {
        let linkSource = linkView.model.attributes.source;
        let linkTarget = linkView.model.attributes.target;

        if ((linkView.model.prop("entity/type") === EntityTypes.LINK) && (elementViewConnected.model.prop("entity/type") === EntityTypes.INFRASTRUCTURE)) {
            let deploymentMappingLink = new DeploymentMapping();

            linkView.model.source(linkSource);
            linkView.model.target(linkTarget);
            linkView.model.set("type", deploymentMappingLink.prop("type"));
            linkView.model.attr("root", deploymentMappingLink.attr("root"));
            linkView.model.attr("line", deploymentMappingLink.attr("line"));
            linkView.model.prop("entity", deploymentMappingLink.prop("entity"), { previousType: EntityTypes.LINK });
        }

        if ((linkView.model.prop("entity/type") === EntityTypes.DEPLOYMENT_MAPPING) &&
            (elementViewConnected.model.prop("entity/type") === EntityTypes.ENDPOINT || elementViewConnected.model.prop("entity/type") === EntityTypes.EXTERNAL_ENDPOINT)) {
            let link = new Link();

            linkView.model.source(linkSource);
            linkView.model.target(linkTarget);
            linkView.model.set("type", link.prop("type"));
            linkView.model.attr("root", link.attr("root"));
            linkView.model.attr("line", link.attr("line"));
            linkView.model.prop("entity", link.prop("entity"), { previousType: EntityTypes.DEPLOYMENT_MAPPING });
            return;
        }

        if (!(linkView.model.getSourceElement()) || !(linkView.model.getTargetElement()) || linkView.model.prop("entity/type") === EntityTypes.LINK) {
            // possible since Link and Deployment Mapping can be added by sidebar
            // ignore if the current connection is actually a Link entity --> Deploy problematic does not exist 
            return;
        }

        this.checkIfStorageBackingServiceConnected(linkView, elementViewConnected);
    },

    checkIfStorageBackingServiceConnected(linkView, elementViewConnected) {
        let infrastructureElement = linkView.model.getSourceElement()?.prop("entity/type") === EntityTypes.INFRASTRUCTURE ? linkView.model.getSourceElement() : elementViewConnected.model;
        let connectedLinksForCurrentInfrastructure = elementViewConnected.model.graph.getConnectedLinks(infrastructureElement);

        if (connectedLinksForCurrentInfrastructure.length <= 1) {
            return;
        }

        let storageBackingServiceConnected = false;
        let includesComponentTypesInDepoyment = false;
        connectedLinksForCurrentInfrastructure.forEach(connectedLink => {
            if (!(connectedLink.getTargetElement()?.prop("entity/type") === EntityTypes.INFRASTRUCTURE && connectedLink.getSourceElement()?.prop("entity/type") === EntityTypes.INFRASTRUCTURE) &&
                (connectedLink.getTargetElement()?.prop("entity/type") !== EntityTypes.STORAGE_BACKING_SERVICE && connectedLink.getSourceElement()?.prop("entity/type") !== EntityTypes.STORAGE_BACKING_SERVICE)) {
                // check if connected Deployment Mappings includes only Infrastructure and possibly Storage Backing Service entities 
                includesComponentTypesInDepoyment = true;
            }

            if (connectedLink.getTargetElement()?.prop("entity/type") === EntityTypes.STORAGE_BACKING_SERVICE) {
                storageBackingServiceConnected = true;
            } else if (connectedLink.getSourceElement()?.prop("entity/type") === EntityTypes.STORAGE_BACKING_SERVICE) {
                storageBackingServiceConnected = true;
            }
        });

        if (storageBackingServiceConnected && includesComponentTypesInDepoyment) {
            this.provideConnectionWarningDialog();
        }
    },

    provideConnectionWarningDialog() {        
        let modalDialog = new UIModalDialog("invalidToscaConnection-information", "invalidToscaConnection");
        modalDialog.create(InvalidToscaConnectionDialogConfig);
        modalDialog.render("modals", true);
        modalDialog.show();
    }
});

// TODO keep here? --> currently shown every time new problematic connection is added
const InvalidToscaConnectionDialogConfig = {
    type: "modalDialog",
    header: {
        iconClass: "fa-solid fa-triangle-exclamation",
        type: "warning",
        text: "Deployment Mapping Connection",
        closeButton: true
    },
    footer: {
        cancelButtonText: "Ok, understood",
    },
    content: {
        contentType: UIContentType.SINGLE_TEXTBLOCK,
        text: "You are currently deploying at least one Storage Backing Service entity with Component, Service or Backing Service entities"
            + " on the same Infrastructure. Although the modeling is generally possible, you won't be able to transform it into the TOSCA format like this."
            + " If you want to transform it into the TOSCA format, you have to introduce a new Infrastructure entity between the Storage Backing Service"
            + " and the current Infrastructure entity."
    }
};

export default ModelingArea;