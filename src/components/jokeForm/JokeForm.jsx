import React, { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJoke } from "../../services/jokeService";
import './JokeForm.css';

const JokeForm = (props) => {

    const queryClient = useQueryClient();

    const [ joke, setJoke ] = useState({
        setup : "",
        punchline : "",
        author : ""
    });


    const mutation = useMutation({
        mutationFn: addJoke,
        onSuccess: () => {
            queryClient.invalidateQueries(['jokes']).catch(error => console.log(error));
        }
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setJoke( prevState => {
            return {
                ...prevState ,
                [name] : value
            }
        })
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        mutation.mutate(joke);
        setJoke({ setup : "", punchline : "", author : "" });
        props.setIsFormClicked(!props.isFormClicked);
    }

    return(
        <div className="form-modal">
            <div className="form-modal-content">
                <div className="form-modal-header">
                    <h1>Add new joke</h1>
                </div>
                <div className="form-modal-body">
                    <form className="joke-form" onSubmit={onSubmit}>
                        <label htmlFor="setup">Joke Setup</label>
                        <input onChange={handleChange} type="text" id="setup" name="setup"
                               value={joke.setup}/>

                        <label htmlFor="jokePunchline">Joke Punchline</label>
                        <input onChange={handleChange} type="text" id="punchline" name="punchline"
                                value={joke.punchline} />

                        <label htmlFor="jokeAuthor">Joke Author</label>
                        <input onChange={handleChange} type="text" id="author" name="author"
                                value={joke.author}/>

                        <button>Submit Joke</button>
                        <button onClick={ () => props.setIsFormClicked(!props.isFormClicked)}>Close form</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default JokeForm;