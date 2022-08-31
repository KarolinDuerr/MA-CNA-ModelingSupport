Title: Google Search Overview
Date: 2022
Context: Modeling Libraries Search

# :fontawesome-brands-google: Google Search Overview

The Google search used the following search string to find modeling libraries/frameworks:

```
javascript AND web AND (diagramming | drawing) AND (open-source OR open source OR OSS)
```

:calendar: Search date: 2022-03-31</br>
&#8594; :mag: Results: 1 610 000 000

However, due to the huge amount of received results, the considered search results were limited to the websites listed on the first 10 Google pages considered.
The received results are documented in [Google_Search_Results_part1](0_Google_Search_Results_part1.md) and [Google_Search_Results_part2](0_Google_Search_Results_part2.md).
In these files, the mentioned libraries are listed for each website individually.
Afterwards, all identified libraries, minus duplicates, were summarized in the [Google_Search_Results_Libs](1_Google_Search_Results_Libs.md) file, which includes additional information based on the respective code repository.
This resulted in :mag: 139 identified libraries.

Since the websites received by the Google search can list any frameworks/libraries, their relevance, popularity, and open-source property cannot be presumed.
For example, the identified libraries include libraries that are not open-source and instead commercially licensed or had received their last update (identified by latest commit and version) in 2013.
Therefore, the following exclusion criteria were applied for the first filtering of the results in order to ensure that the individual repository projects are relevant, comparatively up-to-date, open-source, and enjoy certain popularity.
With 100, a relatively small number of required repository stars was chosen since their meaning is not commonly defined, resulting in different interpretations.  

:x: Exclusion Criteria:

- [ ] Repositories with last commit before 2019-01-01 despite search constraints
- [ ] Repositories with non OSS Licenses
- [ ] Repository Stars < 100

&#8594; Resulting repositories :mag: 73

The remaining libraries can be found in the [Google_Search_firstFiltering](2_Google_Search_firstFiltering.md) file.
