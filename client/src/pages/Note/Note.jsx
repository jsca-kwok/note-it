import React from 'react';
import { Link } from 'react-router-dom';
import './note.scss';

function Note() {
    return (
        <div className='dashboard'>
            <Link className='dashboard__back-link' to='/demo'>
                <p className='dashboard__back'> &lt; DEMO AGAIN</p>
            </Link>
            <iframe 
                className='dashboard__embed'
                src={"https://public.tableau.com/views/Dashboard_NoteIT/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link&:showVizHome=no"} 
                width="1200px" height="850px">
            </iframe>
        </div>
    )
}

export default Note;

