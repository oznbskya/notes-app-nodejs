const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note Added!"))
    } else {
        console.log(chalk.red.inverse('Note Title Taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) 
    } catch (e) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note deleted.'))
    } else {
        console.log(chalk.red.inverse('No note found in that title'))
    }

    saveNotes(notesToKeep)
}

const listNotes = () => {
    console.log(chalk.bgMagenta('YOUR NOTES'))

    const notes = loadNotes()

    notes.forEach(element => {
        console.log(element.title)
    });
    
}

const readNote = (title) => {
    const notes = loadNotes()

    const readTitle = notes.find((note) => note.title === title)
        
    if(readTitle) {
        console.log(chalk.blue.inverse(readTitle.title))
        console.log(chalk.yellow(readTitle.body))
    } else {
        console.log(chalk.red.inverse('There is no note named ' + title))
    }
}

module.exports = {
    loadNotes: loadNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}
