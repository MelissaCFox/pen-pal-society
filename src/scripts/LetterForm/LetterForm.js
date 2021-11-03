import { getTransientState, sendLetter } from "../dataAccess.js";
import { Authors } from "./Authors.js";
import { Recipients } from "./Recipients.js";
import { Topics } from "./Topics.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendLetter") {
        const transientState = getTransientState()
        const userAuthorId = transientState.authorId
        const userMessage = document.querySelector("textarea[name='letter']").value
        const userRecipientAuthorId = transientState.recipientAuthorId
        const userTopicId = transientState.topicId

        const objectToSendToAPI = {
            authorId: userAuthorId,
            letter: userMessage,
            recipientAuthorId: userRecipientAuthorId,
            topicId: userTopicId,
            date: new Date().toLocaleDateString()
        }

        sendLetter(objectToSendToAPI)
    }
})


export const LetterForm = () => {
    return `
        <div class="field author select">
            ${Authors()}
        </div>
        <div class="field">
            <label class="label" for="letter">Letter</label>
            <textarea name="letter" class="input letterfield"></textarea>
        </div>
        <div class="field topics choose">
            ${Topics()}
        </div>
        <div class="field recipient select">
            ${Recipients()}
        </div>

        <button class="button" id="sendLetter">Send Letter</button>

    `
}
