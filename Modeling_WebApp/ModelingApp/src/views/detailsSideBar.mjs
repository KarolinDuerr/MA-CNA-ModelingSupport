import { ColourConfig, EntityDetailsConfig, EntityGeneralProperties, PropertyContentType } from "../config/detailsSidebarConfig.mjs";
import EntityTypes from "../config/entityTypes.mjs";
import { FormGroup } from "../representations/guiElements.mjs";
import AccordionCollapse from "../representations/guiElements.AccordionCollapse.mjs";
import RequestTracePropertiesViewer from "../representations/entityProperties/RequestTracePropertiesViewer.mjs";
import DataAggregatePropertiesViewer from "../representations/entityProperties/DataAggregatePropertiesViewer.mjs";
import BackingDataPropertiesViewer from "../representations/entityProperties/BackingDataPropertiesViewer.mjs";

const DetailsSidebar = joint.mvc.View.extend({

    className: "detailsSideBar",

    _previousDataAggregateSelection: "",
    _previousBackingDataSelection: "",
    _currentColourSelection: "",

    _currentEntitySelection: {},
    _propertyDetailsContainer: {},

    options: {
        paper: null,
        graph: null,
        detailsSidebarConfig: {}
    },

    events: {
        "change #data-aggregate": "dataAggregateSelectionChanged",
        "change #backing-data": "backingDataSelectionChanged",
        "entityPropertyChanged #entireDetailsAccordion": "handlePropertyChanged",
        "entitySpecificPropertyChanged #entireDetailsAccordion": "handleEntityPropertyChanged",
        "change #referredEndpoint": "handleRequestTraceExternalEndpointChanged",
        "change #dataAggregate-parentRelation": "handleDataAggregateParentRelationChanged"
    },

    init() {
        if (!(this.options.paper instanceof joint.dia.Paper)) {
            throw new TypeError("DetailsSideBar: The provided current paper has to be a joint.dia.Paper element");
        }

        this.options.graph = this.options.paper.model;

        // this.listenTo(this.options.graph, "add", this.addedEntity);
        // this.listenTo(this.options.graph, "remove", this.removedEntity);
    },

    // confirmUpdate() {

    // }

    // onSetTheme(oldTheme, newTheme) {

    // }

    // onRemove() {

    // }

    render() {
        this.renderGeneralItems();
        this.renderGeneralProperties();

        this.options.graph.on("add", this.addedEntity, this);
        this.options.graph.on("remove", this.removedEntity, this);
        return this;
    },

    renderEntitySelectionProperties(cell) {
        if (this._currentEntitySelection === cell) {
            // ignore multiple clicks while selection didn't change
            return;
        }

        $("#modals").empty();
        this._currentEntitySelection = cell;
        this.setCurrentValues();
        this.renderEntitySpecificProperties();
        this.listenTo(this._currentEntitySelection, "change:position", this.updateElementPosition);
    },

    hideEntitySelectionProperties() {
        this.stopListening(this._currentEntitySelection);
        this._currentEntitySelection = null;
        this._propertyDetailsContainer.changeVisibility(false);
        $("#modals").empty();
        if (this._currentColourSelection) {
            this._currentColourSelection.attr({
                body: {
                    fill: this._currentColourSelection.prop("defaults/fill"),
                    stroke: this._currentColourSelection.prop("defaults/stroke"),
                    strokeWidth: this._currentColourSelection.prop("defaults/strokeWidth")
                }
            });
            this._currentColourSelection = null;
        }
    },

    renderGeneralItems() {
        let sameEntityHighlighting = '<div class="sameEntityHighlighting"></div>';
        $(this.el).append(sameEntityHighlighting);

        $(".sameEntityHighlighting").append('<div id="entityHighlightingTitle"><h6>Entity Highlighting</h6></div>');
        $(".sameEntityHighlighting").append('<form class="sameEntityHighlighting-Form"></form>');

        this.options.detailsSidebarConfig.EntityHighlighting.forEach(configElement => {
            this.renderEntitySelectionHighlighting(configElement.type, configElement.labelText, configElement.svgRepresentation);
        });
    },

    renderEntitySelectionHighlighting(title = "", titleText = "", svgRepresentation = "") {
        let fieldsetGroup = '<fieldset id="' + title + '-fieldset"></fieldset>';
        $(".sameEntityHighlighting-Form").append(fieldsetGroup);
        let entityGroup = '<div id="' + title + '-highlightingGroup" class="form-group"></div>';
        $("#" + title + "-fieldset").append(entityGroup);
        let titleLabel = '<label id="' + title + '-label" for="' + title + '"><span>' + svgRepresentation + '</span>' + titleText + '</label>';
        $("#" + title + "-highlightingGroup").append(titleLabel);
        let selectionOptionsDiv = '<select class="entityHighlightingOption custom-select" id="' + title + '"></select>';
        $("#" + title + "-highlightingGroup").append(selectionOptionsDiv);

        let selectionOptionDefault = '<option value="">Choose existing entity...</option>';
        $("#" + title).append(selectionOptionDefault);

        $("#" + title + "-fieldset").prop("disabled", true);
    },

    renderGeneralProperties() {
        this._propertyDetailsContainer = new AccordionCollapse(this.el, "detailsSidebar", "entireDetailsAccordion", "Entity Properties");
        this._propertyDetailsContainer.create("otherEntityDetailsTitle");

        let generalProperties = this.options.detailsSidebarConfig.GeneralProperties;
        Object.keys(generalProperties).forEach((property) => {
            this.renderPropertyGroups(property, generalProperties[property].iconClass, generalProperties[property].headline);
        });
    },

    renderPropertyGroups(providedFeatureGroup = "", iconClass = "", headline = "") {
        this._propertyDetailsContainer.addCollapsibleAccordionGroup(providedFeatureGroup, iconClass, headline);

        for (const option of this.options.detailsSidebarConfig.GeneralProperties[providedFeatureGroup].options) {
            if (option.contentType === PropertyContentType.INFO) {
                this.renderPropertyInformation(providedFeatureGroup, option.providedFeature, option.content);
                continue;
            }

            this.renderPropertyForm(providedFeatureGroup, option.providedFeature, option.label, option.contentType, option.attributes, option.properties);
        }
    },

    renderPropertyInformation(appendToPropertyGroup = "", providedFeature = "", infoContent = "") {
        let textIcon = infoContent.iconClass ? '<i class="' + infoContent.iconClass + '" style="margin-right: 10px;"></i>' : '';
        let info = '<p id="' + providedFeature + '" class="text-muted">' + textIcon + infoContent.text + '</p>';
        this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, info);
    },

    renderPropertyForm(appendToPropertyGroup = "", providedFeature = "", labelText = "", contentType = "", inputAttributes = {}, inputProperties = {}) {
        const preparedPropertyFormTemplate = new FormGroup(providedFeature, appendToPropertyGroup);

        switch (contentType) {
            case PropertyContentType.TEXTAREA:
                preparedPropertyFormTemplate._addTextAreaElementWithLabel(labelText, inputAttributes, inputProperties);
                preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                const textAreaForm = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, textAreaForm);
                preparedPropertyFormTemplate.configureEnterButtonBehaviour();
                // TODO remove
                return;
                // break;  
            case PropertyContentType.INPUT_NUMBERBOX:
                preparedPropertyFormTemplate.addNumberElementWithLabel(labelText, inputAttributes, inputProperties);
                preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                const numberForm = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, numberForm);
                preparedPropertyFormTemplate.configureEnterButtonBehaviour();
                // TODO remove
                return;
                // break;  
            case PropertyContentType.INPUT_TEXTBOX:
                preparedPropertyFormTemplate.addTextElementWithLabel(labelText, inputAttributes, inputProperties);
                preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                const textForm = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, textForm);
                preparedPropertyFormTemplate.configureEnterButtonBehaviour();
                // TODO remove
                return;
                // break;
            case PropertyContentType.CHECKBOX:
                preparedPropertyFormTemplate._addCheckboxElementWithLabel(labelText, inputAttributes, inputProperties);
                preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                const checkboxForm = preparedPropertyFormTemplate.getCreatedFormTemplate(true, "", true);
                this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, checkboxForm);
                preparedPropertyFormTemplate.configureEnterButtonBehaviour();
                // TODO remove
                return;
                // break;
            case PropertyContentType.DROPDOWN:
                preparedPropertyFormTemplate.addDropdownElementWithLabelAndOptions(labelText, inputAttributes, inputProperties, new Array());
                preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                const dropdownForm = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, dropdownForm);
                preparedPropertyFormTemplate.configureEnterButtonBehaviour();
                // TODO remove
                return;
                // break;
            case PropertyContentType.INPUT_LIST:
                preparedPropertyFormTemplate._addDataListElementWithLabel(labelText, inputAttributes, inputProperties, new Array());
                preparedPropertyFormTemplate._addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
                const datalistForm = preparedPropertyFormTemplate.getCreatedFormTemplate(true);
                this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, datalistForm);
                preparedPropertyFormTemplate.configureEnterButtonBehaviour();
                // TODO remove
                return;
                // break;
            default:
                break;
        }

        
        let propertyForm = new FormGroup(providedFeature, appendToPropertyGroup);
        let propertyString = propertyForm.create(true);
        this._propertyDetailsContainer.addContentToAccordionGroup(appendToPropertyGroup, propertyString);

        switch (contentType) {
            case PropertyContentType.INPUT_RANGE:
                propertyForm.addInputRangeElementWithLabel(labelText, inputAttributes, inputProperties);
                break;
            default:
                propertyForm.addInputTextElementWithLabel(labelText, inputAttributes, inputProperties);
                break;
        }

        propertyForm.addFormFeedbackSection("Reset: Invalid input provided", "Successfully changed.");
    },

    setCurrentValues() {
        if (this._currentEntitySelection.isElement()) {
            this.setGeneralPropertiesValues();
        }

        this._propertyDetailsContainer.changeVisibility();

        if (this._currentEntitySelection.isLink()) {
            this._propertyDetailsContainer.changeVisibilityExceptGroupId("entity", false);
        } else if (this._currentEntitySelection.prop("entity/isEmbedded") && this._currentEntitySelection.prop("entity/isEmbedded") === true) {
            this._propertyDetailsContainer.changeCollapsibleGroupVisibility("position", false);
        } else {
            this._propertyDetailsContainer.showAllCollapsibleGroups();
        }
    },

    setGeneralPropertiesValues() {
        Object.keys(EntityGeneralProperties).forEach((property) => {
            let currentPropertyElement = EntityGeneralProperties[property];
            let valueToSet = currentPropertyElement.isProperty ? this._currentEntitySelection.prop(currentPropertyElement.modelPath) : this._currentEntitySelection.attr(currentPropertyElement.modelPath);
            if (property === "entity-aspect-ratio") {
                const defaultEntitySize = this._currentEntitySelection.prop("defaults/size");
                let newString = " (h ~ " + (defaultEntitySize.height / defaultEntitySize.width).toFixed(2) + " * w).";
                $("#entity-height-helpText").text(currentPropertyElement.helpText + newString);
                return;
            }
            
            $("#" + property).val(valueToSet);
            $("#" + property).trigger("change");
        });
    },

    renderEntitySpecificProperties() {
        this._emptyEntitySpecificProperties();
        switch (this._currentEntitySelection.prop("entity/type")) {
            case EntityTypes.REQUEST_TRACE:
                const requestTracePropertiesViewer = new RequestTracePropertiesViewer(this._currentEntitySelection, "entity");
                requestTracePropertiesViewer.renderProperties(this._propertyDetailsContainer);
                const savedExternalEndpointID = this._currentEntitySelection.prop("entity/properties/referredEndpoint");
                if (savedExternalEndpointID) {
                    this._highlightElement(this._currentEntitySelection.graph.getCell(savedExternalEndpointID));
                }
                this._propertyDetailsContainer.changeCollapsibleGroupVisibility("entity", true);
                return;
            case EntityTypes.DATA_AGGREGATE:
                const dataAggregatePropertiesViewer = new DataAggregatePropertiesViewer(this._currentEntitySelection, "entity");
                dataAggregatePropertiesViewer.renderProperties(this._propertyDetailsContainer);
                this._propertyDetailsContainer.changeCollapsibleGroupVisibility("entity", true);
                return;
            case EntityTypes.BACKING_DATA:
                const backingDataPropertiesViewer = new BackingDataPropertiesViewer(this._currentEntitySelection, "entity");
                backingDataPropertiesViewer.renderProperties(this._propertyDetailsContainer);
                this._propertyDetailsContainer.changeCollapsibleGroupVisibility("entity", true);
                return;
            default:
                break;
        }

        for (const entityProperty of Object.keys(EntityDetailsConfig)) {
            let currentEntityProperty = EntityDetailsConfig[entityProperty];
            if (currentEntityProperty.type === this._currentEntitySelection.prop("entity/type")) {
                if (currentEntityProperty.specificProperties == 0) {
                    this._propertyDetailsContainer.changeCollapsibleGroupVisibility("entity", false);
                    break;
                }

                for (const specificProperty of currentEntityProperty.specificProperties) {
                    this.renderPropertyForm("entity", specificProperty.providedFeature, specificProperty.label, specificProperty.contentType, specificProperty.attributes, specificProperty.properties);

                    // TODO group options?
                    let valueToSet = this._currentEntitySelection.prop("entity/properties/" + specificProperty.providedFeature);
                    $("#" + specificProperty.providedFeature).val(valueToSet);
                }

                this._propertyDetailsContainer.changeCollapsibleGroupVisibility("entity", true);
                break;
            }
        };
    },

    _emptyEntitySpecificProperties() {
        let sectionIdsToKeep = [];
        this.options.detailsSidebarConfig.GeneralProperties.entity.options.forEach((option) => { sectionIdsToKeep.push(option.providedFeature) });
        this._propertyDetailsContainer.emptyContentOfAccordionGroup("entity", sectionIdsToKeep);
    },

    addedEntity(cell) {
        if (cell.prop("entity/type") == EntityTypes.DATA_AGGREGATE) {
            // TODO handle family topic
            this._addDropDownOption(EntityTypes.DATA_AGGREGATE, cell.attr("label/textWrap/text"), cell.cid, cell.id);
        } else if (cell.prop("entity/type") == EntityTypes.BACKING_DATA) {
            // TODO handle family topic
            this._addDropDownOption(EntityTypes.BACKING_DATA, cell.attr("label/textWrap/text"), cell.cid, cell.id);
        }
    },

    removedEntity(cell) {
        if (cell.prop("entity/type") == EntityTypes.DATA_AGGREGATE) {
            // TODO handle family topic
            this._removeDropDownOption(EntityTypes.DATA_AGGREGATE, cell.id);
        } else if (cell.prop("entity/type") == EntityTypes.BACKING_DATA) {
            // TODO handle family topic
            this._removeDropDownOption(EntityTypes.BACKING_DATA, cell.id);
        }

        if (this._currentEntitySelection && cell.id === this._currentEntitySelection.id) {
            this.hideEntitySelectionProperties();
        }
    },

    _addDropDownOption(appendToElement, text, cid, graphId) {
        let newOption = '<option value="' + graphId + '">' + text + ' (CID: ' + cid + ')</option>';
        $("#" + appendToElement).append(newOption);

        if ($("#" + appendToElement + "-fieldset").prop("disabled")) {
            $("#" + appendToElement + "-fieldset").prop("disabled", false);
            $("#" + appendToElement + "-highlightingRepresentation").css("opacity", 1);
        }
    },

    _removeDropDownOption(removeFromElement, value) {
        $("#" + removeFromElement + " option").filter("[value=" + value + "]").remove();

        if ($("#" + removeFromElement + " option").length <= 1) {
            $("#" + removeFromElement + "-fieldset").prop("disabled", true);
            $("#" + removeFromElement + "-highlightingRepresentation").css("opacity", 0.4);
        }
    },

    dataAggregateSelectionChanged(event) {
        this._previousDataAggregateSelection ? this._previousDataAggregateSelection.attr("body/fill", "white") : "";
        if (!joint.util.isEmpty(event.target.value)) {
            this._previousDataAggregateSelection = this.options.graph.getCell(event.target.value);

            if (!this._previousDataAggregateSelection) {
                throw new Error("The chosen Data Aggregate entity does not exist.");
            }
            let entityHighlightingConfig = this.options.detailsSidebarConfig.EntityHighlighting.find(el => el.type == EntityTypes.DATA_AGGREGATE);
            this._previousDataAggregateSelection.attr("body/fill", entityHighlightingConfig.highlightColour);
        }
    },

    backingDataSelectionChanged(event) {
        this._previousBackingDataSelection ? this._previousBackingDataSelection.attr("body/fill", "white") : "";
        if (!joint.util.isEmpty(event.target.value)) {
            this._previousBackingDataSelection = this.options.graph.getCell(event.target.value);

            if (!this._previousBackingDataSelection) {
                throw new Error("The chosen Backing Data entity does not exist.");
            }
            let entityHighlightingConfig = this.options.detailsSidebarConfig.EntityHighlighting.find(el => el.type == EntityTypes.BACKING_DATA);
            this._previousBackingDataSelection.attr("body/fill", entityHighlightingConfig.highlightColour);
        }
    },

    handlePropertyChanged(event) {
        let $inputElement = $("#" + event.propertyId);
        let newValue = $inputElement.val();
        if (this._validateNewPropertyValue(newValue, EntityGeneralProperties[event.propertyId]) === false) {
            let oldValue = EntityGeneralProperties[event.propertyId].isProperty ? this._currentEntitySelection.prop(EntityGeneralProperties[event.propertyId].modelPath) : this._currentEntitySelection.attr(EntityGeneralProperties[event.propertyId].modelPath);
            $inputElement.val(oldValue);
            $inputElement.trigger("change");
            $("#" + event.originalTarget.parentElement.parentElement.id + " .invalid-feedback").show();
            $inputElement.addClass("is-invalid");
            return;
        }

        if (EntityGeneralProperties[event.propertyId].hasProvidedMethod) {
            switch (event.propertyType) {
                case "position":
                    const currentPosition = this._currentEntitySelection.position();
                    const restrictedArea = this.options.paper.getArea();
                    let xPosition = currentPosition.x;
                    let yPosition = currentPosition.y;
                    if (event.propertyId.split("-").includes("x")) {
                        xPosition = Number(newValue);
                    } else if (event.propertyId.split("-").includes("y")) {
                        yPosition = Number(newValue);
                    }

                    this._currentEntitySelection.position(xPosition, yPosition, { deep: true, restrictedArea: restrictedArea });
                    break;
                case "size":
                    const currentSize = this._currentEntitySelection.size();
                    let width = currentSize.width;
                    let height = currentSize.height;

                    if (event.propertyId.split("-").includes("width")) {
                        width = Number(newValue);
                    } else if (event.propertyId.split("-").includes("height")) {
                        height = Number(newValue);
                    }

                    // ensure aspect ratio
                    const defaultEntitySize = this._currentEntitySelection.prop("defaults/size");
                    const aspectRatio = defaultEntitySize.height / defaultEntitySize.width;
                    height = Number((aspectRatio * width).toFixed(2));
                    console.log(this._currentEntitySelection.prop("defaults/size"));

                    console.log(width + " " + height);
                    this._currentEntitySelection.resize(width, height, { deep: true });
                default:
                    break;
            }
        } else if (EntityGeneralProperties[event.propertyId].isProperty) {
            this._currentEntitySelection.prop(EntityGeneralProperties[event.propertyId].modelPath, newValue);
        } else {
            if ((this._currentEntitySelection.prop("entity/type") === EntityTypes.BACKING_DATA) && ("entity-text".localeCompare(event.propertyId) === 0) && this._currentEntitySelection.prop("entity/properties/assignedFamily")) {
                const relatedBackingDataEntities = this.options.graph.getElements().filter((entityElement) => {
                    return entityElement.prop("entity/type") === EntityTypes.BACKING_DATA && entityElement.attr(EntityGeneralProperties[event.propertyId].modelPath).localeCompare(this._currentEntitySelection.attr(EntityGeneralProperties[event.propertyId].modelPath)) === 0;
                });
                
                for (const relatedBackingDataEntity of relatedBackingDataEntities) {
                    relatedBackingDataEntity.attr(EntityGeneralProperties[event.propertyId].modelPath, newValue);
                }
            } else if ((this._currentEntitySelection.prop("entity/type") === EntityTypes.DATA_AGGREGATE) && ("entity-text".localeCompare(event.propertyId) === 0) && this._currentEntitySelection.prop("entity/properties/assignedFamily")) {
                const relatedDataAggregateEntities = this.options.graph.getElements().filter((entityElement) => {
                    return entityElement.prop("entity/type") === EntityTypes.DATA_AGGREGATE && entityElement.attr(EntityGeneralProperties[event.propertyId].modelPath).localeCompare(this._currentEntitySelection.attr(EntityGeneralProperties[event.propertyId].modelPath)) === 0;
                });
                
                for (const relatedDataAggregateEntity of relatedDataAggregateEntities) {
                    relatedDataAggregateEntity.attr(EntityGeneralProperties[event.propertyId].modelPath, newValue);
                }
            }
            this._currentEntitySelection.attr(EntityGeneralProperties[event.propertyId].modelPath, newValue);
        }

        $("#" + event.originalTarget.parentElement.parentElement.id + " .valid-feedback").show();
        $inputElement.addClass("is-valid");
    },

    handleEntityPropertyChanged(event) {
        let newValue = $("#" + event.propertyId).val();
        // if (this._validateNewPropertyValue(newValue, EntityGeneralProperties[event.propertyId]) === false) {
        //     let oldValue = EntityGeneralProperties[event.propertyId].isProperty ? this._currentEntitySelection.prop(EntityGeneralProperties[event.propertyId].modelPath) : this._currentEntitySelection.attr(EntityGeneralProperties[event.propertyId].modelPath);
        //     $("#" + event.propertyId).val(oldValue);
        //     $("#" + event.propertyId).trigger("change");
        //     $("#" + event.originalTarget.parentElement.id + " .invalid-feedback").show();
        //     $("#" + event.propertyId).addClass("is-invalid");
        //     return;
        // }

        // TODO check for group things
        this._currentEntitySelection.prop("entity/properties/" + event.propertyId, newValue);
        $("#" + event.originalTarget.parentElement.parentElement.id + " .valid-feedback").show();
        $("#" + event.propertyId).addClass("is-valid");
    },

    handleRequestTraceExternalEndpointChanged(event) {
        if (!joint.util.isEmpty(event.target.value)) {
            const externalEndpoint = this.options.graph.getCell(event.target.value);

            if (!externalEndpoint && externalEndpoint.isLink()) {
                throw new Error("The chosen External Endpoint entity does not exist.");
            }

            this._highlightElement(externalEndpoint);
            this._currentEntitySelection.prop("entity/properties/referredEndpoint", event.target.value);

            // TODO keep?
            $("#" + event.target.id).addClass("is-valid"); // handle remove class if selection changes
        }
    },

    handleDataAggregateParentRelationChanged(event) {
        if (!joint.util.isEmpty(event.target.value) && this._currentEntitySelection.parent()) {
            // const parentEntity = this.options.graph.getCell(this._currentEntitySelection.parent());
            // TODO save also in parent?

            this._currentEntitySelection.prop("entity/properties/embedded", {
                parentId: this._currentEntitySelection.parent(),
                parentRelation: event.target.value
            }, { rewrite: true, isolate: true });

            // TODO keep?
            $("#" + event.target.id).addClass("is-valid"); // handle remove class if selection changes
        }
    },

    updateElementPosition(cell) {
        if ($("#collapse-position").hasClass("show") === false) {
            // properties not visible --> no live update necessary
            return;
        }

        let currentPosition = cell.position();
        $("#entity-x-position").val(currentPosition.x);
        $("#entity-y-position").val(currentPosition.y);
    },

    _highlightElement(elementToHighlight) {
        this._currentColourSelection = elementToHighlight;
        this._currentColourSelection.attr({
            body: {
                stroke: ColourConfig.entityHighlighting,
                strokeWidth: 3
            }
        });
    },

    _validateNewPropertyValue(newValue, propertyToChange) {
        if (!newValue || newValue <= 0) {
            return false;
        }

        if (propertyToChange.minPath) {
            let minValue = this._currentEntitySelection.prop(propertyToChange.minPath);
            return newValue >= minValue;
        }

        if (propertyToChange.min) {
            return newValue >= Number(propertyToChange.min);
        }

        return true;
    },

    close() {
        // TODO
    }
});

export default DetailsSidebar;