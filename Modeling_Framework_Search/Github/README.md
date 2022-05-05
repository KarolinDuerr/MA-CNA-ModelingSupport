# Github Search

In contrast to the [Google search](../Google/), the Github search used significantly fewer restrictions for their search string.
This is due to the limitations of the provided Github search.
The search considers repository titles as well as provided topics and descriptions.
However, since topics and descriptions are typically very short and not required, restricting the search too much could exclude relevant and valuable results.
Therefore, the search was limited to two most important and fitting keywords.
Additionally, since the Github search allows filtering for specific _last commit dates_, the same date restriction applied to the received Google results is included.

```
javascript diagramming pushed:"> 2019-01-01"
```

:calendar: Search date: 2022-04-02</br>
&#8594; Number of found repositories :mag: 239

The received repositories are documented in [Github_Search_raw_results](0_Github_Search_raw_results.md), which also includes additional information based on the respective code repository.
The repositories are then further filtered with the following exclusion criteria that are almost identical to the ones applied to the Google results.
Again, to ensure that the individual repository projects are relevant, comparatively up-to-date, open-source, and enjoy certain popularity.   

:x: Exclusion Criteria:

- [ ] Repositories with last commit before 2019-01-01 despite search constraints
- [ ] Repositories with non OSS Licenses
- [ ] Empty repositories (in table identified by no last commits)
- [ ] Repository Stars < 100


&#8594; Resulting repositories :mag: 27

The remaining libraries can be found in the [Github_Search_first_filtering](1_Github_Search_first_filtering.md) file.
