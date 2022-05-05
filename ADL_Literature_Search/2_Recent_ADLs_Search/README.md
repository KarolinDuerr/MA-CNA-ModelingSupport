# Second Systematic Literature Search Focusing on Recent ADLs

## Table of Contents
1. [General Information](#1-general-information)
2. [Searched Libraries](#2-searched-libraries)
    1. [Individual Libraries](#21-individual-libraries)
        1. [ACM](#ACM-search)
        2. [IEEE](#IEEE-search)
        3. [SpringerLink](#SpringerLink-search)
    2. [Joined Results](#22-joined-results)
3. [Selection of Suitable Literature](#3-selection-of-suitable-literature)
    1. [Title-Based Selection](#31-title-based-selection)
    2. [Abstract-Based Selection](#32-abstract-based-selection)
    3. [Full-Text Scan](#33-full-text-scan)
    4. [Snowballing](#34-snowballing)
4. [Identified Modeling Languages](#4-identified-modeling-languages)

-----------------------------------------------------

## 1. General Information

The following search string was used to find literature that introduces or discusses architecture description languages in the context of microservices or the cloud.
This time, the search string is applied to the title, and the searches only consider publications from 2019 onwards since the latest review from the [previous literature search](../1_Review_Search) was then published.

<a name="search-query"><ins>Search string:</ins></a> (Title:(((modeling OR modelling) AND (language OR languages)) OR ("model-driven") OR ((modeling OR modelling) AND (architecture OR architectures)) OR
("application modeling" OR "application modelling")) AND Title:((microservice OR microservices OR cloud)))

Short summary of the overall procedure:



![Overview Second Literature Search](../images/overviewSecondLiteratureSearchProcedure.svg)

:calendar: Search date: 2022-02-02


## 2. Searched Libraries

<!--<details><summary>Searched libraries</summary>-->
### 2.1 Individual Libraries

#### <a name="ACM-search">[ACM](https://dl.acm.org/)</a>

```
"query": { Title:(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR
((modeling OR modelling) AND (architecture OR architectures)) OR
("Document Title":"application modeling" OR "Document Title":"application modelling")) AND
Title:((microservice OR microservices OR cloud)) }
"filter": { Publication Date: (01/01/2019 TO 12/31/2022), ACM Content: DL }
```
:mag: Results: 11\
[ACM_second_search_raw_results](ACM/S2_ACM_raw_results.bib)

<!----------------------------------------------------------------------------->
<!---------------------------------IEEE---------------------------------------->
<!----------------------------------------------------------------------------->
#### <a name="IEEE-search">[IEEE](https://ieeexplore.ieee.org/Xplore/home.jsp)</a>

```
((("Document Title": modeling OR "Document Title": modelling) AND ("Document Title": language OR "Document Title": languages)) OR
("Document Title":"model-driven") OR
(("Document Title": modeling OR "Document Title": modelling) AND ("Document Title": architecture OR "Document Title": architectures)) OR
("Document Title":"application modeling" OR "Document Title":"application modelling")) AND
("Document Title":microservice OR "Document Title":microservices OR "Document Title":cloud)

Filter Year: 2019 - 2022
```
:mag: Results: 30\
[IEEE_second_search_raw_results](IEEE/S2_IEEE_raw_results.bib)

<!----------------------------------------------------------------------------->
<!----------------------------SpringerLink------------------------------------->
<!----------------------------------------------------------------------------->
#### <a name="SpringerLink-search">[SpringerLink](https://link.springer.com/)</a>

SpringerLink's title search does not allow the usage of constraints such as _”AND”_ or _”OR”_. Consequently, the desired search string has to be assembled manually by executing several steps.
This requires separating the search strings and combining the results for the _"OR"_ relations. Additionally, to realize the outermost _"AND"_ relation, only the results that appeared in both merged searches are considered, meaning the intersection of the two merged searches.
The individual intermediate results are documented in the following, and a detailed description of the separation process is also provided if desired.

<details><summary><ins>Detailed description of the manual separation and search procedure</ins></summary>

First, the search string can be separated into two parts identified by the outermost _”AND”_ relation:

1. Title:(((modeling OR modelling) AND (language OR languages)) OR ("model-driven") OR ((modeling OR modelling) AND (architecture OR architectures)) OR
("application modeling" OR "application modelling"))
2. Title:((microservice OR microservices OR cloud))

Now, the two remaining search strings can be further divided. This time, at the outermost _”OR”_ relation.
Additionally, the asterisk (__*__) is used to combine the option (microservice OR microservices) in one search term, since __*__ allows any number of following letters:

1. Results for separating `Title:(((modeling OR modelling) AND (language OR languages)) OR ("model-driven") OR ((modeling OR modelling) AND (architecture OR architectures)) OR
("application modeling" OR "application modelling"))`:<br>
&nbsp;&nbsp;&nbsp; 1. ((modeling OR modelling) AND (language OR languages))<br>
&nbsp;&nbsp;&nbsp; 2. ("model-driven")<br>
&nbsp;&nbsp;&nbsp; 3. ((modeling OR modelling) AND (architecture OR architectures))<br>
&nbsp;&nbsp;&nbsp; 4. ("application modeling" OR "application modelling"))<br>

2. Results for separating `Title:((microservice OR microservices OR cloud))`:<br>
&nbsp;&nbsp;&nbsp; 1. microservice*<br>
&nbsp;&nbsp;&nbsp; 2. cloud<br>

The retrived results 1.1, 1.3 and 1.4 have to be further simplified by combining and separating the search strings further.
Additionally, the asterisk (__*__) is used again to combine options like (language OR languages) in one search term:

1. Further simplification and separation:<br>
&nbsp;&nbsp;&nbsp; 1. Combining and simplifying `((modeling OR modelling) AND (language OR languages))`:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. modeling language*<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. modelling language*<br>
&nbsp;&nbsp;&nbsp; 2. model-driven<br>
&nbsp;&nbsp;&nbsp; 3. Combining and simplifying `((modeling OR modelling) AND (architecture OR architectures))`:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. modeling architecture*<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. modelling architecture*<br>
&nbsp;&nbsp;&nbsp; 4. Combining and simplifying `(application modeling OR application modelling)`:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. application modeling<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. application modelling<br>

Each retrieved search string (1.1.1, 1.1.2, 1.2, 1.3.1, 1.3.2, 1.4.1, 1.4.2) is used for a title search, combined with an additional restriction of the full-text search to `(cloud OR microservice OR microservices)`.
The results of these seven searches are then simply merged since they are combined with an _"OR"_ relation in the [original search string](#search-query).
The merged results are referred to as __FirstHalf__ in the following.

The search strings 2.1 and 2.2 are also used for a title search, but this time combined with a restriction of the full-text search to `(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR ((modeling OR modelling) AND (architecture or architectures)) OR
("application modeling" OR "application modelling"))`.

Afterwards, to reconstruct the _"AND"_ relation, the intersection between the _FirstHalf_ combined with the search results from using the search string 2.1 are built.
The same is done for the search results of using the search string 2.2.
The intersections are built using an R-Script, which is provided [later on](#intersection-r-script).
In order to retrieve the final result of the desired [search string](#search-query), the two intersections are then merged.
As mentioned before, the intermediate results, as well as the final result, are presented in the following.

</details>

<br>
Furthermore, SpringerLink only provides the option to export the search results as .csv-file.
Therefore, this .csv-file had to be transformed into a .bib-file.
For this, an R-Script was used to retrieve the DOIs from the .csv-files and save them in a .txt-file:

```Rscript
FoundLiterature <- read.csv("searchResults.csv", encoding = "UTF-8");
DOIs <- FoundLiterature["Item.DOI"]

write.table(DOIs,file="DOIs.txt", row.names = FALSE, quote=FALSE)
```
The R-Script can also be found in the following file: [Retrieve_DOIs_From_CSV](../R-Scripts/Retrieve_DOIs_From_CSV.R)

The received DOIs were then used with the tool [Zotero](https://www.zotero.org/) to create a .bib-file with the respective literature.


<details><summary><ins>Mode(l)ling language(s)</ins></summary>

##### Advanced search &#8594; title: modeling language*

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: [CSV-Modeling_language(s)_title_raw_results](SpringerLink/CSV-files/S2_SpringerLink_title_modeling-language%28s%29_raw_results.csv)
2. Retrieved DOIs: [DOIs_Modeling_language(s)_title](SpringerLink/CSV-files/S2_SpringerLink_title_modeling-language%28s%29_DOIs.txt)
3. Result: [Bib-Modeling_language(s)_title_raw_results](SpringerLink/S2_SpringerLink_title_modeling-language%28s%29_raw_results.bib)

</details>

:mag: Results: 4


##### Advanced search &#8594; title: modelling language*

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: [CSV-Modelling_language(s)_title_raw_results](SpringerLink/CSV-files/S2_SpringerLink_title_modelling-language%28s%29_raw_results.csv)
2. Retrieved DOIs: [DOIs_Modelling_language(s)_title](SpringerLink/CSV-files/S2_SpringerLink_title_modelling-language%28s%29_DOIs.txt)
3. Result: [Bib-Modelling_language(s)_title_raw_results](SpringerLink/S2_SpringerLink_title_modelling-language%28s%29_raw_results.bib)

</details>

:mag: Results: 4

</details>

<details><summary><ins>Model-Driven</ins></summary>

##### Advanced search &#8594; title: model-driven

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: [CSV-Model-driven_title_raw_results](SpringerLink/CSV-files/S2_SpringerLink_title_model-driven_raw_results.csv)
2. Retrieved DOIs: [DOIs_Model-driven_title](SpringerLink/CSV-files/S2_SpringerLink_title_model-driven_DOIs.txt)
3. Result: [Bib-Model-driven_title_raw_results](SpringerLink/S2_SpringerLink_title_model-driven_raw_results.bib)

</details>

:mag: Results: 66

</details>

<details><summary><ins>Model(l)ing Architecture(s)</ins></summary>

##### Advanced search &#8594; title: modeling architecture*

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```

:mag: Results: 0

##### Advanced search &#8594; title: modelling architecture*

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: [CSV-Modelling_architecture(s)_title_raw_results](SpringerLink/CSV-files/S2_SpringerLink_title_modelling-architecture%28s%29_raw_results.csv)
2. Retrieved DOIs: [DOIs_Modelling_architecture(s)_title](SpringerLink/CSV-files/S2_SpringerLink_title_modelling-architecture%28s%29_DOIs.txt)
3. Result: [Bib-Modelling_architecture(s)_title_raw_results](SpringerLink/S2_SpringerLink_title_modelling-architecture%28s%29_raw_results.bib)

</details>

:mag: Results: 1

</details>


<details><summary><ins>Application Model(l)ing</ins></summary>

##### Advanced search &#8594; title: application modeling

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```

:mag: Results: 0

##### Advanced search &#8594; title: application modelling

```
(cloud OR microservice OR microservices)
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: [CSV-Application_modelling_title_raw_results](SpringerLink/CSV-files/S2_SpringerLink_title_application-modelling_raw_results.csv)
2. Retrieved DOIs: [DOIs_Application_modelling_title](SpringerLink/CSV-files/S2_SpringerLink_title_application-modelling_DOIs.txt)
3. Result: [Bib-Application_modelling_title_raw_results](SpringerLink/S2_SpringerLink_title_application-modelling_raw_results.bib)

</details>

:mag: Results: 2

</details>

<!----------------------------------------------------------------------------->
<!-----------------------------Merging First Half ----------------------------->
<!----------------------------------------------------------------------------->
-------------------------------------------------------------------------------
Merging first half of original query statement:
```
(Title:(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR
((modeling OR modelling) AND (architecture or architectures)) OR
("application modeling" OR "application modelling")))
```

Merged first half search results:\
[SpringerLink_merged_first_half_raw_results](SpringerLink/S2_SpringerLink_merged_first_half_raw_results.bib)


&#8594; Result after removing duplicates: :mag: 76\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SpringerLink_merged_first_half_removed_duplicates](SpringerLink/S2_SpringerLink_merged_first_half_removed_duplicates.bib)

-------------------------------------------------------------------------------

<!----------------------------------------------------------------------------->
<!-----------------------------Search Second Half ----------------------------->
<!----------------------------------------------------------------------------->
<details><summary><ins>Cloud OR Microservice(s)</ins></summary>

##### Advanced search &#8594; title: cloud

```
(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR
((modeling OR modelling) AND (architecture or architectures)) OR
("application modeling" OR "application modelling"))
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: The number of search results was too big (> 1000), and thus, they had to be split several times to retrieve them. However, splitting by the year the papers were published in was still too large, so they were further split by content type. Since the same papers can be assigned to different content types, duplicates had to be removed when merging the individual files. All individual files, as well as the merged files, can be found in the following directory: [CSV-Cloud_title_raw_results_directory](SpringerLink/CSV-files/Cloud)
3. Retrieved DOIs: [DOIs_Modeling_language_review](SpringerLink/CSV-files/Cloud/S2_SpringerLink_title_cloud_DOIs_merged_raw_results.txt)
4. Result: [Bib-Modeling_language_review_raw_results](SpringerLink/S2_SpringerLink_title_cloud_raw_results.bib)

</details>

:mag: Results: 4320

##### Advanced search &#8594; title: microservice*

```
(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR
((modeling OR modelling) AND (architecture or architectures)) OR
("application modeling" OR "application modelling"))
Filter Year: 2019 - 2022
```
<details><summary>Files for .csv to .bib</summary>

1. Export from SpringerLink: [CSV-Microservice(s)_title_raw_results](SpringerLink/CSV-files/S2_SpringerLink_title_microservice%28s%29_raw_results.csv)
3. Retrieved DOIs: [DOIs_Microservice(s)_title](SpringerLink/CSV-files/S2_SpringerLink_title_microservice%28s%29_DOIs.txt)
4. Result: [Bib-Microservice(s)_title_raw_results](SpringerLink/S2_SpringerLink_title_microservice%28s%29_raw_results.bib)

</details>

:mag: Results: 256

</details>

<br>
In order to build the intersection of the respective search results, the following <a name="intersection-r-script">R-Script</a> is applied:


```Rscript
library(dplyr)

FirstHalf <- read.table("S2_SpringerLink_FirstHalf_merged_DOIs.txt", encoding = "UTF-8", header= TRUE);

FirstHalf_removedDuplicates <- unique(FirstHalf)

Microservice <- read.table("S2_SpringerLink_title_microservice(s)_DOIs.txt", encoding = "UTF-8", header= TRUE);

Intersection <- generics::intersect(FirstHalf, Microservice)

write.table(Intersection,file="S2_SpringerLink_Intersection_Microservice-FirstHalf_DOIs.txt", row.names = FALSE, quote=FALSE)
```

The R-Script can also be found in the following file: [Determine_Intersection_DOIs](../R-Scripts/Determine_Intersection_DOIs.R)

The following table summarizes the results after building the intersection between the different search results.

<table>
      <tr>
        <th colspan="2" align="center">Intersection between search results</th>
      </tr>
      <!--------------------------Actual Headline------------------------------>
      <tr>
        <th align="center">FirstHalf - Cloud</th>
        <th align="center">FirstHalf - Microservice*</th>
      </tr>
      <tr>
        <td align="center">:mag: 5</td>
        <td align="center">:mag: 4</td>
      </tr>
      <tr>
          <td>DOIs:<br> <a href="SpringerLink/Intersection_Cloud_FirstHalf/S2_SpringerLink_Intersection_Cloud-FirstHalf_DOIs.txt">S2_SpringerLink_Intersection_Cloud-FirstHalf_DOIs</a></td>
          <td>DOIs:<br> <a href="SpringerLink/Intersection_Microservice_FirstHalf/S2_SpringerLink_Intersection_Microservice-FirstHalf_DOIs.txt">S2_SpringerLink_Intersection_Microservice-FirstHalf_DOIs</a></td>
      </tr>
      <tr>
          <td>Bib-Result:<br> <a href="SpringerLink/Intersection_Cloud_FirstHalf/S2_SpringerLink_Intersection_Cloud-FirstHalf_result.bib">S2_SpringerLink_Intersection_Cloud-FirstHalf_result</a></td>
          <td>Bib-Result:<br> <a href="SpringerLink/Intersection_Microservice_FirstHalf/S2_SpringerLink_Intersection_Microservice-FirstHalf_result.bib">S2_SpringerLink_Intersection_Microservice-FirstHalf_result</a></td>
      </tr>
      <tr>
          <td>Current Query:
          <pre>
(Title:(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR
((modeling OR modelling) AND (architecture or architectures)) OR
("application modeling" OR "application modelling")) AND
Title:(cloud))
          </pre>
          </td>
          <td>Current Query:
          <pre>
(Title:(((modeling OR modelling) AND (language OR languages)) OR
("model-driven") OR
((modeling OR modelling) AND (architecture or architectures)) OR
("application modeling" OR "application modelling")) AND
Title:(microservice OR microservices))
          </pre>
          </td>
      </tr>
</table>

-------------------------------------------------------------------------------

Finally, to receive the result of the desired [search string](#search-query), the two
intersections above are merged.

&#8594; Merged search results: :mag: 9\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SpringerLink_merged_removed_duplicates](SpringerLink/S2_SpringerLink_merged_raw_results.bib)

### 2.2 Joined Results

The search results from all three libraries were merged and existing duplicates removed.
However, no duplicates were found in this merge.

&#8594; Merged search results: :mag: 50\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Total_search-results_merged](S2_0_Total_search-results_merged.bib)

## 3. Selection of Suitable Literature

In order to find suitable literature to determine which ADLs are worth evaluating, the following steps were conducted.
For this, the focus lies on recently proposed or mentioned modeling languages in the context of Microservice Architectures or the cloud.

### 3.1 Title-Based Selection
:x: Exclusion Criteria:
   - [ ] Paper already considered in first literature search
   - [ ] Modeling language already considered due to the first literature search
   - [ ] Modeling clearly does not refer to the system's architecture
   - [ ] The terms "model" or "modeling" appear in a different and unrelated context, such as a data access model or CaaS model
   - [ ] Focus too narrow or specific, for example runtime safety assurance or reliability modeling with focus on dynamic routing


:heavy_check_mark: Inclusion criteria:
  - [x] Reference to model or modeling Microservice Architectures
  - [x] Reference to Application or Architecture modeling
  - [x] Reference to specific modeling language(s)\
      &#8594; exceptions see above
  - [x] Some model-driven approach in the context of microservices or the cloud, especially concerning development or architecture

&#8594; The result after filtering based on the title: :mag: 26\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1_Title_Filtering_results](S2_1_Title_filtering_results.bib)

### 3.2 Abstract-Based Selection
:x: Exclusion Criteria:
  - [ ] The modeling language's focus is too specific, for example solely considering
  data architecture aspects
  - [ ] Modeling does not focus on architectural aspects but instead, for instance, business aspects
  - [ ] Referenced modeling language already considered due to the first literature search


:heavy_check_mark: Inclusion Criteria:
  - [x] Reference to (a) specific architecture language(s) in the context of microservices or the cloud\
      &#8594; exceptions see above
  - [x] Reference to modelling approach(es) in the context of microservices or the cloud
  - [x] Too general review on or reference to model-driven engineering to be already excluded
  - [x] Reference to a simulation platform/environment that also provides architectural modelling


&#8594; The result after filtering based on the abstract: :mag: 16\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2_Abstract_Filtering_results](S2_2_Abstract_filtering_results.bib)

### 3.3 Full-Text Scan
:x: Exclusion Criteria:
  - [ ] Referencing already considered modeling language(s)
  - [ ] Not mentioning an actual modeling language
  - [ ] Missing focus on architectural aspects
  - [ ] Modeling language requires source code as a must

:heavy_check_mark: Inclusion Criteria:
  - [X] Presents or introduces a modeling language considering architectures in the context of microservices or the cloud
  - [X] Name existing modeling languages which allows architectural view/focus

<details><summary>Removal Reasoning per paper</summary>

_Bibtex-Keys_ refer to the [2_Abstract_Filtering_results](S2_2_Abstract_filtering_results.bib) file.\
&#8594; The previous _citationkeys_ have been adapted for standardization purposes but can be found in the _comment_ field.

| __Bibtex-Key__ | <div align="center">__Title__</div> | <div align="center">__Removal Reason__</div>
|:----------------------------:|:-------------------|:--------------------------|
| [Elhabbash2019](https://doi.org/10.1145/3344341.3368805) | SLO-ML: A Language for Service Level Objective Modelling in Multi-Cloud Applications | Proposes a new cloud modeling language that capture service level requirements. <ul><li>Captures service level requirements<br> &#8594; No focus on detailed architectural aspects</li></ul> |
| [Ghirardini2020](https://doi.org/10.1007/978-3-030-63161-1_1) | Model-Driven Simulation for Performance Engineering of Kubernetes-Style Cloud Cluster Architectures | Proposes a model for the Palladio simulation environment with the aim to balance resource demands. <ul><li>Introduce an abstract model for Paladio<br> &#8594; No mentioning of specific modeling architecture</li></ul> |
| [Podolskiy2020](https://dl.acm.org/doi/10.5555/3432601.3432616) | The Weakest Link: Revealing and Modeling the Architectural Patterns of Microservice Applications | Considering Github projects, containerized microservice applications are analyzed concerning their structure. Additionally, network models are considered and evaluated for their usefulness in this context.<ul><li>Analyze the structure of microservices and their connections<br> &#8594; Not focusing on other architectural aspects</li><li>Consider network models<br> &#8594; Not modeling language for considering architectural details</li></ul> |
| [Rademacher2019](https://doi.org/10.1145/3297280.3300182) | A Model-Driven Workflow for Distributed Microservice Development | A description of a model-driven development workflow for microservices. <ul><li>Describe a model-driven workflow which uses (a) modeling language(s)<br> &#8594; Not mentioning an actual modeling language(s)</li></ul> |
| [Yussupov2020](https://doi.org/10.1109/EDOC49727.2020.00015) | Pattern-Based Modelling, Integration, and Deployment of Microservice Architectures | Introduces a model-driven approach for composing microservices by modelling microservices while considering integrational and deployment aspects. <ul><li>Introduces the MICO meta model which focuses on integration patterns and deployment aspects<br> &#8594; Not suited for more detailed architectural modeling</li></ul> |

</details


&#8594; The result after filtering based on full-text scan: :mag: 11\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3_Full-text_scan_results](S2_3_Full-text_scan_results.bib)

### 3.4 Snowballing

As the last step, the Snowballing technique was chosen to obtain more relevant literature potentially.
This approach also allows a certain quality to check whether most relevant papers have already been retrieved.
In order to achieve this, both backward snowballing as well as forward snowballing were carried out.
The _Bibtex-Keys_ refer to the [4_Final_Selection](S2_4_Final_Selection.bib) file.

#### Backward Snowballing

For the backward approach, the references of all identified reviews from the [Full-text Scan](#33-full-text-scan) are checked.
Especially, the literature mentioned in the respective _related work_ section is considered in more detail.
For the following papers, further relevant literature could be found:

[[Bibartiu2021]](https://doi.org/10.1109/SCC53864.2021.00013):
- _Modelling service-oriented systems and cloud services with Heraklit_ [[Fettke2020]](https://doi.org/10.1007/978-3-030-71906-7_7)<br> &#8594; Heraklit

[[Giallorenzo2021]](https://doi.org/10.1007/978-3-030-78142-2_17):
- _Domain-Driven Service Design: Context Modeling, Model Refactoring and Contract Generation_ [[Kapferer2020]](https://doi.org/10.1007/978-3-030-64846-6_11)<br> &#8594; Context Mapper DSL
- _MicroBuilder: A Model-Driven Tool for the Specification of REST Microservice Architectures_ [[Terzic2018]](https://doi.org/10.1080/17517575.2018.1460766)<br> &#8594; MicroDSL by MicroBuilder

[[Rademacher2020]](https://doi.org/10.1109/SEAA51224.2020.00047):  
- _MicroBuilder: A Model-Driven Tool for the Specification of REST Microservice Architectures_ [[Terzic2018]](https://doi.org/10.1080/17517575.2018.1460766)<br> &#8594; MicroDSL by MicroBuilder

[[Rademacher2020a]](https://doi.org/10.1007/978-3-030-31646-4_7):
- _MicroBuilder: A Model-Driven Tool for the Specification of REST Microservice Architectures_ [[Terzic2018]](https://doi.org/10.1080/17517575.2018.1460766)<br> &#8594; MicroDSL by MicroBuilder
- _Ajil: Enabling Model-Driven Microservice Development_ [[Sorgalla2018]](https://doi.org/10.1145/3241403.3241406)<br> &#8594; AjiL
- _Infrastructure-as-Code for Data-Intensive Architectures: A Model-Driven Development Approach_ [[Artac2018]](https://doi.org/10.1109/ICSA.2018.00025)<br> &#8594; DICER

[[Schmidt2020]](https://doi.org/10.23919/CISTI49556.2020.9141150):
- _Ajil: Enabling Model-Driven Microservice Development_ [[Sorgalla2018]](https://doi.org/10.1145/3241403.3241406)<br> &#8594; AjiL

[[Sorgalla2020]](https://doi.org/10.1145/3341105.3374065):
- _Ajil: Enabling Model-Driven Microservice Development_ [[Sorgalla2018]](https://doi.org/10.1145/3241403.3241406)<br> &#8594; AjiL

#### Forward Snowballing

On the other hand, the search engine Google Scholar[^1] was used for the forward approach.
Google Scholar allows investigating papers that cited the searched paper.
With this approach, the following papers from [Full-text Scan](#33-full-text-scan) were used to identify further relevant literature:

[^1]: https://scholar.google.com/, last accessed: 2022-01-31

[[Rademacher2019a]](https://doi.org/10.1109/ICSA.2019.00011):
- _Model-driven Development of Microservice Architecture: An Experiment on the Quality in Use of a UML- and a DSL-based Approach_ [[Sorgalla2020a]](https://doi.org/10.17170/kobra-202010302034)<br> &#8594; LEMMA<br> &#8594; mentiones MicroBuilder

[[Rademacher2019b]](https://doi.org/10.1109/SOSE.2019.00018):
- _Model-driven Development of Microservice Architecture: An Experiment on the Quality in Use of a UML- and a DSL-based Approach_ [[Sorgalla2020a]](https://doi.org/10.17170/kobra-202010302034)<br> &#8594; LEMMA<br> &#8594; mentiones MicroBuilder
- _A Model Driven Framework for the Development of Adaptable REST SERVICES_ [[Kenzi2021]](https://doi.org/10.5220/0010718200003058)<br> &#8594; MicroDSL by MicroBuilder

[[Rademacher2020]](https://doi.org/10.1109/SEAA51224.2020.00047):  
- _Applying Model‑Driven Engineering to Stimulate the Adoption of DevOps Processes in Small and Medium‑Sized Development Organizations_ [[Sorgalla2021]](https://doi.org/10.1007/s42979-021-00825-z)<br> &#8594; LEMMA<br> &#8594; MicroDSL by MicroBuilder<br> &#8594; MicroART
- _Towards Holistic Modeling of Microservice Architectures Using LEMMA_ [[Rademacher2021]](http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf)<br> &#8594; LEMMA<br> &#8594; MicroBuilder

[[Rademacher2020a]](https://doi.org/10.1007/978-3-030-31646-4_7):
- _Applying Model‑Driven Engineering to Stimulate the Adoption of DevOps Processes in Small and Medium‑Sized Development Organizations_ [[Sorgalla2021]](https://doi.org/10.1007/s42979-021-00825-z)<br> &#8594; LEMMA<br> &#8594; MicroDSL by MicroBuilder<br> &#8594; MicroART
- _Towards Holistic Modeling of Microservice Architectures Using LEMMA_ [[Rademacher2021]](http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf)<br> &#8594; LEMMA<br> &#8594; MicroBuilder

[[Verginadis2021]](https://doi.org/10.1007/978-3-030-79382-1_27):
- _MODAClouds: A model-driven approach for the design and execution of applications on multiple Clouds_ [[Ardagna2012]](https://doi.org/10.1109/MISE.2012.6226014)<br> &#8594; ModaCloudML

&#8594; The Bibtex-file that includes the final selection of relevant literature: :mag: 21\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4_Final_Selection](S2_4_Final_Selection.bib)

## 4. Identified Modeling Languages

The following table summarizes all found modeling languages mentioned in some way in the [4_Final_Selection](S2_4_Final_Selection.bib)-file.
However, if the modeling language has already been considered in the previous literature search or one of the mentioned exclusion criteria apply, it will not be mentioned in the following table.
Additionally, each modeling language includes a link to the original paper and the papers from the [Final_Selection](S2_4_Final_Selection.bib) that mention the respective modeling language.
In order to help with the later selection process, important aspects discovered while analyzing the proposed language are also noted in the table.

<ins>Legend:</ins>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :negative_squared_cross_mark: Negative remark &nbsp;&nbsp;&nbsp;  :ballot_box_with_check: Positive remark &nbsp;&nbsp;&nbsp; :black_square_button: Neutral remark

| __Modeling Language__ | <div align="center">__Discovered in Paper__</div> | <div align="center">__Main Important Notes for Selection__</div>
|:----------------------------:|:-------------------|:-------------------|
| [AjiL](https://doi.org/10.1145/3241403.3241406) | <ul><li>[[Rademacher2020a]](https://doi.org/10.1007/978-3-030-31646-4_7)</li><li>[[Schmidt2020]](https://doi.org/10.23919/CISTI49556.2020.9141150)</li><li>[[Sorgalla2018]](https://doi.org/10.1145/3241403.3241406)</li><li>[[Sorgalla2020]](https://doi.org/10.1145/3341105.3374065)</li></ul>| :negative_squared_cross_mark: LEMMA is based on experience from this approach |
| [Clams](https://doi.org/10.1109/SCC53864.2021.00013) | <ul><li>[[Bibartiu2021]](https://doi.org/10.1109/SCC53864.2021.00013)</li></ul> | :negative_squared_cross_mark: Focus on a scenario-based language to bridge the gap between informal functional-views of an application and its formal architectural description<br>&nbsp;&nbsp;&nbsp; &#8594; provides a user-centric perspective |
| [Context Mapper DSL](https://doi.org/10.5220/0008910502990306) | <ul><li>[[Kapferer2020]](https://doi.org/10.1007/978-3-030-64846-6_11)</li></ul> | :ballot_box_with_check: New version was recently published ([Release Notes](https://contextmapper.org/news/2021/10/06/v6.6.0-released/)[^2])<br><br> :ballot_box_with_check: detailed but compact and up-to-date [documentation](https://contextmapper.org/docs/home/)[^2] online available<br><br> :ballot_box_with_check: Several supportive tools available<br><br> :black_square_button: Based on Domain-driven Design (DDD) |
| [DICER](https://doi.org/10.1109/ICSA.2018.00025)  | <ul><li>[[Artac2018]](https://doi.org/10.1109/ICSA.2018.00025)</li><li>[[Rademacher2020a]](https://doi.org/10.1007/978-3-030-31646-4_7)</li><li>[[Sorgalla2021]](https://doi.org/10.1007/s42979-021-00825-z)</li></ul>| :negative_squared_cross_mark: Based on CloudML |
| [HERAKLIT](https://doi.org/10.1007/978-3-030-71906-7_7) | <ul><li>[[Fettke2020]](https://doi.org/10.1007/978-3-030-71906-7_7)</li></ul> | :ballot_box_with_check: Detailed language [manual](https://heraklit.dfki.de/#resources)[^2] online available<br><br> :negative_squared_cross_mark: All supportive tools still under development and thus not available yet<br><br> :black_square_button: Mathematically based and uses Petri Nets |
| [LEMMA](https://github.com/SeelabFhdo/lemma/)[^2] | <ul><li>[[Giallorenzo2021]](https://doi.org/10.1007/978-3-030-78142-2_17)</li><li>[[Rademacher2019a]](https://doi.org/10.1109/ICSA.2019.00011)</li><li>[[Rademacher2020]](https://doi.org/10.1109/SEAA51224.2020.00047)</li><li>[[Rademacher2021]](http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf)</li><li>[[Sorgalla2020]](https://doi.org/10.1145/3341105.3374065)</li><li>[[Sorgalla2020a]](https://doi.org/10.17170/kobra-202010302034)</li><li>[[Sorgalla2021]](https://doi.org/10.1007/s42979-021-00825-z)</li><li>[[Trebbau2021]](https://link.springer.com/10.1007/978-3-030-88583-0_16)</li></ul>| :ballot_box_with_check: [Github page](https://github.com/SeelabFhdo/lemma/)[^2] with tools and descriptions, among other things, still receives updates<br><br> :negative_squared_cross_mark: [Documentation](https://seelabfhdo.github.io/lemma-docs/)[^2] only partially online available since it is still under development, but:<br><br> :ballot_box_with_check: extensive amount of research given |
| [MicroART](https://ieeexplore.ieee.org/document/7958455) | <ul><li>[[Sorgalla2021]](https://doi.org/10.1007/s42979-021-00825-z)</li></ul> | <br>:negative_squared_cross_mark: Proposed in 2017, since then no new additions<br> <br>:negative_squared_cross_mark: Provided Tool ([MicroART Tool](https://github.com/microart/microART-Tool)[^2]) has not received any updates for the last five years |
| [MicroDSL by MicroBuilder](https://doi.org/10.1080/17517575.2018.1460766) |<ul><li>[[Giallorenzo2021]](https://doi.org/10.1007/978-3-030-78142-2_17)</li><li>[[Kenzi2021]](https://doi.org/10.5220/0010718200003058)</li><li>[[Rademacher2020a]](https://doi.org/10.1007/978-3-030-31646-4_7)</li><li>[[Rademacher2021]](http://ceur-ws.org/Vol-2978/mde4sa-paper2.pdf)</li><li>[[Sorgalla2020a]](https://doi.org/10.17170/kobra-202010302034)</li><li>[[Sorgalla2021]](https://doi.org/10.1007/s42979-021-00825-z)</li><li>[[Terzic2018]](https://doi.org/10.1080/17517575.2018.1460766)</li></ul>| :negative_squared_cross_mark: Restricted to domain of REST Microservice Architecture development |
| [ModaCloudML](https://doi.org/10.1109/MISE.2012.6226014) | <ul><li>[[Ardagna2012]](https://doi.org/10.1109/MISE.2012.6226014)</li><li>[[Verginadis2021]](https://doi.org/10.1007/978-3-030-79382-1_27)</li></ul> | :negative_squared_cross_mark: Based on CloudML<br><br>:negative_squared_cross_mark: Development Project ended already in 2015[^3] |
| [OMSAC-based](https://doi.org/10.1145/3444757.3485108)  | <ul><li>[[Morais2021]](https://doi.org/10.1145/3444757.3485108)</li></ul>| :black_square_button: Used ontology designed to cover only aspects recorded as Microservice Architecture principles or anti-patterns in literature |

[^2]: last accessed: 2022-03-23
[^3]: [MODACloud Project](https://cordis.europa.eu/project/id/318484), last accessed: 2022-03-23
