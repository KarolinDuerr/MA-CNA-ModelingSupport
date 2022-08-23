# MA-CNA-ModelingSupport
Accompanying repository to the master thesis “Providing Tooling Support for Modeling Cloud-Native Application Architectures”.

__This repository is currently still under development, while the thesis is still in progress.__

## Table of Contents

1. [Quality Model For Cloud-Native Applications: Product Factor to Entity Mapping](#product-factor-to-entity-mapping)
2. [ADL Search & Selection](#adl-search-and-selection)
3. [TOSCA](#3-tosca)
    1. [TOSCA: FTGO Modeling](#tosca-ftgo-modeling)
    2. [TOSCA: Extension Proposal](#tosca-extension-proposal)
4. [Web-based Tooling Support](#4-web-based-tooling-support)
    1. [JS Modeling Library Search & Selection](#41-js-modeling-library-search-and-selection)
    2. [Web-Based Modeling Application](#42-web-based-modeling-application)

---------------------------------------------------------

All the following topics focus in some way on the cloud-native quality model as introduced in the paper [“Towards a Quality Model for Cloud-native Applications”](https://doi.org/10.1007/978-3-031-04718-3_7) and the [CNA Quality Model Repository](https://github.com/r0light/cna-quality-model/tree/0.1).

## <a name="product-factor-to-entity-mapping">1. Quality Model For Cloud-Native Applications: Product Factor to Entity Mapping</a>

The concrete mapping of each product factor to the individual entities can be found here: [Product Factor - Entity Mapping](CNA_QualityModel_Entities/ProductFactor_Entity_Mapping.md)


## <a name="adl-search-and-selection">2. ADL Search & Selection</a>

The process for the systematic literature search that led to the selection of the architecture description languages that are being analyzed can be found here: [ADL Selection Methodology](ADL_Literature_Search/README.md)


## 3. TOSCA

A detailed review of the five ADLs - TOSCA, CloudML, CAMEL, LEMMA and Context Mapper - led to the selection of TOSCA to model architectures for the quality model. However, an extension is required such that all proposed entities of the quality model can be represented. Therefore, besides providing the proposed extension, Richardson’s [FTGO Application]( https://github.com/microservices-patterns/ftgo-application) was modeled using the original as well as the extended TOSCA version to identify further requirements.   

### 3.1 <a name="tosca-ftgo-modeling">TOSCA: FTGO Modeling</a>

The mapping of FTGO elements to the quality model entities, as well as the modeling itself, can be found here: [TOSCA - FTGO Modeling](TOSCA_Modeling_FTGO)

- [mapping FTGO to quality model entities](TOSCA_Modeling_FTGO/README.md)
- [modeling with original version](TOSCA_Modeling_FTGO/Using_original_TOSCA)
- [modeling with extended version](TOSCA_Modeling_FTGO/Using_extended_TOSCA)

## 3.2 <a name="tosca-extension-proposal">TOSCA: Extension Proposal</a>

The detailed definition of the proposed extension for TOSCA can be found here: [TOSCA Extension](TOSCA_Extension/README.md)


## 4. Web-based Tooling Support

In order to provide web-based tooling support, a review of existing JS modeling libraries was conducted as well as a prototypical application was developed.

### <a name="41-js-modeling-library-search-and-selection">4.1 JS Modeling Library Search & Selection</a>

A description of the Google and Github search leading to the selection of the Javascript libraries that are being analyzed can be found here: [JS Modeling Library Selection Methodology](Modeling_Framework_Search/README.md)

### 4.2 Web-Based Modeling Application

The code of the prototypical web-based modeling application using the open-source [JointJS](https://www.jointjs.com/) modeling library can be found here: [JS Code](Modeling_WebApp). It also includes a description of how to run the prototype.

An example of what the prototype looks like:

![Overview First Literature Search](images/Prototype_Modeling_App.svg)
