import { getAuthors, setAuthorId } from "../dataAccess.js"



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


document.addEventListener("change", (event) => {
    if (event.target.id ==="select__author") {
        setAuthorId(parseInt(event.target.value))
    }
})
