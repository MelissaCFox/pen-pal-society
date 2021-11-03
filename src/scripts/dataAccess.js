const applicationState = {
    authors: [],
    topics: [],
    sentLetters: [],
    transientState: {}
}

const API = "http://localhost:8088"

export const fetchData = () => {
    fetch(`${API}/authors`)
        .then(response => response.json())
        .then(
            (authors) => {
                // Store the external state in application state
                applicationState.authors = authors
            }
        )
    fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (topics) => {
                // Store the external state in application state
                applicationState.topics = topics
            }
        )
    return fetch(`${API}/sentLetters`)
        .then(response => response.json())
        .then(
            (sentLetters) => {
                // Store the external state in application state
                applicationState.sentLetters = sentLetters
            }
        )
}

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

export const sendLetterAndSelectedTopics = (userLetterObj, userSelectedTopicsArray) => {
    const fetchOptionLetter = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userLetterObj)
    }

    fetch(`${API}/sentLetters`, fetchOptionLetter)
        .then(response => response.jason())

        .then(
            userSelectedTopicsArray.forEach((selectedTopicObj) => {

                fetch(`${API}/selectedTopics`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(selectedTopicObj)
                })
                    .then(response => response.json())
                    
            })
        )
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}