import React from 'react';
import "./notes.css"

export default function Notes() {
  return (
    <div className='na-notes'>
      <div className='na-notes-wrapper'>
        <h1 className='na-notes-header'>Emmanuel's Journal Entries</h1>
        <p className='na-notes-numbers'>4/6 completed</p>
        <div className="na-notes-row">
          <div className="na-notes column">
            notes
          </div>
          <div className="na-notes column">
            notes
          </div>
          <div className="na-notes column">
            notes
          </div>
        </div>
      </div>
    </div>
  )
}
