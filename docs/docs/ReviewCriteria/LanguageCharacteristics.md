Title: Language Characteristics
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

## ^^Language Characteristics^^

Almost all identified review papers also consider most of the following general language characteristics for their review.
Especially the aspects _scope and purpose_, _syntax_ and _semantics_ are almost always included [BWKG14, BBF+18, BCR+19, KS19, NMJ19, SDA12], although sometimes under a different term in the case of the scope and purpose aspect.
The other three aspects _delivery model_ [BBF+18, BCR+19, NMJ19], _reusability_ [KS19] and _typing mechanism_ [BBF+18, BCR+19] are part of some reviews, depending on the respective focus.

#### Scope and purpose
This criterion determines in which context the modeling language is supposed to be used. It involves analyzing the different aspects the language covers and its intended purpose.
A language can, for example, focus on aspects related to the modeling of multi-cloud applications.
Furthermore, its intended purpose can range from simply sketching the software architecture to covering the entire lifecycle of an application.
The purpose and scope of a modeling language introduce a significant influence on the language’s characteristics such as syntax or semantics [BBF+18, KKP+14].

#### Syntax
Generally, the syntax defines how the modeling language can be represented, meaning its notation and its included concepts and their relations.
Thus, for a more detailed and specific perspective on the subject, this aspect is further divided into a modeling language’s _abstract syntax_ and its _concrete syntax_.
The abstract syntax specifies a language’s concepts and their relation to each other, typically structured in the form of a metamodel [BWKG14, BBF+18].
In addition, it describes the rules on how to build valid statements while combining the concepts [AKR+19, p. 21f.].
This evaluation identifies the formalisms used for this purpose, of which _XML Schema_ or _MOF-based_ formalisms[^1] are popular examples [AKR+19, BBF+18].
The concrete syntax then builds on the foundation of the abstract syntax, typically to improve intuitive handling and readability.
The concrete syntax achieves this by providing a specific representation for the abstract elements using _textual_ or _graphical_ notations.
These notations can be realized with different serialization languages such as _XML_, _XMI_ or _JSON_.

#### Semantics
In contrast to a language’s syntax, its semantics give meaning to the elements defined in the syntax [BWKG14, BBF+18, HR04].
According to Harel and Rumpe [HR04], a semantic’s definition typically provides a mapping from the abstract syntax elements to elements of some well-understood and well-defined semantic domain.
The chosen domain’s degree of formality in terms of its description can vary significantly: from plain English to rigorous mathematics [HR04, p. 66ff.].
Bergmayr et al. [BBF+18, p. 7f.] further extend this concept with the approach of an implemented interpreter, which directly operates on the models.
They name model-based provisioning engines as a concrete example of such an interpreter for modeling languages in the cloud context.
Therefore, they distinguish in their review between _operational_ and _translational_ approaches for this. Operational refers here to a provided toolset that directly interprets or executes models.
In contrast, translational specifies that a language provides a mapping to another formally defined language such as Java [BBF+18, p. 21].
This review considers the differentiation between operational and translational as well, but also more generally whether and, if yes, how the semantics are provided.

#### Target model
In the context of the cloud, modeling languages typically target a specific cloud environment.
These can be distinguished based on the commonly accepted main cloud service categories: Infrastructure as a Service (IaaS), Platform as a Service (PaaS) and Software as a Service (SaaS)[^2] [BBF+18, p. 7].
This review considers, equivalent to Bergmayr et al.’s review [BBF+18], to which cloud service category the application-related artefacts belong that can be represented by the respective modeling language.
In case all categories are possible, this is referred to as Everything as a Service (XaaS).

#### Reusability
Reusing parts of existing models for creating new ones can simplify and accelerate the creation process.
Furthermore, it provides the possibility to define and introduce standardized models for well-known concepts or components [KS19, p. 55]. This review uses the same classification classes for this criterion as introduced by Kritikos and Skrzypek [KS19]: _low_, _medium_ and _high_.
Low implies that only entire application models can be reused by manually copying them into the new model.
Medium, on the other hand, describes that new models can also refer to parts of an existing model, such as very complex elements.
Finally, high means that a new model can reuse any existing model element simply by referring to it.

#### Complexity reduction
Since models can get quite complex and big, it is desirable to have the possibility to reduce a model’s complexity, making it manageable again.
An example of this is a model element allowing for compaction, as other elements can further refine it.
This review examines whether and, if yes, how the complexity reduction can be realized.

#### Typing mechanism
Bergmayr et al. [BBF+18] also analyze their reviewed modeling languages concerning Atkinson and Kuhne’s [K ¨ uh06, AK07] two classification mechanism types: _linguistic_ and _ontological_.
Linguistic refers to the relationship between models and their metamodels, commonly characterized as language definitions.
The models are then described as statements expressed using that language [AK07, p. 138].
Therefore, linguistic types determine the valid model instances of such a language definition.
Ontological types on the other hand are defined using a language’s (linguistic) types and thus are not grounded in the language definition.
They allow creating custom types and are often used to capture vital features solely relevant in a specific context.
For more clarification on these concepts, consider the following example visualized in Figure 6 and based on [AK02, FSR+14].
A _Dog Breed_ represents a certain type of dog for which a _Mongrel_ would be an example for a linguistic instance.
However, to be even more specific, the dog called _Laika_ is then an ontological instance of the Mongrel Dog Breed.
Additionally, Laika is also a linguistic instance of the metamodel’s _Dog Breed Instance_.
Differentiating between these two typing mechanisms is relevant because modeling languages can be extended in the case of ontological typing without modifying its definition [FCS+18, p. 4].
Therefore, the following review also examines which typing mechanism a modeling language provides.

<figure markdown>
  ![Example Typing mechanisms](../images/TypingMechanismsExample.svg)
  <figcaption>An example for ontological and linguistic typing based on [AK02, FSR+14]</figcaption>
</figure>

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
