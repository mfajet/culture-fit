library(jsonlite)
MARKDF <-fromJSON("test.JSON", flatten = TRUE)
TopUserTags <- table(MARKDF$in_reply_to_screen_name)
SortedTopUserTags <- sort(TopUserTags, decreasing = TRUE)
TopFive <- rownames(SortedTopUserTags)[0:5]
write.csv(TopFive, fileName = "topFiveFriends")