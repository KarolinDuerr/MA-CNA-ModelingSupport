import * as yaml from 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.mjs';

import * as Entities from '../entities.mjs'

import ComputeInfrastructure, { DBMSInfrastructure } from './node/compute.infrastructure.mjs';
import ToscaDataAggregate from './node/toscaDataAggregate.mjs';
import ToscaBackingData from './node/toscaBackingData.mjs';
import ConnectsToLink from './relationship/connectsTo.link.mjs';
import HostedOn from "./relationship/hostedOn.mjs"
import ToscaServiceTemplate from "./ServiceTemplate.mjs";
import RootComponent from './node/root.component.mjs';
import SoftwareComponentService from './node/softwareComponent.service.mjs';
import DatabaseStorageBackingService from './node/database.storageBackingService.mjs';
import ToscaBackingService from './node/toscaBackingService.mjs';
import ToscaRequestTrace from './node/toscaRequestTrace.mjs';

class ToscaConverter {

    #systemEntity;

    #nodeTemplates = {};

    #relationshipTemplates = {};

    constructor(systemEntity) {
        this.#systemEntity = systemEntity;
    }

    convert() {
        this.convertComponent();
        this.convertInfrastructure();
        this.convertDataAggregate();
        this.convertBackingData();
        this.convertRequestTrace();
        this.convertLink();
        this.convertDeploymentMapping();


        const serviceTemplate = new ToscaServiceTemplate(this.#systemEntity.getSystemName, this.#nodeTemplates, this.#relationshipTemplates);
        const serviceTemplateYaml = yaml.dump(serviceTemplate, {
            styles: {
                '!!null': 'empty'
            }
        });

        // download created yaml taken from https://stackoverflow.com/a/22347908
        let downloadElement = document.createElement("a");
        downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(serviceTemplateYaml));
        downloadElement.setAttribute('download', `${this.#systemEntity.getSystemName}.tosca`);
        downloadElement.click();
    }

    convertComponent() {
        const componentEntities = this.#systemEntity.getComponentEntities;

        for (const componentEntity of componentEntities.values()) {
            let componentHost = { infrastructure: componentEntity.getHostedBy.getName, deploymentMapping: componentEntity.getHostedBy.getName + "_host_" + componentEntity.getName };
            let endpointLinks = componentEntity.getIncludedLinkEntities.map((entity) => {
                return {
                    targetEntity: this.#ensureNoWhiteSpace(entity.getTargetEntity.getParentName),
                    linkName: this.#ensureNoWhiteSpace(this.#createLinkNameKey(entity))
                }
            });
            let usesDataItems = componentEntity.getDataAggregateEntities.map((entity) => {
                return this.#ensureNoWhiteSpace(entity.getName);
            });
            let usesBackingDataItems = componentEntity.getBackingDataEntities.map((entity) => {
                return this.#ensureNoWhiteSpace(entity.getName);
            });
            let endpoints = componentEntity.getEndpointEntities.map((entity) => {
                return {
                    metadata: {
                        position: entity.position,
                        size: entity.size,
                        label: entity.label
                    },
                    protocol: entity.getEndpointType.toLowerCase().includes("topic") ? "udp" : "http",
                    port: entity.getPort,
                    path: this.#createEndpointPathName(entity)
                }
            });
            let externalEndpoints = componentEntity.getExternalEndpointEntities.map((entity) => {
                return {
                    metadata: {
                        position: entity.position,
                        size: entity.size,
                        label: entity.label
                    },
                    protocol: entity.getEndpointType.toLowerCase().includes("topic") ? "udp" : "http",
                    port: entity.getPort,
                    path: this.#createEndpointPathName(entity)
                }
            });
            let persistedData = ""; // TODO

            if (componentEntity instanceof Entities.Service) {
                this.#nodeTemplates[this.#ensureNoWhiteSpace(componentEntity.getName)] = new SoftwareComponentService(componentEntity.getModelId, componentHost, endpointLinks, usesDataItems, usesBackingDataItems, endpoints, externalEndpoints, persistedData, componentEntity.position, componentEntity.size);
            } else if (componentEntity instanceof Entities.BackingService) {
                this.#nodeTemplates[this.#ensureNoWhiteSpace(componentEntity.getName)] = new ToscaBackingService(componentEntity.getModelId, componentHost, endpointLinks, usesDataItems, usesBackingDataItems, endpoints, externalEndpoints, persistedData, componentEntity.providedFunctionality, componentEntity.position, componentEntity.size);
            } else if (componentEntity instanceof Entities.StorageBackingService) {
                this.#nodeTemplates[this.#ensureNoWhiteSpace(componentEntity.getName)] = new DatabaseStorageBackingService(componentEntity.getModelId, componentHost, endpointLinks, usesDataItems, usesBackingDataItems, endpoints, externalEndpoints, persistedData, componentEntity.properties, componentEntity.position, componentEntity.size);
            } else {
                this.#nodeTemplates[this.#ensureNoWhiteSpace(componentEntity.getName)] = new RootComponent(componentEntity.getModelId, componentHost, endpointLinks, usesDataItems, usesBackingDataItems, endpoints, externalEndpoints, persistedData, componentEntity.position, componentEntity.size);
            }
        }
    }

    convertInfrastructure() {
        const infrastructureEntities = this.#systemEntity.getInfrastructureEntities;

        for (const infrastructureEntity of infrastructureEntities.values()) {            
            const usesBackingDataItems = infrastructureEntity.getBackingDataEntities.map((entity) => {
                return this.#ensureNoWhiteSpace(entity.getName);
            });

            if (infrastructureEntity.getInfrastructureType === Entities.InfrastructureTypes.DBMS) {
                this.#nodeTemplates[this.#ensureNoWhiteSpace(infrastructureEntity.getName)] = new DBMSInfrastructure(infrastructureEntity.getModelId, this.#ensureNoWhiteSpace(infrastructureEntity.getHostedBy), usesBackingDataItems, infrastructureEntity.position, infrastructureEntity.size);
            } else {
                this.#nodeTemplates[this.#ensureNoWhiteSpace(infrastructureEntity.getName)] = new ComputeInfrastructure(infrastructureEntity.getModelId, this.#ensureNoWhiteSpace(infrastructureEntity.getHostedBy), usesBackingDataItems, infrastructureEntity.position, infrastructureEntity.size);
            }
        }
    }

    convertDataAggregate() {
        const dataAggregateEntities = this.#systemEntity.getDataAggregateEntities;

        for (const dataAggregateEntity of dataAggregateEntities.values()) {
            const persistedBy = dataAggregateEntity.getPersistedBy.map((name) => {
                return this.#ensureNoWhiteSpace(name);
            })
            this.#nodeTemplates[this.#ensureNoWhiteSpace(dataAggregateEntity.getName)] = new ToscaDataAggregate(dataAggregateEntity.getModelId, persistedBy);
        }
    }

    convertBackingData() {
        const backingDataEntities = this.#systemEntity.getBackingDataEntities;

        for (const backingDataEntity of backingDataEntities.values()) {
            this.#nodeTemplates[this.#ensureNoWhiteSpace(backingDataEntity.getName)] = new ToscaBackingData(backingDataEntity.getModelId, backingDataEntity.getIncludedData);
        }
    }

    convertRequestTrace() {
        const requestTraceEntities = this.#systemEntity.getRequestTraceEntities;

        for (const requestTraceEntity of requestTraceEntities.values()) {
            const key = `RT_${this.#ensureNoWhiteSpace(requestTraceEntity.getExternalEndpoint.getEndpointType)}_${this.#ensureNoWhiteSpace(requestTraceEntity.getExternalEndpoint.getNameId)}`;
            let involvedLinks = requestTraceEntity.getLinkEntities.map((entity) => {
                return this.#ensureNoWhiteSpace(this.#createLinkNameKey(entity));
            });
            this.#nodeTemplates[this.#ensureNoWhiteSpace(key)] = new ToscaRequestTrace(requestTraceEntity.getModelId, this.#ensureNoWhiteSpace(requestTraceEntity.getExternalEndpoint.getParentName), this.#createEndpointPathName(requestTraceEntity.getExternalEndpoint), involvedLinks, requestTraceEntity.position, requestTraceEntity.size, requestTraceEntity.getName);
        }
    }

    convertLink() {
        const linkEntities = this.#systemEntity.getLinkEntities;

        for (const linkEntity of linkEntities.values()) {
            const key = this.#createLinkNameKey(linkEntity);
            const targetEndpointName = linkEntity.getTargetEntity.getEndpointType?.toLowerCase().includes("topic") ? `${linkEntity.getTargetEntity.getEndpointName} ${linkEntity.getTargetEntity.getEndpointType}` : `${linkEntity.getTargetEntity.getEndpointType} ${linkEntity.getTargetEntity.getEndpointName}`;
            this.#relationshipTemplates[this.#ensureNoWhiteSpace(key)] = new ConnectsToLink(linkEntity.getModelId, targetEndpointName, linkEntity.getRelationType);
        }
    }

    convertDeploymentMapping() {
        const deploymentMappingEntities = this.#systemEntity.getDeploymentMappingEntities;

        for (const deploymentMappingEntity of deploymentMappingEntities.values()) {
            const key = deploymentMappingEntity.getUnderlyingInfrastructure.getName + "_host_" + deploymentMappingEntity.getDeployedEntity.getName;
            this.#relationshipTemplates[this.#ensureNoWhiteSpace(key)] = new HostedOn(deploymentMappingEntity.getModelId);
        }
    }

    #ensureNoWhiteSpace(text) {
        if (!text || !(text.trim())) {
            return text;
        }

        return text.replace(/\s+/g, '');
    }

    #createLinkNameKey(linkEntity) {
        return linkEntity.getSourceEntity.getName + "_connects-to_" + linkEntity.getTargetEntity.getNameId;
    }

    #createEndpointPathName(entity) {
        return entity.getEndpointType?.toLowerCase().includes("topic") ? `${entity.getEndpointName} ${entity.getEndpointType}` : `${entity.getEndpointType} ${entity.getEndpointName}`
    }
}

export default ToscaConverter;