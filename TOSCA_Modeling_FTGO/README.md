# FTGO Application Modeling with TOSCA

## Table of Contents
1. [General Overview](#general-overview)
    1. [Mapped Endpoint Entities](#mapped-endpoint-entities)
    2. [Mapped Link Entities](#mapped-link-entities)
    3. [Mapped Request Trace Entities](#mapped-request-trace-entities)

-----------------------------------------------------

## General Overview

The following table summarizes how the different architectural elements of the [FTGO Application](https://github.com/microservices-patterns/ftgo-application/tree/cac2b209fa91c9908b38cef408c9efb38614a253)[^4] were mapped to the proposed entities of the [CNA quality model](https://github.com/r0light/cna-quality-model/tree/0.1)[^4].


| __Proposed Entity__ | <div align="center">__FTGO Application Element__</div> |
|:----------------------------:|:-------------------|
| System | FTGO Application |
| <a name="componentEntity">Component</a> | {[Service](#serviceEntity)} &#124; {[Backing Service](#backingServiceEntity)} &#124; {[Storage Backing Service](#storageBackingServiceEntity)}  |
| <a name="serviceEntity">Service</a> | Order Service &#124; Restaurant Service &#124; Delivery Service &#124; Consumer Service &#124; Kitchen Service &#124; Accounting Service &#124; Order History Service |
| Endpoint | {[Endpoint Mapping Table](#endpointEntity)} |
| External Endpoint | GET /orders?consumerId={consumerId} &#124; GET /orders/{orderId} &#124; POST /orders &#124; POST /orders/{orderId}/revise &#124; POST /orders/{orderId}/cancel &#124; POST /consumers |
| <a name="backingServiceEntity">Backing Service</a> | API Gateway &#124; CDC Service &#124; Kafka &#124; Zookeeper &#124; Zipkin |
| <a name="storageBackingServiceEntity">Storage Backing Service</a> | MySQL &#124; DynamoDbLocal |
| Link | {[Link Mapping Table](#linkEntity)} |
| Infrastructure | Docker Host &#124; Local Computer |
| Deployment Mapping | {[Component](#componentEntity)} – hosted-on – Docker Host &#124;<br> Docker Host – hosted-on – Local Computer  |
| Request Trace| {[Request Trace Mapping Table](#requestTraceEntity)} |
| Data Aggregate | Order &#124; Restaurant &#124; Consumer &#124; Ticket &#124; Account |
| Backing Data | Kafka Server &#124; Zookeeper Connection &#124; Datasource Credentials \& Configuration &#124; Logging Configuration &#124; Endpoints Configuration &#124; EventuateTram Configuration &#124; Spring Configuration &#124; Metrics |


### Mapped Endpoint Entities

The different Request Trace entities included in the example application.
Although the original specification of the entities[^5] defined that only Service entities can have Endpoints, the following table also provides Endpoints for Backing Service and Storage Backing Service entities.
This is due to the fact that otherwise, some Link entities would directly point to specific Endpoints, whereas otherwise would not.
Therefore, in order to use a consistent representation of Link entities, it was decided to change the entity specification such that Endpoints and External Endpoint entities are __part-of__ Component instead of Service.
Then, Backing Service entities and Storage Backing Service entities can also define Endpoints, as the following table does.


| __FTGO Application Element__ | <div align="center"><a name="endpointEntity">__Endpoint Entity__</a></div> |
|:----------------------------:|:-------------------|
| Order Service | POST /orders<br> POST /orders/{orderId}/cancel<br> POST /orders/{orderId}/revise<br> GET /orders/{orderId}<br> GET /restaurants/{restaurantId}|
| Restaurant Service | POST /restaurants<br> GET /restaurants/{restaurantId} |
| Delivery Service | POST /couriers/{courierId}/availability<br> GET /deliveries/{deliveryId}<br> GET /deliveries?orderId={orderId}[^1] |
| Consumer Service | POST /consumers<br> GET /consumers/{consumerId} |
| Kitchen Service | POST /tickets/{ticketId}/accept<br> GET /restaurants/{restaurantId}<br> GET /tickets?orderId={orderId}[^1] |
| Accounting Service | GET /accounts/{accountId}<br> GET /charges?orderId={orderId}[^1]|
| Order History Service | GET /orders?consumerId={consumerId}<br> Get /orders/{orderId} |
| Kafka | For each topic exists a _send-to_ and _receive-from_ endpoint:<br> orderService Topic<br> consumerService Topic<br> kitchenService Topic<br> accountingService Topic<br> net.chrisrichardson.ftgo.orderservice.domain.Order Topic<br> net.chrisrichardson.ftgo.restaurantservice.domain.Restaurant Topic<br> net.chrisrichardson.ftgo.consumerservice.domain.Consumer Topic<br> net.chrisrichardson.ftgo.kitchenservice.domain.Ticket Topic<br> net.chrisrichardson.ftgo.orderservice.createorder.CreateOrderSaga-reply Topic<br> net.chrisrichardson.ftgo.orderservice.reviseorder.ReviseOrderSaga-reply Topic<br> net.chrisrichardson.ftgo.orderservice.cancelorder.CancelOrderSaga-reply Topic<br> |
| CDC Service, Zookeeper & Zipkin[^2] | /connect |
| MySQL & DynamoDbLocal[^3] | /sql |

[^1]: Currently not yet included in the implementation but described in the book [\[1, p. 224\]](#1)

[^2]: Default Endpoint for connection purposes

[^3]: Generic SQL Endpoints

### Mapped Link Entities

The various Link entities included in the example application.


| __Proposed Entity__ | <div align="center">__FTGO Application Element__</div> |
|:----------------------------:|:-------------------|
| <a name="linkEntity">Link</a> | Order Service – subscribes-to – Kafka: orderService Topic receive-from<br> Order Service – subscribes-to – Kafka: Restaurant Topic receive-from<br> Order Service – subscribes-to – Kafka: CreateOrderSaga-reply Topic receive-from<br> Order Service – subscribes-to – Kafka: ReviseOrderSaga-reply Topic receive-from<br> Order Service – subscribes-to – Kafka: CancelOrderSaga-reply Topic receive-from<br> Order Service – connects-to – Zookeeper: /connect<br> Order Service – connects-to – Zipkin: /connect<br> Order Service – connects-to – MySQL: /sql/ftgo_order_service<br><br> Restaurant Service – connects-to – Zookeeper: /connect<br> Restaurant Service – connects-to – MySQL: /sql/ftgo\_restaurant\_service<br><br> Delivery Service – subscribes-to – Kafka: Order Topic receive-from<br> Delivery Service – subscribes-to – Kafka: Restaurant Topic receive-from<br> Delivery Service – subscribes-to – Kafka: Ticket Topic receive-from<br> Delivery Service – connects-to – Zookeeper: /connect<br> Delivery Service – connects-to – Zipkin: /connect<br> Delivery Service – connects-to – MySQL: /sql/ftgo_delivery_service<br><br> Consumer Service – subscribes-to – Kafka: consumerService Topic receive-from<br> Consumer Service – connects-to – Zookeeper: /connect<br> Consumer Service – connects-to – MySQL: /sql/ftgo_consumer_service<br><br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from<br> Kitchen Service – subscribes-to – Kafka: Restaurant Topic receive-from<br> Kitchen Service – connects-to – Zookeeper: /connect<br> Kitchen Service – connects-to – MySQL: /sql/ftgo_kitchen_service<br><br>	Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from<br> Accounting Service – subscribes-to – Kafka: Consumer Topic receive-from<br> Accounting Service – connects-to – Zookeeper: /connect<br> Accounting Service – connects-to – MySQL: /sql/ftgo_accounting_service<br><br> Order History Service – subscribes-to – Kafka: Order Topic receive-from<br> Order History Service – connects-to – Zookeeper: /connect<br> Order History Service – connects-to – DynamoDbLocal: /sql<br><br> API Gateway – routes-to – Order Service: "GET/orders/{orderId}"<br> API Gateway – routes-to – Order Service: "POST /orders"<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/revise"<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/cancel"<br> API Gateway – routes-to – Delivery Service: "GET /deliveries?orderId={orderId}"<br> API Gateway – routes-to – Consumer Service: "POST /consumers"<br> API Gateway – routes-to – Kitchen Service: "GET /tickets?orderId={orderId}"<br> API Gateway – routes-to – Accounting Service: "GET /charges?orderId={orderId}"<br> API Gateway – routes-to – Order History Service: "GET /orders?consumerId={consumerId}"<br><br>	CDC Service – publishes-to – Kafka: orderService Topic send-to<br> CDC Service – publishes-to – Kafka: consumerService Topic send-to<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to<br> CDC Service – publishes-to – Kafka: Order Topic send-to<br> CDC Service – publishes-to – Kafka: Restaurant Topic send-to<br> CDC Service – publishes-to – Kafka: Consumer Topic send-to<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to<br> CDC Service – publishes-to – Kafka: CreateOrderSaga-reply Topic send-to<br> CDC Service – publishes-to – Kafka: ReviseOrderSaga-reply Topic send-to<br> CDC Service – publishes-to – Kafka: CancelOrderSaga-reply Topic send-to<br> CDC Service – connects-to – Zookeeper: /connect<br> CDC Service – reads-from – MySQL: /sql/ftgo_order_service<br>	CDC Service – reads-from – MySQL: /sql/ftgo_restaurant_service<br> CDC Service – reads-from – MySQL: /sql/ftgo_delivery_service<br> CDC Service – reads-from – MySQL: /sql/ftgo_consumer_service<br> CDC Service – reads-from – MySQL: /sql/ftgo_kitchen_service<br> CDC Service – reads-from – MySQL: /sql/ftgo_accounting_service<br> CDC Service – reads-from – MySQL: /sql/ftgoorderhistoryservice<br> CDC Service – connects-to – MySQL: /sql/eventuate<br><br> Kafka – connects-to – Zookeeper: /connect|


### Mapped Request Trace Entities

The different Request Trace entities included in the example application.

<table>
      <tr>
        <th>Proposed Entity</th>
        <th style="text-align:center">FTGO Application Element</th>
      </tr>
      <tr>
          <td rowspan="6" align="center"><a name="requestTraceEntity">Request Trace</a></td>
          <td><b>"GET /orders?consumerId={consumerId}"</b>:<br> Trace[API Gateway, Order History Service,<br>API Gateway – routes-to – Order History Service: "GET /orders?consumerId={consumerId}",<br> Order History Service -- connects-to -- DynamoDbLocal: /sql]</td>
      </tr>
      <tr>
          <td><b>"GET /orders/{orderId}"</b>:<br> Trace[API Gateway, Order Service, Kitchen Service, Delivery Service, Accounting Service,<br> API Gateway – routes-to – Order Service: "GET/orders/{orderId}",<br> Order Service -- connects-to -- MySQL: ftgo_order_service,<br> API Gateway – routes-to – Kitchen Service: "GET /tickets?orderId={orderId}",<br> Kitchen Service -- connects-to -- MySQL: ftgo_kitchen_service,<br> API Gateway – routes-to – Delivery Service: "GET /deliveries?orderId={orderId}",<br> Delivery Service -- connects-to -- MySQL: ftgo_delivery_service,<br> API Gateway – routes-to – Accounting Service: "GET /charges?orderId={orderId}",<br> Accounting Service -- connects-to -- MySQL: ftgo_accounting_service]</td>
      </tr>
      <tr>
          <td><b>"POST /orders"</b>:<br> Trace[API Gateway, Order Service, Consumer Service, Kitchen Service, Accounting Service, CDC Service, Delivery Service, Order History Service,<br> API Gateway – routes-to – Order Service: "POST /orders",<br> Order Service – connects-to – MySQL: /sql/ftgo_order_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_order_service,<br> CDC Service – publishes-to – Kafka: consumerService Topic send-to,<br> Consumer Service – subscribes-to – Kafka: consumerService Topic receive-from,<br> Consumer Service – connects-to – MySQL: /sql/ftgo_consumer_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_consumer_service,<br> CDC Service – publishes-to – Kafka: CreateOrderSaga-reply Topic send-to,<br> Order Service – subscribes-to – Kafka: CreateOrderSaga-reply Topic receive-from,<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to,<br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from,<br> Kitchen Service – connects-to – MySQL: /sql/ftgo_kitchen_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_kitchen_service,<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to,<br> Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from,<br> Accounting Service – connects-to – MySQL: /sql/ftgo_accounting_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_accounting_service,<br> CDC Service – publishes-to – Kafka: orderService Topic send-to,<br> Order Service – subscribes-to – Kafka: orderService Topic receive-from,<br> CDC Service – publishes-to – Kafka: Order Topic send-to,<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to,<br> Order History Service – subscribes-to – Kafka: Order Topic receive-from,<br> Delivery Service – subscribes-to – Kafka: Order Topic receive-from]</td>
      </tr>
      <tr>
          <td><b>"POST /orders/{orderId}/revise"</b>:<br> Trace[API Gateway, Order Service, Kitchen Service, Accounting Service, CDC Service, MySQL, Kafka,<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/revise",<br> Order Service – connects-to – MySQL: /sql/ftgo_order_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_order_service,<br> CDC Service – publishes-to – Kafka: orderService Topic send-to,<br> Order Service – subscribes-to – Kafka: orderService Topic receive-from,<br> CDC Service – publishes-to – Kafka: ReviseOrderSaga-reply Topic send-to,<br> Order Service – subscribes-to – Kafka: ReviseOrderSaga-reply Topic receive-from,<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to,<br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from,<br> Kitchen Service – connects-to – MySQL: /sql/ftgo_kitchen_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_kitchen_service,<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to,<br> Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from,<br> Accounting Service – connects-to – MySQL: /sql/ftgo_accounting_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_accounting_service,<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to,<br> CDC Service – publishes-to – Kafka: Order Topic send-to]</td>
      </tr>
      <tr>
          <td><b>"POST /orders/{orderId}/cancel"</b>:<br> Trace[API Gateway, Order Service, Kitchen Service, Accounting Service, CDC Service, MySQL, Kafka,<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/cancel",<br> Order Service – connects-to – MySQL: /sql/ftgo_order_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_order_service,<br> CDC Service – publishes-to – Kafka: orderService Topic send-to,<br> Order Service – subscribes-to – Kafka: orderService Topic receive-from,<br> CDC Service – publishes-to – Kafka: CancelOrderSaga-reply Topic send-to,<br> Order Service – subscribes-to – Kafka: CancelOrderSaga-reply Topic receive-from,<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to,<br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from,<br> Kitchen Service – connects-to – MySQL: /sql/ftgo_kitchen_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_kitchen_service,<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to,<br> Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from,<br> Accounting Service – connects-to – MySQL: /sql/ftgo_accounting_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_accounting_service,<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to,<br> CDC Service – publishes-to – Kafka: Order Topic send-to,<br> Delivery Service – subscribes-to – Kafka: Ticket Topic receive-from,<br> Order History Service – subscribes-to – Kafka: Order Topic receive-from]</td>
      </tr>
      <tr>
          <td><b>"POST /consumers"</b>:<br> Trace[API Gateway, Consumer Service, Accounting Service, CDC Service, Kafka<br> API Gateway – routes-to – Consumer Service: "POST /consumers",<br> Consumer Service – connects-to – MySQL: /sql/ftgo_consumer_service,<br> CDC Service – reads-from – MySQL: /sql/ftgo_consumer_service,<br> CDC Service – publishes-to – Kafka: Consumer Topic send-to,<br> Accounting Service – subscribes-to – Kafka: Consumer Topic receive-from]</td>
      </tr>
</table>

[^4]: last accessed: 2022-03-29
[^5]: [https://github.com/r0light/cna-quality-model/tree/0.1](https://github.com/r0light/cna-quality-model/tree/0.1), last accessed: 2022-03-29

-----------------------------------------------------------------------

## References

<a name="1" href="https://www.manning.com/books/microservices-patterns">[1] Chris Richardson, "Microservices Patterns: With Examples in Java". Manning Publications, 1st edition, November 2018. ISBN 9781617294549.</a>
