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
                <section class="letter header">Dear ${foundRecipient.firstName} ${foundRecipient.lastName} (${foundRecipient.email}),</section>
                <section class="letter body">${letter.letter}</section>
                <section class="letter end">Sincerely, ${foundAuthor.firstName} ${foundAuthor.lastName} (${foundAuthor.email})</section>
                <section class="letter date">Sent on ${letter.date}</section>
                <section class="letter topic">${foundTopic.topic}</section>
            </li>`

}



export const SentLetters = () => {
    const sentLetters = getSentLetters()
    let html = `<section class="allSentLetters"><ul class="allLetters">`
    const sentLettersListItems = sentLetters.map(sentLetterItemBuilder)
    html += sentLettersListItems.join("")
    html += "</ul></section>"
    return html
}