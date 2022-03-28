# cna.qualityModel.entities.Compute.Infrastructure

The __Compute.Infrastructure__ Node represents an _Infrastructure_ entity.
It extends the original TOSCA _Compute_ Node in order to allow a Compute Node to be hosted by another one, which allows representing Infrastructure entities to be hosted by other Infrastructure entities.
Additionally, modeled _Backing Data_ can be referenced.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Compute_Infrastructure.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>Compute.Infrastructure</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:Compute.Infrastructure</td> <!-- TODO keep -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.Compute.Infrastructure</td>
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
cna.qualityModel.entities.Compute.Infrastructure:
  derived_from: tosca.nodes.Compute
  description: Node Type to model Infrastructure entities
  requirements:
    # Allow the deployment on another Infrastructure entity
    - host:
        capability: tosca.capabilities.Compute
        relationship: tosca.relationships.HostedOn
        occurrences: [0, 1]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachment
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurrences: [0, UNBOUNDED]
```

## 4. Example

```yaml
docker_host:
  type: cna.qualityModel.entities.SoftwareComponent.Compute.Infrastructure
  requirements:
    - host:
        node: local_computer
        relationship: localComputer_host_dockerHost
```
