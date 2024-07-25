// Crear repositorio // hacer app simple usando api// hacer un lindo css // 
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIKEY from './utils/APIKEY/apikey';
import './App.css';

const App = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
          headers: {
            'x-rapidapi-key': APIKEY,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
          params: {
            league: '128', 
            season: '2023', 
          },
        });
        setMatches(response.data.response.slice(0, 4)); // Obténer solo 1ros 4 partidos
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="container-partidos">
      <h2>Partidos de la Copa de la Liga Profesional</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.fixture.id} className='partidos'>
            {match.teams.home.name} vs {match.teams.away.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;