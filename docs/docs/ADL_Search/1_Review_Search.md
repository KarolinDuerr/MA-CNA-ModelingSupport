Title: Review Search
Date: 2022
Context: Literature Search

# :material-file-search: First Systematic Literature Search: Focusing on Existing Reviews

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

-----------------------------------------------------

## 1. General Information

The following search strings were used to retrieve literature dealing with the desired topics.

<ins>Search string 1:</ins>
```
(Abstract:(((modeling OR modelling) AND (language OR languages))) AND
Abstract:(cloud OR "service-oriented") AND
(Title:(review OR survey) OR Abstract:(review OR survey)))
```

<ins>Search string 2:</ins>
```
(Abstract:((("domain-specific" OR "domain specific") AND
(language OR languages))) AND Abstract:(cloud OR "service-oriented") AND
(Title:(review OR survey) OR Abstract:(review OR survey)))
```

<ins>Search string 3:</ins>
```
(Abstract:(("description language") OR ("description languages")) AND
Abstract:(cloud OR "service-oriented") AND
(Title:(review OR survey) OR Abstract:(review OR survey)))
```

</br>
<!--Short summary of the overall procedure:-->

<figure markdown>
  ![Overview First Literature Search](../images/overviewFirstLiteratureSearchProcedure.svg)
  <figcaption>Short summary of the overall procedure for the review search</figcaption>
</figure>

:calendar: Search date: 2022-01-24 until 2022-01-26

## 2. Searched Libraries

<!--<details><summary>Searched libraries</summary>-->
### 2.1 Individual Libraries

#### <a name="ACM-search">[ACM](https://dl.acm.org/)</a>

=== "Modeling language"

    ```
    "query": { Abstract:(((modeling OR modelling) AND (language OR languages))) AND
    Abstract:(cloud OR "service-oriented") AND
    (Title:(review OR survey) OR Abstract:(review OR survey)) }
    "filter": { ACM Content: DL }
    ```
    :mag: Results: 18</br>
    [ACM_Modeling_language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/ACM/S1_ACM_Modeling_language.bib)

=== "Domain-specific language"

    ```
    "query": { Abstract:((("domain-specific" OR "domain specific") AND
    (language OR languages))) AND Abstract:(cloud OR "service-oriented") AND
    (Title:(review OR survey) OR Abstract:(review OR survey)) }
    "filter": { ACM Content: DL }
    ```
    :mag: Results: 1</br>
    [ACM_Domain-specific_language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/ACM/S1_ACM_Domain-specific_language.bib)


=== "Description language"

    ```
    "query": { Abstract:(("description language") OR ("description languages")) AND
    Abstract:(cloud OR "service-oriented") AND
    (Title:(review OR survey) OR Abstract:(review OR survey)) }
    "filter": { ACM Content: DL }
    ```
    :mag: Results: 2</br>
    [ACM_Description_language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/ACM/S1_ACM_Description_language.bib)



Merged search results:</br>
[ACM_merged_raw_results](ACM/S1_ACM_merged_raw_results.bib)

:material-arrow-right-bold-outline: Result after removing duplicates: :mag: 19</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ACM_merged_removed_duplicates](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/ACM/S1_ACM_merged_removed_duplicates.bib)

<!----------------------------------------------------------------------------->
<!---------------------------------IEEE---------------------------------------->
<!----------------------------------------------------------------------------->
#### <a name="IEEE-search">[IEEE](https://ieeexplore.ieee.org/Xplore/home.jsp)</a>

=== "Modeling language"

    ```
    (("Abstract": modeling OR "Abstract": modelling) AND
    ("Abstract": language OR "Abstract": languages)) AND
    ("Abstract": cloud OR "Abstract": "service-oriented") AND
    (("Abstract": review OR "Abstract": survey) OR
    ("Document Title":review OR  "Document Title":survey))
    ```

    :mag: Results: 31</br>
    [IEEE_Modeling_language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/IEEE/S1_IEEE_Modeling_language.bib)

=== "Domain-specific"

    ```
    (("Abstract": domain-specific OR "Abstract": domain specific) AND
    ("Abstract": language OR "Abstract": languages)) AND
    ("Abstract": cloud OR "Abstract": "service-oriented") AND
    (("Abstract": review OR "Abstract": survey) OR
    ("Document Title":review OR "Document Title":survey))
    ```

    :mag: Results: 4</br>
    [IEEE_Domain-specific_language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/IEEE/S1_IEEE_Domain-specific_language.bib)


=== "Description language"

    ```
    ("Abstract": "description language" OR "Abstract": "description languages") AND
    ("Abstract": cloud OR "Abstract": "service-oriented") AND
    (("Abstract": review OR "Abstract": survey) OR
    ("Document Title":review OR "Document Title":survey))
    ```

    :mag: Results: 3</br>
    [IEEE_Description_language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/IEEE/S1_IEEE_Description_language.bib)



Merged search results:</br>
[IEEE_merged_raw_results](IEEE/S1_IEEE_merged_raw_results.bib)

:material-arrow-right-bold-outline: Result after removing duplicates: :mag: 33</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[IEEE_merged_removed_duplicates](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/IEEE/S1_IEEE_merged_removed_duplicates.bib)

<!----------------------------------------------------------------------------->
<!----------------------------SpringerLink------------------------------------->
<!----------------------------------------------------------------------------->
#### <a name="SpringerLink-search">[SpringerLink](https://link.springer.com/)</a>

The search terms are more specific than the [ACM](#ACM-search) and [IEEE](#IEEE-search) searches because SpringerLink allows only a full-text search.
However, the found literature remained too large to be analyzed despite the more specific search terms.
Therefore, it was decided to provide further restrictions for the title. The idea was that reviews concerning modeling languages for the cloud have most likely either _“survey“_ or _“review“_ in their title.
This was also considered in the searches on [ACM](#ACM-search) and [IEEE](#IEEE-search) but as an option between abstract <ins>or</ins> title.
In order to restrict the search not too much, the title restriction for SpringerLink was extended by another option for the title: _“cloud“_ in combination with _“language“_. Thus, the terms _"cloud" NEAR "language"_ and _"language" NEAR "cloud"_ were also specified for the title restriction.
Using the NEAR-operator (e.g. "cloud" NEAR "language") returns results where the search term on the left (in the example: "cloud") is within ten words of the word to the right (for the example: "language")[^1].    

[^1]: taken from https://link.springer.com/searchhelp, last accessed: 2022-01-27

Furthermore, SpringerLink only provides the option to export the search results as .csv-file.
Therefore, this .csv-file had to be transformed into a .bib-file.
For this, an R-Script was used to retrieve the DOIs from the .csv-files and save them in a .txt-file:

```Rscript title="Retrieve DOIs from CSV-file"
FoundLiterature <- read.csv("searchResults.csv", encoding = "UTF-8");
DOIs <- FoundLiterature["Item.DOI"]

write.table(DOIs,file="DOIs.txt", row.names = FALSE, quote=FALSE)
```
The R-Script can also be found in the following file: [Retrieve_DOIs_From_CSV](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/R-Scripts/Retrieve_DOIs_From_CSV.R)

The received DOIs were then used with the tool [Zotero](https://www.zotero.org/) to create a .bib-file with the respective literature.


=== "Modeling language"

    ##### Conducting the advanced search using the following restriction...

    ===! ":material-arrow-right-thin: title: review"

        ```
        ("modeling language" OR "modelling language" OR
        "modeling languages" OR "modelling languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Modeling_language_review_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_review_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Modeling_language_review](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_review_DOIs.txt)
            3. Result: [Bib-Modeling_language_review_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Modeling_language_review_raw_results.bib)

        :mag: Results: 69

    === ":material-arrow-right-thin: title: survey"

        ```
        ("modeling language" OR "modelling language" OR
        "modeling languages" OR "modelling languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Modeling_language_survey_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_survey_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Modeling_language_survey](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_survey_DOIs.txt)
            3. Result: [Bib-Modeling_language_survey_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Modeling_language_survey_raw_results.bib)

        :mag: Results: 43

    === ":material-arrow-right-thin: title: "cloud" NEAR "language""

        ```
        ("modeling language" OR "modelling language" OR
        "modeling languages" OR "modelling languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Modeling_language_cloud-near-language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_cloud-near-language_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Modeling_language_cloud-near-language](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_cloud-near-language_DOIs.txt)
            3. Result: [Bib-Modeling_language_cloud-near-language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Modeling_language_cloud-near-language_raw_results.bib)

        :mag: Results: 2

    === ":material-arrow-right-thin: title: "language" NEAR "cloud""

        ```
        ("modeling language" OR "modelling language" OR
        "modeling languages" OR "modelling languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Modeling_language_language-near-cloud_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_language-near-cloud_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Modeling_language_language-near-cloud](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Modeling_language_language-near-cloud_DOIs.txt)
            3. Result: [Bib-Modeling_language_language-near-cloud_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Modeling_language_language-near-cloud_raw_results.bib)

        :mag: Results: 3


=== "Domain-specific language"

    ##### Conducting the advanced search using the following restriction...

    ===! ":material-arrow-right-thin: title: review"

        ```
        ("domain-specific language" OR "domain specific language" OR
        "domain-specific languages" OR "domain specific languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Domain-specific_language_review_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Domain-specific_language_review_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Domain-specific_language_review](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Domain-specific_language_review_DOIs.txt)
            3. Result: [Bib-Domain-specific_language_review_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Domain-specific_language_review_raw_results.bib)


        :mag: Results: 17

    === ":material-arrow-right-thin: title: survey"

        ```
        ("domain-specific language" OR "domain specific language" OR
        "domain-specific languages" OR "domain specific languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Domain-specific_language_survey_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Domain-specific_language_survey_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Domain-specific_language_survey](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Domain-specific_language_survey_DOIs.txt)
            3. Result: [Bib_Domain-specific_language_survey_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Domain-specific_language_survey_raw_results.bib)

        :mag: Results: 22

    === ":material-arrow-right-thin: title: "cloud" NEAR "language""

        ```
        ("domain-specific language" OR "domain specific language" OR
        "domain-specific languages" OR "domain specific languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```

        :mag: Results: 0

    === ":material-arrow-right-thin: title: "language" NEAR "cloud""

        ```
        ("domain-specific language" OR "domain specific language" OR
        "domain-specific languages" OR "domain specific languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```

        :mag: Results: 0



=== "Description language"

    ##### Conducting the advanced search using the following restriction...

    ===! ":material-arrow-right-thin: title: review"

        ```
        (" description language" OR "description languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Description_language_review_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Description_language_review_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Description_language_review](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Description_language_review_DOIs.txt)
            3. Result: [Bib-Description_language_review_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Description_language_review_raw_results.bib)

        :mag: Results: 31

    === ":material-arrow-right-thin: title: survey"

        ```
        ("description language" OR "description languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

              1. Export from SpringerLink: [CSV-Description_language_survey_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Description_language_survey_raw_results.csv)
              2. Retrieved DOIs: [DOIs_Description_language_survey](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Description_language_survey_DOIs.txt)
              3. Result: [Bib-Description_language_survey_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Description_language_survey_raw_results.bib)

        :mag: Results: 37

    === ":material-arrow-right-thin: title: "cloud" NEAR "language""

        ```
        (" description language" OR "description languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```
        ??? additional-files "Files for .csv to .bib"

            1. Export from SpringerLink: [CSV-Description_language_cloud-near-language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Description_language_cloud-near-language_raw_results.csv)
            2. Retrieved DOIs: [DOIs_Description_language_cloud-near-language](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/CSV-files/S1_SpringerLink_Description_language_cloud-near-language_DOIs.txt)
            3. Result: [Bib-Description_language_cloud-near-language_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_Description_language_cloud-near-language_raw_results.bib)

        :mag: Results: 1

    === ":material-arrow-right-thin: title: "language" NEAR "cloud""

        ```
        (" description language" OR "description languages") AND
        ("cloud computing" OR "cloud-native" OR "cloud native" OR
        "service-oriented architecture")
        ```

        :mag: Results: 0



Merged search results:</br>
[SpringerLink_merged_raw_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_merged_raw_results.bib)


:material-arrow-right-bold-outline: Result after removing duplicates: :mag: 176</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SpringerLink_merged_removed_duplicates](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/SpringerLink/S1_SpringerLink_merged_removed_duplicates.bib)

### 2.2 Joined Results

The search results from all three libraries were merged and existing duplicates removed.
However, no duplicates were found in this merge.

:material-arrow-right-bold-outline: Merged search results: :mag: 228</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Total_search-results_merged](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_0_Total_search-results_merged.bib)

## 3. Selection of Suitable Literature

In order to find suitable literature to determine which ADLs are worth evaluating, the following steps were conducted.
For this, the focus lies on existing reviews of modeling languages (preferably in the cloud or service-oriented domain) to select the ones worth evaluating.

### 3.1 Title-Based Selection

:x: Exclusion Criteria:

   - [ ] Meta entries for conference proceedings
   - [ ] Keynotes and invited-talks
   - [ ] Surveys or Reviews not related to modeling languages, for example regarding service discovery, virtual reality or machine learning
   - [ ] Unrelated topics, for instance regarding NLP, security, smart home/village or artificial intelligence-related topics like neural networks
   - [ ] The terms "model" or "modeling" appear in a different and unrelated context, such as a review model, data model or trust modeling
<!--
      - Pricing
      - Geographic information systmes
      - not cloud related
      - service discovery/ service broker
      - software-defined network controllers
      - AI (neural networks etc.)
      - too specific directions (nature environment, NLP systems, blockchain)
      - security risk assessment methods
      - smart homes / smart village/city
      - Big Data
      - IoT
      - Virtual Reality
      - too general, not focusing on architecture or language?; no aspect of architecture
      - other types of modeling (verification)
-->


:heavy_check_mark: Inclusion criteria:

  - [x] Reference to a model, to modeling or modeling language(s)</br>
      :material-arrow-right-thin: exceptions see above
  - [x] Paper topic not evident from the title, for example "Literature review"
  - [x] Reference to specific modeling languages
  - [x] General reference to software architecture, too general to be excluded

:material-arrow-right-bold-outline: The result after filtering based on the title: :mag: 54</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1_Title_Filtering_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_1_Title_filtering_results.bib)

### 3.2 Abstract-Based Selection
:x: Exclusion Criteria:

  - [ ] Only focusing on one modeling language and not reviewing others in addition

  - [ ] The term "model" refers to a different and not relevant context such as deployment metamodel or quality models

  - [ ] Type of modeling does not refer to architecture, for example lifecycle modeling, modeling transformation or (business) process modeling

  - [ ] Dealing with a different, unrelated context

  - [ ] Focus too narrow or specific, for example manufacturing process, machine learning or security aspects


:heavy_check_mark: Inclusion Criteria:

  - [x] Reference to reviewing several architecture languages</br>
      :material-arrow-right-thin: synonyms like service description language or survey are also included</br>
      :material-arrow-right-thin: synonyms like examine or analyze are also included</br>
      (:material-arrow-right-thin: preferably cloud or service-oriented context)
  - [x] General reference to survey and software architecture, abstract still too general to be excluded
  - [x] Reference to reviewing modeling languages in cloud context


:material-arrow-right-bold-outline: The result after filtering based on the abstract: :mag: 11</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2_Abstract_Filtering_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_2_Abstract_Filtering_results.bib)

### 3.3 Full-Text Scan

:x: Exclusion Criteria:

  - [ ] No actual review of modeling languages, for example simply a listing of existing ones
  - [ ] Review criteria and area too specific to be included or relevant

:heavy_check_mark: Inclusion Criteria:

  - [X] Actual review of several modeling languages regarding a range of different criteria
  - [X] Considered area and criteria are relevant to cloud domain

??? file-removal "Removal Reasoning per paper"

    _Bibtex-Keys_ refer to the [2_Abstract_Filtering_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_2_Abstract_Filtering_results.bib) file.</br>
    :material-arrow-right-thin: The previous _citationkeys_ have been adapted for standardization purposes but can be found in the _comment_ field.

    | __Bibtex-Key__ | <div align="center">__Title__</div> | <div align="center">__Removal Reason__</div>
    |:----------------------------:|:-------------------|:--------------------------|
    | [Chen2010](https://www.doi.org/10.1109/ICSESS.2010.5552456) | A Ten-Year Survey of Software Architecture | Analysis of the advances regarding software architectures. For this, the authors considered some ADLs, the design and evolution of software architecture design and a short presenation of the SOA.<ul><li>Presentation and short comparison of five ADLs<br> :material-arrow-right-thin: No consideration of cloud or service-related aspects<br> :material-arrow-right-thin: Very few general aspects were considered like application scope or supporting tools</li></ul> |
    | [Liu2020](https://doi.org/10.1631/FITEE.2000311) | A Survey of Model-Driven Techniques and Tools for Cyber-Physical Systems | Analyzation of state-of-the-art model-driven approaches in the context of CPS. For this, model-based systems engineering techniques/ tools were considered and compared. <ul><li>Focus lies on analyzing the different ADLs regarding CPS aspects like physical plant or controller as components<br> :material-arrow-right-thin: Too specific aspects analyzed </li><li>Short general analysis<br> :material-arrow-right-thin: Too few aspects with not enough detail to be considered </li></ul> |
    | [Mary2011](https://doi.org/10.1007/978-3-642-22726-4_2) | Survey and Comparison of Frameworks in Software Architecture | Short description of several architectural frameworks and analyzing different aspects of them. <ul><li>Focus lies on analyzing the different frameworks<br> :material-arrow-right-thin: No actual or detailed review of modeling languages</li></ul>|
    | [Mohsin2018](https://doi.org/10.1007/s11761-018-0245-1) | A review and future directions of SOA-based software architecture modeling approaches for System of Systems | Service-oriented architecture in the context of software architecture modeling for SoS. The review analyzes different modeling languages typical for software-oriented architecture. <ul><li>Analyzation of SOA typical modeling languages<br> :material-arrow-right-thin: Desired cloud relation is missing</li><li>Used analyzation aspects very general<br> :material-arrow-right-thin: No cloud specific aspects considered </li></ul> |
    | [Teka2012](https://doi.org/10.1007/978-3-030-86970-0_15) | A Systematic Literature Review on Service Description Methods | A systematic literature review regarding service description languages while analyzing their strengths and weaknesses. <ul><li>Focus lies solely on service description aspects<br> :material-arrow-right-thin: No review or analysis regarding architecture related aspects</li><li>Only statements regarding modeling of individual services<br> :material-arrow-right-thin: Not considering the system as a whole</li></ul>|
    | [Zaafouri2021]() | Systematic Literature Review on Service Oriented Architecture Modeling | A systematic literature review to identify typical modeling methods for SOA-based architectures. <ul><li>Simply a literature review regarding the techniques that have been used to model a service-oriented architecture (SOA)<br> :material-arrow-right-thin: No actual or detailed review of the modeling languages</li><li>Not focusing on modeling languages for solely architecture related specifics but also considering e.g. behavioural related<br> :material-arrow-right-thin: Many are not relevant for the intended use case</li></ul>|



:material-arrow-right-bold-outline: The result after filtering based on full-text scan: :mag: 5</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3_Full-text_scan_results](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_3_Full-text_scan_results.bib)

### 3.4 Snowballing

As the last step, the Snowballing technique was chosen to obtain more relevant literature potentially.
This approach also allows a certain quality to check whether most relevant papers have already been retrieved
In order to achieve this, both backward snowballing as well as forward snowballing were carried out.

#### Backward Snowballing

For the backward approach, the references of all identified reviews from the [Full-text Scan](#33-full-text-scan) are checked.
Especially, the literature mentioned in the respective _related work_ section is considered in more detail.
However, this analysis showed that already all relevant reviews were retrieved.

#### Forward Snowballing

On the other hand, the search engine Google Scholar[^2] was used for the forward approach.
Google Scholar allows investigating papers that cited the searched paper.
With this approach, two papers that cite the paper by [Bergmayr2014] could be identified as relevant:

- _Towards a Lightweight Multi-Cloud DSL for Elastic and Transferable Cloud-native Applications_ [Quint2018]

- _A Framework for Modeling Cloud Infrastructures and User Interactions_ [Bernal2019]     

[^2]: https://scholar.google.com/, last accessed: 2022-01-31


These two papers also include reviews concerning some architecture modeling languages for cloud applications while considering cloud-related aspects.
However, these reviews are shorter or considering more specific aspects of the cloud.

:material-arrow-right-bold-outline: The Bibtex-file that includes the final selection of relevant literature: :mag: 7</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4_Final_Selection](https://github.com/KarolinDuerr/MA-CNA-ModelingSupport/tree/main/ADL_Literature_Search/1_Review_Search/S1_4_Final_Selection.bib)

--8<-- "includes/abbreviations.md"
