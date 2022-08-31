Title: Cloud Modeling Capabilities
Date: 2022
Context: ADL Selection Criteria Catalog

# :material-book-open-page-variant: Review Criteria Catalog

The criteria used to evaluate and review the different modeling languages originate partly from the various review papers identified during the first literature search [BWKG14, BBF+18, BCR+19, KS19, NMJ19, SDA12, QK18].
However, this review considers only criteria aspects that may be relevant for the subsequent ADL selection.
Therefore, some criteria have been slightly modified or extended.
The selected criteria sets from the review papers are _language characteristics_, _cloud modeling capabilities_ and _tooling support_.
In addition to this more general perspective, two other criteria sets are examined that focus on aspects directly related to the quality model and the aim to represent CNA architectures formally: _representation of proposed entities_ and _architectural evaluations_.
The following presents a detailed description of the different aspects considered and analyzed within the mentioned criteria sets.

-----------------------------------------------------------------------------

## ^^Cloud Modeling Capabilities^^

When modeling a system’s architecture in the context of the cloud, different aspects are desirable to be considered within the model. One critical aspect is the separation into
deployable components, especially due to their subsequent distribution across one or even multiple cloud environments.
Consequently, a modeling language’s ability to describe the _application structure_ is of great importance [BBF+18, p. 9].
Therefore, the following criteria describe which aspects the modeling language supports regarding the structure of an application as well as its _cloud environment_.
The criteria originate from Bergmayr et al.’s review [BBF+18] but were slightly modified regarding the aspects they consider and how they are described.

#### Application structure
Examining the application structure aspect considers which parts of an application the modeling language is able to represent and how.
It focuses especially on the concept of components and their interactions represented as connectors [BBF+18, p. 9].
In addition, other aspects related to the structure of an application, such as the ability to formulate constraints or requirements, are also considered.

#### Cloud environment
This criterion analyzes whether the modeling language is able to represent aspects related to the cloud environment and, if so, how these aspects can be represented.
For example, an important aspect is the representation of used services provided by the target cloud environment.
This could be, for instance, the usage of a storage service with its data store solution [BBF+18, KS19].
Additionally, the possibility of representing configurational aspects of resources and required services or modelling infrastructure-related aspects is also relevant in the cloud context [BBF+18, p. 9f.].

-----------------------------------------------------------------------

## References

// TODO

<!--
<a name="1" href="https://dx.doi.org/10.1109/SOCA.2016.15">[1] N. Alshuqayran, N. Ali, and R. Evans, "A Systematic Mapping Study in Microservice Architecture." IEEE Computer Society, 2016, pp. 44–51. [Online]. Available: https://dx.doi.org/10.1109/SOCA.2016.15</a>

<a name="2" href="https://www.oreilly.com/library/view/building-microservices/9781491950340/">[2] S. Newman, Building Microservices – Designing Fine–Grained Systems, 1st ed. O’Reilly Media, Inc., 2015, ISBN: 9781491950357.</a>

<a name="3" href="http://ceur-ws.org/Vol-2839/paper12.pdf">[3] K. Dürr, R. Lichtenthäler, and G. Wirtz, "An Evaluation of Saga Pattern Implementation Technologies," in Proceedings of the 13th European Workshop on Services and their Composition (ZEUS 2021), Bamberg, Germany, February 25–26, 2021, ser. CEUR Workshop Proceedings, vol. 2839. CEUR-WS.org, 2021, pp. 74–82. [Online]. Available: http://ceur-ws.org/Vol-2839/paper12.pdf</a>

<a name="4" href="https://doi.org/10.1002/spip.257">[4] D. Cruz, T. Wieland, and A. Ziegler, "Evaluation Criteria for Free/Open Source Software Products Based on Project Analysis," Software Process: Improvement and Practice, vol. 11, no. 2, pp. 107–122, 2006. [Online]. Available: https://doi.org/10.1002/spip.257</a>

<a name="5" href="https://doi.org/10.4018/jsita.2010101505">[5] J. P. Confino and P. A. Laplante, "An Open Source Software Evaluation Model," Int. J. Strateg. Inf. Technol. Appl., vol. 1, no. 1, pp. 60–77, 2010. [Online]. Available: https://doi.org/10.4018/jsita.2010101505</a>

<a name="6" href="https://dx.doi.org/10.1145/3183628.3183631">[6] T. Cerny, M. J. Donahoo, and M. Trnka, "Contextual Understanding of Microservice Architecture: Current and Future Directions," ACM SIGAPP Applied Computing Review, vol. 17, no. 4, pp. 29–45, 2018. [Online]. Available: https://dx.doi.org/10.1145/3183628.3183631</a>

<a name="7" href="https://dx.doi.org/10.1007/s00450-016-0337-0">[7] O. Zimmermann, "Microservices Tenets," Computer Science – Research and Development, vol. 32, no. 3–4, pp. 301–310, 2016. [Online]. Available: https://dx.doi.org/10.1007/s00450-016-0337-0</a>

-----------------------------------------------------------------------

[^1]: [https://iso25000.com/index.php/en/iso-25000-standards/iso-25010?start=0](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010?start=0), last
accessed 2021-07-06 -->


--8<-- "includes/abbreviations.md"
