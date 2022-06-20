/**
 * The module for aspects related to a Backing Data quality model entity.
 * @module entities/backingData
 */

/**
 * Class representing a Backing Data entity.
 * @class
 */
class BackingData {

    #id; // TODO

    name;

    #modelId;

    #includedData;

    /**
     * Create a Backing Data entity.
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     * @param {string} name The name of the Backing Data entity. 
     * @param {Array} includedData The included data values with key of this Backing Data entity.
     */
    constructor(modelId, name, includedData) {
        this.name = name;
        this.#includedData = includedData;
        this.#modelId = modelId;
    }

    /**
     * Returns the ID of this Backing Data entity.
     * @returns {string}
     */
    get getId() {
        return this.#id;
    }

    /**
     * Return the name of this Backing Data entity.
     * @returns {string}
     */
    get getName() {
        return this.name;
    }

    /**
     * Returns the ID, the respective entity representation has in the joint.dia.Graph model.
     * @returns {string}
     */
    get getModelId() {
        return this.#modelId;
    }

    /**
     * Returns the data items that are included in this Backing Data entities.
     * @returns {Array}
     */
    get getIncludedData() {
        return this.#includedData;
    }

    /**
     * Transforms the BackingData object into a String. 
     * @returns {string}
     */
    toString() {
        return "BackingData " + JSON.stringify(this);
    }
}

export { BackingData };