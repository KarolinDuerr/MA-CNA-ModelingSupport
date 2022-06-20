import { Component } from './component.js'

/**
 * The module for aspects related to a Component quality model Entity.
 * @module entities/storageBackingService
 */

/**
 * Class representing a Storage Backing Service entity.
 * @class
 * @extends Component A {@link Component} entity
 */
class StorageBackingService extends Component {

    // TODO

    /**
     * Create a Storage Backing Service entity.
     * @param {string} name The name of the Storage Backing Service entity. 
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {Infrastructure} hostingInfrastructure The {@link Infrastructure} entity that hosts this Storage Backing Service entity.
     */
    constructor(name, modelId, hostingInfrastructure) {
        super(name, modelId, hostingInfrastructure)
    }

    /**
     * Transforms the StorageBackingService object into a String. 
     * @returns {string}
     */
    toString() {
        return "StorageBackingService " + JSON.stringify(this);
    }
}

export { StorageBackingService };