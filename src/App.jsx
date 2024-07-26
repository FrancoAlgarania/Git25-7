// Crear repositorio // hacer app simple usando api// hacer un lindo css // 
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIKEY from './utils/APIKEY/apikey';
import './App.css';

const App = () => {
  const [matches, setMatches] = useState([]);
  const [showResult, setShowResult] = useState ({})

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
          headers: {
            'x-rapidapi-key': APIKEY,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
          params: {
            league: '128', // ID de la Copa de la Liga Profesional
            season: '2023', // Temporada actual
            status: 'FT'
          },
        });

        // Verifica la estructura de los datos devueltos
        console.log(response.data.response);

        setMatches(response.data.response.slice(0, 4)); // Limita a los primeros 4 partidos
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchMatches();
  }, []);

  const handleResult = (id) => {
    setShowResult (prev =>({...prev, [id] : !prev[id]}))
  }

const showWinner = (match) =>{
if (match.goals.home > match.goals.away){
  return match.teams.home.name;
}else if(match.goals.home < match.goals.away){ 
  return match.teams.away.name;
}else {
  return 'Empate'
}
}

  return (
    <div className="app">
      <h2>Partidos de la Copa de la Liga Profesional</h2>
      <div className="matches">
        {matches.map((match) => (
          <div className="match-card" key={match.fixture.id}>
            <div className="team">
              <img src={match.teams.home.logo} alt={`${match.teams.home.name} logo`} width="50" height="50" />
              <span>{match.teams.home.name}</span>
            </div>
            <div className="versus">vs</div>
            <div className="team">
              <img src={match.teams.away.logo} alt={`${match.teams.away.name} logo`} width="50" height="50" />
              <span>{match.teams.away.name}</span>
            </div>
            <button className='button' onClick={() => handleResult(match.fixture.id)}>Simular partido</button> 
            {showResult[match.fixture.id] && ( 
              <div className="result"> 
                <p>{match.goals.home} - {match.goals.away}</p> 
                <p>{showWinner(match)} </p>
              </div> 
            )} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;