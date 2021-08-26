import React from 'react'

type RepositoryProps = {
    repositorio: {
        name: string;
        description: string;
        html_url: string;
    }
}

const Repositorio = (props: RepositoryProps) => {
    return (
        <li>
            <h3>{props.repositorio.name}</h3>
            <p>{props.repositorio.description ?? 'Sem descrição.'}</p>
            <a href={props.repositorio.html_url}>Ir para o repositório</a>
        </li>
    ) 
        
    
}

export default Repositorio
