import { Component } from './component.js'

/**
 * The module for aspects related to a Component quality model Entity.
 * @module entities/service
 */

/**
 * Class representing a Service entity.
 * @class
 * @extends Component A {@link Component} entity
 */
class Service extends Component {

    /**
     * Create a Service entity.
     * @param {string} name The name of the Service entity. 
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {Infrastructure} hostingInfrastructure The {@link Infrastructure} entity that hosts this Service entity.
     */
    constructor(name, modelId, hostingInfrastructure) {
        super(name, modelId, hostingInfrastructure)
    }

    /**
     * Transforms the Service object into a String. 
     * @returns {string}
     */
    toString() {
        return "Service " + JSON.stringify(this);
    }
}

export { Service };