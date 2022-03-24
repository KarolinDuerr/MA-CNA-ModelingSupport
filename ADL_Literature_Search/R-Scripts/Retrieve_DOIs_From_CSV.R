FoundLiterature <- read.csv("searchResults.csv", encoding = "UTF-8", header= TRUE);
DOIs <- FoundLiterature["Item.DOI"]

write.table(DOIs,file="DOIs.txt", row.names = FALSE, quote=FALSE)
