# cna.qualityModel.entities.Database.StorageBackingService

The __Database.StorageService__ Node represents a _Storage Backing Service_ entity.
It extends the original TOSCA _Database_ Node in order to allow the modeling of _External Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.
The Node also allows modeling the persistence of a specific _Data Aggregate_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/TOSCA_Extension/Nodes/Database_StorageService.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>Database.StorageBackingService</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:Database.StorageBackingService</td> <!--TODO keep?-->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.Database.StorageBackingService</td>
    </tr>
</table>

## 1. Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

## 2. Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

## 3. Definition

```yaml
cna.qualityModel.entities.Database.StorageBackingService:
  derived_from: tosca.nodes.Database
  description: Node Type to model Storage Backing Service entities
  requirements:
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
    # Endpoint can already be assigned using the database_endpoint capability
    # Allow assigning External Endpoint entities
    external_endpoint:
      type: tosca.capabilities.Endpoint.Public
      occurrences: [0, UNBOUNDED]
    # Needed so that Data Aggregates can be stored
    persist_data:
      type: cna.qualityModel.capabilities.DataStorage
      description: The ability to persist Data Aggregates like Business Objects
      valid_source_types: [cna.qualityModel.entities.DataAggregate]
      occurrences: [1, UNBOUNDED]
```

## 4. Example

```yaml
mysql_service:
  type: cna.qualityModel.entities.Database.StorageBackingService
  properties:
    root_password: rootpassword
    port: 3306
  requirements:
    - host:
        node: docker_host
        relationship: dockerHost_host_mySqlService
    # Reference to Backing Data
    - uses_backing_data: datasource_configuration_mysql_service
  capabilities:
    # Add Endpoint entity
    endpoint:
      type: tosca.capabilities.Endpoint
      properties:
        protocol: http
        port: 3306
        url_path: /sql
    persist_data:
      # Persist Data Aggregate
      type: cna.qualityModel.capabilities.DataStorage
```
