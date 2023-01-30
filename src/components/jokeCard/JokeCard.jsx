import React from 'react';
import { RiCloseFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJoke } from "../../services/jokeService";
import './JokeCard.css';

const JokeCard = (props) => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteJoke,
        onSuccess: () => {
            queryClient.invalidateQueries(['jokes']).catch(error => console.log(error));
        }
    });

    const deleteItem =(id) => {
        mutation.mutate(id);
    }


    return(
        <article className="joke-card">
            <div className="joke-card-header">
                <p className="joke-card-header-id">id: {props.id}</p>
                <button className="delete-button" >
                    <RiCloseFill className="joke-card-delete" size={25} value={props.id} onClick={ () => deleteItem(props.id)} />
                </button>
            </div>
            <div className="div-br" />
            <div className="joke-card-body">
                <p className="joke-card-body-setup">- {props.setup}</p>
                <p className="joke-card-body-punchline">- {props.punchline}</p>
            </div>
            <div className="div-br" />
            <div className="joke-card-footer">
                <p className="joke-card-footer-author">{props.author}</p>
                <p className="joke-card-footer-dateCreated">{props.dateCreated}</p>
            </div>
        </article>
    )
}

export default JokeCard;