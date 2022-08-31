# Mapping of Product Factors to Entities

// TODO

## Confidentiality

| Product Factor | System | Component | Service | Endpoint | External Endpoint | Backing Service | Storage Backing Service | Link | Infrastructure | Deployment Mapping | Request Trace | Data Aggregate | Backing Data |
| :------------------------------------------- | :----: | :-------: | :-----: | :------: | :---------------: | :-------------: | :---------------------: | :--: | :------------: | :-----------------: | :-----------: | :---------------------------: | :--------: |
| Data encryption in transit | | | | | | | | X | | | | | |
| Secrets management | | X | | | | | | | | | | | |
| Isolated secrets | | X | | | | | | | | | | | X |
| Secrets stored in specialized services | | | X | | | X | | | | | | | X |
| | | | | | | | | | | | | | |
| Product Factors / Entity | 0 | 2 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 2 |


| <div align="center">__Entity__</div>  | Data encryption in transit | Secrets management | Isolated secrets | Secrets stored in specialized services | Count |
| :------------ | :------------------------: | :----------------: | :--------------: | :------------------------------------: | :---: |
| System | | | | | |
| Component | | X | X | | 2 |
| Service | | | | X | 1 |
| Endpoint | | | | | |
| External Endpoint | | | | | |
| Backing Service | | | | X | 1 |
| Storage Backing Service | | | | | |
| Link | X | | | | 1 |
| Infrastructure | | | | | |
| Deployment Mapping | | | | | |
| Request Trace | | | | | |
| Data Aggregate | | | | | |
| Backing Data | | | X | X | 2 |


## Integrity

| Product Factor | System | Component | Service | Endpoint | External Endpoint | Backing Service | Storage Backing Service | Link | Infrastructure | Deployment Mapping | Request Trace | Data Aggregate | Backing Data |
| :------------------------------------------- | :----: | :-------: | :-----: | :------: | :---------------: | :-------------: | :---------------------: | :--: | :------------: | :-----------------: | :-----------: | :---------------------------: | :--------: |
| Access restriction | | X | | X | | | | | | | | | |
| Least-privileged access | | X | | X | | | | | | | | | |
| Access control management consistency | | X | | | | | | | | | | | |
| | | | | | | | | | | | | | |
| Product Factors / Entity | 0 | 3 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |


| <div align="center">__Entity__</div>  | Access restriction | Least-privileged access | Access control management consistency | Count |
| :------------ | :------------------------: | :----------------: | :--------------: | :---: |
| System | | | | |
| Component | X | X | X | 3 |
| Service | X | X | | 2 |
| Endpoint | | | | |
| External Endpoint | | | | |
| Backing Service | | | | |
| Storage Backing Service | | | | |
| Link | | | | |
| Infrastructure | | | | |
| Deployment Mapping | | | | |
| Request Trace | | | | |
| Data Aggregate | | | |
| Backing Data | | | | |


## Accountability & Authenticity

| Product Factor | System | Component | Service | Endpoint | External Endpoint | Backing Service | Storage Backing Service | Link | Infrastructure | Deployment Mapping | Request Trace | Data Aggregate | Backing Data |
| :------------------------------------------- | :----: | :-------: | :-----: | :------: | :---------------: | :-------------: | :---------------------: | :--: | :------------: | :-----------------: | :-----------: | :---------------------------: | :--------: |
| Account separation | | X | | | | | | | | | | | |
| __Authenticity__ | | | | | | | | | | | | | |
| Authentication delegation | X | | | | | X | | | | | | | |
| | | | | | | | | | | | | | |
| Product Factors / Entity | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |


| <div align="center">__Entity__</div> | Account separation | Authentication delegation | Count |
| :------------ | :------------------------: | :----------------: | :---: |
| System | | X | 1 |
| Component | X | | 1 |
| Service | | | |
| Endpoint | | | |
| External Endpoint | | | |
| Backing Service | | X | 1 |
| Storage Backing Service | | | |
| Link | | | |
| Infrastructure | | | |
| Deployment Mapping | | | |
| Request Trace | | | |
| Data Aggregate | | | |
| Backing Data | | | |
