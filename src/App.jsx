// Crear repositorio // hacer app simple usando api// hacer un lindo css // 
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
    cosnt [team , setTeam] = useState ([]);

    useEffect(() => {
        axios.get ('http://apiclient.besoccerapps.com/scripts/api/api.php?key={{APIKEY}}&tz=Europe/Madrid&format=json&req=teams&league=1')
        .then(response => setTeams(response.data))
        .catch(error => console.error('Error ', error));
    }, []);
  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map(team =>(
            <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
