# cna.qualityModel.entities.DataAggregate

The __DataAggregate__ Node can model a _Data Aggregate_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](DataAggregate.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>DataAggregate</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:DataAggregate</td> <!-- TODO keep? -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.DataAggregate</td>
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
cna.qualityModel.entities.DataAggregate:
  derived_from: tosca.nodes.Root
  description: Node Type to model Data Aggregate entities
  requirements:
    # Allows Data Aggregate to be persisted by Storage Backing Service entity
    - persistence:
        capability: cna.qualityModel.capabilities.DataStorage
        node: cna.qualityModel.entities.DBMS.StorageService
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurrences: [1, UNBOUNDED]
  capabilities:
    # Allows Data Aggregate to be used by other entities
    provided_data:
      type: tosca.capabilities.Attachment
      valid_source_types:
        - cna.qualityModel.entities.Root.Component
        - cna.qualityModel.entities.SoftwareComponent.Service
        - cna.qualityModel.entities.BackingService
        - cna.qualityModel.entities.DBMS.StorageService
      occurrences: [1, 1]
```

## 4. Example

```yaml
order:
  type: cna.qualityModel.entities.DataAggregate
  properties:
  requirements:
    - persistence: mysql_service
  capabilities:
    provided_data:
      type: tosca.capabilities.Attachment
```
