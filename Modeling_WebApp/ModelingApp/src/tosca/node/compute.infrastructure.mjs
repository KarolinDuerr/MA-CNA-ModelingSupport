class MetaDataContent {

    modelId

    position;

    size;

    constructor(modelId, position = "", size = "") {
        // constructor(modelId, position, size) { // TODO
        this.modelId = modelId;
        this.position = position;
        this.size = size;
    }
};

class InfrastructureRequirements {
    host;
    uses_backing_data;        // return:  'host': host, 'endpoint_link': endpointLink, 'uses_data': usesData, 'uses_backing_data': usesBackingData };

    constructor(requiredHost, requiredUsesBackingData) {
        this.host = requiredHost;
        this.uses_backing_data = requiredUsesBackingData ? requiredUsesBackingData : {};
    }
}

class ComputeInfrastructure {

    type = "cna.qualityModel.entities.Compute.Infrastructure";

    metadata;

    requirements;

    constructor(modelId, infrastructureHost, usesBackingDataItems, position, size) {
        this.metadata = new MetaDataContent(modelId, position, size);
        this.requirements = new Array();

        if (infrastructureHost) {
            let hostRequirement = {
                node: infrastructureHost.infrastructure?.replace(/\s+/g, ''),
                relationship: infrastructureHost.deploymentMapping?.replace(/\s+/g, '')
            };
            this.requirements.push({
                host: hostRequirement
            });
        }

        for (const usesBackingDataItem of usesBackingDataItems) {
            this.requirements.push({
                uses_backing_data: usesBackingDataItem?.replace(/\s+/g, '')
            });
        }
    }
}

class DBMSInfrastructure {

    type = "cna.qualityModel.entities.DBMS.Infrastructure";

    metadata;

    requirements;

    constructor(modelId, infrastructureHost, usesBackingDataItems, position, size) {
        this.metadata = new MetaDataContent(modelId, position, size);
        this.requirements = new Array();

        if (infrastructureHost) {
            let hostRequirement = {
                node: infrastructureHost.infrastructure?.replace(/\s+/g, ''),
                relationship: infrastructureHost.deploymentMapping?.replace(/\s+/g, '')
            };
            this.requirements.push({
                host: hostRequirement
            });
        }

        for (const usesBackingDataItem of usesBackingDataItems) {
            this.requirements.push({
                uses_backing_data: usesBackingDataItem?.replace(/\s+/g, '')
            });
        }
    }
}

export { DBMSInfrastructure };
export default ComputeInfrastructure;