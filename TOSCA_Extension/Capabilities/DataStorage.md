# cna.qualityModel.capabilities.DataStorage

When a Node includes the _DataStorage_ Capability, it is able to store Data Aggregate entities.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](DataStorage.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>DataStorage</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:DataStorage</td> <!-- TODO keep? -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.capabilities.DataStorage</td>
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
cna.qualityModel.capabilities.DataStorage:
  derived_from: tosca.capabilities.Root
  description: When included, the Node is able to store Data Aggregate entities
```

## 4. Example

```yaml
some_node:
  capabilities:
    - persist_data:
        # Persist Data Aggregate
        type: cna.qualityModel.capabilities.DataStorage
```
