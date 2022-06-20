import EntityTypes from "../config/entityTypes.mjs";
import EntitySelectionTools from "./entitySelectionTools.mjs";

class EntitySideBarOld extends joint.mvc.View {

    "use strict";

    #entityShapeGraph = {};

    #entityShapePaper = {};

    entityRepresentations = {};

    #dragging = false;

    #DEFAULT_WIDTH = 245;
    #DEFAULT_HEIGHT = 600;

    // TODO defaults?

    constructor(documentElement, currentPaper, sidebarEntityConfig) {
        if (!(currentPaper instanceof joint.dia.Paper)) {
            throw new TypeError("EntitySideBar: The provided current paper has to be a joint.dia.Paper element");
        }

        documentElement.append('<div class="entitySidebar"></div>');

        let sidebarContainerElement = $(".entityShapes-sidebar-container").first();

        super({
            className: "entitySideBar",
            el: $('.entitySidebar'),
            paper: currentPaper,
            graph: currentPaper.model,
            width: sidebarContainerElement && sidebarContainerElement.innerWidth() ? sidebarContainerElement.innerWidth() : 240,
            height: sidebarContainerElement && sidebarContainerElement.innerHeight() ? sidebarContainerElement.innerHeight() : 600,
            entityRepresentations: sidebarEntityConfig ? sidebarEntityConfig : {},

            events: {
                // Tool buttons
                // "click #fullScreen-button": "toggleFullScreen"
                // "cell:pointerdbclick": "propertyTest"

            },

            // here?
            documentEvents: {
                // mousemove: "onDragEntity",
                // mouseup: "onEndDragEntity"
                // "element:pointerclick": "addTest"
                // "cell:pointerup": "onDragEntity"
                mouseup: "test"
            }
        });

        this.layoutSidebar();
        this.delegateEvents();

        this.entityRepresentations = this.options.entityRepresentations;

        // TODO naming
        this.renderSidebar();
        this.renderEntityShapes();

        // Test --> wofür braucht/ nutzt man das?
        // this.$groups = {};
        this.delegateDocumentEvents();

        // TODO use this:?
        // joint.mvc.View.apply(this, arguments);
    }


    init() {

    }

    onRender() {

    }

    // render()?

    confirmUpdate() {

    }

    onSetTheme(oldTheme, newTheme) {

    }

    onRemove() {

    }

    layoutSidebar() {
        let columnWidth = this.options.width / 2 - 15;
        let rowHeight = 100;
        // dy?
        // dx?
    }


    // TODO
    renderSidebar() {
        // add headline
        $('.entitySidebar').append('<div class="entityShapes-headline sticky-top"></div>');
        $('.entityShapes-headline').append('<div class="entityShapes-icon"><i class="fa-solid fa-shapes"></i></div>');
        $('.entityShapes-headline').append('<div class=entityShapes-text""><span class="">Entity Shapes</span></div>');

        // add container for shape elements
        $('.entitySidebar').append('<div class="entityShapes-container"></div>');
        $('.entityShapes-container').append('<div class="entityShapes-paper"></div>');
        // $('.entitySidebar').append('<div id="dragShape-paper" class="dragShape-paper"></div>'); // TODO rename falls

        // new graph // TODO minHeight!!
        // console.log(this.#entityShapePaper.getComputedSize());
        let paperHeight = this.options.height - ($('.entityShapes-headline').first().outerHeight());

        // get colour from container element but change opacity value (otherwise the colour will appear darker than intended)
        let parentBackgroundColorElements = $(".entityShapes-sidebar-container").first().css("backgroundColor").split(",");
        let adaptedBackgroundColor = parentBackgroundColorElements[0].concat(",", parentBackgroundColorElements[1]).concat(",", parentBackgroundColorElements[2]).concat(", ", "0)");

        this.#entityShapeGraph = new joint.dia.Graph();
        this.#entityShapePaper = new joint.dia.Paper({
            // el: $('.system-container'),
            el: $('.entityShapes-paper'),
            width: Math.floor(this.options.width),
            height: Math.floor(paperHeight),
            gridSize: 10,
            drawGrid: false,
            model: this.#entityShapeGraph,
            embeddingMode: true,
            background: {
                color: adaptedBackgroundColor
            },
            interactive: false,
            cellNamespace: joint.shapes
            // preventDefaultBlankAction: ?
        });

        // TODO paperDrag
        // this.#dragShapePaper = new joint.dia.Paper({
        //     el: $('#dragShape-paper'),
        //     width: 1,
        //     height: 1,
        //     drawGrid: false,
        //     model: this.#entityShapeGraph,
        //     embeddingMode: true,
        //     background: {
        //         color: 'yellow'
        //     },
        //     interactive: false,
        //     cellNamespace: joint.shapes,
        //     // preventDefaultBlankAction: ?
        // });
        // console.log(this.#entityShapePaper);
        // TODO startListening method
    }

    renderEntityShapes() {
        // for (const entity of this.entityRepresentations) {
        //     console.log(entity);
        // }

        let numberOfRequiredRows = Math.ceil(Object.keys(this.entityRepresentations).length / 2);

        // this.#entityShapePaper.scale(2,2);
        // this.#entityShapePaper.scaleContentToFit({
        //     padding: {
        //         top: 20
        //     }
        // });

        Object.keys(this.entityRepresentations).forEach((key) => {
            // console.log(this.entityRepresentations[key]);
            if (this.entityRepresentations[key].shape.isLink()) {
                // this.entityRepresentations[key].shape.appendLabel({
                //     attrs: {
                //         text: {
                //             text: "Test"
                //         }
                //     }
                // })
            }
            this.#entityShapeGraph.addCell(this.entityRepresentations[key].shape)
        });

        this.#entityShapePaper.on("element:pointerclick", (evt, x, y) => { this.addEntity(evt) })
        this.#entityShapePaper.on("cell:pointermove", (evt, x, y) => { this.#dragging = true; })
        this.#entityShapePaper.on("cell:pointerup", (cellView, evt, x, y) => { this.onDragEntity(cellView, evt, x, y) })
    }

    addEntity(eventElement) {
        let cell = this.#entityShapeGraph.getCell(eventElement.model.id);
        let newElement = cell.clone();
        newElement.position(30, 20);
        this.options.graph.addCell(newElement);

        this.addToolToEntity(newElement);
    }

    onDragEntity(cellView, event, x, y) {
        // console.log(event);

        if (!this.#dragging) {
            return;
        }
        // console.log(this.#entityShapePaper);


        // copy dragged entity
        let cell = this.#entityShapeGraph.getCell(cellView.model.id);
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
        console.log(this.#entityShapePaper.pageOffset());
        console.log(this.options.paper.pageOffset());

        // TODO scale

        this.options.graph.addCells([newElement]);
        this.#dragging = false;
        this.addToolToEntity(newElement);
    }

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
    }

    // propertyTest() {
    //     console.log("hi");
    // }
}

export default EntitySideBarOld;