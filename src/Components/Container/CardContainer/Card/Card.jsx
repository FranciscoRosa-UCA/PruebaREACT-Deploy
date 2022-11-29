import React, { useState } from "react";
import "./Card.css";
import CardTextArea from "./CardTextArea/CardTextArea";
import CardButton from "./CardButton/CardButton";
import Swal from 'sweetalert2';

const Card = ({ id, note, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [_note, setNote] = useState(note);

    const deleteHandler = () => {
        onDelete(id);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const editHandler = () => {
        if(_note != 0){
            onEdit(id, _note);
            setIsEditing(false);
        }
        else{
            Swal.fire({
                title: '¡Tu nota esta vacía! Por favor escribe algo en ella.',
                timer: 4000
            })   
        }
    }

    const onChangeDataHandler = (event) => {
        event.preventDefault();
        setNote(event.target.value);
    };

    return(
        <div className="card">
            <CardTextArea
                onChange={onChangeDataHandler}
                note={_note}
                isEditing={isEditing}
            />

            <div className="btn-container">
                {
                isEditing && 
                <CardButton text={"Confirm"} onClick={editHandler}/>
                }
                {
                !isEditing && 
                (
                <CardButton text={"Edit"} onClick={startEditingHandler} />
                )
                }
                <CardButton text={"Delete"} onClick={deleteHandler} />
            </div>

        </div>
    );

};

export default Card;