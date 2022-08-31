Title: FTGO Application Modeling with TOSCA
Date: 2022
Context: Modeling Libraries Search

# FTGO Application Modeling with TOSCA

In order to identify further required adaptions or extensions, Richardson's [FTGO Application](https://github.com/microservices-patterns/ftgo-application/tree/cac2b209fa91c9908b38cef408c9efb38614a253)[^1] was modeled. Richardson introduced the FTGO application in his book ["Microservices Patterns" [1]](#1). The application is used throughout the book to illustrate and explain the different patterns and concepts he presents. The following description and mapping consider the latest version of the application's code available on [Github](https://github.com/microservices-patterns/ftgo-application/tree/cac2b209fa91c9908b38cef408c9efb38614a253)[^1] combined with some of its descriptions in Richardson's book [[1]](#1). At some points, the code deviates from the book descriptions, for example, by providing additional services. Therefore, the focus lies on the code. However, since the code is still under development, some functions are currently only mocked. For these, suitable assumptions based on the book and the repository descriptions will be made.

Further information about the modeling using the original version of TOSCA can be found here: [Original TOSCA](OriginalTosca/index.md).

In addition, the FTGO Application is also modeled using the proposed extension for TOSCA to verify that the extension is able to successfully represent all thirteen entities of the quality model. More detailed information about the modeling using the extended version can be found here: [Extended TOSCA](ExtendedTosca/index.md).     

-----------------------------------------------------

## General Overview

The following table summarizes how the different architectural elements of the [FTGO Application](https://github.com/microservices-patterns/ftgo-application/tree/cac2b209fa91c9908b38cef408c9efb38614a253)[^1] were mapped to the proposed entities of the [CNA quality model](https://github.com/r0light/cna-quality-model/tree/0.1)[^1].


| __Proposed Entity__ | <div align="center">__FTGO Application Element__</div> |
|:----------------------------:|:-------------------|
| System | FTGO Application |
| <a name="componentEntity">Component</a> | {[Service](#serviceEntity)} &#124; {[Backing Service](#backingServiceEntity)} &#124; {[Storage Backing Service](#storageBackingServiceEntity)}  |
| <a name="serviceEntity">Service</a> | Order Service &#124; Restaurant Service &#124; Delivery Service &#124; Consumer Service &#124; Kitchen Service &#124; Accounting Service &#124; Order History Service |
| Endpoint | {[Endpoint Mapping Table](#endpointEntity)} |
| External Endpoint | GET /orders?consumerId={consumerId} &#124; GET /orders/{orderId} &#124; POST /orders &#124; POST /orders/{orderId}/revise &#124; POST /orders/{orderId}/cancel &#124; POST /consumers |
| <a name="backingServiceEntity">Backing Service</a> | API Gateway &#124; CDC Service &#124; Kafka &#124; Zookeeper &#124; Zipkin |
| <a name="storageBackingServiceEntity">Storage Backing Service</a> | ftgo_consumer_service &#124; ftgo_order_service &#124; ftgo_kitchen_service &#124; ftgo_restaurant_service &#124; ftgo_accounting_service &#124; ftgoorderhistoryservice &#124; ftgo_accounting_service &#124; ftgo_delivery_service &#124; eventuate &#124; DynamoDbLocal |
| Link | {[Link Mapping Table](#linkEntity)} |
| Infrastructure | MySQL &#124; DynamoDb &#124; Docker Host &#124; Local Computer |
| Deployment Mapping | {[Service](#serviceEntity) &#124; [Backing Service](#backingServiceEntity)} – hosted-on – Docker Host &#124;</br> DynamoDbLocal – hosted-on – DynamoDb &#124; DynamoDb – hosted-on – Docker Host &#124;</br> {remaining [Storage Backing Service](#storageBackingServiceEntity)} – hosted-on – MySQL &#124; MySQL – hosted-on – Docker Host &#124;</br> Docker Host – hosted-on – Local Computer  |
| Request Trace| {[Request Trace Mapping Table](#requestTraceEntity)} |
| Data Aggregate | Order &#124; Restaurant &#124; Consumer &#124; Ticket &#124; Account |
| Backing Data | Kafka Server &#124; Zookeeper Connection &#124; Datasource Credentials \& Configuration &#124; Logging Configuration &#124; Endpoints Configuration &#124; EventuateTram Configuration &#124; Spring Configuration &#124; Metrics |


### Mapped Endpoint Entities

The different Request Trace entities included in the example application.
Although the original specification of the entities[^2] defined that only Service entities can have Endpoints, the following table also provides Endpoints for Backing Service and Storage Backing Service entities.
This is due to the fact that otherwise, some Link entities would directly point to specific Endpoints, whereas otherwise would not.
Therefore, in order to use a consistent representation of Link entities, it was decided to change the entity specification such that Endpoints and External Endpoint entities are __part-of__ Component instead of Service.
Then, Backing Service entities and Storage Backing Service entities can also define Endpoints, as the following table does.


| __FTGO Application Element__ | <div align="center"><a name="endpointEntity">__Endpoint Entity__</a></div> |
|:----------------------------:|:-------------------|
| Order Service | POST /orders<br> POST /orders/{orderId}/cancel<br> POST /orders/{orderId}/revise<br> GET /orders/{orderId}<br> GET /restaurants/{restaurantId}|
| Restaurant Service | POST /restaurants<br> GET /restaurants/{restaurantId} |
| Delivery Service | POST /couriers/{courierId}/availability<br> GET /deliveries/{deliveryId}<br> GET /deliveries?orderId={orderId}[^3] |
| Consumer Service | POST /consumers<br> GET /consumers/{consumerId} |
| Kitchen Service | POST /tickets/{ticketId}/accept<br> GET /restaurants/{restaurantId}<br> GET /tickets?orderId={orderId}[^3] |
| Accounting Service | GET /accounts/{accountId}<br> GET /charges?orderId={orderId}[^3]|
| Order History Service | GET /orders?consumerId={consumerId}<br> Get /orders/{orderId} |
| Kafka | For each topic exists a _send-to_ and _receive-from_ endpoint:<br> orderService Topic<br> consumerService Topic<br> kitchenService Topic<br> accountingService Topic<br> net.chrisrichardson.ftgo.orderservice.domain.Order Topic<br> net.chrisrichardson.ftgo.restaurantservice.domain.Restaurant Topic<br> net.chrisrichardson.ftgo.consumerservice.domain.Consumer Topic<br> net.chrisrichardson.ftgo.kitchenservice.domain.Ticket Topic<br> net.chrisrichardson.ftgo.orderservice.createorder.CreateOrderSaga-reply Topic<br> net.chrisrichardson.ftgo.orderservice.reviseorder.ReviseOrderSaga-reply Topic<br> net.chrisrichardson.ftgo.orderservice.cancelorder.CancelOrderSaga-reply Topic<br> |
| CDC Service, Zookeeper & Zipkin[^4] | /connect |
| DynamoDbLocal[^5] | /key-value |
| ftgo_consumer_service, ftgo_order_service, ftgo_kitchen_service, ftgo_restaurant_service, ftgo_accounting_service, ftgoorderhistoryservice, ftgo_accounting_service, ftgo_delivery_service, eventuate[^5] | /sql |

### Mapped Link Entities

The various Link entities included in the example application.


| __Proposed Entity__ | <div align="center">__FTGO Application Element__</div> |
|:----------------------------:|:-------------------|
| <a name="linkEntity">Link</a> | Order Service – subscribes-to – Kafka: orderService Topic receive-from<br> Order Service – subscribes-to – Kafka: Restaurant Topic receive-from<br> Order Service – subscribes-to – Kafka: CreateOrderSaga-reply Topic receive-from<br> Order Service – subscribes-to – Kafka: ReviseOrderSaga-reply Topic receive-from<br> Order Service – subscribes-to – Kafka: CancelOrderSaga-reply Topic receive-from<br> Order Service – connects-to – Zookeeper: /connect<br> Order Service – connects-to – Zipkin: /connect<br> Order Service – connects-to – ftgo_order_service: /sql<br><br> Restaurant Service – connects-to – Zookeeper: /connect<br> Restaurant Service – connects-to – ftgo\_restaurant\_service: /sql<br><br> Delivery Service – subscribes-to – Kafka: Order Topic receive-from<br> Delivery Service – subscribes-to – Kafka: Restaurant Topic receive-from<br> Delivery Service – subscribes-to – Kafka: Ticket Topic receive-from<br> Delivery Service – connects-to – Zookeeper: /connect<br> Delivery Service – connects-to – Zipkin: /connect<br> Delivery Service – connects-to – ftgo_delivery_service: /sql<br><br> Consumer Service – subscribes-to – Kafka: consumerService Topic receive-from<br> Consumer Service – connects-to – Zookeeper: /connect<br> Consumer Service – connects-to – ftgo_consumer_service: /sql<br><br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from<br> Kitchen Service – subscribes-to – Kafka: Restaurant Topic receive-from<br> Kitchen Service – connects-to – Zookeeper: /connect<br> Kitchen Service – connects-to – ftgo_kitchen_service: /sql<br><br>	Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from<br> Accounting Service – subscribes-to – Kafka: Consumer Topic receive-from<br> Accounting Service – connects-to – Zookeeper: /connect<br> Accounting Service – connects-to – ftgo_accounting_service: /sql<br><br> Order History Service – subscribes-to – Kafka: Order Topic receive-from<br> Order History Service – connects-to – Zookeeper: /connect<br> Order History Service – connects-to – DynamoDbLocal: /key-value<br><br> API Gateway – routes-to – Order Service: "GET/orders/{orderId}"<br> API Gateway – routes-to – Order Service: "POST /orders"<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/revise"<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/cancel"<br> API Gateway – routes-to – Delivery Service: "GET /deliveries?orderId={orderId}"<br> API Gateway – routes-to – Consumer Service: "POST /consumers"<br> API Gateway – routes-to – Kitchen Service: "GET /tickets?orderId={orderId}"<br> API Gateway – routes-to – Accounting Service: "GET /charges?orderId={orderId}"<br> API Gateway – routes-to – Order History Service: "GET /orders?consumerId={consumerId}"<br><br>	CDC Service – publishes-to – Kafka: orderService Topic send-to<br> CDC Service – publishes-to – Kafka: consumerService Topic send-to<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to<br> CDC Service – publishes-to – Kafka: Order Topic send-to<br> CDC Service – publishes-to – Kafka: Restaurant Topic send-to<br> CDC Service – publishes-to – Kafka: Consumer Topic send-to<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to<br> CDC Service – publishes-to – Kafka: CreateOrderSaga-reply Topic send-to<br> CDC Service – publishes-to – Kafka: ReviseOrderSaga-reply Topic send-to<br> CDC Service – publishes-to – Kafka: CancelOrderSaga-reply Topic send-to<br> CDC Service – connects-to – Zookeeper: /connect<br> CDC Service – reads-from – ftgo_order_service: /sql<br>	CDC Service – reads-from – ftgo_restaurant_service: /sql<br> CDC Service – reads-from – ftgo_delivery_service: /sql<br> CDC Service – reads-from – ftgo_consumer_service: /sql<br> CDC Service – reads-from – ftgo_kitchen_service: /sql<br> CDC Service – reads-from – ftgo_accounting_service: /sql<br> CDC Service – reads-from – ftgoorderhistoryservice: /sql<br> CDC Service – connects-to – eventuate: /sql<br><br> Kafka – connects-to – Zookeeper: /connect|


### Mapped Request Trace Entities

The different Request Trace entities included in the example application.

<table>
      <tr>
        <th>Proposed Entity</th>
        <th style="text-align:center">FTGO Application Element</th>
      </tr>
      <tr>
          <td rowspan="6" align="center"><a name="requestTraceEntity">Request Trace</a></td>
          <td><b>"GET /orders?consumerId={consumerId}"</b>:<br> Trace[API Gateway, Order History Service, DynamoDbLocal,<br>API Gateway – routes-to – Order History Service: "GET /orders?consumerId={consumerId}",<br> Order History Service – connects-to – DynamoDbLocal: /key-value]</td>
      </tr>
      <tr>
          <td><b>"GET /orders/{orderId}"</b>:<br> Trace[API Gateway, Order Service, Kitchen Service, Delivery Service, Accounting Service, ftgo_order_service, ftgo_kitchen_service, ftgo_delivery_service, ftgo_accounting_service,<br> API Gateway – routes-to – Order Service: "GET/orders/{orderId}",<br> Order Service – connects-to – ftgo_order_service: /sql,<br> API Gateway – routes-to – Kitchen Service: "GET /tickets?orderId={orderId}",<br> Kitchen Service – connects-to – ftgo_kitchen_service: /sql,<br> API Gateway – routes-to – Delivery Service: "GET /deliveries?orderId={orderId}",<br> Delivery Service – connects-to – ftgo_delivery_service: /sql,<br> API Gateway – routes-to – Accounting Service: "GET /charges?orderId={orderId}",<br> Accounting Service – connects-to – ftgo_accounting_service: /sql]</td>
      </tr>
      <tr>
          <td><b>"POST /orders"</b>:<br> Trace[API Gateway, Order Service, Consumer Service, Kitchen Service, Accounting Service, CDC Service, Delivery Service, Order History Service, Kafka, ftgo_order_service, ftgo_consumer_service, ftgo_kitchen_service, ftgo_accounting_service,<br> API Gateway – routes-to – Order Service: "POST /orders",<br> Order Service – connects-to – ftgo_order_service: /sql,<br> CDC Service – reads-from – ftgo_order_service: /sql,<br> CDC Service – publishes-to – Kafka: consumerService Topic send-to,<br> Consumer Service – subscribes-to – Kafka: consumerService Topic receive-from,<br> Consumer Service – connects-to – ftgo_consumer_service: /sql,<br> CDC Service – reads-from – ftgo_consumer_service: /sql,<br> CDC Service – publishes-to – Kafka: CreateOrderSaga-reply Topic send-to,<br> Order Service – subscribes-to – Kafka: CreateOrderSaga-reply Topic receive-from,<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to,<br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from,<br> Kitchen Service – connects-to – ftgo_kitchen_service: /sql,<br> CDC Service – reads-from – ftgo_kitchen_service: /sql,<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to,<br> Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from,<br> Accounting Service – connects-to – ftgo_accounting_service: /sql,<br> CDC Service – reads-from – ftgo_accounting_service: /sql,<br> CDC Service – publishes-to – Kafka: orderService Topic send-to,<br> Order Service – subscribes-to – Kafka: orderService Topic receive-from,<br> CDC Service – publishes-to – Kafka: Order Topic send-to,<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to,<br> Order History Service – subscribes-to – Kafka: Order Topic receive-from,<br> Delivery Service – subscribes-to – Kafka: Order Topic receive-from]</td>
      </tr>
      <tr>
          <td><b>"POST /orders/{orderId}/revise"</b>:<br> Trace[API Gateway, Order Service, Kitchen Service, Accounting Service, CDC Service, Kafka, ftgo_order_service, ftgo_kitchen_service, ftgo_accounting_service,<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/revise",<br> Order Service – connects-to – ftgo_order_service: /sql,<br> CDC Service – reads-from – ftgo_order_service: /sql,<br> CDC Service – publishes-to – Kafka: orderService Topic send-to,<br> Order Service – subscribes-to – Kafka: orderService Topic receive-from,<br> CDC Service – publishes-to – Kafka: ReviseOrderSaga-reply Topic send-to,<br> Order Service – subscribes-to – Kafka: ReviseOrderSaga-reply Topic receive-from,<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to,<br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from,<br> Kitchen Service – connects-to – ftgo_kitchen_service: /sql,<br> CDC Service – reads-from – ftgo_kitchen_service: /sql,<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to,<br> Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from,<br> Accounting Service – connects-to – ftgo_accounting_service: /sql,<br> CDC Service – reads-from – ftgo_accounting_service: /sql,<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to,<br> CDC Service – publishes-to – Kafka: Order Topic send-to]</td>
      </tr>
      <tr>
          <td><b>"POST /orders/{orderId}/cancel"</b>:<br> Trace[API Gateway, Order Service, Kitchen Service, Accounting Service, Delivery Service, Order History Service, CDC Service, Kafka, ftgo_order_service, ftgo_kitchen_service, ftgo_accounting_service,<br> API Gateway – routes-to – Order Service: "POST /orders/{orderId}/cancel",<br> Order Service – connects-to – ftgo_order_service: /sql,<br> CDC Service – reads-from – ftgo_order_service: /sql,<br> CDC Service – publishes-to – Kafka: orderService Topic send-to,<br> Order Service – subscribes-to – Kafka: orderService Topic receive-from,<br> CDC Service – publishes-to – Kafka: CancelOrderSaga-reply Topic send-to,<br> Order Service – subscribes-to – Kafka: CancelOrderSaga-reply Topic receive-from,<br> CDC Service – publishes-to – Kafka: kitchenService Topic send-to,<br> Kitchen Service – subscribes-to – Kafka: kitchenService Topic receive-from,<br> Kitchen Service – connects-to – ftgo_kitchen_service: /sql,<br> CDC Service – reads-from – ftgo_kitchen_service: /sql,<br> CDC Service – publishes-to – Kafka: accountingService Topic send-to,<br> Accounting Service – subscribes-to – Kafka: accountingService Topic receive-from,<br> Accounting Service – connects-to – ftgo_accounting_service: /sql,<br> CDC Service – reads-from – ftgo_accounting_service: /sql,<br> CDC Service – publishes-to – Kafka: Ticket Topic send-to,<br> CDC Service – publishes-to – Kafka: Order Topic send-to,<br> Delivery Service – subscribes-to – Kafka: Ticket Topic receive-from,<br> Order History Service – subscribes-to – Kafka: Order Topic receive-from]</td>
      </tr>
      <tr>
          <td><b>"POST /consumers"</b>:<br> Trace[API Gateway, Consumer Service, Accounting Service, CDC Service, Kafka, ftgo_consumer_service,<br> API Gateway – routes-to – Consumer Service: "POST /consumers",<br> Consumer Service – connects-to – ftgo_consumer_service: /sql,<br> CDC Service – reads-from – ftgo_consumer_service: /sql,<br> CDC Service – publishes-to – Kafka: Consumer Topic send-to,<br> Accounting Service – subscribes-to – Kafka: Consumer Topic receive-from]</td>
      </tr>
</table>

-----------------------------------------------------------------------

## References

<a name="1" href="https://www.manning.com/books/microservices-patterns">[1] Chris Richardson, "Microservices Patterns: With Examples in Java". Manning Publications, 1st edition, November 2018. ISBN 9781617294549.</a>


[^1]: last accessed: 2022-03-29
[^2]: [https://github.com/r0light/cna-quality-model/tree/0.1](https://github.com/r0light/cna-quality-model/tree/0.1), last accessed: 2022-03-29
[^3]: Currently not yet included in the implementation but described in the book [\[1, p. 224\]](#1)
[^4]: Default Endpoint for connection purposes
[^5]: Generic database Endpoints

--8<-- "includes/abbreviations.md"
