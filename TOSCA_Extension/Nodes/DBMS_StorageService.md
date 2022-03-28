# cna.qualityModel.entities.DBMS.StorageService

The __DBMS.StorageService__ Node represents a _Storage Backing Service_ entity.
It extends the original TOSCA _DBMS_ Node in order to allow the modeling of _Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.
The Node also allows modeling the persistence of a specific _Data Aggregate_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](DBMS_StorageService.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>DBMS.StorageService</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:DBMS.StorageService</td> <!--TODO keep?-->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.DBMS.StorageService</td>
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
cna.qualityModel.entities.DBMS.StorageService:
  derived_from: tosca.nodes.DBMS
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
      description: The ability to persist Data Aggregates like Business Objects
      valid_source_types: [cna.qualityModel.entities.DataAggregate]
      occurrences: [1, UNBOUNDED]
```

## 4. Example

```yaml
mysql_service:
  type: cna.qualityModel.entities.SoftwareComponent.DBMS.StorageService
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
