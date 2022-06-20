class MetaDataContent {

    modelId

    position;

    size;

    label;

    constructor(modelId, position, size, label) {
        this.modelId = modelId;
        this.position = position;
        this.size = size;
        this.label = label;
    }
}

class RequestTraceProperties {
    endpoint;

    links;

    constructor(endpointPath, involvedLinks) {
        this.endpoint = endpointPath;

        this.links = new Array();
        for (const involvedLink of involvedLinks) {
            this.links.push(involvedLink?.replace(/\s+/g, ''));
        }
    }
}

class ToscaRequestTrace {

    type = "cna.qualityModel.entities.RequestTrace";

    metadata;

    properties;

    requirements;

    constructor(modelId, externalEndpoint, endpointPath, involvedLinks, position, size, label) {
        this.metadata = new MetaDataContent(modelId, position, size, label);

        this.properties = new RequestTraceProperties(endpointPath, involvedLinks);

        this.requirements = new Array();
        this.requirements.push({
            external_endpoint: externalEndpoint?.replace(/\s+/g, '')
        });

    }
}

export default ToscaRequestTrace;