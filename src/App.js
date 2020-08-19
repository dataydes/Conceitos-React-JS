import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories([...response.data]);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'testestes',
      techs: 'React'
    });

    const repository = response.data;
    setRepositories([...repositories, repository])
    console.log("Buscando repositório")
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    const repositoriesUpdate = repositories.filter(repository => repository.id != id);
    setRepositories([...repositoriesUpdate]);
    console.log(response, " Item removido");
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}>{repository.title}
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
