/**
 * The module for aspects related to a Data Aggregate quality model entity.
 * @module entities/dataAggregate
 */

/**
 * Class representing a Data Aggregate entity.
 * @class
 */
class DataAggregate {

    name;

    #modelId;

    #persistedBy;

    // TODO ref components here?

    /**
     * Create a Data Aggregate entity.
     * @param {string} name The name of the Data Aggregate entity. 
     * @param {modelId} modelId The ID, the respective entity representation has in the joint.dia.Graph model.
     */
    constructor(name, modelId) {
        this.name = name;
        this.#modelId = modelId;
        this.#persistedBy = new Array();
    }

    /**
     * Add name of a component type entity that persists this Data Aggregate entity.
     * @param {string} persistedByEntity The name of a {@link Component} entity that persists this Data Aggregate.
     */
    addPersistedByEntity(persistedByEntity) {
        this.#persistedBy.push(persistedByEntity);
    }

    /**
     * Returns the ID, the respective entity representation has in the joint.dia.Graph model.
     * @returns {string}
     */
    get getModelId() {
        return this.#modelId;
    }

    /**
     * Return the name of this Data Aggregate entity.
     * @returns {string}
     */
    get getName() {
        return this.name;
    }

    /**
     * Returns the Entity names that persist this Data Aggregate entity.
     * @returns {string}
     */
    get getPersistedBy() {
        return this.#persistedBy;
    }

    /**
     * Transforms the DataAggregate object into a String. 
     * @returns {string}
     */
    toString() {
        return "DataAggregate " + JSON.stringify(this);
    }
}

export { DataAggregate };