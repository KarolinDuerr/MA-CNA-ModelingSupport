class MetaDataContent {

    modelId;

    type_of_relation;

    constructor(modelId, relationType) {
        this.modelId = modelId;
        this.type_of_relation = relationType;
    }
}

class ConnectsToLink {

    type = "cna.qualityModel.entities.ConnectsTo.Link";

    metadata;

    properties;

    constructor(modelId, targetEndpoint, relationType) {        
        this.metadata = new MetaDataContent(modelId, relationType);
        this.properties = {
            target_endpoint: targetEndpoint
        }
    }

}

export default ConnectsToLink;