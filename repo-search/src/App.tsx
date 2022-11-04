import React, {useState} from 'react';
import './App.css'

import Repository, {RepoInterface} from './components/Repository'


interface userInterface {
  name: string;
  login: string;
  html_url: string;
  avatar_url: string;
  location: string;
  bio: string;
}

export default function App() {

  const username = 'arne-be'
  //state for keyword search
  const [repoName, setRepoName] = useState<string>('');
  //state for all of users repositories
  const [userRepos, setUserRepos] = useState<RepoInterface[]>([]);
  //displayed list of users repositories filtered on keyword
  const [resultList, setResultList] = useState<RepoInterface[]>([]);
  //state for data about user
  const [user, setUser] = useState<userInterface>();



  //fetching the users repositories from github api
  async function fetchRepos(){
    await fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => setUserRepos( data))
  
  }

  async function fetchUser() {
    await fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => setUser( data))
  }
  
  //filtering users repositories for kyword and setting repo equal to obtained list
  function FindRepo(value: string){
    setRepoName( value.toLowerCase());

    setResultList(userRepos.filter(item => (item.name.toLowerCase().search(repoName)) != -1));
  }

  function showList(){
    if (resultList.length === 0 && repoName === ''){
      return(
        userRepos.map(item => {return(<Repository 
          key={item.name}
          name = {item.name}
          html_url = {item.html_url}
          description = {item.description}
        />)})
      )
    } else {
      return(
        resultList.filter((item: RepoInterface) => (item.name.toLowerCase().search(repoName)) !== -1).map(item => {return(<Repository 
          key={item.name}
          name = {item.name}
          html_url = {item.html_url}
          description = {item.description}
        />)})
      )
    }
  }

  //only fetch users repositories once
  fetchRepos();
  fetchUser();

  return (
    <>
      
    <div className='SearchBar'>
      <img className='Logo' src='https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg'/>
      <input 
        className = 'Form'
        type="text"
        placeholder="Enter Repository Name..."
        onChange = {(event: any) => FindRepo( event.target.value)}
      />
    </div>
    
    <div className ='Content'>

      <div className='Profile'>
        <a href={user?.html_url}><img className='Avatar' src={user?.avatar_url}/></a>
        <a href={user?.html_url}><h1>{user?.name}</h1></a>
        <h2>{user?.location}</h2>
        <a href={user?.html_url}><h3>@{user?.login}</h3></a>
        <h2>{user?.bio}</h2>

      </div>

      <div className='Results'>

        {showList()}

      </div>

    </div>
    </>
  );
  
}
