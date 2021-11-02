import { getTransientState, sendLetter } from "../dataAccess.js";
import { Authors } from "./Authors.js";
import { Recipients } from "./Recipients.js";
import { Topics } from "./Topics.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "sendLetter") {
        const transientState = getTransientState()
        const userAuthorId = transientState.authorId
        const userMessage = document.querySelector("input[name='letter']").value
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
        <div class="field">
            ${Authors()}
        </div>
        <div class="field">
            <label class="label" for="letter">Letter</label>
            <input type="text" name="letter" class="input" />
        </div>
        <div class="field">
            ${Topics()}
        </div>
        <div class="field">
            ${Recipients()}
        </div>

        <button class="button" id="sendLetter">Send Letter</button>

    `
}
