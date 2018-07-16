import React from 'react'
import Note from "./Note";

export default function NoteList({notes}) {
        const notesElements = notes.map(function(note){
            return <li key={note.dateMs} className="list-group-item"><Note note={note}/></li>
        });
        return (
            <ul className="list-group">
                {notesElements}
            </ul>
        );
}