# cna.qualityModel.entities.SoftwareComponent.Service

The __SoftwareComponent.Service__ Node represents a _Service_ entity.
It extends the original TOSCA _SoftwareComponent_ Node in order to allow the modeling of _Endpoints_ as well as _Links_ to other Component entities.
Additionally, modeled _Backing Data_ and _Data Aggregate_ entities can be referenced.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](SoftwareComponent_Service.tosca)

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
cna.qualityModel.entities.SoftwareComponent.Service:
  derived_from: tosca.nodes.SoftwareComponent
  description: Node Type to model Service entities
  requirements:
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
order_service:
      type: cna.qualityModel.entities.SoftwareComponent.SoftwareComponent.Service
      requirements:
        - host:
            node: docker_host
            relationship: dockerHost_host_orderService
        # Model Links between Components
        - endpoint_link:
            node: kafka
            relationship: orderService_subscribes-to_Kafka-orderService-receiveFrom
        - endpoint_link:
            node: kafka
            relationship: orderService_subscribes-to_Kafka-Restaurant-receiveFrom
        - endpoint_link:
            node: kafka
            relationship: orderService_subscribes-to_Kafka-CreateOrderSaga-reply-receiveFrom
        - endpoint_link:
            node: zookeeper
            relationship: orderService_connects-to_Zookeeper
        - endpoint_link:
            node: zipkin
            relationship: orderService_connects-to_Zipkin
        - endpoint_link:
            node: mysql_service
            relationship: orderService_connects-to_MySQL-ftgoOrderService
        # Reference to Data Aggregate
        - uses_data: order
        - uses_data: restaurant
        # Reference to Backing Data
        - uses_backing_data: kafka_server
      capabilities:
        # Add Endpoint entities
        - endpoint:
            type: tosca.capabilities.Endpoint
            metadata:
              function: post_order
            properties:
              protocol: http
              port: *order_service_port
              url_path: POST /orders
        - endpoint:
            type: tosca.capabilities.Endpoint
            metadata:
              function: get_restaurant_by_id
            properties:
              protocol: http
              port: *order_service_port
              url_path: GET /restaurants/{restaurantId}
```
