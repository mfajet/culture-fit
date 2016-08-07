library(jsonlite)
library(dplyr)
install.packages("koRpus")
library("koRpus")
?jsonlite
MARKDF <-fromJSON("test.JSON", flatten = TRUE)

View(MARKDF)
colnames(MARKDF)

#The first thing we need to look for is retension

#We will charactarize this by how long they hold on to a hobby for
#How long they stay interested in certain issues. 

#Ideas for doing this look for repeated words that would indicate hobbies. 
#reply to a page related to that topic
#how often they favorite someone they like's posts
#How often they use the hashtag
#Retweet related 
#Check how many and frequency using"created_at" == Look for uniform distribution
# Look and see how to get from the actual text and matching occurance but not everyday things -- nouns

MARKDF%>%filter()

MARKDF$text
MARKDF[159,]

#How to determne retension
#Search for nouns and relevant repeating hashtags --> use package openNPL 
#put extra weight on pinned tweets -- special exception
#once we have all this information we can look at the distribution of how long they've been talking about it. 

#Well RN I can't look for nouns and shit so RN I'm going to look and see what the hashtags have to do with/ ARE

tagged.text <- treetag("MarkTweets2.txt", treetagger="manual",
                       lang="en", TT.options= list(path="C:/TreeTagger", preset="en"))

str(MARKDF$text)
MarkT <- MARKDF$text
MarkT %>% filter(                 )
write.csv(MarkT, file = "MarkTweets12")
buzzbuzz <- read.table("MarkTweets12")

x <- sub( pattern = "<", replacement = " ", x = MarkT)
MarkT
View(x)
?write.table()
?write.table()
?write.csv()
?treetag()
set.kRp.env( TT.cmd = "tokenize",  lang = "en", )



#*************************************************************************************
#Find their 5 closest friends 
library(jsonlite)
MARKDF <-fromJSON("test.JSON", flatten = TRUE)
TopUserTags <- table(MARKDF$in_reply_to_screen_name)
SortedTopUserTags <- sort(TopUserTags, decreasing = TRUE)
TopFive <- rownames(SortedTopUserTags)[0:5]
write.csv(TopFive, fileName = "topFiveFriends")

#**********************************
#How many times they reference family members and stuff. 


## found a thing online to walk through formating the text


#***************************************************************8
#FROM HERE
#HAS TO HAVE THE MARKDF from before. 

library(tm)
myCorpus <- Corpus(VectorSource(MARKDF$text))
myCorpus <- tm_map(myCorpus, content_transformer(tolower))
removeURL <- function(x) gsub("http[^[:space:]]*", "", x)
myCorpus <- tm_map(myCorpus, content_transformer(removeURL))

removeNumPunct <- function(x) gsub("[^[:alpha:][:space:]]*","", x)
myCorpus <- tm_map(myCorpus, content_transformer(removeNumPunct))

myStopwords <- c(setdiff(stopwords('english'), c("r", "big")), "use", "see", "used" , "via", "amp")
myCorpus <- tm_map(myCorpus, removeWords, myStopwords)
myCorpus <- tm_map(myCorpus, stripWhitespace)

#SAVE
myCorpusCopy 
stemCompletion2 <- function(x, dictionary) {
  x <- unlist(strsplit(as.character(x), " "))
  x <- x[x != ""]
  
  x <- stemCompletion(x, dictionary=dictionary)
  
  x <- paste(x, sep="", collapse=" ")
  
  PlainTextDocument(stripWhitespace(x))
  
}


myCorpus <- lapply(myCorpus, stemCompletion2, dictionary=myCorpusCopy)
myCorpus <- Corpus(VectorSource(myCorpus))

tdm <- TermDocumentMatrix(myCorpus,control = list(wordLengths = c(3, Inf)))
freq.terms <- findFreqTerms(tdm, lowfreq = .05*tdm$ncol)
term.freq <- rowSums(as.matrix(tdm))
df <- data.frame(term = names(term.freq), freq = term.freq)
m <- as.matrix(tdm)

# calculate the frequency of words and sort it by frequency

word.freq <- sort(rowSums(m), decreasing = T)
# colors
install.packages("wordcloud")
library("wordcloud")

cloud <- wordcloud(words = names(word.freq), freq = word.freq, min.freq = 3,
          random.order = F, random.color = T, col = c("red", "royalblue1", " dark green", "grey28"))
write(cloud, stdout())

#TO HERE

###########################################
#
#Creates Topics based off of analysing the tweets
#graph stuff doesn't work
#
install.packages("topicmodels")
library(topicmodels)

dtm <- as.DocumentTermMatrix(tdm)
dtm
rowTotals <- apply(dtm , 1, sum) #Find the sum of words in each Document
dtm.new   <- dtm[rowTotals> 0, ]    
lda <- LDA(dtm.new, k = 5)
term <- terms(lda, 10)
term <- apply(term, MARGIN = 2, paste, collapse = ", ")
View(term)

topics <- topics(lda) 
topics <- data.frame(date = as.list.Date(MARKDF$created_at), topic=topics)
qplot(date, ..count.., data=topics, geom="density", fill=term[topic], position="stack")

library(ggplot2)
#library(tm)

