# cna.qualityModel.entities.BackingService

The __BackingService__ Node represents a _Backing Service_ entity.
It allows the modeling of _Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.
The Node also allows modeling the persistence of a specific _Data Aggregate_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](BackingService.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>BackingService</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:BackingService</td> <!-- TODO keep? -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.BackingService</td>
    </tr>
</table>

## 1. Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| provided_functionality | false | string | N/A | The general functionality the Backing Service provides |

## 2. Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

## 3. Definition

```yaml
cna.qualityModel.entities.BackingService:
  derived_from: tosca.nodes.Root
  description: Node Type to model Backing Service entities
  properties:
    provided_functionality:
      type: string
      required: false
  requirements:
    # Require deployment on an Infrastructure entity
    - host:
        capability: tosca.capabilities.Compute
        relationship: tosca.relationships.HostedOn
        occurrences: [1, 1]
    # Allow the definition of Links between Components
    - endpoint_link:
        capability: tosca.capabilities.Endpoint
        relationship: cna.qualityModel.relationships.ConnectsTo.Link
        occurrences: [0, UNBOUNDED]
    # Allow the definition of Data Aggregate usage
    - uses_data:
        capability: tosca.capabilities.Attachment
        node: cna.qualityModel.entities.DataAggregate
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurrences: [0, UNBOUNDED]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachment
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurrences: [0, UNBOUNDED]
  capabilities:
    # Allow assigning Endpoint entities
    endpoint:
      type: tosca.capabilities.Endpoint
      occurrences: [0, UNBOUNDED]
    # Allow assigning External Endpoint entities
    external_endpoint:
      type: tosca.capabilities.Endpoint.Public
      occurrences: [0, UNBOUNDED]
    # Needed so that Data Aggregates can be stored
    persist_data:
      type: cna.qualityModel.capabilities.DataStorage
      valid_source_types: [cna.qualityModel.entities.DataAggregate]
      occurrences: [0, UNBOUNDED]
```

## 4. Example

```yaml
cdc_service:
  type: cna.qualityModel.entities.SoftwareComponent.BackingService
  requirements:
    - host:
        node: docker_host
        relationship: dockerHost_host_cdcService
    # Model Links between Components
    - endpoint_link:
        node: kafka
        relationship: cdcService_publishes-to_Kafka-orderService-sendTo
    - endpoint_link:
        node: mysql_service
        relationship: cdcService_connects-to_MySQL-eventuate
    # Reference to Backing Data
    - uses_backing_data: kafka_server
  capabilities:
    # Add Endpoint entities
    endpoint:
      type: tosca.capabilities.Endpoint
      properties:
        protocol: http
        port: 8099
        url_path: /connect
```
