import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './mic.scss';
import downloadIcon from '../../assets/document-download.png';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

// configure settings
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

function Mic () {
  // use hooks to set state
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([
    {
      id: 1,
      note: 'This is a sample note. Elephants are giant grey-coloured creatures that have long trunks. People believe that elephants have an excellent memory.'
    },
    {
      id: 2,
      note: 'This is a sample note. Giraffes are tall spotted animals with a very long neck. Did you know that their tongues are blackish-blue in colour?'
    },
    {
      id: 3,
      note: `With Note-IT; it will be a speech to text educational tool where students can use this desktop application to record their zoom, google-meets, and slack classroom calls in text format. The integration with the web application will be able to record speech in text format with the current speakers name next to the text. The goal for this startup application will be to create a credible and trustworthy educational tool brand by generating awareness in the educational tool industry that is highly competitive. Who is it for?   Students and Educators. What is it one of?  A Desktop  App to convert Speech To Text with reference to the speaker and integration to online learning platforms like Zoom, Slack, and GoogleMeets. What is the meaningful Point of Difference? Speech to text application that records speakers in an online classroom with a way of referencing keywords in class notes. What does it stand for?  Where the notes you need, the information you see and share, and the tools to locate a keyword come together in an all in one platform. What proof do you have?  Real-time speech to text. User-friendly User Interface and Features.  Personalized speech to text with users name before text. Locator Option to choose a keyword to jump to in notes. For creative students looking to highlight their key class notes and expand their knowledge by having a way to reference back on those notes. Note-It is a desktop app to connect students who have suffered from the switch to the online classroom setting  to their notes in a more efficient and smart manner. Where the notes you need, the information you see and share, and the tools to locate a keyword come together in an all-in-one platform, with the passion to create a user friendly desktop application with real-time speech to text, and personalized referencing towards the speaker and keywords.`
    }
  ]);

  // anytime change isListening, handleListen will be called
  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      // start mic if isListening is true - mic times out so need to invoke start again onend
      mic.start();
      mic.onend = () => {
        console.log('continue...');
        mic.start();
      }
    } else {
      // stop mic if isListening is false - set by button click
      mic.stop();
      mic.onend = () => {
        console.log('stopped mic on click');
      }
    }
    mic.onstart = () => {
      console.log('mic on')
    }
    mic.onresult = e => {
      // turns results into an array and maps
      const transcript = Array.from(e.results)
        .map(res => res[0])
        .map(res => res.transcript)
        .join('');
      setNote({id: uuidv4(), note: transcript});
      mic.onerror = e => {
        console.log(e.error);
      }
    }
  }

  const handleSaveNote = () => {
    // save new note to previously saved notes
    setSavedNotes([...savedNotes, note]);
    // set note state back to empty
    setNote('');
  }

  return (
    <>
    <div className="mic">
      <div className="mic__current">
        <h2 className="mic__container-title">Current Note</h2>
        {isListening ? <p>✏️&nbsp;&nbsp;&nbsp;taking notes...</p> : null }
        <div className="mic__button-container">
          {/* toggle isListening on/off */}
          <button className="mic__button" onClick={() => {setIsListening(prevState => !prevState)}}>Start/Stop</button>
          <button className="mic__button" onClick={handleSaveNote} disabled={!note}>Save Note</button>
        </div>
        {
          note !== null ? <p className="mic__live-notes">{note.note}</p> : null
        }
      </div>
      <div className="mic__saved">
        <h2>Notes</h2>
        {savedNotes.map(n => {
          return (
          <Link className="mic__link" to={`/note/${n.id}`}>
            <p className="mic__saved-notes" key={n.note}>
              Educator: {n.note}
              <img className='mic__note-download' src={downloadIcon} alt='download' />
            </p>
          </Link>
          )
        })}
      </div>
    </div>
    </>
  );
}

export default Mic;
