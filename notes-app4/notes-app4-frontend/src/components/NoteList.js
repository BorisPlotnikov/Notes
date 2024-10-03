// import React from 'react';
// import Note from './Note';
// import '../css/NoteList.css';
// import PropTypes from 'prop-types';

// const NoteList = ({ notes, deleteNote }) => {
    // if (notes.length === 0) {
    //     return <p>No notes to display</p>
    // }

    return (
        <div className='notes'>
            {notes.map(note => (
                <Note key={note._id} note={note} deleteNote={deleteNote} />
            ))}
        </div>
    );
// };

// NoteList.propTypes = {
//     notes: PropTypes.arrayOf(
//         PropTypes.shape({
//             _id: PropTypes.string.isRequired,
//             content: PropTypes.string.isRequired
//         })
//     ),
//     deleteNote: PropTypes.func.isRequired
// };

// export default NoteList;