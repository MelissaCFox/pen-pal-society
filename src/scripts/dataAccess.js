const applicationState = {
    authors: [],
    topics: [],
    sentLetters: [],
    transientState: {}
}

const API = "http://localhost:8088"
//Fetch Data
export const fetchAuthors = () => {
    return fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (authors) => {
                // Store the external state in application state
                applicationState.authors = authors
            }
        )

}

export const fetchTopics = () => {
    return fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (topics) => {
                // Store the external state in application state
                applicationState.topics = topics
            }
        )

}

export const fetchSentLetters = () => {
    return fetch(`${API}/sentLetters`)
        .then(response => response.json())
        .then(
            (sentLetters) => {
                // Store the external state in application state
                applicationState.sentLetters = sentLetters
            }
        )

}


//Get Application State data
export const getAuthors = () => {
    return applicationState.authors.map(author => ({ ...author }))
}

export const getTopics = () => {
    return applicationState.topics.map(topic => ({ ...topic }))
}

export const getSentLetters = () => {
    return applicationState.sentLetters.map(sentLetter => ({ ...sentLetter }))
}

export const getTransientState = () => {
    return applicationState.transientState
}


//set transientState values
export const setAuthorId = (authorId) => {
    applicationState.transientState.authorId = authorId

}

export const setRecipientAuthorId = (authorId) => {
    applicationState.transientState.recipientAuthorId = authorId

}

export const setTopicId = (topicId) => {
    applicationState.transientState.topicId = topicId
}


//More Fetch Options
const mainContainer = document.querySelector("#container")

export const sendLetter = (userSentLetter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userSentLetter)
    }

    return fetch(`${API}/sentLetters`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })


}

export const deleteLetter = (id) => {
    return fetch(`${API}/sentLetters/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
