import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

export const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context

    const { note, updateNote} = props;
    return (
        <div className="card col-md-3 mx-3 my-2" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <div className="d-flex align-items-center mb-3">
                    <h6 className="card-subtitle text-body-secondary me-2">{note.tag}</h6>
                    <span className="material-symbols-outlined mx-2 pe-auto" onClick={() => deleteNote(note._id)}>
                        delete
                    </span>
                    <span className="material-symbols-outlined mx-2 pe-auto" onClick={() => updateNote(note)}>
                        edit
                    </span>

                </div>
                <p className="card-text">{note.description}</p>
                <h6 className="card-subtitle mb-1 text-body-secondary">{note.timestamp}</h6>
            </div>
        </div>
    )
}
