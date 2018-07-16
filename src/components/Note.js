import React from 'react'

export default function Note({note}) {
        return(
            <div className="card mx-auto">
                <div className="card-header">
                    <h2>{note.title}</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">Дата создания: {(new Date(note.dateMs)).toLocaleDateString()}</p>
                </div>
                <div className="card-footer text-muted">
                    {dateSince(note.dateMs)}
                </div>
            </div>
        )
}

function dateSince (creationDate) {
    const now = Date.now();
    let diff = now - creationDate;
    diff = Math.floor(diff/1000);
    if(diff < 60) return `${diff} сек. назад`;
    diff = Math.floor(diff/60);
    if(diff < 60) return `${diff} мин. назад`;
    diff = Math.floor(diff/60);
    if(diff < 24) return `${diff} час. назад`;
    diff = Math.floor(diff/24);
    if(diff < 30) return `${diff} дн. назад`;
    diff = Math.floor(diff/30);
    if(diff < 12) return `${diff} мес. назад`
    diff = Math.floor(diff/12);
    return `${diff} г. назад`
}