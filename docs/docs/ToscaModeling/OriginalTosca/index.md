Title: Using Original TOSCA
Date: 2022
Context: Modeling Libraries Search

# FTGO Application Modeling with TOSCA

// TODO

-----------------------------------------------------

## 1. Overview: Used TOSCA Representations for Modeling Entities

// TODO


| <div align="center">__Proposed Entity__</div> | <div align="center">__Used TOSCA Representation__</div> | <div align="center">__Additional Requirements identified__</div>
|:----------------------------|:-------------------|:-----------------:|
| System | [Service Template (&#8594; Topology Template)](#21-system-entity) | :x: |
| Component | [–](#22-component-entity) | [:heavy_check_mark:](#componentRequirements) |
| Service | [SoftwareComponent Node](#23-service-entity) | [:heavy_check_mark:](#serviceRequirements) |
| Backing Service | [:x:](#24-backing-service-entity) | – |
| Storage Backing Service | [Database Node](#25-storage-backing-service-entity) | [:heavy_check_mark:](#storageBackingServiceRequirements) |
| Endpoint | [Endpoint &#124; Endpoint.Database Capability](#26-endpoint-entity) | :x: |
| External Endpoint | [Endpoint.Public](#27-external-endpoint-entity) | :x: |
| Link | [ConnectsTo Relationship](#28-link-entity) | [:heavy_check_mark:](#linkRequirements) |
| Infrastructure | [Compute &#124; DBMS Node](#29-infrastructure-entity) | [:heavy_check_mark:](#infrastructureRequirements) |
| Deployment Mapping | [HostedOn Relationship](#210-deployment-mapping-entity) | :x: |
| Request Trace | [:x:](#211-request-trace-entity) | – |
| Data Aggregate | [:x:](#212-data-aggregate-entity) | – |
| Backing Data | [Node&#8594;Properties](#213-backing-data-entity) | [:heavy_check_mark:](#backingDataRequirements) |


## 2. Modeling Examples And Identified Extension Requirements

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

### 2.1 System Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

Example:
```yaml
# System Entity
tosca_definitions_version: tosca_simple_yaml_1_3

description:
  Modeling the FTGO Application with the proposed entities

metadata:
  template_name: FTGO Application

topology_template:

  # The different included Component and Infrastructure entities of the System
  node_templates:

    order_service:
      type: ...

    api_gateway:
      type: ...

    docker_host:
      type: ...

    ...

  # The different included Link and Deployment Mapping entities of the System
  relationship_templates:
    ...
```

<ins>Additional Requirements:</ins> –

### 2.2 Component Entity

All included FTGO Components are either a Service, Backing Service or Storage Backing Service entity. Nevertheless, a Component entity has the same additional requirements.

<a name="componentRequirements" style="text-decoration: none; color: black;"><ins>Additional Requirements:</ins></a>

- [ ] Possibility to assign Endpoints
- [ ] Possibility to assign External Endpoints
- [ ] Modeling Links between Services

### 2.3 Service Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

Example:
```yaml
node_templates:

  # Service Entity
  order_service:
    type: tosca.nodes.SoftwareComponent
    requirements:
      - host: docker_host
    ## Missing: Possibility of Endpoint and Link assignment
```

<a name="serviceRequirements" style="text-decoration: none; color: black;"><ins>Additional Requirements:</ins></a>

- [ ] Possibility to assign Endpoints
- [ ] Possibility to assign External Endpoints
- [ ] Modeling Links between Services

### 2.4 Backing Service Entity

No equivalent TOSCA representation available that can be used such that Service and Backing Service entities are distinguishable.

<ins>Previous Requirement:</ins> New Node Type needed

### 2.5 Storage Backing Service Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

Example:
```yaml
node_templates:

  # Storage Backing Service Entity
  ftgo_order_service:
    type: tosca.nodes.Database
    properties:
      name: ftgo_order_service
      port: 3306
      user: ftgo_order_service_user
      password: ftgo_order_service_password
    requirements:
      - host:
          node: mysql_service
          relationship: mySqlService_host_FtgoOrderService
    capabilities:
      database_endpoint:
        type: tosca.capabilities.Endpoint.Database
        properties:
          protocol: http
          port: 3306
          url_path: /sql
    ## Missing: Possibility of External Endpoint and Link assignment
```

<a name="storageBackingServiceRequirements" style="text-decoration: none; color: black;"><ins>Additional Requirements:</ins></a>

- [ ] Possibility to assign External Endpoints
- [ ] Modeling Links between Services

### 2.6 Endpoint Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO_Endpoints.yaml)

Example:
```yaml
node_templates:

  # Storage Backing Service Entity
  ftgo_order_service:
    type: tosca.nodes.Database
    properties:
      name: ftgo_order_service
      port: 3306
      user: ftgo_order_service_user
      password: ftgo_order_service_password
    requirements:
      - host:
          node: mysql_service
          relationship: mySqlService_host_FtgoOrderService
    capabilities:
      # Endpoint entity
      database_endpoint:
        type: tosca.capabilities.Endpoint.Database
        properties:
          protocol: http
          port: 3306
          url_path: /sql
```

<ins>Additional Requirements:</ins> –

### 2.7 External Endpoint Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO_ExternalEndpoints.yaml)

Examples:
```yaml
api_gateway:
  type: ## Missing: no representable Node Type yet
  capabilities:
    # External Endpoint Entities
    - external_endpoint:
        type: tosca.capabilities.Endpoint.Public
        metadata:
          function: post_order
        properties:
          protocol: http
          port: 8087
          url_path: POST /orders
    - external_endpoint:
        type: tosca.capabilities.Endpoint.Public
        metadata:
          function: get_order_by_id
        properties:
          protocol: http
          port: 8087
          url_path: GET /orders/{orderId}
    ...
```

<ins>Additional Requirements:</ins> –

### 2.8 Link Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO_Links.yaml)

Examples:
```yaml
node_templates:
  ## Missing: Possibility to assign the Links to the involved Components

# Link Entities
relationship_templates:
  ...

  orderService_subscribes-to_Kafka-orderService-receiveFrom:
    type: tosca.relationships.ConnectsTo
    metadata:
      type_of_relation: subscribes to
    ## Missing: Possibility to model the specific Endpoint this Link connects to

  orderService_connects-to_MySQL-ftgoOrderService:
    type: tosca.relationships.ConnectsTo
    # Includes no metadata definition since it is optional
    ## Missing: Possibility to model the specific Endpoint this Link connects to
```

<a name="LinkRequirements" style="text-decoration: none; color: black;"><ins>Additional Requirements:</ins></a>

- [ ] Reference to specific Endpoint the Link connects to

### 2.9 Infrastructure Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

Examples:
```yaml
node_templates:

  # Infrastructure Entities
  mysql_service:
    type: tosca.nodes.DBMS
    properties:
      root_password: rootpassword
      port: 3306
    requirements:
      - host:
          node: docker_host
          relationship: dockerHost_host_mySqlService

  docker_host:
    type: tosca.nodes.Compute
    # Missing: Possibility to define a HostedOn Relationship to another Compute Node

  local_computer:
    type: tosca.nodes.Compute
```

<a name="infrastructureRequirements" style="text-decoration: none; color: black;"><ins>Additional Requirements:</ins></a>

- [ ] Compute Node to be hosted by another Compute Node

### 2.10 Deployment Mapping Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

Example:
```yaml
node_templates:
  ...

  # Version 1:
  # implicitly specifying the Deployment Mapping
  order_service:
    type: tosca.nodes.SoftwareComponent
    requirements:
      - host: docker_host # per Definition HostedOn Relationship Type

  # Version 2:
  # explicitly specifying the Deployment Mapping
  order_service:
    type: tosca.nodes.SoftwareComponent
    requirements:
      - host:
          node: docker_host
          relationship: dockerHost_host_orderService

  # Referenced Infrastructure entity
  docker_host:
    ...

# needed for Version 2:
relationship_templates:
  ...

  dockerHost_host_orderService:
    type: tosca.relationships.HostedOn

```

<ins>Additional Requirements:</ins> –

### 2.11 Request Trace Entity

No equivalent TOSCA representation available that can be used.

<ins>Previous Requirement:</ins> New Node Type needed

### 2.12 Data Aggregate Entity

No equivalent TOSCA representation available that can be used.

<ins>Previous Requirement:</ins> New Node Type needed

### 2.13 Backing Data Entity

// TODO

:page_facing_up: Modeling File: [FTGO TOSCA Modeling](FTGO.yaml)

Example:
```yaml
mysql_service:
  type: tosca.nodes.DBMS
  properties:
    root_password: rootpassword
    port: 3306
  requirements:
    - host:
        node: docker_host
        relationship: dockerHost_host_mySqlService
```

<a name="backingDataRequirements" style="text-decoration: none; color: black;"><ins>Additional Requirements:</ins></a>

- [ ] Ability to define Backing Data entities more flexible

--8<-- "includes/abbreviations.md"
