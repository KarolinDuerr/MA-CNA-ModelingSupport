
import { ExternalEndpoint } from "./externalEndpoint.js";
import { Link } from "./link.js";

/**
 * The module for aspects related to a Component quality model Entity.
 * @module entities/requestTrace
 */

/**
 * Class representing a Request Trace entity.
 * @class
 */
class RequestTrace {

    #id;
    
    #modelId;

    #name;

    #externalEndpoint;

    #linkEntityIds = new Set();

    #linkEntities = new Map();

    /**
     * Create a Request Trace entity.
     * @param {string} name The name of the Request Trace entity.
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {ExternalEndpoint} externalEndpoint The {@link ExternalEndpoint} entity for which the Request Trace is being defined.
     * @param {string} linkEntityOrEntities The Id {@link Link} entity or entities that take part in this Request Trace (1...N)
     * @throws {TypeError} If a wrong entity type is being provided
     */
    constructor(name, modelId, externalEndpoint, linkEntityOrEntities) {
        if (!(externalEndpoint instanceof ExternalEndpoint)) {
            const providedType = externalEndpoint ? Object.getPrototypeOf(externalEndpoint) + JSON.stringify(externalEndpoint) : "null";
            const errorMessage = "Wrong entity type provided. Only an ExternalEndpoint entity is allowed. However, the provided entity was: " + providedType;
            throw new TypeError(errorMessage);
        }

        if (linkEntityOrEntities instanceof Array) {
            for (const linkEntity of linkEntityOrEntities) {
                if (this.#linkEntityIds.has(linkEntity)) {
                    return;
                }
        
                this.#linkEntityIds.add(linkEntity);
            }
        } else {                        
            if (this.#linkEntityIds.has(linkEntity)) {
                return;
            }
    
            this.#linkEntityIds.add(linkEntity);
        }

        this.#name = name;
        this.#modelId = modelId;
        this.#externalEndpoint = externalEndpoint;
    }

    // TODO include constructor that allows lists?

    /**
      * Adds a {@link Link} entity to this Request Trace.
      * @param {Link} linkEntityToAdd A {@link Link} entity that is part of this RequestTrace.
      * @throws {TypeError} If a wrong entity type is being provided
      */
    addLinkEntity(linkEntityToAdd) {
        if (!(linkEntityToAdd instanceof Link)) {
            const providedType = linkEntityToAdd ? Object.getPrototypeOf(linkEntityToAdd) + JSON.stringify(linkEntityToAdd) : "null";
            const errorMessage = "Wrong entity type provided. Only an Link entity is allowed. However, the provided entity was: " + providedType;
            throw new TypeError(errorMessage);
        }

        if (this.#linkEntities.has(linkEntityToAdd.getModelId)) {
            return;
        }

        this.#linkEntities.set(linkEntityToAdd.getModelId, linkEntityToAdd);
    }

    /**
     * Returns the ID of this RequestTrace entity.
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
     * Returns the name of this Request Trace entity.
     * @returns {string}
     */
    get getName() {
        return this.#name;
    }

    /**
     * Returns the {@link ExternalEndpoint} of this RequestTrace entity.
     * @returns {ExternalEndpoint}
     */
    get getExternalEndpoint() {
        return this.#externalEndpoint;
    }

    /**
      * Changes the {@link ExternalEndpoint}.
      * @param {ExternalEndpoint} newExternalEndpoint The {@link ExternalEndpoint} for of this RequestTrace entity.
      * @throws {TypeError} If a wrong entity type is being provided
      */
    set setExternalEndpoint(newExternalEndpoint) {
        if (!(newExternalEndpoint instanceof ExternalEndpoint)) {
            const errorMessage = "Wrong entity type provided. Only an ExternalEndpoint entity is allowed. However, the provided entity was: " + Object.getPrototypeOf(newExternalEndpoint) + JSON.stringify(newExternalEndpoint);
            throw new TypeError(errorMessage);
        }

        this.#externalEndpoint = newExternalEndpoint;
    }

    /**
     * Returns the IDs of the {@link Link} entities involved in this RequestTrace entity.
     * @returns {string}
     */
    get getLinkEntityIds() {
        return this.#linkEntityIds;
    }

    /**
     * Returns the {@link Link} entities involved in this RequestTrace entity.
     * @returns {Link}
     */
    get getLinkEntities() {
        return Array.from(this.#linkEntities.values()) ?? new Array();
    }

    /**
     * Transforms the RequestTrace object into a String. 
     * @returns {string}
     */
    toString() {
        return "RequestTrace " + JSON.stringify(this);
    }
}

export { RequestTrace };