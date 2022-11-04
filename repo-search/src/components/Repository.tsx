import React from "react";
import './Repository.css'

export interface RepoInterface {
  name: string;
  html_url: string;
  description: string;
}

export default function Repository ({name, html_url, description}:RepoInterface)  {    
    return (

      <>
      <div className='List'>
        <a href={html_url} ><h1><span>{name}</span></h1></a>
        <h3><span>{description}</span></h3>
      </div>
      </>


    );
  
}
