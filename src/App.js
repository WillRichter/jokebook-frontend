import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJokes } from "./services/jokeService";
import JokeForm from "./components/jokeForm/JokeForm";
import Header from "./components/header/Header";
import JokeCard from "./components/jokeCard/JokeCard";
import './App.css';

function App() {

    const [ isFormClicked, setIsFormClicked ] = useState(false);
    const { isLoading, isError, data } = useQuery({ queryKey: ['jokes'], queryFn: fetchJokes})

    if(isError) return <h1>Error! Please try again soon</h1>

    const createJokeCard = (joke) => {
        return (
            <JokeCard
                key={joke.id + joke.author}
                id={joke.id}
                setup={joke.setup}
                punchline={joke.punchline}
                author={joke.author}
                dateCreated={joke.dateCreated}
            />
        )
    }

    const handleClick = () => {
        setIsFormClicked(!isFormClicked);
    }

    return (
        <div className="App">
            <Header />
            <main>
                <div className="add-joke-button-container">
                    <button className="add-joke-button" onClick={handleClick}>Add Joke</button>
                </div>
                {isFormClicked ?
                    <JokeForm setIsFormClicked={setIsFormClicked} isFormClicked={isFormClicked}/> : null
                }
                <div className="joke-container">
                    { isLoading ? <h1>Loading... </h1> : data.map(createJokeCard)}
                </div>
            </main>
        </div>
    );
}

export default App;
