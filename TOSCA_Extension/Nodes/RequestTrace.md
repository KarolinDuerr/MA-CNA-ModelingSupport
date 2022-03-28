# cna.qualityModel.entities.RequestTrace

The __RequestTrace__ Node models a _Request Trace_ entity.
It allows the inclusion of the various _Component, Service, Backing Service_ and _Storage Backing Service_ entities as well as _Link_ entities that are part of the Request Trace.

File references:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [TOSCA-File](RequestTrace.tosca)

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

## 1. Properties

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------|
| endpoint | true | string | N/A | The specific External Endpoint for which the Request Trace entity is defined. |
| nodes | false | list | N/A | The existing Component, Service, Backing Service or Storage Backing Service entities which are part of this Request Trace entity. |
| links | true | list | N/A | The existing Link entities which are part of this Request Trace entity. |

## 2. Attributes

| Name | Required | Type | Constraints | <div align="center">__Description__</div> |
|:----:|:--------:|:----:|:-----------:|:-----------:|
| N/A | N/A | N/A | N/A | N/A |

## 3. Definition

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
        occurrences: [1, 1]
```

## 4. Example

```yaml
get_order_byId:
  type: cna.qualityModel.entities.RequestTrace
  properties:
    endpoint: GET /orders/{orderId}
    nodes:
      - api_gateway
      - order_service
      - kitchen_service
      - delivery_service
      - accounting_service
      - mysql_service
    links:
      - apiGateway_routes-to_orderService-GetOrderById
      - orderService_connects-to_MySQL-ftgoOrderService
      - apiGateway_routes-to_kitchenService-GetTicketsByOrderId
      - kitchenService_connects-to_MySQL-ftgoKitchenService
      - apiGateway_routes-to_deliveryService-GetDeliveriesByOrderId
      - deliveryService_connects-to_MySQL-ftgoDeliveryService
      - apiGateway_routes-to_accountingService-GetChargesByOrderId
      - accountingService_connects-to_MySQL-ftgoAccountingService
  requirements:
    - external_endpoint: api_gateway
```
