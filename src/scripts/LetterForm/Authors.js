import { getAuthors, setAuthorId } from "../dataAccess.js"


//Generate a select option for each available author
export const Authors = () => {
    const authors = getAuthors()
    let html = `<label class="label" for="author">Author</label>
    <select id="select__author">
    <option value="0">Choose author...</option>`

    for (const author of authors) {
        html += `<option value ="${author.id}">${author.firstName} ${author.lastName}</option>`
    }

    html += `</select>`
    return html
}

//Event listener to set authorId in transient state
document.addEventListener("change", (event) => {
    if (event.target.id ==="select__author") {
        setAuthorId(parseInt(event.target.value))
    }
})
