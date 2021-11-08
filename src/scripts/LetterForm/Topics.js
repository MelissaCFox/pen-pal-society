import { getTopics, setTopicId } from "../dataAccess.js"


//Generate a list of checkbox options for all of the availabel topics
export const Topics = () => {
    const topics = getTopics()
    let html = `<label>Topics</label>
                <ul>`

    for (const topic of topics) {
        html += `<li><input type="checkbox" class="checkbox" name="topic" value="${topic.id}">${topic.topic}</li>`
    }

    html += `</ul>`
    return html
}

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.name.startsWith("topic")) {
            setTopicId(parseInt(changeEvent.target.value))
        }
    }
)