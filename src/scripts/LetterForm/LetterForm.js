import { getTopics, getTransientState, sendLetter } from "../dataAccess.js";
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

        const getCheckedBoxes = () => {
            const checkboxes = document.getElementsByClassName("checkbox")
            const checkedCheckboxes = []
            for (let i=0; i<checkboxes.length; i++) {
                if(checkboxes[i].checked) {
                    checkedCheckboxes.push(checkboxes[i])
                }
            }
            return checkedCheckboxes
        }
        
        const checkedCheckboxes = getCheckedBoxes()
        
        const topics = getTopics()
        let userSelectedTopicsArray = []
        
        const addToUserSelectedTopicsArray = () => {
            checkedCheckboxes.forEach(
                (element) => {
                    for (const topicObj of topics) {
                        if(topicObj.id === parseInt(element.value)) {
                            userSelectedTopicsArray.push(topicObj.id)
                        }
                        
                    }

                }
            )
        
        }

        addToUserSelectedTopicsArray()

        const userLetterObj = {
            authorId: userAuthorId,
            letter: userMessage,
            recipientAuthorId: userRecipientAuthorId,
            date: new Date().toLocaleDateString(),
            selectedTopics: userSelectedTopicsArray
        }

        sendLetter(userLetterObj)


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

