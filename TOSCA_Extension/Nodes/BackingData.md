# cna.qualityModel.entities.BackingData

The __BackingData__ Node can model a _Backing Data_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](BackingData.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>BackingData</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:BackingData</td> <!-- TODO keep? -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.BackingData</td>
    </tr>
</table>

## 1. Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| included_data | true | map | N/A | The information represented by the Backing Data entity. |

## 2. Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

## 3. Definition

```yaml
cna.qualityModel.entities.BackingData:
  derived_from: tosca.nodes.Root
  description: Node Type to model Backing Data entities
  properties:
    included_data:
      type: map
      required: true
      key_schema:
        type: string
        description: the name specifying the individual Backing Data element
      entry_schema:
        type: string
        description: the value of the individual Backing Data element
  capabilities:
    provided_data:
        type: tosca.capabilities.Attachment
        valid_source_types:
          - cna.qualityModel.entities.Root.Component
          - cna.qualityModel.entities.SoftwareComponent.Service
          - cna.qualityModel.entities.BackingService
          - cna.qualityModel.entities.DBMS.StorageService
          - cna.qualityModel.entities.Compute.Infrastructure
        occurrences: [1, 1]
```

## 4. Example

```yaml
kafka_server:
  type: cna.qualityModel.entities.BackingData
  properties:
    included_data:
      EVENTUATELOCAL_KAFKA_BOOTSTRAP_SERVERS: "kafka:29092"
  capabilities:
    provided_data:
      type: tosca.capabilities.Attachment
```
