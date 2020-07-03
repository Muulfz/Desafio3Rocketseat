import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([])

    async function handleAddRepository() {
        const repository = {
            title: `Repositorio ${Date.now()}`,
            url: "https://github.com/",
            techs: ["React"]
        };

        await api.post('repositories', repository)
            .then((response) => setRepositories([...repositories, response.data]));

    }


    async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`);
        const updatedRepositories = repositories.filter((repository) => repository.id !== id);

        setRepositories(updatedRepositories)
    }

    useEffect(() => {
        api.get('repositories').then((response) => setRepositories(response.data))
    }, [])

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository =>
                    <li key={repository.id}>
                        {repository.title }
                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>

                )}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
