class MetaDataContent {

    modelId;

    constructor(modelId) {
        this.modelId = modelId;
    }
};

class DataAggregateCapabilities {
    provided_data;

    constructor() {
        this.provided_data = {
            type: "tosca.capabilities.Attachment"
        }
    }
}

class ToscaDataAggregate {

    type = "cna.qualityModel.entities.DataAggregate";

    metadata;

    requirements;

    capabilities;

    constructor(modelId, persistenceNodes) {
        this.metadata = new MetaDataContent(modelId);

        this.requirements = new Array();
        for (const dataAggregateRequirement of persistenceNodes) {
            this.requirements.push({ persistence: dataAggregateRequirement?.replace(/\s+/g, '') })
        }

        this.capabilities = new DataAggregateCapabilities();
    }
}

export default ToscaDataAggregate;