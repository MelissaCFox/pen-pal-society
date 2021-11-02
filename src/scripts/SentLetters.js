import { getAuthors, getSentLetters, getTopics} from "./dataAccess.js"



const sentLetterItemBuilder = (letter) => {
    const authors = getAuthors()
    const foundAuthor = authors.find(
        (author) => {
            return (author.id === letter.authorId)
        }
    )
    const foundRecipient = authors.find(
        (author) => {
            return (author.id === letter.recipientAuthorId)
        }
    )

    const topics = getTopics()
    const foundTopic = topics.find(
        (topic) => {
            return (topic.id === letter.topicId)
        }
    )
    
    return `<li class="sentLetter">
                <h3>Dear ${foundRecipient.firstName} ${foundRecipient.lastName} (${foundRecipient.email}),</h3>
                <h3>${letter.letter}</h3>
                <h3>Sincerely, ${foundAuthor.firstName} ${foundAuthor.lastName} (${foundAuthor.email})</h3>
                <p>Sent on ${letter.date}</p>
                <div class="topic-icon">${foundTopic.topic}</div>
            </li>`

}



export const SentLetters = () => {
    const sentLetters = getSentLetters()
    let html = `<section class="allSentLetters"><ul>`
    const sentLettersListItems = sentLetters.map(sentLetterItemBuilder)
    html += sentLettersListItems.join("")
    html += "</ul></section>"
    return html
}