import React, {useState, useEffect} from "react";
import "./Container.css";
import FormContainer from "./FormContainer/FormContainer";
import CardContainer from "./CardContainer/CardContainer";
import Swal from 'sweetalert2';

const Container = ()=>{
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const AlertSweet = () => {  //Solucion ejercicio propuesto
        Swal.fire({
            title: '¡Tu nota esta vacía! Por favor escribe algo en ella.',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(https://img.freepik.com/premium-vector/white-elegant-texture-background_23-2148445782.jpg?w=1380)',
            timer: 4000,
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://i.gifer.com/PYh.gif")
              left top
              no-repeat
            `
        })
    }

    const addNote = (note) => {
        if (note.length < 1) {
            if (showAlert) {
                return;
            }
            setShowAlert(true);
            AlertSweet();  //Solucion ejercicio propuesto

            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            return;
        }

        const notes = JSON.parse(localStorage.getItem("notes")) || [];

        const noteObj = {
            id: Date.now(),
            note,
        };

        notes.push(noteObj);
        localStorage.setItem("notes", JSON.stringify(notes));

        setNotes(notes);
    };


    const deleteNote = (id) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const newNotes = notes.filter((note) => note.id !== id);

        localStorage.setItem("notes", JSON.stringify(newNotes));

        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id);
        });
    };


    const editNote = (id, note) => {
        const notes = JSON.parse(localStorage.getItem("notes") || []);
        const noteIndex = notes.findIndex((note) => note.id === id);
        
        notes.splice(noteIndex, 1, { id, note });

        localStorage.setItem("notes", JSON.stringify(notes));
        setNotes(notes);
    };


    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(notes);
    }, [note]);

  
    return(
        <div className="container">
            <FormContainer onAddNote={addNote} />
            <CardContainer onNotes={notes} onDelete={deleteNote} onEdit={editNote} />
        </div>
    );
};

export default Container;