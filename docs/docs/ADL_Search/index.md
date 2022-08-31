Title: Literature Search
Date: 2022
Context: Literature Search

# :material-file-search: Methodology: Selecting the ADLs

The following sections describe the approach and methodology used to determine the ADLs worth evaluating.

-----------------------------------------------------

## 1. General Information

The approach to select relevant modeling languages is described in detail below.
A systematic literature search was conducted to determine relevant modeling languages and possible criteria for later evaluating the chosen languages.
First, the [systematic literature search](#first-literature-review) focused on existing reviews on modeling languages in the context of services and the cloud.
However, mainly older reviews were found and no recent ones (the last review dates from 2019).
Consequently, the reviews mainly consider older modeling languages whose relevance is not necessarily longer given today.
Therefore, a [second systematic literature search](#second-literature-review) was conducted to find recently proposed or relevant modeling languages in the context of the cloud or microservices.

After each literature search, the selected modeling languages are mentioned with their respective selection reason(s).
Additionally, the general exclusion reasons are also listed.

The final result with a summarization of the selected modeling languages can be found in the [Final ADL Selection Result](#4-final-adl-selection-result) section.

## 2. <a name="first-literature-review" style="text-decoration: none; color: black;">First Systematic Literature Search: Finding Reviews</a>

The first literature search focused on finding existing reviews on modeling languages in the context of services and the cloud.

### 2.1 Finding ADL Reviews

A description of the stepwise performed systematic literature search can be found here:</br> [Review Search](1_Review_Search)

&#8594; The Bibtex-file that includes the final selection of relevant literature: :mag: 7</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Final Review Selection](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_4_Final_Selection.bib)

<!--Short summary of the overall procedure:-->


<figure markdown>
  ![Overview First Literature Search](images/overviewFirstLiteratureSearchProcedure.svg)
  <figcaption>Short summary of the overall procedure for the first search</figcaption>
</figure>

:calendar: Search date: 2022-01-24 until 2022-01-26

### 2.2 <a name="review-based-selection-of-suitable-architecture-description-languages" style="text-decoration: none; color: black;">Selection of Suitable Architecture Description Languages</a>

The information gained from the reviews is used to select appropriate ADLs for the evaluation.

:x: Exclusion Criteria:

- [ ] Identified domain does not include cloud services

- [ ] Language covers only business-related aspects and not technical ones

- [ ] Focus lies mainly on the provider of a cloud environment instead of the user

- [ ] Language for platform-specific models

- [ ] Focus lies only on runtime aspects (&#8594; Quality Model considers design time)

- [ ] Language objective focuses solely on aspects regarding, for example, service level agreement, service discovery or selection

- [ ] Focus lies on one specific type of cloud environment/ delivery model (e.g. PaaS)

- [ ] The language's intended users do not include application developers but focus on application user perspective

- [ ] Application components cannot be considered when interactions between a cloud service and the cloud application are modeled


:heavy_check_mark: Selection Criteria:

- [X] Language is still relevant: publishing of new versions, further paper publications, tool support is being further developed

^^Result:^^

| __Modeling Language__ | <div align="center">__Selection Reasons__</div> |
|:----------------------------:|:-------------------|
| TOSCA |<ul><li>Analyzed by all detailed reviews [Sun2012, Bergmayr2014, Bergmayr2018, Nawaz2019] as well as considered by the shorter/ more specific reviews [Quint2018, Bernal2019,  Kritikos2019]</li><li>[OASIS](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=tosca) standard fors life-cycle management and cloud application representation</li><li>Last version was published in 2020[^1] and is still the subject of many current papers</li></ul>|
| CAMEL |<ul><li>Considered by the shorter/more specific reviews [Quint2018, Kritikos2019]</li><li>Also mentioned by [Bergmayr2018], however not analyzed due to its ongoing development back then</li><li>Exploits model at design- as well as run-time</li><li>Provides Multi-Cloud potential</li><li>Last paper was published in 2019[^2]</li><li>Code still receives updates[^3]</li></ul>|
| CloudML (with CloudMF) |<ul><li>Considered by the detailed reviews [Bergmayr2014, Bergmayr2018]</li><li>Last paper published in 2018[^5]</li><li>Also allows runtime considerations</li></ul>|

[^1]: https://www.oasis-open.org/news/announcements/tosca-simple-profile-in-yaml-v1-3-oasis-standard-published/, last accessed: 2022-02-02

[^2]: Achilleos, A.P., Kritikos, K., Rossini, A. et al. The cloud application modelling and execution language. J Cloud Comp 8, 20 (2019). https://doi.org/10.1186/s13677-019-0138-7

[^3]: https://bitbucket.7bulls.eu/projects/MEL/repos/camel/commits?until=refs%2Fheads%2Fcamel-3.0.2-alpha&merges=include, Commit ID: [33edfe5f56f](https://bitbucket.7bulls.eu/projects/MEL/repos/camel/commits/33edfe5f56f027037241fcb19e2a1fecafc7e068), last accessed: 2022-02-02

[^5]:  Ferry, N., Chauvel, F., Song, H., Rossini, A., Lushpenko, M., & Solberg, A. (2018, May). CloudMF: Model-Driven Management of Multi-Cloud Applications. In ACM Transactions on Internet Technology (TOIT), 18(2), (pp. 1-24). https://doi.org/10.1145/3125621

Since the exclusion criteria apply to the other languages, a second systematic literature search was conducted to find further relevant modeling languages.


## 3. <a name="second-literature-review" style="text-decoration: none; color: black;">Second Systematic Literature Search: Finding Recent ADLs</a>

The second systematic literature search was performed to find further recently proposed or relevant modeling languages in the context of the cloud or microservices.

### 3.1 Finding Recent ADLs

A description of the stepwise performed systematic literature search can be found here:</br> [Recent ADLs Search](2_Recent_ADLs_Search)

&#8594; The Bibtex-file that includes the final selection of relevant literature: :mag: 21</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Final Recent ADL Selection](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/2_Recent_ADLs_Search/S2_4_Final_Selection.bib)

<!--Short summary of the overall procedure:-->


<figure markdown>
  ![Overview Second Literature Search](images/overviewSecondLiteratureSearchProcedure.svg)
  <!--<figcaption>Overview for the second literature search</figcaption>-->
  <figcaption>Short summary of the overall procedure for the second search</figcaption>
</figure>

:calendar: Search date: 2022-02-02

### 3.2 <a name="recent-based-selection-of-suitable-architecture-description-languages" style="text-decoration: none; color: black;">Selection of Suitable Architecture Description Languages</a>

For the selection aspects like the language's relevant and main focus/scope were considered.

:x: Exclusion Criteria:

  - [ ] Too restricted on specific aspects

  - [ ] Another approach is based on it

  - [ ] Based on another language which is already being evaluated


:heavy_check_mark: Selection Criteria:

- [X] Language is still relevant: publishing of new versions, further paper publications, tool support is being further developed

- [X] Enough explanatory and descriptive papers or documentation for modeling language available

- [X] Ideally, supportive tools provided

^^Result:^^

| __Modeling Language__ | <div align="center">__Selection Reasons__</div> |
|:----------------------------:|:-------------------|
| LEMMA |<ul><li>Mentioned in many recent papers [[Giallorenzo2021](#Giallorenzo2021), [Rademacher2019a](#Rademacher2019a), [Rademacher2020](#Rademacher2020), [Rademacher2021](#Rademacher2021), [Sorgalla2020](#Sorgalla2020), [Sorgalla2020a](#Sorgalla2020a), [Trebbau2021](#Trebbau2021)]</li><li>Extensive amount of research already exists</li><li>Relevance is given: further papers are being published, and its Github page receives still updates</li></ul>|
| Context Mapper |<ul><li>Relevance is given: last papers have just recently been published, last version was recently published and its Github page receives still updates</li><li>uses Domain-driven Design (DDD) perspective</li><li>detailed but compact and up-to-date online documentation</li></ul>|


## 4. Final ADL Selection Result

The following table summarizes the final selection of modeling languages to be evaluated in the further course of the master thesis.
Additionally, a non-exhaustive list of the primary reference(s) for the individual modeling language is provided.

| <center>__Modeling Language__</center> | <center>__Main Reference__</center>|
|:----------------------------:|:-------------------|
| TOSCA | [OASIS TOSCA](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=tosca)<br> <br> Binz, T., Breitenbücher, U., Kopp, O., & Leymann, F. (2014). TOSCA: Portable Automated Deployment and Management of Cloud Applications. _In Advanced Web Services_ (pp. 527-549). Springer. [https://doi.org/10.1007/978-1-4614-7535-4_22](https://doi.org/10.1007/978-1-4614-7535-4_22) |
| CAMEL | Achilleos, A. P., Kritikos, K., Rossini, A., Kapitsaki, G. M., Domaschka, J., Orzechowski, M., ... & Papadopoulos, G. A. (2019). The Cloud Application Modelling and Execution Language. _Journal of Cloud Computing, 8(1),_ (pp. 1-25). [https://doi.org/10.1186/s13677-019-0138-7](https://doi.org/10.1186/s13677-019-0138-7) |
| CloudML (with CloudMF) | Ferry, N., Rossini, A., Chauvel, F., Morin, B., & Solberg, A. (2013, June). Towards Model-Driven Provisioning, Deployment, Monitoring, and Adaptation of Multi-Cloud Systems. _In 2013 IEEE Sixth International Conference on cloud computing_ (pp. 887-894). IEEE. [https://doi.org/10.1109/CLOUD.2013.133](https://doi.org/10.1109/CLOUD.2013.133)<br> <br> Ferry, N., Song, H., Rossini, A., Chauvel, F., & Solberg, A. (2014, December). CloudMF: Applying MDE to Tame the Complexity of Managing Multi-Cloud Applications. _In 2014 IEEE/ACM 7th International Conference on Utility and Cloud Computing_ (pp. 269-277). IEEE. [https://doi.org/10.1109/UCC.2014.36](https://doi.org/10.1109/UCC.2014.36)<br> <br> Ferry, N., Chauvel, F., Song, H., Rossini, A., Lushpenko, M., & Solberg, A. (2018, May). CloudMF: Model-Driven Management of Multi-Cloud Applications. _In ACM Transactions on Internet Technology (TOIT), 18(2),_ (pp. 1-24). [https://doi.org/10.1145/3125621](https://doi.org/10.1145/3125621) |
| LEMMA | [LEMMA official Github page](https://github.com/SeelabFhdo/lemma/)[^4]<br> <br> Rademacher, F., Sorgalla, J., Wizenty, P., Sachweh, S., & Zündorf, A. (2020). Graphical and Textual Model-Driven Microservice Development. _In Microservices_ (pp. 147-179). Springer, Cham. [https://doi.org/10.1007/978-3-030-31646-4_7](https://doi.org/10.1007/978-3-030-31646-4_7)<br> <br> Rademacher, F., Sachweh, S., & Zündorf, A. (2020, August). Deriving Microservice Code from Underspecified Domain Models using DevOps-Enabled Modeling Languages and Model Transformations. _In 2020 46th Euromicro Conference on Software Engineering and Advanced Applications (SEAA)_ (pp. 229-236). IEEE. [https://doi.org/10.1109/SEAA51224.2020.00047](https://doi.org/10.1109/SEAA51224.2020.00047)<br> <br> Rademacher, F., Sorgalla, J., Wizenty, P., & Trebbau, S. (2021). Towards Holistic Modeling of Microservice Architectures Using LEMMA. _In Companion Proceedings of the 15th European Conference on Software Architecture 2021._ CEUR-WS. [http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf](http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf)[^4]<br> </br> more literature by the authors can be found in their Github's [Science](https://github.com/SeelabFhdo/lemma/#science) section |
| Context Mapper | [Official Context  Mapper Website](https://contextmapper.org/)[^4]<br> <br>Kapferer, S., & Zimmermann, O. (2020). Domain-Specific Language and Tools for Strategic Domain-Driven Design, Context Mapping and Bounded Context Modeling. _In Proceedings of the 8th International Conference on Model-Driven Engineering and Software Development (MODELSWARD)_ (pp. 299-306). SCITEPRESS. [https://doi.org/10.5220/0008910502990306](https://doi.org/10.5220/0008910502990306)<br> <br> Kapferer, S., & Zimmermann, O. (2020, September). Domain-Driven Service Design. _In Symposium and Summer School on Service-Oriented Computing (pp. 189-208)_. Springer, Cham. [https://doi.org/10.1007/978-3-030-64846-6_11](https://doi.org/10.1007/978-3-030-64846-6_11) |

-----------------------------------------------------------------------

## References

<a name="Giallorenzo2021" href="https://doi.org/10.1007/978-3-030-78142-2_17" style="text-decoration: none; color: black;"><u>[Giallorenzo2021]</u> S. Giallorenzo, F. Montesi, M. Peressotti, F. Rademacher and S. Sachweh, "Jolie and LEMMA: Model-Driven Engineering and Programming Languages Meet on Microservices," in <em>Coordination Models and Languages. COORDINATION 2021. Lecture Notes in Computer Science</em>, vol 12717. Springer, 2021, pp. 44–51. [Online]. Available: [https://doi.org/10.1007/978-3-030-78142-2_17](https://doi.org/10.1007/978-3-030-78142-2_17)</a>

<a name="Rademacher2019a" href="https://doi.org/10.1109/ICSA.2019.00011" style="text-decoration: none; color: black;"><u>[Rademacher2019a]</u> F. Rademacher, S. Sachweh and A. Zündorf, "Aspect-Oriented Modeling of Technology Heterogeneity in Microservice Architecture," <em>2019 IEEE International Conference on Software Architecture (ICSA)</em>, 2019, pp. 21-30, [Online]. Available: [https://doi.org/10.1109/ICSA.2019.00011](https://doi.org/10.1109/ICSA.2019.00011)</a>

<a name="Rademacher2020" href="https://doi.org/10.1109/SEAA51224.2020.00047" style="text-decoration: none; color: black;"><u>[Rademacher2020]</u> F Rademacher, J Sorgalla, P Wizenty and S Trebbau, "Deriving Microservice Code from Underspecified Domain Models Using DevOps-Enabled Modeling Languages and Model Transformations," <em>2020 46th Euromicro Conference on Software Engineering and Advanced Applications (SEAA)</em>, 2021, [Online]. Available: [https://doi.org/10.1109/SEAA51224.2020.00047](https://doi.org/10.1109/SEAA51224.2020.00047)</a>

<a name="Rademacher2021" href="http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf" style="text-decoration: none; color: black;"><u>[Rademacher2021]</u> D. Cruz, T. Wieland, and A. Ziegler, "Towards Holistic Modeling of Microservice Architectures Using LEMMA," <em>Companion Proceedings of the 15th European Conference on Software Architecture 2021</em>. CEUR-WS, 2021. [Online]. Available: [http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf](http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf)</a>

<a name="Sorgalla2020" href="https://doi.org/10.1145/3341105.3374065" style="text-decoration: none; color: black;"><u>[Sorgalla2020]</u> J. Sorgalla, F. Rademacher, S. Sachweh, and A. Zündorf, "Modeling Microservice Architecture: A Comparative Experiment towards the Effectiveness of Two Approaches," <em>Proceedings of the 35th Annual ACM Symposium on Applied Computing</em>. Association for Computing Machinery, New York, NY, USA, pp. 1506–1509. [https://doi.org/10.1145/3341105.3374065](https://doi.org/10.1145/3341105.3374065)</a>

<a name="Sorgalla2020a" href="https://doi.org/10.17170/kobra-202010302034" style="text-decoration: none; color: black;"><u>[Sorgalla2020a]</u> J. Sorgalla, F. Rademacher, S. Sachweh and A. Zündorf, "Model-Driven Development of Microservice Architecture: An Experiment on the Quality in Use of a UML-and a DSL-based Approach," 2020. [Online]. Available: [https://doi.org/10.17170/kobra-202010302034](https://doi.org/10.17170/kobra-202010302034)</a>

<a name="Trebbau2021" href="https://doi.org/10.1007/978-3-030-88583-0_16" style="text-decoration: none; color: black;"><u>[Trebbau2021]</u> S. Trebbau, P. Wizenty, and S. Sachweh, "Towards Integrating Blockchains with Microservice Architecture Using Model-Driven Engineering," in <em>Agile Processes in Software Engineering and Extreme Programming – Workshops. XP 2021. Lecture Notes in Business Information Processing</em>, vol 426. Springer, 2021. [Online]. Available: [https://doi.org/10.1007/978-3-030-88583-0_16](https://doi.org/10.1007/978-3-030-88583-0_16)</a>

-----------------------------------------------------------------------

[^4]: last accessed: 2022-02-04

--8<-- "includes/abbreviations.md"
