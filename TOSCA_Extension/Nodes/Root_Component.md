# cna.qualityModel.entities.Root.Component

The __Root.Component__ Node represents a generic _Component_ entity.
Therefore , it should be used to model a Component that is neither a _Service_, _Backing Service_, nor a _Storage Backing Service_ entity.
As an extension to the original TOSCA _Root_ Node, this Node allows modeling _Endpoints_, _Links_ to other Component entities and a _Deployment Mapping_ to an _Infrastructure Entity_ if desired.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Root_Component.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>Root.Component</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:Root.Component</td> <!--TODO keep?-->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.Root.Component</td>
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
cna.qualityModel.entities.Root.Component:
  derived_from: tosca.nodes.Root
  description: Node Type to model Component entities
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
```

## 4. Example

```yaml
ocr_service:
  type: cna.qualityModel.entities.Root.Component
  requirements:
    - host: docker_host
    - endpoint_link:
        node: pdf_service
        relationship: ocrService_connects-to_PdfService
    - uses_backing_data: ocr_configuration
```
