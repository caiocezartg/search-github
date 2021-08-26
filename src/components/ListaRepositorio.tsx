import React, { useState } from 'react'
import Repositorio from './Repositorio';

import '../styles/repository.css'

type Repository = {
    name: string;
    description: string;
    html_url: string;
}


const ListaRepositorio = () => {
    const [repositorios, setRepositorios] = useState<Repository[]>([]);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [erro, setErro] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(event: any){
        event.preventDefault();
        setIsLoading(true);

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(response => {
            if (!response.ok){
                throw Error ('Não foi possível encontrar o usuário.');
            }
            return response.json();
        })
        .then(data => {
            setRepositorios(data);
            setIsLoading(false);
            setErro(null);
        })
        .catch(error => {
            setIsLoading(false);
            setErro(error.message);
        })
    }

    return (
        <>
            <div className="header">
                <div className="container">
                    <h2><span>search</span>.Github</h2>
                    <p>Encontre aqui os últimos 20 repositórios no GitHub do usuário que você desejar!</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Insira o nome do usuário" value={nomeUsuario} onChange={event => setNomeUsuario(event.target.value)} />
                        <button type="submit">Procurar repositórios</button>
                    </form>
                </div>
            </div>
            <div className="container">
                <div className="repository-list">
                    {repositorios.length === 0 && !erro && <p>Digite um usuário do GitHub acima para começar a aparecer os repositórios!</p>}
                    {isLoading && <p className="repository-loading">Carregando...</p>}
                    {erro ? (<p>{erro}</p>) : (
                        <ul>
                        {repositorios.map((repo) => {
                            return <Repositorio key={repo.name} repositorio={repo} />
                        })}
                        </ul>  
                    )}
                </div>
            </div>

    
        </>
    )
}

export default ListaRepositorio
