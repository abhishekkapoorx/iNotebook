import React, { useState } from 'react'
import NoteContext from "./NoteContext"

const NoteState = (props) => {
    const s1 = [
        {
            "_id": "64f60d5839c08b95aa90123d",
            "user": "64f60c7dbd3622df86bac421",
            "title": "Hi my first note",
            "description": "Hi this is the description of my first note",
            "tag": "Personal",
            "timestamp": "2023-09-04T17:01:12.844Z",
            "__v": 0
        },
        {
            "_id": "6500586d4c2aced097fc5a82",
            "user": "64f60c7dbd3622df86bac421",
            "title": "Hi my first note is already printed",
            "description": "Hi this lorem ipsum is the description of my first note",
            "tag": "Personal",
            "timestamp": "2023-09-12T12:24:13.554Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(s1)

    // Get All Notes
    const getAllNotes = async () => {
        // API CALL
        // const host = window.location.host
        const host = "http://127.0.0.1:5000"
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem("token"),
                "content-type": "application/json"
            }
        });
        const resJson = await response.json();
        setNotes(resJson)
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API CALL
        // const host = window.location.host
        const host = "http://127.0.0.1:5000"
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem("token"),
                "content-type": "application/json"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const resJson = await response.json();

        if (resJson['error'] !== null) {
            setNotes(notes.concat(resJson));
        };
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API CALL
        // const host = window.location.host
        const host = "http://127.0.0.1:5000"
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        });
        const resJson = await response.json();
        if (resJson["Success"] !== null) {
            console.log(`Deleting Note with id: ${id}`)
            setNotes(notes.filter((note) => { return note._id !== id }))
        }

    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        // const host = window.location.host
        const host = "http://127.0.0.1:5000"
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const resJson = await response.json();

        // LOGIC TO EDIT CLIENT
        const newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            let element = newNotes[index]
            if (element._id === id) {
                element.title = title;
                element.description = description
                element.tag = tag

                break
            }
        }
        setNotes(newNotes)
    }


    return (
        <NoteContext.Provider value={{ notes, getAllNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;