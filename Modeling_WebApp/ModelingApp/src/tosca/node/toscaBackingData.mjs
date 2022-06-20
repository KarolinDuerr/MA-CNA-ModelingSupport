class MetaDataContent {

    modelId;

    constructor(modelId) {
        this.modelId = modelId;
    }
}

class BackingDataProperties {
    included_data;

    constructor(includedDataItems) {
        this.included_data = {};
        for (const includedDataItem of includedDataItems) {
            this.included_data[includedDataItem.key] = includedDataItem.value; 
        }
    }
}

class BackingDataCapabilities {
    provided_data;

    constructor() {
        this.provided_data = {
            type: "tosca.capabilities.Attachment"
        } 
    }
}

class ToscaBackingData {

    type = "cna.qualityModel.entities.BackingData";

    metadata;

    properties;

    capabilities;

    constructor(modelId, includedDataItems) {
        this.metadata = new MetaDataContent(modelId);
        this.properties = new BackingDataProperties(includedDataItems);
        this.capabilities = new BackingDataCapabilities();
    }
}

export default ToscaBackingData;