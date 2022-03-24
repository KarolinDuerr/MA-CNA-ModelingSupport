library(dplyr)

FirstHalf <- read.table("S2_SpringerLink_FirstHalf_merged_DOIs.txt", encoding = "UTF-8", header= TRUE);

FirstHalf_removedDuplicates <- unique(FirstHalf)

Microservice <- read.table("S2_SpringerLink_title_microservice(s)_DOIs.txt", encoding = "UTF-8", header= TRUE);

Intersection <- generics::intersect(FirstHalf, Microservice)

write.table(Intersection,file="S2_SpringerLink_Intersection_Microservice-FirstHalf_DOIs_t.txt", row.names = FALSE, quote=FALSE)
