import { deleteLetter, getAuthors, getSentLetters, getTopics} from "./dataAccess.js"



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

    
    let html =
    `<li class="sentLetter">
    <section class="letter header">Dear ${foundRecipient.firstName} ${foundRecipient.lastName} (${foundRecipient.email}),</section>
    <section class="letter body">${letter.letter}</section>
    <section class="letter end">Sincerely, ${foundAuthor.firstName} ${foundAuthor.lastName} (${foundAuthor.email})</section>
    <section class="letter date">Sent on ${letter.date}</section>
    <section class="footer">
    <section class="selectedTopics">`
    
    let selectedTopics = letter.selectedTopics
    selectedTopics.forEach(
        (selectedTopicId) => {
                const topics = getTopics()
                for (const topic of topics) {
                    if (topic.id === selectedTopicId) {
                        html += `<section class="letter topic">${topic.topic}</section>`
                    }                    
                }
            }
        ) 
                    
    html += `</section>
            <div class="deleteSentLetter">
                <button class="deleteButton" id="sentLetter--${letter.id}">
                    Delete Letter
                </button>
            </div> 
            </section>       
            </li>`
    return html
}


//Created a new reversed sentLetters array so that HTML will display with most revent sentLetters first
export const SentLetters = () => {
    const sentLetters = getSentLetters()
    const reversedLetters = sentLetters.reverse()
    let html = `<section class="allSentLetters"><ul class="allLetters">`
    const sentLettersListItems = reversedLetters.map(sentLetterItemBuilder)
    html += sentLettersListItems.join("")
    html += "</ul></section>"
    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("sentLetter")) {
        const [, sentLetterId] = click.target.id.split("--")
        deleteLetter(parseInt(sentLetterId))
    }

})

