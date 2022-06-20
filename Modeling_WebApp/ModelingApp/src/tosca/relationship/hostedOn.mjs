class MetaDataContent {

    modelId

    constructor(modelId) {
        this.modelId = modelId;
    }
};

class HostedOn {

    type = "tosca.relationships.HostedOn";

    metadata;

    constructor(modelId) {        
        this.metadata = new MetaDataContent(modelId);
    }

}

export default HostedOn;