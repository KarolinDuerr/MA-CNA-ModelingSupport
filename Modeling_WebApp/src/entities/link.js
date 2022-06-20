import { BackingService } from './backingService.js';
import { Component } from './component.js'
import { Endpoint } from './endpoint.js'
import { ExternalEndpoint } from './externalEndpoint.js';
import { Service } from './service.js';
import { StorageBackingService } from './storageBackingService.js';

/**
 * The module for aspects related to a Link quality model entity.
 * @module entities/link
 */

/**
 * Class representing a Link entity.
 * @class
 */
class Link {

    #id; // TODO
    
    #modelId;

    #sourceEntity;

    #targetEndpoint;

    #relationType;

    /**
     * Create a Link entity. Represents the connection between {@link Component}, {@link Service}, {@link BackingService} or {@link StorageBackingService} and an {@link Endpoint} or {@link ExternalEndpoint} entity.
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {Component | Service | BackingService | StorageBackingService} sourceEntity The entity that links to an Endpoint of another entity.
     * @param {Endpoint | ExternalEndpoint} targetEndpoint The Endpoint the Link connects to.
     * @throws {TypeError} If a wrong entity type is being provided
     * @throws {Error} If the targeted Endpoint is included in the sourceEntity.
     */
    constructor(modelId, sourceEntity, targetEndpoint) {
        if (!(sourceEntity instanceof Component)) {
            const errorMessage = "Wrong entity type provided. Only Component, Service, BackingService or StorageBackingService entity allowed. However, the provided entity was: " + Object.getPrototypeOf(sourceEntity) + JSON.stringify(sourceEntity);
            throw new TypeError(errorMessage);
        }

        if (!(targetEndpoint instanceof Endpoint)) {
            const errorMessage = "Wrong entity type provided. Only Endpoint or ExternalEndpoint entity allowed. However, the provided entity was: " + Object.getPrototypeOf(targetEndpoint) + JSON.stringify(targetEndpoint);
            throw new TypeError(errorMessage);
        }

        let endpointAlreadyIncluded = (newTargetEndpoint) => {
            if (sourceEntity.getEndpointEntities.some(endpoint => JSON.stringify(endpoint) === JSON.stringify(newTargetEndpoint))) {
                return true;
            } else if (sourceEntity.getExternalEndpointEntities.some(externalEndpoint => JSON.stringify(externalEndpoint) === JSON.stringify(newTargetEndpoint))) {
                return true;
            }
            return false;
        }

        // if (sourceEntity.getEndpointEntities.includes(targetEndpoint) || sourceEntity.getExternalEndpointsEntities.includes(targetEndpoint)) { // TODO remove when decided if deep compare
        if (endpointAlreadyIncluded(targetEndpoint)) {
            const errorMessage = "A Link cannot be created from an entity to its own included Endpoint.";
            throw new Error(errorMessage);
        }

        this.#modelId = modelId;
        this.#sourceEntity = sourceEntity;
        this.#targetEndpoint = targetEndpoint;
    }

    /**
     * Add information about the type of relation this Link realizes, e.g. subscribes or routes to
     * @param {string} relationType 
     */
    addRelationType(relationType) {
        this.#relationType = relationType;
    }

    /**
     * Returns the ID of this Component entity.
     * @returns {string}
     */
    get getId() {
        return this.#id;
    }

    /**
     * Returns the ID, the respective entity representation has in the joint.dia.Graph model.
     * @returns {string}
     */
    get getModelId() {
        return this.#modelId;
    }

    /**
     * Returns the {@link Component}, {@link Service}, {@link BackingService} or {@link StorageBackingService} entity, which the Link connects to the targetEndpoint.
     * @returns {Component}
     */
    get getSourceEntity() {
        return this.#sourceEntity;
    }

    /**
      * Changes the sourceEntity.
      * @param {Component | Service | BackingService | StorageBackingService} newSourceEntity The entity that links to an Endpoint of another entity.
      * @throws {TypeError} If a wrong entity type is being provided
      * @throws {Error} If the targeted Endpoint is included in the newSourceEntity.
      */
    set setSourceEntity(newSourceEntity) {
        if (!(newSourceEndpoint instanceof Component)) {
            const errorMessage = "Wrong entity type provided. Only Component, Service, BackingService or StorageBackingService entity allowed. However, the provided entity was: " + Object.getPrototypeOf(newSourceEndpoint) + JSON.stringify(newSourceEndpoint);
            throw new TypeError(errorMessage);
        }

        if (endpointAlreadyIncluded(this.#targetEndpoint)) {
            const errorMessage = "A Link cannot connect an entity to its own included Endpoint.";
            throw new Error(errorMessage);
        }

        this.#sourceEntity = newSourceEntity;
    }

    /**
     * Returns the {@link Endpoint} or {@link ExternalEndpoint} this Link connects to.
     * @returns {Endpoint|ExternalEndpoint}
     */
    get getTargetEntity() {
        return this.#targetEndpoint
    }

    /**
      * Changes the targetEntity.
      * @param {Endpoint | ExternalEndpoint} newTargetEndpoint The Endpoint the Link connects to.
      * @throws {TypeError} If a wrong entity type is being provided
      * @throws {Error} If the targeted Endpoint is included in the sourceEntity.
      */
    set setTargetEntity(newTargetEndpoint) {
        if (!(targetEndpoint instanceof Endpoint)) {
            const errorMessage = "Wrong entity type provided. Only Endpoint or ExternalEndpoint entity allowed. However, the provided entity was: " + Object.getPrototypeOf(targetEndpoint) + JSON.stringify(targetEndpoint);
            throw new TypeError(errorMessage);
        }

        if (endpointAlreadyIncluded(this.#targetEndpoint)) {
            const errorMessage = "A Link cannot connect an entity to its own included Endpoint.";
            throw new Error(errorMessage);
        }

        this.#targetEndpoint = newTargetEndpoint;
    }

    /**
     * Returns the information that was provided about the type of relation this Link entity realizes.
     * @returns {string} e.g. subscribes to
     */
    get getRelationType() {
        return this.#relationType
    }

    /**
     * Transforms the Link object into a String. 
     * @returns {string}
     */
    toString() {
        return "Link " + JSON.stringify(this);
    }
}

export { Link };