# cna.qualityModel.relationships.AttachesTo.Data

The _AttachtesTo.Data_ Relationship is used to model the connection between a Component and a _Data Aggregate_ or _Backing Data_ entity.
It extends the original TOSCA _AttachesTo_ Relationship in order to change the _"location"_ property to a non-required one.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](AttachesTo_Data.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>AttachesTo.Data</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:AttachesTo.Data</td> <!-- TODO keep? -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.relationships.AttachesTo.Data</td>
    </tr>
</table>

## 1. Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| location | false | map | N/A | The relative location. |

## 2. Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

## 3. Definition

```yaml
cna.qualityModel.relationships.AttachesTo.Data:
  derived_from: tosca.relationships.AttachesTo
  valid_target_types: [tosca.capabilities.Attachment]
  properties:
    location:
      # Override parent AttachesTo definition to make this property non-required
      required: false
```

## 4. Example

```yaml
relationship_templates:
  some_explicitly_modeled_relationship:
    type: cna.qualityModel.relationships.AttachesTo.Data
```
