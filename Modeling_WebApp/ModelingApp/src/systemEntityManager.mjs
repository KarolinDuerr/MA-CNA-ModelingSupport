import EntityTypes from './config/entityTypes.mjs';
import * as Entities from './entities.mjs';
import ErrorMessage, { ErrorType } from './errorMessage.mjs'
import ToscaConverter from './tosca/ToscaConverter.mjs';
import { UIContentType } from './config/toolbarConfiguration.mjs';
import UIModalDialog, { DialogSize } from './representations/guiElements.dialog.mjs';
import { PropertyContentType } from './config/detailsSidebarConfig.mjs';

class SystemEntityManager {

    #currentSystemGraph;

    #currentSystemEntity;

    #errorMessages = new Map();

    #includedDataAggregateEntities = new Map();

    constructor(currentGraph) {
        if (!(currentGraph instanceof joint.dia.Graph)) {
            throw new TypeError("SystemEntityManager: The provided graph has to be a joint.dia.Graph element");
        }

        this.#currentSystemGraph = currentGraph;
        this.#currentSystemEntity = new Entities.System("test");

        this.#subscribeToEvents();
    }

    #subscribeToEvents() {
        this.#currentSystemGraph.on("initialSystemName", (event) => {
            this.#currentSystemEntity.setSystemName = event.systemName;
        });

        this.#currentSystemGraph.on("systemNameChanged", (event) => {
            this.#currentSystemEntity.setSystemName = event.editedAppName;
        });

        this.#currentSystemGraph.on("startToscaTransformation", (event) => {
            this.#createYamlDocument();
        });
    }

    get getCurrentSystemEntity() { // TODO fix me
        const copiedSystemEntity = JSON.parse(JSON.stringify(this.#currentSystemEntity));
        console.log(copiedSystemEntity);
        // return Object.assign(new Entities.System(), copiedSystemEntity);
        return this.#currentSystemEntity;
    }

    #createYamlDocument() {
        this.#errorMessages = new Map();
        this.#includedDataAggregateEntities = new Map();
        this.#currentSystemEntity.resetAllIncludedSystemEntities();

        this.#convertToSystemEntity();

        if (this.#errorMessages?.size > 0) {
            this.#provideConnectionWarningDialog();
            return;
        }

        const toscaConverter = new ToscaConverter(this.#currentSystemEntity);
        toscaConverter.convert();
    }

    #convertToSystemEntity() {
        // get first elements to ensure that all connection relate entities already exist
        for (const graphElement of this.#currentSystemGraph.getElements()) {
            this.#addEntity(graphElement);
        }

        for (const graphLink of this.#currentSystemGraph.getLinks()) {
            this.#addConnectionEntity(graphLink);
        }

        this.#checkValidityOfDataAggregates();
    }

    #addEntity(graphElement) {
        let addedEntity = "";
        switch (graphElement.prop("entity/type")) {
            case EntityTypes.COMPONENT:
                addedEntity = this.#createComponent(graphElement, EntityTypes.COMPONENT);
                break;
            case EntityTypes.SERVICE:
                addedEntity = this.#createComponent(graphElement, EntityTypes.SERVICE);
                break;
            case EntityTypes.BACKING_SERVICE:
                addedEntity = this.#createComponent(graphElement, EntityTypes.BACKING_SERVICE);
                break;
            case EntityTypes.STORAGE_BACKING_SERVICE:
                addedEntity = this.#createComponent(graphElement, EntityTypes.STORAGE_BACKING_SERVICE);
                break;
            case EntityTypes.INFRASTRUCTURE:
                addedEntity = this.#createInfrastructureEntity(graphElement);
                break;
            case EntityTypes.DATA_AGGREGATE:
                addedEntity = this.#createDataAggregate(graphElement);
                break;
            case EntityTypes.REQUEST_TRACE:
                addedEntity = this.#createRequestTrace(graphElement);
                break;
            case EntityTypes.BACKING_DATA:
                addedEntity = this.#createBackingData(graphElement);
                break;
            default:
                return; // TODO
        }

        if (!addedEntity) {
            return;
        }

        try {
            this.#currentSystemEntity.addEntity(addedEntity);
        } catch (error) {
            console.log(error); // TODO
        }
    }

    #addConnectionEntity(graphLink) {
        let addedEntity = "";
        switch (graphLink.prop("entity/type")) {
            case EntityTypes.LINK:
                addedEntity = this.#createLink(graphLink);
                break;
            case EntityTypes.DEPLOYMENT_MAPPING:
                addedEntity = this.#createDeploymentMapping(graphLink);
                break;
            default:
                break;
        }

        if (!addedEntity) {
            return;
        }

        try {
            this.#currentSystemEntity.addEntity(addedEntity);
        } catch (error) {
            console.log(error); // TODO
        }
    }

    #createComponent(graphElement, endpointEntityType) {
        let groupedLinks = joint.util.groupBy(this.#currentSystemGraph.getConnectedLinks(graphElement), (element) => {
            return element.prop("entity/type");
        });

        const deploymentMappings = groupedLinks[EntityTypes.DEPLOYMENT_MAPPING];

        if (!deploymentMappings || deploymentMappings.length === 0 || deploymentMappings.length > 1) {
            const type = endpointEntityType === EntityTypes.COMPONENT ? "Component" : (endpointEntityType === EntityTypes.SERVICE ? "Service" : (endpointEntityType === EntityTypes.BACKING_SERVICE ? "Backing Service" : "Storage Backing Service"));
            const message = `The ${type} entity is only valid if it is hosted by exactly one Infrastructure entity. However, the ${type} "${graphElement.attr("label/textWrap/text")}" is hosted by none or several Infrastructure 
            entities and is, therefore, invalid.`;
            const error = new ErrorMessage(endpointEntityType ?? EntityTypes.COMPONENT, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "Hosting Relation", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const infrastructureModelEntity = deploymentMappings[0].getSourceElement().prop("entity/type") === EntityTypes.INFRASTRUCTURE ? deploymentMappings[0].getSourceElement() : deploymentMappings[0].getTargetElement();
        const infrastructure = this.#currentSystemEntity.getInfrastructureEntities.get(infrastructureModelEntity.getModelId) ?? this.#createInfrastructureEntity(infrastructureModelEntity);

        if (!infrastructure) {
            // ErrorMessages already created while creating entity
            return null;
        }

        let componentModelEntity;
        if (endpointEntityType === EntityTypes.COMPONENT) {
            componentModelEntity = new Entities.Component(graphElement.attr("label/textWrap/text"), graphElement.id, infrastructure);
        } else if (endpointEntityType === EntityTypes.SERVICE) {
            componentModelEntity = new Entities.Service(graphElement.attr("label/textWrap/text"), graphElement.id, infrastructure);
        } else if (endpointEntityType === EntityTypes.BACKING_SERVICE) {
            componentModelEntity = new Entities.BackingService(graphElement.attr("label/textWrap/text"), graphElement.id, infrastructure);
            componentModelEntity["providedFunctionality"] = graphElement.prop("entity/properties/providedFunctionality");
        } else if (endpointEntityType === EntityTypes.STORAGE_BACKING_SERVICE) {
            componentModelEntity = new Entities.StorageBackingService(graphElement.attr("label/textWrap/text"), graphElement.id, infrastructure);
            componentModelEntity["properties"] = {
                databaseName: graphElement.prop("entity/properties/databaseName"),
                port: graphElement.prop("entity/properties/port")
            };
        } else {
            componentModelEntity = new Entities.Component(graphElement.attr("label/textWrap/text"), graphElement.id, infrastructure);
        }


        let embeddedCells = graphElement.getEmbeddedCells();
        for (const embeddedCell of embeddedCells) {
            switch (embeddedCell.prop("entity/type")) {
                case EntityTypes.ENDPOINT:
                    const endpoint = this.#createEndpointEntity(embeddedCell, EntityTypes.ENDPOINT);
                    if (!endpoint) {
                        // ErrorMessages already created while creating entity 
                        break;
                    }
                    componentModelEntity.addEntity(endpoint);
                    break;
                case EntityTypes.EXTERNAL_ENDPOINT:
                    const externalEndpoint = this.#createEndpointEntity(embeddedCell, EntityTypes.EXTERNAL_ENDPOINT);
                    if (!externalEndpoint) {
                        // ErrorMessages already created while creating entity 
                        break;
                    }
                    componentModelEntity.addEntity(externalEndpoint);
                    break;
                case EntityTypes.DATA_AGGREGATE:
                    const dataAggregate = this.#currentSystemEntity.getDataAggregateEntities.get(embeddedCell.attr("label/textWrap/text")) ?? this.#createDataAggregate(embeddedCell, true);
                    if (!dataAggregate) {
                        // ErrorMessages already created while creating entity 
                        break;
                    }
                    componentModelEntity.addEntity(dataAggregate);
                    break;
                case EntityTypes.BACKING_DATA:
                    const backingData = this.#currentSystemEntity.getBackingDataEntities.get(embeddedCell.attr("label/textWrap/text")) ?? this.#createBackingData(embeddedCell);
                    if (!backingData) {
                        // ErrorMessages already created while creating entity 
                        break;
                    }
                    componentModelEntity.addEntity(backingData);
                    break;
                default:
                    break;
            }
        }

        componentModelEntity["position"] = graphElement.position();
        componentModelEntity["size"] = graphElement.size();
        return componentModelEntity;
    }

    #createInfrastructureEntity(graphElement) { // TODO hosted by Infrastructure

        let infrastructureEntity = this.#checkIfStorageBackingServiceConnected(graphElement);
        if (!infrastructureEntity) {
            const message = `A Storage Backing Service entity cannot be deployed with Component, Service or Backing Service entities on the same Infrastructure entity. However, the Infrastructure "${graphElement.attr("label/textWrap/text")}" 
            currently deploys a Storage Backing Service with at least one other entity type and is, therefore, invalid.`;
            const error = new ErrorMessage(EntityTypes.INFRASTRUCTURE, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "Entity Type Deployments", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const backingDataEntities = graphElement.getEmbeddedCells();
        if (backingDataEntities.length > 0) {
            for (const backingDataEntity of backingDataEntities) {
                switch (backingDataEntity.prop("entity/type")) {
                    case EntityTypes.BACKING_DATA:
                        const backingData = this.#currentSystemEntity.getBackingDataEntities.get(backingDataEntity.attr("label/textWrap/text")) ?? this.#createBackingData(backingDataEntity);
                        if (!backingData) {
                            // ErrorMessages already created while creating entity 
                            return null;
                        }
                        infrastructureEntity.addBackingDataEntity(backingData);
                        break;
                    default:
                        break;
                }
            }
        }
        infrastructureEntity["position"] = graphElement.position();
        infrastructureEntity["size"] = graphElement.size();
        return infrastructureEntity;
    }
    
    #checkIfStorageBackingServiceConnected(graphElement) {
        let connectedLinksForCurrentInfrastructure = this.#currentSystemGraph.getConnectedLinks(graphElement);

        if (connectedLinksForCurrentInfrastructure.length <= 1) {
            if (connectedLinksForCurrentInfrastructure[0].getTargetElement()?.prop("entity/type") !== EntityTypes.STORAGE_BACKING_SERVICE || connectedLinksForCurrentInfrastructure[0].getSourceElement()?.prop("entity/type") !== EntityTypes.STORAGE_BACKING_SERVICE) {
                return new Entities.Infrastructure(graphElement.attr("label/textWrap/text"), graphElement.id, Entities.InfrastructureTypes.DBMS);
            } else {
                return new Entities.Infrastructure(graphElement.attr("label/textWrap/text"), graphElement.id, Entities.InfrastructureTypes.COMPUTE);
            }
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
            return null;
        } else if (storageBackingServiceConnected && !includesComponentTypesInDepoyment) {
            return new Entities.Infrastructure(graphElement.attr("label/textWrap/text"), graphElement.id, Entities.InfrastructureTypes.DBMS);
        }
        return new Entities.Infrastructure(graphElement.attr("label/textWrap/text"), graphElement.id, Entities.InfrastructureTypes.COMPUTE);
    }

    #createDataAggregate(graphElement, returnDataAggregateAnyway = false) {
        if (!graphElement || !(graphElement.getParentCell())) {
            const message = `A Data Aggregate entity is only valid if it is embedded in one of the component type entities. However, the Data Aggregate "${graphElement.attr("label/textWrap/text")}" has no parent entity 
            and is, therefore, invalid.`;
            const error = new ErrorMessage(EntityTypes.DATA_AGGREGATE, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "Embedded Relation", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const dataAggregate = new Entities.DataAggregate(graphElement.attr("label/textWrap/text"), graphElement.id);
        const dataAggregateEmbeddedProperties = graphElement.prop("entity/properties/embedded");

        let addedEntity = null;
        if ("persisted".localeCompare(dataAggregateEmbeddedProperties.parentRelation) === 0) {
            if (this.#currentSystemEntity.getDataAggregateEntities.has(dataAggregate.name)) {
                this.#currentSystemEntity.getDataAggregateEntities.get(dataAggregate.name).addPersistedByEntity(graphElement.getParentCell().attr("label/textWrap/text"));
            } else {
                dataAggregate.addPersistedByEntity(graphElement.getParentCell().attr("label/textWrap/text"));
                addedEntity = dataAggregate;
            }
        } else if (returnDataAggregateAnyway) {
            // Component entities want persisted and used Data Aggregates whereas the System should only store each Data Aggregate once therefore otherwise focus on persisted ones
            addedEntity = dataAggregate;
        }

        if (!(this.#includedDataAggregateEntities.has(dataAggregate.name))) {
            this.#includedDataAggregateEntities.set(dataAggregate.name, dataAggregate);
        }

        return addedEntity;
    }

    // ensure that Data Aggregate is persisted at least once by another entity
    #checkValidityOfDataAggregates() {
        for (const dataAggregate of this.#includedDataAggregateEntities.values()) {
            if (!(this.#currentSystemEntity.getDataAggregateEntities.has(dataAggregate.getName))) {
                const message = `A Data Aggregate entity has to be persisted by at least one component type entity, preferably a Storage Backing Service. However, the Data Aggreagte 
                "${dataAggregate.getName}" is currently not persisted by any other entity and is, therefore, invalid.`;
                const error = new ErrorMessage(EntityTypes.DATA_AGGREGATE, ErrorType.INVALID_MODEL_ENTIY, dataAggregate.getName, "Parent Relation", message);
                this.#errorMessages.set(dataAggregate.getModelId, error);
            }
        }
    }

    #createBackingData(graphElement) {
        if (!graphElement || !(graphElement.getParentCell())) {
            const message = `A Backing Data entity is only valid if it is embedded in one of the component type or infrastructure entities. However, the Backing Data "${graphElement.attr("label/textWrap/text")}" 
            has no parent entity and is, therefore, invalid.`;
            const error = new ErrorMessage(EntityTypes.BACKING_DATA, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "Embedded Relation", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const includedData = graphElement.prop("entity/properties/includedData");

        if (includedData.length <= 0) {
            const message = `A Backing Data entity has to include at least one data item. However, the Backing Data "${graphElement.attr("label/textWrap/text")}" 
            has information included and is, therefore, invalid.`;
            const error = new ErrorMessage(EntityTypes.BACKING_DATA, ErrorType.MISSING_INFORMATION, graphElement.attr("label/textWrap/text"), "Included Data", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const backingData = new Entities.BackingData(graphElement.id, graphElement.attr("label/textWrap/text"), includedData);
        if (this.#currentSystemEntity.getBackingDataEntities.has(backingData.name)) {
            return null; // TODO check that model ensures that every Data Aggregate includes all included_data items 
        } else {
            try {
                return backingData;
            } catch (error) {
                console.log(error); // TODO
            }
        }
    }

    #createEndpointEntity(graphElement, endpointEntityType) {
        const type = endpointEntityType === EntityTypes.ENDPOINT ? "Endpoint" : "External Endpoint";
        if (!graphElement || !(graphElement.getParentCell())) {
            const message = `An ${type} entity is only valid if it is embedded in one of the component type entities. However, the ${type} "${graphElement.attr("label/textWrap/text")}" has no parent entity 
            and is, therefore, invalid.`;
            const error = new ErrorMessage(endpointEntityType === EntityTypes.ENDPOINT ? EntityTypes.ENDPOINT : EntityTypes.EXTERNAL_ENDPOINT, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "Embedded Relation", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const endpointType = graphElement.prop("entity/properties/endpointType");
        const endpointPath = graphElement.prop("entity/properties/endpointPath");
        const port = graphElement.prop("entity/properties/port");

        if (!endpointType || typeof endpointType !== "string") {
            const message = `An ${type} entity is only valid if it defines its type, e.g. POST or subscribes-to. However, the ${type} "${graphElement.attr("label/textWrap/text")}" does not provide this information 
            and is, therefore, invalid.`;
            const error = new ErrorMessage(endpointEntityType === EntityTypes.ENDPOINT ? EntityTypes.ENDPOINT : EntityTypes.EXTERNAL_ENDPOINT, ErrorType.MISSING_INFORMATION, graphElement.attr("label/textWrap/text"), "Endpoint Type", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        if (!endpointPath || typeof endpointPath !== "string") {
            const message = `An ${type} entity is only valid if it specifies its URL path, e.g. /customers/{customerId}. However, the ${type} "${graphElement.attr("label/textWrap/text")}" does not provide this information 
            and is, therefore, invalid.`;
            const error = new ErrorMessage(endpointEntityType === EntityTypes.ENDPOINT ? EntityTypes.ENDPOINT : EntityTypes.EXTERNAL_ENDPOINT, ErrorType.MISSING_INFORMATION, graphElement.attr("label/textWrap/text"), "Endpoint Path", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        if (!port || isNaN(port)) {
            const message = `An ${type} entity is only valid if it provides the port at which it is available, e.g. 8001. However, the ${type} "${graphElement.attr("label/textWrap/text")}" does not provide this information 
            and is, therefore, invalid.`;
            const error = new ErrorMessage(endpointEntityType === EntityTypes.ENDPOINT ? EntityTypes.ENDPOINT : EntityTypes.EXTERNAL_ENDPOINT, ErrorType.MISSING_INFORMATION, graphElement.attr("label/textWrap/text"), "Port", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        if (endpointEntityType === EntityTypes.EXTERNAL_ENDPOINT) {
            let externalEndpoint = new Entities.ExternalEndpoint(graphElement.id, endpointType, endpointPath, port, graphElement.getParentCell().attr("label/textWrap/text"));
            externalEndpoint["position"] = graphElement.position();
            externalEndpoint["size"] = graphElement.size();
            externalEndpoint["label"] = graphElement.attr("label/textWrap/text");
            return externalEndpoint;
        } else {
            let endpoint = new Entities.Endpoint(graphElement.id, endpointType, endpointPath, port, graphElement.getParentCell().attr("label/textWrap/text"));
            endpoint["position"] = graphElement.position();
            endpoint["size"] = graphElement.size();
            endpoint["label"] = graphElement.attr("label/textWrap/text");
            return endpoint;
        }
    }

    #createRequestTrace(graphElement) {
        const externalEndpointId = graphElement.prop("entity/properties/referredEndpoint");
        if (!externalEndpointId || !(externalEndpointId.trim())) {
            const message = `A Request Trace entity is only valid if it specifies its referred External Endpoint entity. However, for the Request Trace "${graphElement.attr("label/textWrap/text")}" 
            no External Endpoint was selected and it is, therefore, invalid.`;
            const error = new ErrorMessage(EntityTypes.REQUEST_TRACE, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "External Endpoint", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const involvedLinkIds = graphElement.prop("entity/properties/involvedLinks");
        if (!involvedLinkIds || !involvedLinkIds[0] || involvedLinkIds[0].length <= 0) {
            const message = `A Request Trace entity is only valid if it specifies its involved Link entities. However, the Request Trace "${graphElement.attr("label/textWrap/text")}" 
            does not provide any information about its involved Links and it is, therefore, invalid.`;
            const error = new ErrorMessage(EntityTypes.REQUEST_TRACE, ErrorType.INVALID_MODEL_ENTIY, graphElement.attr("label/textWrap/text"), "Involved Links", message);
            this.#errorMessages.set(graphElement.id, error);
            return null;
        }

        const externalEndpoint = this.#createEndpointEntity(this.#currentSystemGraph.getCell(externalEndpointId), EntityTypes.EXTERNAL_ENDPOINT);
        if (!externalEndpoint) {
            // ErrorMessages already created while creating entity
            return null;
        }

        const requestTrace = new Entities.RequestTrace(graphElement.attr("label/textWrap/text"), graphElement.id, externalEndpoint, involvedLinkIds[0]);
        requestTrace["position"] = graphElement.position();
        requestTrace["size"] = graphElement.size();
        return requestTrace;
    }

    #createLink(graphLink) {
        const sourceElement = graphLink.getSourceElement();
        const targetElement = graphLink.getTargetElement();
        if (!sourceElement && targetElement) {
            const message = "There exists a Link that is missing its source entity.";
            const error = new ErrorMessage(EntityTypes.LINK, ErrorType.INVALID_MODEL_ENTIY, "Target: " + targetElement.attr("label/textWrap/text"), "Link Source Entity", message);
            this.#errorMessages.set(graphLink.id, error);
            return null;
        }

        if (!targetElement && sourceElement) {
            const message = "There exists a Link that is missing its target entity.";
            const error = new ErrorMessage(EntityTypes.LINK, ErrorType.INVALID_MODEL_ENTIY, "Source: " + sourceElement.attr("label/textWrap/text"), "Link Target Entity ", message);
            this.#errorMessages.set(graphLink.id, error);
            return null;
        }

        if (!targetElement && !sourceElement) {
            const message = "There exists a Link that is missing its source and target entity.";
            const error = new ErrorMessage(EntityTypes.LINK, ErrorType.INVALID_MODEL_ENTIY, graphLink.id, "Link Source and Target Entity", message);
            this.#errorMessages.set(graphLink.id, error);
            return null;
        }

        const relationType = graphLink.prop("entity/properties/relationType");

        const sourceEntity = this.#currentSystemEntity.getComponentEntities.get(sourceElement.id);
        const targetEndpoint = this.#currentSystemEntity.getDataAggregateEntities.get(targetElement.attr("label/textWrap/text")) ?? this.#createEndpointEntity(targetElement, targetElement.prop("entity/type"));

        if (!sourceEntity || !targetEndpoint) {
            // ErrorMessages already created while creating entity
            return null;
        }

        let linkEntity = new Entities.Link(graphLink.id, sourceEntity, targetEndpoint);
        linkEntity.addRelationType(relationType);

        if (sourceEntity) {
            // add Link Connection to source entity --> needed at least for TOSCA export 
            sourceEntity.addLinkEntity(linkEntity);
        }

        if (this.#currentSystemEntity.getRequestTraceEntities) {
            for (const requestTraceEntity of this.#currentSystemEntity.getRequestTraceEntities.values()) {
                if (requestTraceEntity.getLinkEntityIds?.has(graphLink.id)) {
                    requestTraceEntity.addLinkEntity(linkEntity);
                }
            }
        }
        return linkEntity;
    }

    #createDeploymentMapping(graphLink) {
        const sourceElement = graphLink.getSourceElement(); // TODO check for storageBackingService
        const targetElement = graphLink.getTargetElement();
        if (!sourceElement && targetElement) {
            const message = "There exists a Deployment Mapping that is missing its source entity.";
            const error = new ErrorMessage(EntityTypes.LINK, ErrorType.INVALID_MODEL_ENTIY, "Target: " + targetElement.attr("label/textWrap/text"), "Deployment Mapping Source Entity", message);
            this.#errorMessages.set(graphLink.id, error);
            return null;
        }

        if (!targetElement && sourceElement) {
            const message = "There exists a Deployment Mapping that is missing its target entity.";
            const error = new ErrorMessage(EntityTypes.LINK, ErrorType.INVALID_MODEL_ENTIY, "Source: " + sourceElement.attr("label/textWrap/text"), "Deployment Mapping Target Entity", message);
            this.#errorMessages.set(graphLink.id, error);
            return null;
        }

        if (!targetElement && !sourceElement) {
            const message = "There exists a Deployment Mapping that is missing its source and target entity.";
            const error = new ErrorMessage(EntityTypes.LINK, ErrorType.INVALID_MODEL_ENTIY, graphLink.id, "Deployment Mapping Source and Target Entity", message);
            this.#errorMessages.set(graphLink.id, error);
            return null;
        }

        let underlyingInfrastructure;
        let deployedEntity;
        if (sourceElement.prop("entity/type") === EntityTypes.INFRASTRUCTURE) {
            underlyingInfrastructure = this.#currentSystemEntity.getInfrastructureEntities.get(sourceElement.id);

            if (targetElement.prop("entity/type") === EntityTypes.INFRASTRUCTURE) {
                deployedEntity = this.#currentSystemEntity.getInfrastructureEntities.get(targetElement.id);
            } else {
                deployedEntity = this.#currentSystemEntity.getComponentEntities.get(targetElement.id);
            }
        } else {
            underlyingInfrastructure = this.#currentSystemEntity.getInfrastructureEntities.get(targetElement.id);
            deployedEntity = this.#currentSystemEntity.getComponentEntities.get(sourceElement.id);
        }

        if (!underlyingInfrastructure || !deployedEntity) {
            // ErrorMessages already created while creating entity 
            return null;
        }

        return new Entities.DeploymentMapping(graphLink.id, deployedEntity, underlyingInfrastructure);
    }

    #provideConnectionWarningDialog() {
        let modalDialog = new UIModalDialog("invalidToscaModelItems-error", "invalidToscaModelItems");
        const tableRows = this.#createErrorTableRows();
        InvalidModelItemsDialogConfig.content.groups.forEach((groupElement) => {
            if (String("invalid-model-elements-table").localeCompare(groupElement.id) === 0) {
                groupElement.tableRows = tableRows;
            }
        });
        modalDialog.create(InvalidModelItemsDialogConfig);
        modalDialog.render("modals", true, DialogSize.EXTRA_LARGE);
        modalDialog.show();
    }

    #createErrorTableRows() {
        let tableRows = new Array();
        for (const errorMessage of this.#errorMessages.values()) {
            tableRows.push({
                entityType: errorMessage.getAffectedEntityType,
                errorType: errorMessage.getErrorType,
                entity: errorMessage.getEntityName,
                affectedInformation: errorMessage.getAffectedInformation,
                message: errorMessage.getMessage
            });
        }
        return tableRows;
    }
}

// TODO keep here? --> currently shown every time new problematic connection is added
const InvalidModelItemsDialogConfig = {
    type: "modalDialog",
    header: {
        iconClass: "fa-solid fa-triangle-exclamation",
        type: "error",
        text: "Invalid Model Items",
        closeButton: true
    },
    footer: {
        cancelButtonText: "Ok, understood",
    },
    content: {
        contentType: UIContentType.GROUP_FORMS,
        groups: [
            {
                id: "invalid-model-elements-table",
                contentType: PropertyContentType.TABLE,
                headline: "Identified Error",
                text: `The following table shows all identified errors that prevent a valid TOSCA transformation. 
                Please fix the following error, and then try to restart the transformation process. `,
                tableColumnHeaders: [
                    {
                        text: "Entity Type"
                    },
                    {
                        text: "Error Type"
                    },
                    {
                        text: "Affected Entity"
                    },
                    {
                        text: "Affected Information"
                    },
                    {
                        text: "Message"
                    }
                ],
                tableRows: []
            }
        ]
    }
};

export default SystemEntityManager;