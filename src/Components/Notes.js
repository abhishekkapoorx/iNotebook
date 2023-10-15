import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { NoteItem } from './NoteItem'
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    const context = useContext(NoteContext)
    const { notes, getAllNotes , editNote} = context;
    const navigate = useNavigate();

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        if (localStorage.getItem("token")){
            getAllNotes()
        } else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    };

    const handleClick = (e) => {
        e.preventDefault()
        console.log("Updating Note...", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Note Updated Successfuly", "success")
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#updateModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="/api/notes/addnote" method="post">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} placeholder="Enter title of your note" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder="Enter tag of your note" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} rows="3" placeholder='Description' onChange={handleChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className='btn btn-dark' onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='my-3'>Your Notes</h3>
            <div className="container">
                { notes.length === 0 && "No Notes Found. Please Add a new one."}
            </div>
            <div className="row">
                {notes.map((note)=>{
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}
