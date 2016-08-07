library(jsonlite)
args <- commandArgs(TRUE)
filename <- ( args[1])
MARKDF <-fromJSON(filename, flatten = TRUE)
TopUserTags <- table(MARKDF$in_reply_to_screen_name)
SortedTopUserTags <- sort(TopUserTags, decreasing = TRUE)
TopFive <- rownames(SortedTopUserTags)[1:5]
# write.csv(TopFive, file = "topFiveFriends")
write(TopFive, stdout())
