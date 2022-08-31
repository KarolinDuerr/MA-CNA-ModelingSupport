# Mapping of Product Factors to Entities

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
        <td style="text-align:center">X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
      <td>Secrets management</td>
      <td></td>
      <td style="text-align:center">X</td>
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
      <td style="text-align:center">X</td>
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
      <td style="text-align:center">X</td>
    </tr>
    <tr>
      <td>Secrets stored in specialized services</td>
      <td></td>
      <td></td>
      <td style="text-align:center">X</td>
      <td></td>
      <td></td>
      <td style="text-align:center">X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td style="text-align:center">X</td>
    </tr>
    <tr>    
      <td rowspan="3" align="center">Integrity</td>
      <td>Access restriction</td>
      <td></td>
      <td style="text-align:center">X</td>
      <td></td>
      <td style="text-align:center">X</td>
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
      <td style="text-align:center">X</td>
      <td></td>
      <td style="text-align:center">X</td>
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
      <td style="text-align:center">X</td>
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
      <td style="text-align:center">X</td>
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
      <td style="text-align:center">X</td>
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
    <!--End---------------------------Security---------------------------End--->  
    <!-----------------------------Portability--------------------------------->    
    <tr>
        <td rowspan="7" align="center">Portability</td>
        <td rowspan="5" align="center">Adaptability</td>
        <td>Infrastructure abstraction</td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
    <tr>
        <td>Cloud vendor abstraction</td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>   
    <tr>
        <td>Configuration management</td>
        <td></td>
        <td>X</td>
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
        <td>X</td>
    </tr>   
    <tr>
        <td>Isolated configuration</td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>X</td>
    </tr>   
    <tr>
        <td>Configuration stored in specialized services</td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>X</td>
    </tr>   
    <tr>
        <td>Installability</td>
        <td>Standardized self-contained deployment unit</td>
        <td></td>
        <td>X</td>
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
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>X</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <!--End-------------------------Portability--------------------------End--->  
</table>
