# cna.qualityModel.entities.DBMS.StorageBackingService

The __DBMS.Infrastructure__ Node represents an _Infrastructure_ entity, which is able to host Database.StorageService Nodes.
It extends the original TOSCA _DBMS_ Node in order to allow _Backing Data_ entities to be referenced.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/TOSCA_Extension/Nodes/DBMS_Infrastructure.tosca)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>DBMS.StorageBackingService</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:DBMS.StorageBackingService</td> <!--TODO keep?-->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.DBMS.StorageBackingService</td>
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
cna.qualityModel.entities.DBMS.Infrastructure:
  derived_from: tosca.nodes.DBMS
  description: Node Type to model Infrastructure entities
  requirements:
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachment
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurrences: [0, UNBOUNDED]
```

## 4. Example

```yaml
mysql_service:
  type: tosca.nodes.DBMS.Infrastructure
  properties:
    root_password: rootpassword
    port: 3306
  requirements:
    - host:
        node: docker_host
        relationship: dockerHost_host_mySqlService
    # Reference to Backing Data
    - uses_backing_data: #TODO
```
