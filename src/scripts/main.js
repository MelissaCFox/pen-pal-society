import { fetchAuthors, fetchSentLetters, fetchTopics } from "./dataAccess.js"
import { PenPalSociety } from "./PenPalSociety.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchAuthors()
    .then(() => fetchTopics())
    .then(() => fetchSentLetters())
    .then(
        () => mainContainer.innerHTML = PenPalSociety()
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)