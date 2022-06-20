import { Endpoint } from './endpoint.js'
import { ExternalEndpoint } from './externalEndpoint.js'
import { DataAggregate } from './dataAggregate.js'
import { BackingData } from './backingData.js'
import { Infrastructure } from './infrastructure.js'

/**
 * The module for aspects related to a Component quality model entity.
 * @module entities/component
 */

/**
 * Class representing a Component entity.
 * @class
 */
class Component {

    #id;
    
    #modelId;

    name;

    #hostedBy;

    #endpointEntities = new Array();

    #externalEndpointEntities = new Array();

    #backingDataEntities = new Array();

    #dataAggregateEntities = new Array();

    #includedLinkEntities = new Array();

    /**
     * Create a Component entity.
     * @param {string} name The name of the Component entity. 
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {Infrastructure} hostingInfrastructure The {@link Infrastructure} entity that hosts this Component entity.
     */
    constructor(name, modelId, hostingInfrastructure) {
        this.name = name;
        this.#modelId = modelId;
        this.#hostedBy = hostingInfrastructure;
    }

    /**
     * Add a quality model entity to the Component. However, a Component only includes {@link Endpoint}, {@link ExternalEndpoint}, {@link DataAggregate} 
     * and {@link BackingData} entities. Therefore, only one of these entity types can be added. Otherwise, a {@link TypeError} exception will be thrown.
     * @param {Endpoint|ExternalEndpoint|DataAggregate|BackingData} entityToAdd The quality Model entity that should be added.
     * @throws {TypeError} If the provided parameter is neither an instance of External Endpoint, Endpoint, Data Aggregate or Backing Data.  
     */
    addEntity(entityToAdd) {

        let endpointAlreadyIncluded = (endpointToAdd) => {
            if (this.getEndpointEntities.some(endpoint => JSON.stringify(endpoint) === JSON.stringify(endpointToAdd))) {
                return true;
            } else if (this.getExternalEndpointEntities.some(externalEndpoint => JSON.stringify(externalEndpoint) === JSON.stringify(endpointToAdd))) {
                return true;
            }
            return false;
        }

        if (entityToAdd instanceof ExternalEndpoint) {
            if (endpointAlreadyIncluded(entityToAdd)) {
                return;
            }

            this.#externalEndpointEntities.push(entityToAdd);
            return;
        } else if (entityToAdd instanceof Endpoint) {
            if (endpointAlreadyIncluded(entityToAdd)) {
                return;
            }

            this.#endpointEntities.push(entityToAdd);
            return;
        } else if (entityToAdd instanceof DataAggregate) {
            this.#dataAggregateEntities.push(entityToAdd);
            return;
        } else if (entityToAdd instanceof BackingData) {
            this.#backingDataEntities.push(entityToAdd);
            return;
        }

        const errorMessage = "The provided entity cannot be added. Only Endpoint, ExternalEndpoint, DataAggregate or BackingData entities are allowed. However, the object to add was: " + Object.getPrototypeOf(entityToAdd) + JSON.stringify(entityToAdd);
        throw new TypeError(errorMessage, "component.js");
    };

    addLinkEntity(linkEntity) {
        // TODO add check
        this.#includedLinkEntities.push(linkEntity);
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
     * Return the name of this Component entity.
     * @returns {string}
     */
    get getName() {
        return this.name;
    }

    /**
     * Return the hosting {@link Infrastructure} entity of this Component entity.
     * @returns {Infrastructure}
     */
    get getHostedBy() {
        return this.#hostedBy;
    }

    /**
     * Returns the {@link Endpoint} entities included in this Component.
     * @returns {Endpoint[]}
     */
    get getEndpointEntities() {
        return this.#endpointEntities;
    }

    /**
     * Returns the {@link ExternalEndpoint} entities included in this Component.
     * @returns {ExternalEndpoint[]}
     */
    get getExternalEndpointEntities() {
        return this.#externalEndpointEntities;
    }

    /**
     * Returns the {@link DataAggregate} entities included in this Component.
     * @returns {DataAggregate[]}
     */
    get getDataAggregateEntities() {
        return this.#dataAggregateEntities;
    }

    /**
    * Returns the {@link BackingData} entities included in this Component.
    * @returns {BackingData[]}
    */
    get getBackingDataEntities() {
        return this.#backingDataEntities;
    }

    /**
    * Returns the {@link Link} entities included in this Component.
    * @returns {Link[]}
    */
    get getIncludedLinkEntities() {
        return this.#includedLinkEntities;
    }

    /**
     * Transforms the Component object into a String. 
     * @returns {string}
     */
    toString() {
        return "Component " + JSON.stringify(this);
    }

    toJson() {
        return JSON.stringify(this.getModelId);
    }
}

export { Component };