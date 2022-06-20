import { Endpoint, endpointTypes } from "./endpoint.js";

/**
 * The module for aspects related to a External Endpoint quality model Entity.
 * @module entities/externalEndpoint
 */

/**
 * Class representing an External Endpoint entity.
 * @class
 * @extends Endpoint An {@link Endpoint} entity
 */
class ExternalEndpoint extends Endpoint {

    // TODO ref Component here?

    /**
     * Create an External Endpoint entity.
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {endpointType} endpointType The type of the endpoint entity, e.g. a GET or SEND_TO {@link endpointTypes}. 
     * @param {string} endpointName The actual endpoint, e.g. /helloWorld.
     * @param {number} port The port at which the External Endpoint is available.
     * @param {string} parentName The name of the parent Entity.
     */
    constructor(modelId, endpointType, endpointName, port, parentName) {
        super(modelId, endpointType, endpointName, port, parentName);
    }

    /**
     * Transforms the ExternalEndpoint object into a String. 
     * @returns {string}
     */
    toString() {
        return "ExternalEndpoint " + JSON.stringify(this);
    }
}

export { ExternalEndpoint };