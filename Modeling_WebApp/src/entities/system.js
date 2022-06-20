import { BackingData } from "./backingData.js";
import { BackingService } from "./backingService.js";
import { Component } from "./component.js";
import { DataAggregate } from "./dataAggregate.js";
import { DeploymentMapping } from "./deploymentMapping.js";
import { Infrastructure } from "./infrastructure.js";
import { Link } from "./link.js";
import { RequestTrace } from "./requestTrace.js";
import { Service } from "./service.js";
import { StorageBackingService } from "./storageBackingService.js";

/**
 * The module for aspects related to a Component quality model Entity.
 * @module entities/system
 */

/**
 * Class representing a System entity.
 * @class
 */
class System { // TODO use ID's as keys instead of name?

    #systemName;

    #componentEntities = new Map();

    #linkEntities = new Map();

    #infrastructureEntities = new Map();

    #deploymentMappingEntities = new Map();

    #requestTraceEntities = new Map();

    #dataAggregateEntities = new Map();

    #backingDataEntities = new Map();

    /**
     * Create a System entity.
     * @param {string} applicationName The name of the application, which the System entity represents. 
     */
    constructor(applicationName) {
        this.#systemName = applicationName;
    }

    /**
     * Add a list of quality model entities ({@link Component}, {@link Service}, {@link BackingService}, {@link StorageBackingService}, {@link Link}, {@link Infrastructure},
     * {@link DeploymentMapping}, {@link RequestTrace}, {@link DataAggregate} or {@link BackingData}) to the System. 
     * @param {Array} listOfEntitiesToAdd The list of entities, which should be added to the System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addEntities(listOfEntitiesToAdd) {
        for (const newEntity of listOfEntitiesToAdd) {
            this.addEntity(newEntity);
        }
    }

    /**
     * Add a quality model entity ({@link Component}, {@link Service}, {@link BackingService}, {@link StorageBackingService}, {@link Link}, {@link Infrastructure},
     * {@link DeploymentMapping}, {@link RequestTrace}, {@link DataAggregate} or {@link BackingData}) to the System. 
     * @param {Component|Link|Infrastructure|DeploymentMapping|RequestTrace|DataAggregate|BackingData} entityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addEntity(entityToAdd) {
        switch (entityToAdd.constructor) {
            case Component:
            case Service:
            case BackingService:
            case StorageBackingService:
                this.addComponentEntity(entityToAdd);
                break;
            case Link:
                this.addLinkEntity(entityToAdd);
                break;
            case Infrastructure:
                this.addInfrastructureEntity(entityToAdd);
                break;
            case DeploymentMapping:
                this.addDeploymentMappingEntity(entityToAdd);
                break;
            case RequestTrace:
                this.addRequestTraceEntity(entityToAdd);
                break;
            case DataAggregate:
                this.addDataAggregateEntity(entityToAdd);
                break;
            case BackingData:
                this.addBackingDataEntity(entityToAdd);
                break;
            default:
                const errorMessage = "Wrong entity type provided. The provided entity was: " + Object.getPrototypeOf(entityToAdd) + JSON.stringify(entityToAdd);
                throw new TypeError(errorMessage);

        }
    }

    /**
     * Add a {@link Component}, {@link Service}, {@link BackingService} or {@link StorageBackingService} entity. 
     * @param {Component|Service|BackingService|StorageBackingService} componentEntityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addComponentEntity(componentEntityToAdd) {
        if (!(componentEntityToAdd instanceof Component)) {
            const errorMessage = "Wrong entity type provided. Only Component, Service, BackingService or StorageBackingService entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(componentEntityToAdd) + JSON.stringify(componentEntityToAdd);
            throw new TypeError(errorMessage);
        }

        // this.#componentEntities.set(componentEntityToAdd.name, componentEntityToAdd);
        this.#componentEntities.set(componentEntityToAdd.getModelId, componentEntityToAdd);
    }

    /**
     * Add a {@link Link} entity. 
     * @param {Link} linkEntityToAdd The Link entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addLinkEntity(linkEntityToAdd) {
        if (!(linkEntityToAdd instanceof Link)) {
            const errorMessage = "Wrong entity type provided. Only Link entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(linkEntityToAdd) + JSON.stringify(linkEntityToAdd);
            throw new TypeError(errorMessage);
        }

        // this.#linkEntities.set(linkEntityToAdd.name, linkEntityToAdd);
        this.#linkEntities.set(linkEntityToAdd.getModelId, linkEntityToAdd);
    }

    /**
     * Add a {@link Infrastructure} entity. 
     * @param {Infrastructure} infrastructureEntityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addInfrastructureEntity(infrastructureEntityToAdd) {
        if (!(infrastructureEntityToAdd instanceof Infrastructure)) {
            const errorMessage = "Wrong entity type provided. Only Infrastructure entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(infrastructureEntityToAdd) + JSON.stringify(infrastructureEntityToAdd);
            throw new TypeError(errorMessage);
        }

        // this.#infrastructureEntities.set(infrastructureEntityToAdd.name, infrastructureEntityToAdd);
        this.#infrastructureEntities.set(infrastructureEntityToAdd.getModelId, infrastructureEntityToAdd);
    }

    /**
     * Add a {@link DeploymentMapping} entity. 
     * @param {DeploymentMapping} deploymentMappingEntityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addDeploymentMappingEntity(deploymentMappingEntityToAdd) {
        if (!(deploymentMappingEntityToAdd instanceof DeploymentMapping)) {
            const errorMessage = "Wrong entity type provided. Only Deployment Mapping entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(deploymentMappingEntityToAdd) + JSON.stringify(deploymentMappingEntityToAdd);
            throw new TypeError(errorMessage);
        }

        // this.#deploymentMappingEntities.set(deploymentMappingEntityToAdd.getId, deploymentMappingEntityToAdd);
        this.#deploymentMappingEntities.set(deploymentMappingEntityToAdd.getModelId, deploymentMappingEntityToAdd);
    }

    /**
     * Add a {@link RequestTrace} entity. 
     * @param {RequestTrace} requestTraceEntityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addRequestTraceEntity(requestTraceEntityToAdd) {
        if (!(requestTraceEntityToAdd instanceof RequestTrace)) {
            const errorMessage = "Wrong entity type provided. Only RequestTrace entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(requestTraceEntityToAdd) + JSON.stringify(requestTraceEntityToAdd);
            throw new TypeError(errorMessage);
        }

        // this.#requestTraceEntities.set(requestTraceEntityToAdd.name, requestTraceEntityToAdd);
        this.#requestTraceEntities.set(requestTraceEntityToAdd.getModelId, requestTraceEntityToAdd);
    }

    /**
     * Add a {@link DataAggregate} entity. 
     * @param {DataAggregate} dataAggregateEntityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addDataAggregateEntity(dataAggregateEntityToAdd) {
        if (!(dataAggregateEntityToAdd instanceof DataAggregate)) {
            const errorMessage = "Wrong entity type provided. Only DataAggregate entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(dataAggregateEntityToAdd) + JSON.stringify(dataAggregateEntityToAdd);
            throw new TypeError(errorMessage);
        }
        
        // Names are unique therefore used as ID --> ensures that Set includes each one only once
        this.#dataAggregateEntities.set(dataAggregateEntityToAdd.getName, dataAggregateEntityToAdd);
    }

    /**
     * Add a {@link BackingData} entity. 
     * @param {BackingData} componentEntityToAdd The entity that is part of this System entity.
     * @throws {TypeError} If a wrong entity type is being provided. 
     */
    addBackingDataEntity(backingDataEntityToAdd) {
        if (!(backingDataEntityToAdd instanceof BackingData)) {
            const errorMessage = "Wrong entity type provided. Only Component, Service, BackingService or StorageBackingService entity can be added here. However, the provided entity was: " + Object.getPrototypeOf(backingDataEntityToAdd) + JSON.stringify(backingDataEntityToAdd);
            throw new TypeError(errorMessage);
        }

        // Names are unique therefore used as ID --> ensures that Set includes each one only once
        this.#backingDataEntities.set(backingDataEntityToAdd.getName, backingDataEntityToAdd);
    }

    resetAllIncludedSystemEntities() {
        this.#componentEntities = new Map();
        this.#linkEntities = new Map();    
        this.#infrastructureEntities = new Map();    
        this.#deploymentMappingEntities = new Map();    
        this.#requestTraceEntities = new Map();    
        this.#dataAggregateEntities = new Map();    
        this.#backingDataEntities = new Map();
    }

    set setSystemName(updatedSystemName) {
        if (!updatedSystemName || !(updatedSystemName.trim())) {
            return;
        }
        
        this.#systemName = updatedSystemName;
    }

    get getSystemName() {
        return this.#systemName;
    }

    /**
     * Returns the {@link Component} entities included in this System entity.
     * @returns {Component}
     */
    get getComponentEntities() {
        return this.#componentEntities;
    }

    /**
     * Returns the {@link Link} entities included in this System entity.
     * @returns {Link}
     */
    get getLinkEntities() {
        return this.#linkEntities;
    }

    /**
     * Returns the {@link Infrastructure} entities included in this System entity.
     * @returns {Infrastructure}
     */
    get getInfrastructureEntities() {
        return this.#infrastructureEntities;
    }

    /**
     * Returns the {@link DeploymentMapping} entities included in this System entity.
     * @returns {DeploymentMapping}
     */
    get getDeploymentMappingEntities() {
        return this.#deploymentMappingEntities;
    }

    /**
     * Returns the {@link RequestTrace} entities included in this System entity.
     * @returns {RequestTrace}
     */
    get getRequestTraceEntities() {
        return this.#requestTraceEntities;
    }

    /**
     * Returns the {@link DataAggregate} entities included in this System entity.
     * @returns {DataAggregate}
     */
    get getDataAggregateEntities() {
        return this.#dataAggregateEntities;
    }

    /**
     * Returns the {@link BackingData} entities included in this System entity.
     * @returns {BackingData}
     */
    get getBackingDataEntities() {
        return this.#backingDataEntities;
    }

    /**
     * Transforms the System object into a String. 
     * @returns {string}
     */
    toString() {
        return "System " + JSON.stringify(this);
    }
}

export { System };