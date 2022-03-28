# Proposed TOSCA Extension

## Table of Contents
1. [General Remarks and Modeling Rules](#1-general-remarks-and-modeling-rules)
    1. [Mapping Rules of TOSCA Elements to Entity Equivalents](#11-mapping-rules-of-tOSCA-elements-to-entity-equivalents)
2. [Extending TOSCA's Existing Normative Types](#extending-existing-normative-types)
    1. [Component Entity TOSCA Representation](#21-component-entity-tOSCA-representation)
    2. [Service Entity TOSCA Representation](#22-service-entity-tOSCA-representation)
    3. [Storage Backing Service Entity TOSCA Representation](#23-storage-backing-service-entity-tOSCA-representation)
    4. [Link Entity TOSCA Representation](#24-link-entity-tOSCA-representation)
    5. [Infrastructure Entity TOSCA Representation](#25-infrastructure-entity-tOSCA-representation)
3. [Adding New Types](#3-adding-new-types)
    1. [Backing Service Entity Representation](#31-backing-service-entity-representation)
    2. [Request Trace Entity Representation](#32-request-trace-entity-representation)
    3. [Data Aggregate Entity Representation](#33-data-aggregate-entity-representation)
    4. [Backing Data Entity Representation](#34-backing-data-entity-representation)
    5. [Additionally Required Type Definitions](#35-additionally-required-type-definitions)

-----------------------------------------------------

## 1. General Remarks and Modeling Rules

The following Type definitions are proposed to model the entities of the mentioned [CNA quality model](https://github.com/r0light/cna-quality-model/tree/0.1)[^1].
The extensions consider the different additional requirements identified while modeling the architecture of the [FTGO Application](https://github.com/microservices-patterns/ftgo-application/tree/cac2b209fa91c9908b38cef408c9efb38614a253)[^1].
The modeling was realized with [TOSCA (v1.3)](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=tosca)[^1] while considering the quality model and its entities.

### 1.1 Mapping Rules of TOSCA Elements to Entity Equivalents

The following table summarizes with which extended or original TOSCA element the respective entity should be modeled.

| __Proposed Entity__ | <div align="center">__Intended and Preferred TOSCA-based Representation Element__</div> |
|:----------------------------:|:-------------------|
| System | Service Template (&#8594; Topology Template) |<!---->
| Component | Node Template &#124; [Root.Component](#componentExtension) Node | <!---->
| Service | [SoftwareComponent.Service](#serviceExtension) Node |<!---->
| Endpoint | Node &#8594; Capability Type:<br> ([Root.Component](#componentExtension)&#8594;capabilities: endpoint) &#124;<br> ([SoftwareComponent.Service](#serviceExtension)&#8594;capabilities: endpoint) &#124;<br> ([BackingService](#backingServiceExtension)&#8594;capabilities: endpoint) &#124;<br> ([DBMS.StorageService](#storageBackingServiceExtension)&#8594;capabilities: endpoint) |<!---->
| External Endpoint | Node &#8594; Capability Type:<br> ([Root.Component](#componentExtension)&#8594;capabilities: external_endpoint) &#124;<br> ([SoftwareComponent.Service](#serviceExtension)&#8594;capabilities: external_endpoint) &#124;<br> ([BackingService](#backingServiceExtension)&#8594;capabilities: external_endpoint) &#124;<br> ([DBMS.StorageService](#storageBackingServiceExtension)&#8594;capabilities: external_endpoint) |<!---->
| Backing Service | [BackingService](#backingServiceExtension) Node |<!---->
| Storage Backing Service | [DBMS.StorageService](#storageBackingServiceExtension) Node |<!---->
| Link | Node &#8594; Requirement Type \& Relationship Template:<br> ([Root.Component](#componentExtension)&#8594;requirements: endpoint_link) &#124;<br> ([SoftwareComponent.Service](#serviceExtension)&#8594;requirements: endpoint_link) &#124;<br> ([BackingService](#backingServiceExtension)&#8594;requirements: endpoint_link) &#124;<br> ([DBMS.StorageService](#storageBackingServiceExtension)&#8594;requirements: endpoint_link) <br> \& <br> [ConnectsTo.Link](#linkExtension) Relationship |<!---->
| Infrastructure | [Compute.Infrastructure](#infrastructureExtension) Node |<!---->
| Deployment Mapping | HostedOn Relationship |<!---->
| Request Trace | [RequestTrace](#requestTraceExtension) Node | <!---->
| Data Aggregate | [DataAggregate](#dataAggregateExtension) Node | <!---->
| Backing Data | [BackingData](#backingDataExtension) Node |

## 2. <a name="extending-existing-normative-types">Extending TOSCA's Existing Normative Types</a>

The following section introduces the proposed extensions for entities for which equivalent concepts could be identified within the TOSCA standard.
Therefore, the following extensions are based on some specific normative TOSCA Types.

### 2.1 Component Entity TOSCA Representation  

#### 2.1.1 <a name="componentExtension">cna.qualityModel.entities.Root.Component</a>

The __Root.Component__ Node represents a generic _Component_ entity.
Therefore , it should be used to model a Component that is neither a _Service_, _Backing Service_, nor a _Storage Backing Service_ entity.
As an extension to the original TOSCA _Root_ Node, this Node allows modeling _Endpoints_, _Links_ to other Component entities and a _Deployment Mapping_ to an _Infrastructure Entity_ if desired.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/Root_Component.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/Root_Component.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/Root_Component.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.Root.Component:
  derived_from: tosca.nodes.Root
  description: Node Type to model Component entities
  requirements:
    # Require deployment on an Infrastructure entity
    - host:
        capability: tosca.capabilities.Compute
        relationship: tosca.relationships.HostedOn
        occurences: [1, 1]
    # Allow the definition of Links between Components
    - endpoint_link:
        capability: tosca.capabilities.Endpoint
        relationship: cna.qualityModel.relationships.ConnectsTo.Link
        occurences: [0, UNBOUNDED]
    # Allow the definition of Data Aggregate usage
    - uses_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.DataAggregate
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
  capabilities:
    # Allow assigning Endpoint entities
    endpoint:
      type: tosca.capabilities.Endpoint
      occurences: [0, UNBOUNDED]
    # Allow assigning External Endpoint entities
    external_endpoint:
      type: tosca.capabilities.Endpoint.Public
      occurences: [0, UNBOUNDED]
```

### 2.2 Service Entity TOSCA Representation

#### 2.2.1 <a name="serviceExtension">cna.qualityModel.entities.SoftwareComponent.Service</a>

The __SoftwareComponent.Service__ Node represents a _Service_ entity.
It extends the original TOSCA _SoftwareComponent_ Node in order to allow the modeling of _Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/SoftwareComponent_Service.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/SoftwareComponent_Service.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/SoftwareComponent_Service.md#4-example)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>SoftwareComponent.Service</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:SoftwareComponent.Service</td> <!--TODO keep?-->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.SoftwareComponent.Service</td>
    </tr>
</table>

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.SoftwareComponent.Service:
  derived_from: tosca.nodes.SoftwareComponent
  description: Node Type to model Service entities
  requirements:
    # Allow the definition of Links between Components
    - endpoint_link:
        capability: tosca.capabilities.Endpoint
        relationship: cna.qualityModel.relationships.ConnectsTo.Link
        occurences: [0, UNBOUNDED]
    # Allow the definition of Data Aggregate usage
    - uses_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.DataAggregate
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
  capabilities:
    # Allow assigning Endpoint entities
    endpoint:
      type: tosca.capabilities.Endpoint
      occurences: [0, UNBOUNDED]
    # Allow assigning External Endpoint entities
    external_endpoint:
      type: tosca.capabilities.Endpoint.Public
      occurences: [0, UNBOUNDED]
```

### 2.3 Storage Backing Service Entity TOSCA Representation

#### 2.3.1 <a name="storageBackingServiceExtension">cna.qualityModel.entities.DBMS.StorageService</a>

The __DBMS.StorageService__ Node represents a _Storage Backing Service_ entity.
It extends the original TOSCA _DBMS_ Node in order to allow the modeling of _Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.
The Node also allows modeling the persistence of a specific _Data Aggregate_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/DBMS_StorageService.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/DBMS_StorageService.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/DBMS_StorageService.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.DBMS.StorageService:
  derived_from: tosca.nodes.DBMS
  description: Node Type to model Storage Backing Service entities
  requirements:
    # Allow the definition of Links between Components
    - endpoint_link:
        capability: tosca.capabilities.Endpoint
        relationship: cna.qualityModel.relationships.ConnectsTo.Link
        occurences: [0, UNBOUNDED]
    # Allow the definition of Data Aggregate usage
    - uses_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.DataAggregate
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
  capabilities:
    # Allow assigning Endpoint entities
    endpoint:
      type: tosca.capabilities.Endpoint
      occurences: [0, UNBOUNDED]
    # Allow assigning External Endpoint entities
    external_endpoint:
      type: tosca.capabilities.Endpoint.Public
      occurences: [0, UNBOUNDED]
    # Needed so that Data Aggregates can be stored
    persist_data:
      type: cna.qualityModel.capabilities.DataStorage
      description: The ability to persist Data Aggregates like Business Objects
      valid_source_types: [cna.qualityModel.entities.DataAggregate]
      occurences: [1, UNBOUNDED]
```

### 2.4 Link Entity TOSCA Representation

#### 2.4.1 <a name="linkExtension">cna.qualityModel.entities.ConnectsTo.Link</a>

The __ConnectsTo.Link__ Node represents a _Link_ entity.
It extends the original TOSCA _ConnectsTo_ Relationship in order to allow the assignment of the targeted _Endpoint_.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Relationships/ConnectsTo_Link.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Relationships/ConnectsTo_Link.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Relationships/ConnectsTo_Link.md#4-example)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>ConnectsTo.Link</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:ConnectsTo.Link</td> <!-- TODO keep? -->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.ConnectsTo.Link</td>
    </tr>
</table>

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| target_endpoint | true | string | N/A | The endpoint, the connecting Component links to. |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.ConnectsTo.Link:
  derived_from: tosca.nodes.ConnectsTo
  description: Relationship Type to model Link entities
  properties:
    # Allows modeling the specific Endpoint the Link addresses, which represents the connection between the Components
    target_endpoint:
      type: string
      required: true
      description: The Endpoint to which the linked Component connects.
```

### 2.5 Infrastructure Entity TOSCA Representation

#### 2.5.1 <a name="infrastructureExtension">cna.qualityModel.entities.Compute.Infrastructure</a>

The __Compute.Infrastructure__ Node represents an _Infrastructure_ entity.
It extends the original TOSCA _Compute_ Node in order to allow a Compute Node to be hosted by another one, which allows representing Infrastructure entities to be hosted by other Infrastructure entities.
Additionally, modeled _Backing Data_ can be referenced.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/Compute_Infrastructure.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/Compute_Infrastructure.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/Compute_Infrastructure.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.Compute.Infrastructure:
  derived_from: tosca.nodes.Compute
  description: Node Type to model Infrastructure entities
  requirements:
    # Allow the deployment on another Infrastructure entity
    - host:
        capability: tosca.capabilities.Compute
        relationship: tosca.relationships.HostedOn
        occurences: [0, 1]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
```

## 3. Adding New Types

In contrast to the previous section, this section introduces the proposed extensions for entities for which no equivalent concepts could be identified within the TOSCA standard.
Therefore, the following extensions are solely based on the respective topmost _Root_ normative TOSCA Type.

### 3.1 Backing Service Entity Representation

#### 3.1.1 <a name="backingServiceExtension">cna.qualityModel.entities.BackingService</a>

The __BackingService__ Node represents a _Backing Service_ entity.
It allows the modeling of _Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/BackingService.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/BackingService.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/BackingService.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| provided_functionality | false | string | N/A | The general functionality the Backing Service provides |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.BackingService:
  derived_from: tosca.nodes.Root
  description: Node Type to model Backing Service entities
  properties:
    provided_functionality:
      type: string
      required: false
  requirements:
    # Allow the definition of Links between Components
    - endpoint_link:
        capability: tosca.capabilities.Endpoint
        relationship: cna.qualityModel.relationships.ConnectsTo.Link
        occurences: [0, UNBOUNDED]
    # Allow the definition of Data Aggregate usage
    - uses_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.DataAggregate
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
    # Allow the definition of Backing Data usage
    - uses_backing_data:
        capability: tosca.capabilities.Attachement
        node: cna.qualityModel.entities.BackingData
        relationship: cna.qualityModel.relationships.AttachesTo.Data
        occurences: [0, UNBOUNDED]
  capabilities:
    # Allow assigning Endpoint entities
    endpoint:
      type: tosca.capabilities.Endpoint
      occurences: [0, UNBOUNDED]
    # Allow assigning External Endpoint entities
    external_endpoint:
      type: tosca.capabilities.Endpoint.Public
      occurences: [0, UNBOUNDED]
```

### 3.2 Request Trace Entity Representation

#### 3.2.1 <a name="requestTraceExtension">cna.qualityModel.entities.RequestTrace</a>

The __RequestTrace__ Node models a _Request Trace_ entity.
It allows the inclusion of the various _Component, Service, Backing Service_ and _Storage Backing Service_ entities as well as _Link_ entities that are part of the Request Trace.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/RequestTrace.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/RequestTrace.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/RequestTrace.md#4-example)

<table>
    <tr>
        <td bgcolor="grey"><b>Shorthand Name</b></td>
        <td>RequestTrace</td>
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type Qualified Name</b></td>
        <td>qualityModel:RequestTrace</td> <!-- TODO keep?-->
    </tr>
    <tr>
        <td bgcolor="grey"><b>Type URI</b></td>
        <td>cna.qualityModel.entities.RequestTrace</td>
    </tr>
</table>

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| endpoint | true | string | N/A | The specific External Endpoint for which the Request Trace entity is defined. |
| nodes | false | list | N/A | The existing Component, Service, Backing Service or Storage Backing Service entities which are part of this Request Trace entity. |
| links | true | list | N/A | The existing Link entities which are part of this Request Trace entity. |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.entities.RequestTrace:
  derived_from: tosca.nodes.Root
  description: Node Type to model Request Trace entities
  properties:
    endpoint:
      type: string
      required: true
    nodes:
      type: list
      required: false
      entry_schema:
        description: An existing Component, Service, Backing Service or Storage Backing Service entity which is part of this Request Trace entity
        type: string
    links:
      type: list
      required: true
      entry_schema:
        description: An existing Link entity which is part of this Request Trace entity
        type: string
  requirements:
    # Reference to External Endpoint for which the Request Trace is defined
    - external_endpoint:
        capability: tosca.capabilities.Endpoint.Public
        relationship: tosca.relationships.ConnectsTo
        occurences: [1, 1]
```

### 3.3 Data Aggregate Entity Representation

#### 3.3.1 <a name="dataAggregateExtension">cna.qualityModel.entities.DataAggregate</a>

The __DataAggregate__ Node can model a _Data Aggregate_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/DataAggregate.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/DataAggregate.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/DataAggregate.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

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
        occurences: [1, UNBOUNDED]
  capabilities:
    # Allows Data Aggregate to be used by other entities
    provided_data:
      type: tosca.capabilities.Attachement
      valid_source_types:
        - cna.qualityModel.entities.Root.Component
        - cna.qualityModel.entities.SoftwareComponent.Service
        - cna.qualityModel.entities.BackingService
        - cna.qualityModel.entities.DBMS.StorageService
      occurences: [1, 1]
```

### 3.4 Backing Data Entity Representation

#### 3.4.1 <a name="backingDataExtension">cna.qualityModel.entities.BackingData</a>

The __BackingData__ Node can model a _Backing Data_ entity.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Nodes/BackingData.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Nodes/BackingData.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Nodes/BackingData.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| included_data | true | map | N/A | The information represented by the Backing Data entity. |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

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
        type: tosca.capabilities.Attachement
        valid_source_types:
          - cna.qualityModel.entities.Root.Component
          - cna.qualityModel.entities.SoftwareComponent.Service
          - cna.qualityModel.entities.BackingService
          - cna.qualityModel.entities.DBMS.StorageService
          - cna.qualityModel.entities.Compute.Infrastructure
        occurences: [1, 1]
```

### 3.5 Additionally Required Type Definitions

The following Type definitions are not used to represent some entities of the quality model but are required to realize them with the previously extended TOSCA definitions.

#### 3.5.1 <a name="dataStorageCapability">cna.qualityModel.capabilities.DataStorage</a>

When a Node includes the _DataStorage_ Capability, it is able to store Data Aggregate entities.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Capabilities/DataStorage.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Capabilities/DataStorage.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Capabilities/DataStorage.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| included_data | true | map | N/A | The information represented by the Backing Data entity. |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.capabilities.DataStorage:
  derived_from: tosca.capabilities.Root
  description: When included, the Node is able to store Data Aggregate entities
```

#### 3.5.2 <a name="attachesToDataRelationship">cna.qualityModel.relationships.AttachesTo.Data</a>

The _AttachtesTo.Data_ Relationship is used to model the connection between a Component and a _Data Aggregate_ or _Backing Data_ entity.
It extends the original TOSCA _AttachesTo_ Relationship in order to change the _"location"_ property to a non-required one.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](Relationships/AttachesTo_Data.tosca)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Individual Node Definition](Relationships/AttachesTo_Data.md)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Example](Relationships/AttachesTo_Data.md#4-example)

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

##### a) Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| location | false | map | N/A | The relative location. |

##### b) Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

##### c) Definition

```yaml
cna.qualityModel.relationships.AttachesTo.Data:
  derived_from: tosca.relationships.AttachesTo
  valid_target_types: [tosca.capabilities.Attachement]
  properties:
    location:
      # Override parent AttachesTo definition to make this property non-required
      required: false
```

[^1]: last accessed 2022-03-28
