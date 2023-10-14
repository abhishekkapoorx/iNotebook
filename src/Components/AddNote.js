import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote() {
    const context = useContext(NoteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "default" })
    }

    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <h1>Add Your Note</h1>
            <form action="/api/notes/addnote" method="post">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Enter title of your note"  onChange={handleChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} placeholder="Enter tag of your note"  onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={note.description} rows="3" placeholder='Description' onChange={handleChange} minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className='btn btn-dark' onClick={handleClick}>Submit</button>
                </div>
            </form>
        </>
    )
}
