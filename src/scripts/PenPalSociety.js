import { LetterForm } from "./LetterForm/LetterForm.js"
import { SentLetters } from "./SentLetters.js"


export const PenPalSociety = () => {
    return `
        <h1>Pen Pal Society</h1>
        <h2>Write A Letter</h2>
        <section class="letterForm">
            ${LetterForm()}
        </section>

        <section class="sentLetters">
            <h2>Sent Letters</h2>
            ${SentLetters()}
        </section>
    `
}