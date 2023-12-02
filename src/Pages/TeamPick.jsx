import React, { useState } from 'react';
import Input from '../Components/Input';
import { useNavigate } from 'react-router-dom';

const numTeamsData = [3, 4, 5, 6, 7, 8, 9, 10];

const TeamPickPage = ({ history }) => {

  const navigate = useNavigate();

  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const [team1Num, setTeam1Num] = useState(5);
  const [team2Num, setTeam2Num] = useState(5);

  console.log(team1Num, team2Num);

  const startTeamSelect = () => {
    // Navigate to the TeamSelectPage with selected team names and player counts
    // history.push({
    //   pathname: '/team-select',
    //   state: {
    //     team1: { name: team1Name },
    //     team2: { name: team2Name },
    //     team1Num: team1Num,
    //     team2Num: team2Num,
    //   },
    // });

    navigate('/team-select', { state: { team1: { name: team1Name },
    team2: { name: team2Name },
    team1Num: team1Num,
    team2Num: team2Num, } });
  };


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: "center"}}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Team Pick Phase</h1>

      {/* Team 1 Name Input */}
      <div style={{ marginBottom: 30, display: 'flex', flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', width: '80%', margin: '0 auto' }}>
        <div>
          <label style={{  color: 'white', marginBottom: 10, display: 'block' }}>Team 1 Name:</label>
          <Input text="Place your team name" value={team1Name} selectedValue={setTeam1Name} />
        </div>
        <div>
          <label style={{  color: 'white', marginBottom: 10, display: 'block' }}>Team 2 Name:</label>
          <Input text="Place your team name" value={team2Name} selectedValue={setTeam2Name} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginBottom: 30 }}>
        <div>
          <label style={{ color: 'white', marginBottom: "10px", display: 'block' }}>Number of Players for Team 1</label>
          <select
            style={{width: '100%',padding: '10px 20px' }}
            value={team1Num}
            onChange={(e) => setTeam1Num(Number(e.target.value))}
          >
            {numTeamsData.map((number, index) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: 'white', marginBottom: "10px", display: 'block' }}>Number of Players for Team 2</label>
          <select
            style={{width: '100%',padding: '10px 20px' }}
            value={team2Num}
            onChange={(e) => setTeam2Num(Number(e.target.value))}
          >
            {numTeamsData.map((number, index) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Start Team Select Button */}
      <button
        style={{
          textTransform: 'uppercase',
          color: 'white',
          backgroundColor: '#E41F1F',
          fontSize: '1.2rem',
          padding: '8px 20px',
          borderRadius: 2,
          marginBottom: 30,
          textAlign: 'center'
        }}
        onClick={startTeamSelect}
      >
        Start Team Select
      </button>
    </div>
  );
};

export default TeamPickPage;
