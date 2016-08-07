
require(methods)
library(jsonlite)
library(wordcloud)
library(tm)
args <- commandArgs(TRUE)
filename <- ( args[1])
MARKDF <-fromJSON(filename, flatten = TRUE)

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

stemCompletion2 <- function(x, dictionary) {
  x <- unlist(strsplit(as.character(x), " "))
  x <- x[x != ""]

  x <- stemCompletion(x, dictionary=dictionary)

  x <- paste(x, sep="", collapse=" ")

  PlainTextDocument(stripWhitespace(x))

}

myCorpusCopy <- myCorpus
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


png(filename="./cloud.png")

cloud <- wordcloud(words = names(word.freq), freq = word.freq, min.freq = 3,
                   random.order = F, random.color = T, col = c("red", "royalblue1", " dark green", "grey28"))
# write(cloud, stdout())

#TO HERE

dev.off()
###########################################
