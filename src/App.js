import React, {useState, useEffect} from "react";

import "./styles.css";
import api from 'services/api'; 

function App() {
  const [respositories, setRepositories] = useState([]);  
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');
  
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    } );
  }, []);

  async function handleAddRepository() {        
    const response = await api.post('repositories', {
      title,
      url,
      techs: techs.split(',')
    });
    setRepositories([...respositories, response.data]);
    setTitle('');
    setUrl('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = respositories.filter(repository => repository.id !== id );    
    setRepositories(newRepositories);
  }

  return (
    <>
      <div>
        <input type="text" placeholder="title the repository" name="title"onChange={(e) => setTitle(e.target.value)} value={title}/>
        <input type="text" placeholder="url repository" name="url" onChange={(e) => setUrl(e.target.value)} value={url} />
        <input type="text" placeholder="techs separeted using ','" name="techs"  onChange={(e) => setTechs(e.target.value)} value={techs} /> 
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      <div>
        <ul data-testid="repository-list">       
          {respositories.map(repository => (
            <li key={repository.id}>
              {repository.title}                      
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>              
            </li>
          ))}
        </ul>      
      </div>
    </>
  );
}

export default App;
