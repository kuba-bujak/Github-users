import React, { useEffect, useState } from "react";
import { UserRepositories } from "./UserRepositories";
import SearchForm from "./SeachForm";
import GitHubUser from "./GitHubUser";
import RepositoryReadme from "./RepositoryReadme";
import { GraphQLClient } from "graphql-request";



export default function App() {
  const [login, setLogin] = useState('kuba-bujak');
  const [repo, setRepo] = useState('My-Portfolio');
  const [userData, setUserData] = useState()

  const query = 
    `
      query findRepos($login:String!) {
        user(login:$login) {
          login
          name
          location
          avatar_url: avatarUrl
          repositories(first:100) {
            totalCount
            nodes {
              name
            }
          }
        }
      }
    `;

    const client = new GraphQLClient(
      "https://api.github.com/graphql",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      }
    )

  useEffect(() => {
    client
      .request(query, { login })
      .then(({ user }) => user)
      .then(setUserData)
      .catch(console.error);
  }, [client, query, login]);

  const handleSearch = login => {
    if (login) return setLogin(login);
    setLogin('');
    setRepo('');
  }

  if (!login) 
    return (
      <SearchForm value={login} onSearch={handleSearch} />
    )

  if (!userData) return <p>Wczytywanie...</p>

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
