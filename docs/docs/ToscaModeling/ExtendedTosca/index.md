Title: Using Extended TOSCA
Date: 2022
Context: Modeling Libraries Search

# FTGO Application Modeling with Proposed TOSCA Extension

// TODO

-----------------------------------------------------

## 1. Overview: Used TOSCA Representations for Modeling Entities

The proposed extensions allow modeling all of the quality model’s proposed entities. In total, eight new Node Types, one new Capability Type and two new Relationship Types have been introduced to represent the thirteen different entities. Although this
seems a lot at first, the majority of the Type definitions are based on TOSCA’s existing normative types. In fact, without the modeling of Backing Data and Data Aggregate entities, all definitions would solely consist of a combination of the existing normative types, with a few additional Node or Relationship properties. Therefore, despite the seemingly large number of additions, the extension was able to mainly rely on the concepts provided by the TOSCA standard to represent the entities. The following table summarizes which representations should now be used to model the respective entities as a result of the proposed extensions. The proposed extensions are highlighted in X.


| __Proposed Entity__ | <div align="center">__Used Extended TOSCA Representation__</div> |
|:----------------------------:|:-------------------|
| System | [<span style="color: black;">Service Template document (&#8594;Topology Template)</span>](#21-system-entity) |
| Component | [<span style="color: darkblue;">Root.Component</span> <span style="color: black;">Node</span>](#22-component-entity) |
| Service | [<span style="color: darkblue;">SoftwareComponent.Service</span> <span style="color: black;">Node</span>](#23-service-entity) |
| Backing Service | [<span style="color: darkblue;">BackingService</span> <span style="color: black;">Node</span>](#24-backing-service-entity) |
| Storage Backing Service | [<span style="color: darkblue;">Database.StorageBackingService</span> <span style="color: black;">Node</span>](#25-storage-backing-service-entity) |
| Endpoint | [<span style="color: black;">{Component Types}&#8594;Endpoint Capability</span>](#26-endpoint-entity) |
| External Endpoint | [<span style="color: black;">{Component Types}&#8594;Endpoint.Public Capability</span>](#27-external-endpoint-entity) |
| Link | [<span style="color: black;">{Component Types}&#8594;</span><span style="color: darkblue;">Endpoint_link</span> <span style="color: black;">Requirement &</span> <span style="color: darkblue;">ConnectsTo.Link</span> <span style="color: black;">Relationship Template</span>](#28-link-entity) |
| Infrastructure | [<span style="color: darkblue;">Compute.Infrastructure</span> <span style="color: black;">&#124;</span> <span style="color: darkblue;">DBMS.Infrastructure</span> <span style="color: black;">Node</span>](#29-infrastructure-entity) |
| Deployment Mapping | [<span style="color: black;">HostedOn Relationship</span>](#210-deployment-mapping-entity) |
| Request Trace | [<span style="color: darkblue;">RequestTrace</span> <span style="color: black;">Node</span>](#211-request-trace-entity) |
| Data Aggregate | [<span style="color: darkblue;">DataAggregate</span> <span style="color: black;">Node</span>](#212-data-aggregate-entity) |
| Backing Data | [<span style="color: darkblue;">BackingData</span> <span style="color: black;">Node</span>](#213-backing-data-entity) |


## 2. Modeling Examples for Extended TOSCA

// TODO

### 2.1 System Entity

// TODO

Example:
```yaml
// TODO
```

### 2.2 Component Entity

All included FTGO Components are either a Service, Backing Service or Storage Backing Service entity.

### 2.3 Service Entity

// TODO

Example:
```yaml
// TODO
```

### 2.4 Backing Service Entity

// TODO

Example:
```yaml
// TODO
```

### 2.5 Storage Backing Service Entity

// TODO

Example:
```yaml
// TODO
```

### 2.6 Endpoint Entity

// TODO

Example:
```yaml
// TODO
```

### 2.7 External Endpoint Entity

// TODO

Example:
```yaml
// TODO
```

### 2.8 Link Entity

// TODO

Example:
```yaml
// TODO
```

### 2.9 Infrastructure Entity

// TODO

Example:
```yaml
// TODO
```

### 2.10 Deployment Mapping Entity

// TODO

Example:
```yaml
// TODO
```

### 2.11 Request Trace Entity

// TODO

Example:
```yaml
// TODO
```

### 2.12 Data Aggregate Entity

// TODO

Example:
```yaml
// TODO
```

### 2.13 Backing Data Entity

// TODO

Example:
```yaml
// TODO
```

--8<-- "includes/abbreviations.md"
