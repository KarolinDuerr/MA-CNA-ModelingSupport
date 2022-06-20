/**
 * The module for aspects related to a Endpoint quality model Entity.
 * @module entities/endpoint
 */

/**
 * Enum for the possible Endpoint types. Includes asynchronous and synchronous types. 
 * @readonly
 * @enum {string}
 */
const endpointTypes = Object.freeze({
    /** Message broker topic: sender-side */
    SEND_TO: "send-to",
    /** Message broker topic: receiver-side */
    RECEIVE_FROM: "receive-from",
    /** HTTP GET method */
    GET: "GET",
    /** HTTP POST method */
    POST: "POST",
    /** HTTP PUT method */
    PUT: "PUT",
    /** HTTP DELETE method */
    DELETE: "DELETE"
});

/**
 * Class representing an Endpoint entity.
 * @class
 */
class Endpoint {

    #nameId;

    #modelId;

    #parentName;

    endpointType;

    endpointName;

    port;

    // TODO ref Component here?

    /**
     * Create an Endpoint entity.
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {endpointType} endpointType The type of the endpoint entity, e.g. a GET or SEND_TO {@link endpointTypes}. 
     * @param {string} endpointName The actual endpoint, e.g. /helloWorld.
     * @param {number} port The port at which the Endpoint is available.
     * @param {string} parentName The name of the parent Entity.
     */
    constructor(modelId, endpointType, endpointName, port, parentName) {
        this.#modelId = modelId;
        this.endpointType = endpointType;
        this.endpointName = endpointName;
        this.port = port;
        this.#parentName = parentName;
        this.#nameId = this.#convertNameId(parentName);
    }

    #convertNameId(parentName) {
        let endpointDescription;

        if (this.endpointType?.toLowerCase().includes("topic")) {
            endpointDescription = this.endpointName + "-" + this.endpointType.replace(/Topic/gi, "").trim();
        } else {
            let type = `${this.endpointType.slice(0,1).toUpperCase()}${this.endpointType.slice(1).toLowerCase()}`;
            let splittedPath = this.endpointName.split("/");
            let name = "";
            for (const splittedWord of splittedPath) {
                if (splittedWord.includes("?")) {
                    let additionalSplit = splittedWord.split("?");
                    let remainingString = additionalSplit[1].split("="); console.log(remainingString)
                    name += `${additionalSplit[0].slice(0,1).toUpperCase()}${additionalSplit[0].slice(1).toLowerCase()}By${remainingString[0].slice(0,1).toUpperCase()}${remainingString[0].slice(1).toLowerCase()}`
                } else if (splittedWord.includes("{")) {
                    let correctedString = splittedWord.replace("{", "").replace("}", "");
                    name += `By${correctedString.slice(0,1).toUpperCase()}${correctedString.slice(1).toLowerCase()}`;
                } else if (splittedWord === "") {
                    // ignore
                } else {
                    name += `${splittedWord.slice(0,1).toUpperCase()}${splittedWord.slice(1).toLowerCase()}`;
                }
            }
            endpointDescription = type + name;
        }

        return `${parentName}-${endpointDescription}`;
    }

    /**
     * Returns the ne name ID, which is a combination of the parent Entity's name and the Endpoint URL Path (parentName-urlPath).
     * @returns {string}
     */
    get getNameId() {
        return this.#nameId;
    }

    /**
     * Returns the ID, the respective entity representation has in the joint.dia.Graph model.
     * @returns {string}
     */
    get getModelId() {
        return this.#modelId;
    }

    /**
     * Returns the type of the endpoint entity, e.g. a GET or SEND_TO {@link endpointTypes}. 
     * @returns {string}
     */
    get getEndpointType() {
        return this.endpointType;
    }

    /**
     * Return the actual endpoint, e.g. /helloWorld.
     * @returns {string}
     */
    get getEndpointName() {
        return this.endpointName;
    }

    /**
     * Return the port where this Endpoint is available.
     * @returns {string}
     */
    get getPort() {
        return this.port;
    }

    /**
     * Return the name of the parent entity where this Endpoint is available.
     * @returns {string}
     */
    get getParentName() {
        return this.#parentName;
    }

    /**
     * Transforms the Endpoint object into a String. 
     * @returns {string}
     */
    toString() {
        return "Endpoint " + JSON.stringify(this);
    }
}

export { Endpoint, endpointTypes }; // TODO keep endpointType?