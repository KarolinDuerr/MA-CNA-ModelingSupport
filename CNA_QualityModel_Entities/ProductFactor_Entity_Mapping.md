# Mapping of Product Factors to Entities

Results retrieved from [CNA Quality Model Repository](https://github.com/r0light/cna-quality-model)[^1].    

[^1]: exact mapping taken from https://github.com/r0light/cna-quality-model/blob/main/E4_final_quality_model.md, last accessed: 2022-02-07

<table>
    <tr>
        <th colspan="2" align="center">Quality Aspect</th>
        <th>Product Factor</th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>
    <!-------------------------------Security--------------------------------->
    <tr>
        <td rowspan="9" align="center">Security</td>
        <td rowspan="4" align="center">Confidentiality</td>
        <td>Data encryption in transit</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Secrets management</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Isolated secrets</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
    </tr>
    <tr>
      <td>Secrets stored in specialized services</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
    </tr>
    <tr>    
      <td rowspan="3" align="center">Integrity</td>
      <td>Access restriction</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Least-privileged access</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Access control management consistency</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>    
    </tr>
    <tr>    
      <td>Accountability</td>
      <td>Account separation</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>    
      <td>Authenticity</td>
      <td>Authentication delegation</td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>      
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <!--End---------------------------Security---------------------------End--->
    <tr>
        <th colspan="2" align="center">Quality Aspect</th>
        <th>Product Factor</th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>  
    <!---------------------------Maintainability------------------------------->
    <tr>
        <td rowspan="34" align="center">Maintainability</td>
        <td rowspan="11" align="center">Modularity</td>
        <td>Service-orientation</td>
        <td align="center">X</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Limited functional scope</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Limited data scope</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
    </tr>
    <tr>
      <td>Limited endpoint scope</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Command Query Responsibility Segregation</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Isolated state</td>
      <td align="center">X</td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>      
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Mostly stateless services</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Spezialized stateful services</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Loose coupling</td>
      <td align="center">X</td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Asynchronous communication</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Persistent communication</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
        <td rowspan="4" align="center">Reusability</td>
        <td>Standardization</td>
        <td align="center">X</td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Component similarity</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Usage of existing solutions for non-core capabilities</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Separation by gateways</td>
      <td align="center">X</td>
      <td align="center">X</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
        <td rowspan="5" align="center">Analysability</td>
        <td>Automated monitoring</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Consistent centralized logging</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Consistent centralized metrics</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Distributed tracing of invocations</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Health and readiness checks</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
        <td rowspan="9" align="center">Modifiability</td>
        <td>Automated infrastructure</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Use infrastructure as code</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Dynamic scheduling</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Service independence</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Low coupling</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td>Functional decentralization</td>
      <td align="center">X</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Limited request trace scope</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Logical grouping</td>
      <td align="center">X</td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Backing service decentralization</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
        <td align="center">Testability</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
    <tr>
        <td rowspan="4" align="center">Simplicity</td>
        <td>Sparsity</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
      <td>Operation outsourcing</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>   
    <tr>
      <td>Managed Infrastructure</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>   
    <tr>
      <td>Managed backing services</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <!--End----------------------Maintainability-------------------------End--->
    <tr>
        <th colspan="2" align="center">Quality Aspect</th>
        <th>Product Factor</th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>  
    <!-----------------------Performance Efficiency---------------------------->
    <tr>
        <td rowspan="10" align="center">Performance Efficiency</td>
        <td rowspan="5" align="center">Time-Behaviour</td>
        <td>Replication</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Service Replication</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Horizontal data replication</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
    </tr>
    <tr>
      <td>Vertical data replication</td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
    </tr>
    <tr>
      <td>Sharded data store replication</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td align="center">X</td>
      <td></td>
    </tr>
    <tr>
        <td rowspan="3" align="center">Resource Utilisation</td>
        <td>Resource predictability</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
    <tr>
        <td>Resource limits</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Cost variability</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="2" align="center">Capability</td>
        <td>Elasticity</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Built-in autoscaling</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <!--End------------------Performance Efficiency----------------------End--->
    <tr>
        <th colspan="2" align="center">Quality Aspect</th>
        <th>Product Factor</th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>  
    <!-----------------------------Portability--------------------------------->    
    <tr>
        <td rowspan="7" align="center">Portability</td>
        <td rowspan="5" align="center">Adaptability</td>
        <td>Infrastructure abstraction</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
    <tr>
        <td>Cloud vendor abstraction</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Configuration management</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
    </tr>   
    <tr>
        <td>Isolated configuration</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
    </tr>   
    <tr>
        <td>Configuration stored in specialized services</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
    </tr>   
    <tr>
        <td>Installability</td>
        <td>Standardized self-contained deployment unit</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Replaceability</td>
        <td>Immutable artifacts</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <!--End-------------------------Portability--------------------------End--->  
    <tr>
        <th colspan="2" align="center">Quality Aspect</th>
        <th>Product Factor</th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>  
    <!-----------------------------Reliability--------------------------------->    
    <tr>
        <td rowspan="11" align="center">Reliability</td>
        <td rowspan="6" align="center">Availability</td>
        <td>Guarded ingress</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
    <tr>
        <td>Distribution</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Physical data distribution</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Physical service distribution</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Seamless upgrades</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Rolling upgrades enabled</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td rowspan="4" align="center">Fault tolerance</td>
        <td>Autonomous fault handling</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Invocation timeouts</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>  
    <tr>
        <td>Retries for safe invocations</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>  
    <tr>
        <td>Circuit breaked communciation</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>  
    <tr>
        <td>Recoverability</td>
        <td>Automated restarts</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>       
    <!--End-------------------------Reliability--------------------------End--->  
    <tr>
        <th colspan="2" align="center">Quality Aspect</th>
        <th>Product Factor</th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>  
    <!----------------------------Compatibility-------------------------------->    
    <tr>
        <td rowspan="7" align="center">Compatibility</td>
        <td align="center">Co-existence</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan="6" align="center">Interoperability</td>
        <td>API-based communication</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>       
    <tr>
        <td>Contract-based</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Communication indirection</td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Mediated communication</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
    <tr>
        <td>Addressing abstraction</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Communication partner abstraction</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td align="center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <!--End------------------------Compatibility-------------------------End--->
    <tr>
        <th colspan="3" align="center"></th>
        <th style="text-align:center">System</th>
        <th style="text-align:center">Component</th>
        <th style="text-align:center">Service</th>
        <th style="text-align:center">Endpoint</th>
        <th style="text-align:center">External Endpoint</th>
        <th style="text-align:center">Backing Service</th>
        <th style="text-align:center">Storage Backing Service</th>
        <th style="text-align:center">Link</th>
        <th style="text-align:center">Infrastructure</th>
        <th style="text-align:center">Deployment Mapping</th>
        <th style="text-align:center">Request Trace</th>
        <th style="text-align:center">Data Aggregate</th>
        <th style="text-align:center">Backing Data</th>
    </tr>  
    <!-------------------------------Summary----------------------------------->    
    <tr>
        <td colspan="3" align="center">Number of Product Factors per Entity</td>
        <td align="center">8</td>
        <td align="center">22</td>
        <td align="center">33</td>
        <td align="center">9</td>
        <td align="center">0</td>
        <td align="center">10</td>
        <td align="center">5</td>
        <td align="center">20</td>
        <td align="center">15</td>
        <td align="center">0</td>
        <td align="center">2</td>
        <td align="center">4</td>
        <td align="center">5</td>
    </tr>    
    <!--End---------------------------Summary----------------------------End--->    
</table>
