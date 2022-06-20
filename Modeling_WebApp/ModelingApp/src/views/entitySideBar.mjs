import EntityTypes from "../config/entityTypes.mjs";
import ConnectionSelectionTools from "./tools/connectionSelectionTools.mjs";
import EntitySelectionTools from "./tools/entitySelectionTools.mjs";

const EntitySidebar = joint.mvc.View.extend({

    className: "entitySideBar",

    _entityShapeGraph: {},

    _entityShapePaper: {},

    entityRepresentations: {},

    _dragging: false,

    options: {
        paper: null,
        graph: null,
        width: 245,
        height: 600,
        documentElement: null,
        sidebarEntityConfig: {},
        entityHighlightColour: "",
        entityTextHighlightColour: ""
    },

    init() {
        if (!(this.options.paper instanceof joint.dia.Paper)) {
            throw new TypeError("EntitySideBar: The provided current paper has to be a joint.dia.Paper element");
        }

        let sidebarContainerElement = $(".entityShapes-sidebar-container").first();

        this.options.graph = this.options.paper.model;
        this.options.width = sidebarContainerElement && sidebarContainerElement.innerWidth() ? sidebarContainerElement.innerWidth() : this.options.width;
        this.options.height = sidebarContainerElement && sidebarContainerElement.innerHeight() ? sidebarContainerElement.innerHeight() : this.options.height;
        this.options.entityRepresentations = this.options.sidebarEntityConfig ? this.options.sidebarEntityConfig : {};
        this.options.entityHighlightColour = getComputedStyle(document.documentElement).getPropertyValue('--entitySidebar-highlighting-colour') ?? "darkorange";
        this.options.entityTextHighlightColour = getComputedStyle(document.documentElement).getPropertyValue('--entitySidebar-textHighlighting-colour') ?? "darkorange";
            
        this.entityRepresentations = this.options.entityRepresentations;

        this.delegateEvents();
    },

    render() {
        this.renderSidebar();
        this.renderEntityShapes();
        return this;
    },

    createEntitySidebarTemplate() {    
        // create headline    
        const sidebarHeadline = `<div class="user-select-none entityShapes-headline sticky-top">
            <div class="entityShapes-icon">
                <i class="fa-solid fa-shapes"></i>
            </div>
            <div class=entityShapes-text"">
                <span class="">Entity Shapes</span>
            </div>
        </div>`;

        // create container for shape elements
        const entityShapesContainer = `<div class="entityShapes-container">
            <div class="entityShapes-paper"></div>
        </div>`;

        return `<div class="entitySidebar">
            ${sidebarHeadline}
            ${entityShapesContainer}
        </div>`;
    },

    renderSidebar() {        
        this.options.documentElement.append(this.createEntitySidebarTemplate());

        // new graph: calculate visible height
        let paperHeight = this.options.height - ($('.entityShapes-headline').first().outerHeight());

        // get colour from container element but change opacity value (otherwise the colour will appear darker than intended)
        let parentBackgroundColorElements = $(".entityShapes-sidebar-container").first().css("backgroundColor").split(",");
        let adaptedBackgroundColor = parentBackgroundColorElements[0].concat(",", parentBackgroundColorElements[1]).concat(",", parentBackgroundColorElements[2]).concat(", ", "0)");
        this._entityShapeGraph = new joint.dia.Graph();
        this._entityShapePaper = new joint.dia.Paper({
            el: $('.entityShapes-paper'),
            width: Math.floor(this.options.width) >= 244 ? Math.floor(this.options.width) : 244,
            height: Math.floor(paperHeight) >= 547 ? Math.floor(paperHeight) : 547,
            gridSize: 10,
            drawGrid: false,
            model: this._entityShapeGraph,
            embeddingMode: false,
            background: {
                color: adaptedBackgroundColor
            },
            interactive: false,
            cellNamespace: joint.shapes
        });

        this._entityShapePaper.render();

        this.listenTo(this._entityShapePaper, "cell:mouseenter", this.highlightEntity);
        this.listenTo(this._entityShapePaper, "cell:mouseleave", this.unhighlightEntity);

        this.listenTo(this._entityShapePaper, "element:pointerclick", this.addEntity);
        this.listenTo(this._entityShapePaper, "requestTrace:icon:pointerclick", this.addEntity);
        this.listenTo(this._entityShapePaper, "link:pointerclick", this.addLink);
        this.listenTo(this._entityShapePaper, "cell:pointermove", (evt, x, y) => { this._dragging = true });
    },

    renderEntityShapes() {
        Object.keys(this.entityRepresentations).forEach((key) => {
            this._entityShapeGraph.addCell(this.entityRepresentations[key].shape);
        });

        // this._entityShapePaper.on("cell:pointermove", (evt, x, y) => { this._dragging = true; })
        // this._entityShapePaper.on("cell:pointerup", (cellView, evt, x, y) => { this.onDragEntity(cellView, evt, x, y) })

    },

    // TODO endpoints
    addEntity(eventElement) {
        let cell = this._entityShapeGraph.getCell(eventElement.model.id);
        let newElement = cell.clone();
        newElement.resize(cell.prop("defaults/size/width"), cell.prop("defaults/size/height"));
        newElement.attr("label/fontSize", cell.prop("defaults/fontSize"));
        newElement.removeAttr("root/title");

        newElement.position(30, 20);
        this.options.graph.addCell(newElement);
        this.addToolToEntity(newElement);
    },

    addLink(eventElement) {
        let cell = this._entityShapeGraph.getCell(eventElement.model.id);
        let newElement = cell.clone();
        newElement.attr("wrapper/cursor", "pointer");
        newElement.attr("wrapper/class", "modelingArea-Connection");
        newElement.attr("line/stroke", "black");
        newElement.removeAttr("root/title");
        newElement.removeLabel(-1);
        newElement.prop("source", { x: 30, y: 30 });
        newElement.prop("target", { x: 130, y: 30 });
        this.options.graph.addCell(newElement);

        // test
        let toolsView = new ConnectionSelectionTools(true);
        var linkView = newElement.findView(this.options.paper);
        linkView.addTools(toolsView);
    },

    onDragEntity(cellView, event, x, y) {
        // console.log(event);

        if (!this._dragging) {
            return;
        }
        // console.log(this.#entityShapePaper);


        // copy dragged entity
        let cell = this._entityShapeGraph.getCell(cellView.model.id);
        let newElement = cell.clone();

        // transform x coordinate of sidebar paper to modeling area paper
        let transformedXCoordinate = this.options.paper.localToPaperPoint(this.options.paper.pageToLocalPoint(x));
        let transformedXEndCoordiante = transformedXCoordinate.x - (newElement.getBBox().width / 2);

        let titleContainerHeight = $('.entityShapes-headline').first().outerHeight();
        let correctedY = y + Math.floor(titleContainerHeight);
        let transformedYCoordinate = this.options.paper.localToPaperPoint(correctedY);
        let offsetToConsider = Math.abs(this.options.paper.pageOffset().y < 0 ? this.options.paper.pageOffset().y : 0);
        let transformedYEndCoordiante = transformedYCoordinate.x + offsetToConsider - (newElement.getBBox().height / 2);

        // console.log(titleContainerHeight);
        // console.log(transformedYEndCoordiante);
        // console.log(event.clientY);

        newElement.position(transformedXEndCoordiante, transformedYEndCoordiante); // TODO fix y-value --> not fully correct when scrolling

        // TODO check if valid area, check if drag cancelled
        // console.log("pageOffset");
        // console.log(this._entityShapeGraph.pageOffset());
        // console.log(this.options.paper.pageOffset());

        // TODO scale

        this.options.graph.addCells([newElement]);
        this._dragging = false;
        this.addToolToEntity(newElement);
    },

    addToolToEntity(addedElement) {
        if (addedElement.isLink()) {
            return;
        }

        let connectableEntity = (addedElement.prop("entity/type") === EntityTypes.COMPONENT || addedElement.prop("entity/type") === EntityTypes.SERVICE || addedElement.prop("entity/type") === EntityTypes.BACKING_SERVICE || addedElement.prop("entity/type") === EntityTypes.STORAGE_BACKING_SERVICE || addedElement.prop("entity/type") === EntityTypes.INFRASTRUCTURE) ? true : false;
        let collapsableEntity = (addedElement.prop("entity/type") === EntityTypes.REQUEST_TRACE || connectableEntity) ? true : false;
        let toolToAdd = new EntitySelectionTools(connectableEntity, collapsableEntity);
        var elementView = addedElement.findView(this.options.paper);
        elementView.addTools(toolToAdd);
        elementView.hideTools();
    },

    highlightEntity(cellView) {
        if (cellView.model.isLink()) {
            cellView.model.attr("line/stroke", this.options.entityHighlightColour);
            cellView.model.attr("text/fill", this.options.entityHighlightColour);
            // cellView.model.attr("text/fill", this.options.entityTextHighlightColour);
            return;
        }

        cellView.$el.addClass("highlightEntity");
    },

    unhighlightEntity(cellView) {
        if (cellView.model.isLink()) {
            cellView.model.attr("line/stroke", "black");
            cellView.model.attr("text/fill", "black");
            return;
        }
        cellView.$el.removeClass("highlightEntity");
    },

    onRemove() {
        this._entityShapeGraph = null;
        this._entityShapePaper = null;
        this.entityRepresentations = {};
        this.options.documentElement.empty();
    }

});

export default EntitySidebar;