import React, { useState } from 'react';
import Input from '../Components/Input';
import InputSecond from '../Components/InputSecond';
import { useLocation, useNavigate } from 'react-router-dom';

const TeamSelectPage = ({ history, location }) => {
    const navigate = useNavigate();
const {state} = useLocation();
const {team1, team2, team1Num, team2Num} = state; 
  const [selectedTeamMembers1, setSelectedTeamMembers1] = useState(Array(team1Num).fill(''));
  const [selectedTeamMembers2, setSelectedTeamMembers2] = useState(Array(team2Num).fill(''));

  console.log(selectedTeamMembers1, selectedTeamMembers2);

  const handleSelectTeam1Member = (member, index) => {
    const updatedMembers = [...selectedTeamMembers1];
    updatedMembers[index] = member;
    setSelectedTeamMembers1(updatedMembers);
  };

  const handleSelectTeam2Member = (member, index) => {
    const updatedMembers = [...selectedTeamMembers2];
    updatedMembers[index] = member;
    setSelectedTeamMembers2(updatedMembers);
  };

  return (
    <div style={{ minHeight: '100vh' ,display: 'flex', justifyContent: 'center', alignItems: "center", position: 'relative'}}>
      <h1 style={{ position: 'absolute', top: 0, fontSize: '2.5rem', marginBottom: 20  }}>Team Select Phase</h1>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 0 }}>
        <div style={{ width: 200, padding: '20px', backgroundColor: '#E41F1F', marginBottom: 8 }}>
          <p style={{  color: 'white', textAlign: 'center' }}>{team1.name}</p>
        </div>
        <div style={{ width: 200, padding: '20px', backgroundColor: '#E41F1F', marginBottom: 8 }}>
          <p style={{  color: 'white', textAlign: 'center' }}>{team2.name}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: "115px", padding: "16px" }}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {selectedTeamMembers1.map((value, index) => (
           <InputSecond index={index} text="Enter player Name" value={value} selectedValue={handleSelectTeam1Member} />
          ))}
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {selectedTeamMembers2.map((value, index) => (
            <InputSecond index={index} text="Enter player Name" value={value} selectedValue={handleSelectTeam2Member} />
          ))}
        </div>
      </div>

      <button
         style={{
            textTransform: 'uppercase',
            color: 'white',
            backgroundColor: '#E41F1F',
            fontSize: '1.2rem',
            padding: '8px 20px',
            borderRadius: 2,
            marginBottom: 30,
            textAlign: 'center',
            position: 'absolute',
            bottom: 0
          }}
        onClick={() => 
          navigate('/battle-page', {state: {
            team1: { name: team1.name, members: selectedTeamMembers1 },
            team2: { name: team2.name, members: selectedTeamMembers2 },
          }})
        }
      >
        Continue
      </button>
    </div>
  );
};

export default TeamSelectPage;
