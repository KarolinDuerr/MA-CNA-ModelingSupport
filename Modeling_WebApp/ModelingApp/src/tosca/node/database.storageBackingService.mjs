class MetaDataContent {

    modelId

    position;

    size;

    constructor(modelId, position, size) {
        this.modelId = modelId;
        this.position = position;
        this.size = size;
    }
};

class DatabaseStorageBackingService {

    type = "cna.qualityModel.entities.Database.StorageBackingService";

    metadata;

    properties;

    requirements;

    capabilities;

    constructor(modelId, componentHost, endpointLinks, usesDataItems, usesBackingDataItems, endpoints, externalEndpoints, persistedData, properties, position, size) {
        this.metadata = new MetaDataContent(modelId, position, size);

        if (properties && (properties.databaseName || properties.port)) {
            this.properties = {
                name: properties.databaseName,
                port: properties.port
            }
        }

        this.requirements = new Array();
        let hostRequirement = {
            node: componentHost.infrastructure?.replace(/\s+/g, ''),
            relationship: componentHost.deploymentMapping?.replace(/\s+/g, '')
        };
        this.requirements.push({
            host: hostRequirement
        });

        for (const endpointLink of endpointLinks) {
            this.requirements.push({
                endpoint_link: {
                    node: endpointLink.targetEntity,
                    relationship: endpointLink.linkName
                }
            });
        }

        for (const usesDataItem of usesDataItems) {
            this.requirements.push({
                uses_data: usesDataItem?.replace(/\s+/g, '')
            });
        }

        for (const usesBackingDataItem of usesBackingDataItems) {
            this.requirements.push({
                uses_backing_data: usesBackingDataItem?.replace(/\s+/g, '')
            });
        }

        this.capabilities = new Array();

        for (const endpoint of endpoints) {
            this.capabilities.push({
                database_endpoint: {
                    type: "tosca.capabilities.Endpoint.Database",
                    metadata: {
                        position: endpoint.metadata.position,
                        size: endpoint.metadata.size,
                        label: endpoint.metadata.label
                    },
                    properties: {
                        protocol: endpoint.protocol,
                        port: endpoint.port,
                        url_path: endpoint.path
                    }
                }
            });
        }

        for (const externalEndpoint of externalEndpoints) {
            this.capabilities.push({
                external_endpoint: {
                    type: "tosca.capabilities.Endpoint.Public",
                    metadata: {
                        position: externalEndpoint.metadata.position,
                        size: externalEndpoint.metadata.size,
                        label: externalEndpoint.metadata.label
                    },
                    properties: {
                        protocol: externalEndpoint.protocol,
                        port: externalEndpoint.port,
                        url_path: externalEndpoint.path
                    }
                }
            });
        }

        if (persistedData) {
            this.capabilities.push({
                persist_data: {
                    type: "cna.qualityModel.capabilities.DataStorage"
                }
            });
        }

    }
}

export default DatabaseStorageBackingService;