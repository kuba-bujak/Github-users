import React, { useState } from "react";
import { UserRepositories } from "./UserRepositories";
import SearchForm from "./SeachForm";
import GitHubUser from "./GitHubUser";
import RepositoryReadme from "./RepositoryReadme";

export default function App() {
  const [login, setLogin] = useState('kuba-bujak');
  const [repo, setRepo] = useState('My-Portfolio');

  const handleSearch = login => {
    if (login) return setLogin(login);
    setLogin('');
    setRepo('');
  }

  if (!login) 
    return (
      <SearchForm value={login} onSearch={handleSearch} />
    )

  return (
    <>
      <SearchForm  value={login} onSearch={setLogin} />
      <GitHubUser  login={login} />
      <UserRepositories 
        login={login}
        repo={repo}
        onSelect={setRepo}
      />
      <RepositoryReadme login={login} repo={repo} />
    </>
  )
}
