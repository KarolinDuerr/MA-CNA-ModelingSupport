# Methodology: Selecting the Modeling Frameworks

## Table of Contents
1. [General Information](#1-general-information)
2. [Google Search](#2-google-search)
3. [Github Search](#3-github-search)
4. [Merging Search Results](#4-merging-search-results)
5. [Final Selection Result](#5-final-selection-result)

-----------------------------------------------------

## 1. General Information

The approach to selecting three modeling libraries/frameworks worth evaluating and considering as the basis for the modeling application is described below.
A systematic search was conducted to determine existing and relevant modeling libraries/frameworks.
First, a [Google search](#2-google-search) was conducted, followed by a [Github search](#3-github-search) due to the platform's popularity, especially for open-source projects.
This popularity also became apparent during the [Google search](#2-google-search) since the absolute majority of the mentioned libraries can be found on [Github](https://github.com/).
The final result of the selected modeling libraries with their selection reasons can be found in the [Final Selection Result](#5-final-selection-result) section.


## 2. [Google](https://www.google.de/) Search

The [Google search](Google/) used the following search string to find modeling libraries/frameworks:

```
javascript AND web AND (diagramming | drawing) AND (open-source OR open source OR OSS)
```

:calendar: Search date: 2022-03-31</br>
&#8594; :mag: Results: 1 610 000 000

However, due to the huge amount of received results, the considered search results were limited to the websites listed on the first 10 Google pages considered.
The received results are documented in [Google_Search_Results_part1](Google/0_Google_Search_Results_part1.md) and [Google_Search_Results_part2](Google/0_Google_Search_Results_part2.md).
In these files, the mentioned libraries are listed for each website individually.
Afterwards, all identified libraries, minus duplicates, were summarized in the [Google_Search_Results_Libs](Google/1_Google_Search_Results_Libs.md) file, which includes additional information based on the respective code repository.
This resulted in :mag: 139 identified libraries.

Since the websites received by the Google search can list any frameworks/libraries, their relevance, popularity, and open-source property cannot be presumed.
For example, the identified libraries include libraries that are not open-source and instead commercially licensed or had received their last update (identified by latest commit and version) in 2013.
Therefore, the following exclusion criteria were applied for the first filtering of the results in order to ensure that the individual repository projects are relevant, comparatively up-to-date, open-source, and enjoy certain popularity.
With 100, a relatively small number of required repository stars was chosen since their meaning is not commonly defined, resulting in different interpretations.  

:x: Exclusion Criteria:

- [ ] Repositories with last commit before 2019-01-01 despite search constraints
- [ ] Repositories with non OSS Licenses
- [ ] Repositories Stars < 100

&#8594; Resulting repositories :mag: 73

The remaining libraries can be found in the [Google_Search_firstFiltering](Google/2_Google_Search_firstFiltering.md) file.

## 3. [Github](https://github.com/) Search

In contrast to the [Google search](Google/), the [Github search](Github/) used significantly fewer restrictions for their search string.
This is due to the limitations of the provided Github search.
The search considers repository titles as well as provided topics and descriptions.
However, since topics and descriptions are typically very short and not required, restricting the search too much could exclude relevant and valuable results.
Therefore, the search was limited to two most important and fitting keywords.
Additionally, since the Github search allows filtering for specific _last commit dates_, the same date restriction applied to the received Google results is included.

```
javascript diagramming pushed:"> 2019-01-01"
```

:calendar: Search date: 2022-04-02</br>
&#8594; Number of considered websites :mag: 239

The received repositories are documented in [Github_Search_raw_results](Github/0_Github_Search_raw_results.md), which also includes additional information based on the respective code repository.
The repositories are then further filtered with the following exclusion criteria that are almost identical to the ones applied to the Google results.
Again, to ensure that the individual repository projects are relevant, comparatively up-to-date, open-source, and enjoy certain popularity.   

:x: Exclusion Criteria:

- [ ] Repositories with last commit before 2019-01-01 despite search constraints
- [ ] Repositories with non OSS Licenses
- [ ] Empty repositories (in table identified by no last commits)
- [ ] Repositories Stars < 100


&#8594; Resulting repositories :mag: 27

The remaining libraries can be found in the [Github_Search_first_filtering](Github/1_Github_Search_first_filtering.md) file.

## 4. Merging Search Results

After completing the first filtering of the search results, the remaining libraries were merged and duplicates removed, which resulted in :mag: 90 remaining libraries: [merged_results](0_merged_results.md).
Since general aspects and properties of the libraries like their relevance, popularity and license have already been considered in the steps before, the following exclusion and inclusion criteria consider the actual intention and general functionality of the respective libraries.

:x: Exclusion Criteria:
- [ ] not related to drawing general diagrams
- [ ] too specific e.g. designed to create specific types of diagrams like bpmn
- [ ] not for web applications
- [ ] a drawing application not usable as library
- [ ] only able to create or edit graphics like SVG content


:heavy_check_mark: Selection Criteria:
- [x] library usable for drawing content
- [x] usable for web application

&#8594; Resulting repositories: :mag: 30

The remaining libraries, as well as the specific removal reason(s) for each individual library can be found in the [merged_results_first_filtering](1_merged_results_first_filtering.md) file.

For the final selection as described in the following section, each remaining library and its provided functionalities were considered in greater detail by providing a short summary of the most critical identified remarks as summarized in [filtered_results_remarks](2_filtered_results_remarks.md).   

## 5. Final Selection Result

Based on the [remarks for each library](2_filtered_results_remarks.md) and the following exclusion and selection criteria, three different modeling libraries are selected for the following evaluation to be considered as the basis for realizing the modeling application.
This selection also considered the actual range of functions provided by the respective library.

:x: Exclusion Criteria:
- [ ] no or insufficient documentation available
- [ ] connection modeling not per se supported
- [ ] documentation not entirely in english
- [ ] no custom creation of shapes provided

:heavy_check_mark: Selection Criteria:
- [x] occurrence during search more than once (preferably high number)
- [x] preferably good documentation available
- [x] provides many shapes and additional features useful for modeling
- [x] explicitly mentioned by tool that designed for modeling applications/ tools


| <div align="center">Modeling library</div> | <div align="center">Repository URL</div> | <div align="center">Selection Reasons</div> |
| :----------------------------------------: | :--------------------------------------- | :------------------------------------------ |
| [MxGraph](https://jgraph.github.io/mxgraph/) | [https://github.com/jgraph/mxgraph](https://github.com/jgraph/mxgraph) | <ul><li>highest occurrence during search: 7 times in total</li><li>used for popular modeling editor [draw.io](https://app.diagrams.net/)</li><li>extensive documentation, demos and tutorials available</li><li>provides several shapes but also customization of these as well as creating new shapes</li><li>provides explicit support for creating diagram editor</li></ul> |
| [Joint.js](https://www.jointjs.com/opensource) | [https://github.com/clientIO/joint](https://github.com/clientIO/joint) | <ul><li>second highest occurrence during search: 6 times in total</li><li>extensive documentation, demos and tutorials available</li><li>explicitly designed for creating diagramming tools</li><li>provides several shapes but also customization of these as well as creating new shapes</li></ul> |
| [Draw2d](https://freegroup.github.io/draw2d/#/examples) | [https://github.com/freegroup/draw2d](https://github.com/freegroup/draw2d) | <ul><li>occurred three times during search</li><li>extensive documentation and examples available</li><li>easily create visual languages & tools</li><li>provides several shapes but also customization of these as well as creating new shapes</li></ul> |
