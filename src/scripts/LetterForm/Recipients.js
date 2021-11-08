import { getAuthors, setRecipientAuthorId } from "../dataAccess.js"


//Generate a select option for each available recipient author (uses the same database object as "authors")
export const Recipients = () => {
    const recipients = getAuthors()
    let html = `<label class="label" for="recipient">Recipient</label>
    <select id="select__recipient">
    <option value="0">Choose recipient...</option>`

    for (const recipient of recipients) {
        html += `<option value ="${recipient.id}">${recipient.firstName} ${recipient.lastName}</option>`
    }

    html += `</select>`
    return html
}

document.addEventListener("change", (event) => {
    if (event.target.id ==="select__recipient") {
        setRecipientAuthorId(parseInt(event.target.value))
    }
})

