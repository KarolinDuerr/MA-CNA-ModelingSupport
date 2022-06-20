import { Component } from './component.js'
import { Infrastructure } from './infrastructure.js'
import { Service } from './service.js';

/**
 * The module for aspects related to a Deployment Mapping quality model entity.
 * @module entities/deploymentMapping
 */

/**
 * Class representing a Deployment Mapping entity.
 * @class
 */
class DeploymentMapping {

    #id;
    
    #modelId;
    
    #deployedEntity;

    #underlyingInfrastructure;

    /**
     * Create a Deployment Mapping entity. Represents the connection between either {@link Component} - {@link Infrastructure} or {@link Infrastructure} - {@link Infrastructure}. 
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {Component|Service|BackingService|StorageBackingService|Infrastructure} deployedEntity The entity that is being deployed.
     * @param {Infrastructure} underlyingInfrastructure The Infrastructure entity, which deploys the other entity.
     * @throws {TypeError} If a wrong entity type is being provided.
     * @throws {Error} If the deployedEntity and the underylingInfrastructure are the same.
     */
    constructor(modelId, deployedEntity, underlyingInfrastructure) {
        if (deployedEntity.toJson() === underlyingInfrastructure.toJson()) {
            const errorMessage = "The entities for which the DeploymentMapping is defined have to be distinguishable.";
            throw new Error(errorMessage);
        }

        if (!(deployedEntity instanceof Component || deployedEntity instanceof Infrastructure)) {
            const errorMessage = "Wrong entity type provided. Only Component, Service, BackingService, StorageBackingService or Infrastructure entities can be deployed by an underlying Infrastructure. However, the provided entity was: " + Object.getPrototypeOf(deployedEntity) + JSON.stringify(deployedEntity);
            throw new TypeError(errorMessage);
        }

        if (!(underlyingInfrastructure instanceof Infrastructure)) {
            const errorMessage = "Wrong entity type provided. Only an Infrastructure entity is able to deploy other entities. However, the provided entity was: " + Object.getPrototypeOf(underlyingInfrastructure) + JSON.stringify(underlyingInfrastructure);
            throw new TypeError(errorMessage);
        }

        this.#modelId = modelId;
        this.#deployedEntity = deployedEntity;
        this.#underlyingInfrastructure = underlyingInfrastructure;
        this.#id = deployedEntity.name + "-" + underlyingInfrastructure.name; // TODO use ID instead?
    }

    /**
     * Returns the ID of this Deployment Mapping entity.
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
     * Returns the {@link Component} entity included in this DeploymentMapping.
     * @returns {Component}
     */
    get getDeployedEntity() {
        return this.#deployedEntity;
    }

    /**
     * Change the deployedEntity. 
     * @param {Component|Service|BackingService|StorageBackingService|Infrastructure} newDeployedEntity The entity that is being deployed.
     * @throws {TypeError} If a wrong entity type is being provided.
     * @throws {Error} If the newDeployedEntity and the underylingInfrastructure are the same.
     */
    set setDeployedEntity(newDeployedEntity) {
        if (!(newDeployedEntity instanceof Component || newDeployedEntity instanceof Infrastructure)) {
            const errorMessage = "Wrong entity type provided. Only Component, Service, BackingService, StorageBackingService or Infrastructure entities can be deployed by an underlying Infrastructure. However, the provided entity was: " + Object.getPrototypeOf(newDeployedEntity) + JSON.stringify(newDeployedEntity);
            throw new TypeError(errorMessage);
        }

        if (JSON.stringify(newDeployedEntity) === JSON.stringify(this.#underlyingInfrastructure)) {
            const errorMessage = "The entity is already included as the underyling infrastructure.";
            throw new Error(errorMessage);
        }

        this.#deployedEntity = newDeployedEntity;
    }

    /**
     * Returns the {@link Infrastructure} entity included in this DeploymentMapping.
     * @returns {Infrastructure}
     */
    get getUnderlyingInfrastructure() {
        return this.#underlyingInfrastructure;
    }

    /**
    * Change the underlyingInfrastructure. 
    * @param {Infrastructure} newUnderlyingInfrastructure The Infrastructure entity, which deploys the entity provided in the deployedEntity element.
    * @throws {TypeError} If a wrong entity type is being provided.
    * @throws {Error} If the newUnderlyingInfrastructure and the deployedEntity are the same.
    */
    set setUnderlyingInfrastructure(newUnderlyingInfrastructure) {
        if (!(underlyingInfrastructure instanceof Infrastructure)) {
            const errorMessage = "Wrong entity type provided. Only an Infrastructure entity is able to deploy other entities. However, the provided entity was: " + Object.getPrototypeOf(newUnderlyingInfrastructure) + JSON.stringify(newUnderlyingInfrastructure);
            throw new TypeError(errorMessage);
        }

        if (JSON.stringify(newUnderlyingInfrastructure) === JSON.stringify(this.#deployedEntity)) {
            const errorMessage = "The entity is already included as the underyling infrastructure.";
            throw new Error(errorMessage);
        }

        this.#underlyingInfrastructure = newUnderlyingInfrastructure;
    }

    /**
     * Transforms the DeploymentMapping object into a String. 
     * @returns {string}
     */
    toString() {
        return "DeploymentMapping " + JSON.stringify(this);
    }
}

export { DeploymentMapping };