import EntityTypes from "./config/entityTypes.mjs";

const ErrorType = Object.freeze({
    MISSING_INFORMATION: "missing information",
    INVALID_MODEL_ENTIY: "invalid model entity"
});

class ErrorMessage {

    #affectedEntityType;

    #entityName;

    #errorType;

    #affectedInformation;

    #message;

    constructor(affectedEntityType, errorType, entityName, affectedInformation, message) {
        if (!(Object.values(EntityTypes).includes(affectedEntityType)) || !(Object.values(ErrorType).includes(errorType)) || !entityName || !message) { 
            return; // TODO error?
        }

        this.#affectedEntityType = affectedEntityType;
        this.#errorType = errorType;
        this.#entityName = entityName;
        this.#affectedInformation = affectedInformation;
        this.#message = message;
    }

    get getAffectedEntityType() {
        return this.#affectedEntityType;
    }

    get getErrorType() {
        return this.#errorType;
    }

    get getEntityName() {
        return this.#entityName;
    }

    get getAffectedInformation() {
        return this.#affectedInformation;
    }

    get getMessage() {
        return this.#message;
    }
}

export { ErrorType };
export default ErrorMessage;