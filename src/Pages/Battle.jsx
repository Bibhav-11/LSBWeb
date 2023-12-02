import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { RadialGauge } from 'react-canvas-gauges';

let mediaRecorder;
let audioChunks = [];
let audioContext;
let analyser;
let dataArray;
let visualizationId;

let previousMaxLoudnessdB = -Infinity;

const BattlePage = ({ history, location }) => {
    const {state} = useLocation();
  const { team1, team2 } = state;

// const team1 = {name: "Team1", members: ["Arun", "sanish", "parbati", "sabij", 'F']}
// const team2 = {name: "Team2", members: ["A", "B", "C", "D", 'E']}

const [currentMember, setCurrentMember] = useState(null);
const [isRecording, setIsRecording] = useState(false);
const [soundLevel, setSoundLevel] = useState(0);

const [decibels, setDecibels] = useState([]);
const [score, setScore] = useState(null);

const [team1Scores, setTeam1Scores] = useState([]);
const [team2Scores, setTeam2Scores] = useState([]);

const [isLoading, setIsLoading] = useState(false);
const [animationComplete, setAnimationComplete] = useState(false);

const [isStarted, setIsStarted] = useState(true);
const [loading, setLoading] = useState(false);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;
    mediaRecorder.start();

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    visualize();
}

function handleDataAvailable(event) {
    if (event.data.size > 0) {
        audioChunks.push(event.data);
    }
}

function handleStop() {
    mediaRecorder.stop();
    stopVisualization();
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
}

function visualize() {
    analyser.getByteFrequencyData(dataArray);
   
    // Calculate the average value instead of the maximum
const averageLoudness = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

// Convert the average loudness to dB
let averageLoudnessdB ;
if (averageLoudness > 0) {
    averageLoudnessdB =  20 * Math.log10(averageLoudness / 255) + 110;
} else {
    averageLoudnessdB = -Infinity;
}
// Update the speedometer with the dB value
setDecibels(prev => [...prev, averageLoudnessdB]);
setSoundLevel(averageLoudnessdB);
// console.log(averageLoudnessdB);
// updateSpeedometer(averageLoudnessdB);



visualizationId = requestAnimationFrame(visualize);
}

function stopVisualization() {
    cancelAnimationFrame(visualizationId);
}

function stopRecording() {
    mediaRecorder.stop();
    setIsLoading(true);

    //My Own
    // setLoading(true);
    // setIsStarted(false);

    //Calculate max scores
    const calculatedScore = Math.round(Math.max(...decibels));
    setScore(calculatedScore);
    console.log(calculatedScore);
    stopVisualization();
    if (audioContext) {
        audioContext.close();
    }

    if (team1.members.includes(currentMember)) {
        const currentIndex = team1Scores.findIndex(
          data => data.name === currentMember,
        );
        // console.log(currentIndex);
        if (currentIndex === -1) {
          setTeam1Scores(prev => [
            ...prev,
            {name: currentMember, score: calculatedScore},
          ]);
        } else
          updateTeam1ScoreAtIndex(currentIndex, {
            name: currentMember,
            score: calculatedScore,
          });
      } else {
        const currentIndex = team2Scores.findIndex(
          data => data.name === currentMember,
        );
        if (currentIndex === -1)
          setTeam2Scores(prev => [
            ...prev,
            {name: currentMember, score: calculatedScore},
          ]);
        else
          updateTeam2ScoreAtIndex(currentIndex, {
            name: currentMember,
            score: calculatedScore,
          });
  
        // console.log(team1Scores, team1Scores);
      }
}



  const handleStartRecording = () => {
    // Your logic for starting recording
    setIsRecording(true);
    setIsLoading(false);
    setAnimationComplete(false);
    setDecibels([]);
    setScore(null);
    setIsStarted(true);
    startRecording();

  };

  const handleStopRecording = () => {
      setLoading(true);
      setIsStarted(false);
  
      setIsRecording(false);
  
      setTimeout(() => setLoading(false), 3000);
    stopRecording();
    setIsLoading(true);

    //My Own
    // Your logic for stopping recording
  };

  const handleTeamWinner = () => {
    // Your logic for determining the winner
    const team1Score = team1Scores.reduce((acc, team) => acc + team.score, 0);
    const team2Score = team2Scores.reduce((acc, team) => acc + team.score, 0);
    return team1Score > team2Score
      ? {
          team1: {name: team1.name, score: team1Score},
          team2: {name: team2.name, score: team2Score},
          winnerScore: team1Scores,
        }
      : {
          team1: {name: team1.name, score: team1Score},
          team2: {name: team2.name, score: team2Score},
          winnerScore: team2Scores,
        };
  };

  const handleMemberPress = (member) => {
    setCurrentMember(member);
  };

  const updateTeam1ScoreAtIndex = (index, newValue) => {
    const newArray = [...team1Scores];

    newArray[index] = newValue;

    setTeam1Scores(newArray);
  };
  const updateTeam2ScoreAtIndex = (index, newValue) => {
    const newArray = [...team2Scores];

    newArray[index] = newValue;

    setTeam2Scores(newArray);
  };

  return (
    <div style={styles.container}>
        <div>

    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 0 }}>
        <div style={{ width: '350px', padding: '10px', backgroundColor: '#E41F1F', marginBottom: 8 }}>
          <p style={{  color: 'white', textAlign: 'center' }}>{team1.name}</p>
        </div>
        <div style={{ width: '350px', padding: '10px', backgroundColor: '#E41F1F', marginBottom: 8 }}>
          <p style={{  color: 'white', textAlign: 'center' }}>{team2.name}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: "115px" }}>
        <div style={styles.membersContainer}>
          {team1.members.map((member, index) => (
            <div
              key={index}
              style={{
                padding: '20px 20px',
                width: "150px",
                border: '1px solid #E41F1F',
                color: '#E41F1F',
                borderRadius: 5,
                marginBottom: '15px',
                position: 'relative',
                textAlign: 'center',
                cursor: 'pointer',
                ...(currentMember === member && {backgroundColor: '#E41F1F',
                color: 'white',}),
              }}
              onClick={() => handleMemberPress(member)}
              disabled={isRecording}
            >
              <span style={{ color: 'white', textAlign: 'center' }}>
                {member}
              </span>
              <span
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  color: 'white',
                }}
              >
                {loading && currentMember === member ? '' : team1Scores.find((score) => score.name === member) ? team1Scores.find((score) => score.name === member).score : ''}
              </span>
            </div>
          ))}
        </div>

         
         {isStarted ? <div style={{alignSelf: 'stretch'}}>
                <RadialGauge
                units='dB'
                title='dB'
                value={soundLevel}
                minValue={0}
                maxValue={160}
                ></RadialGauge>
          </div> : (
            <div>
                {loading ? <h1>Calculating Score</h1> : <h1>Score: {score}</h1>}
                </div>
          )}
        {/* ) (
          <div style={styles.gaugeContainer}>
            {isLoading ? (
              <span>Calculating Score</span>
            ) : (
              <span style={styles.scoreText}>Score: {score}</span>
            )}
          </div>
        ) */}

        <div style={styles.membersContainer}>
          {team2.members.map((member, index) => (
            <div
              key={index}
              style={{
                padding: '20px 20px',
                width: "150px",
                cursor: 'pointer',
                textAlign: 'center',
                border: '1px solid #E41F1F',
                color: '#E41F1F',
                borderRadius: 5,
                marginBottom: '15px',
                position: 'relative',
                ...(currentMember === member && {backgroundColor: '#E41F1F',
                color: 'white',}),
              }}
              onClick={() => handleMemberPress(member)}
              disabled={isRecording}
            >
              <span style={{ color: 'white', textAlign: 'center' }}>
                {member}
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  color: 'white',
                }}
              >
                {loading && currentMember === member ? '' : team2Scores.find((score) => score.name === member) ? team2Scores.find((score) => score.name === member).score : ''}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div >
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
          <button
            style={{
              ...styles.startButton,
              ...(currentMember ? {} : styles.disabledButton),
            }}
            onClick={handleStartRecording}
            disabled={!currentMember}
          >
            Start
          </button>
  
          <button onClick={handleStopRecording}>
            Stop
          </button>
  
          <button style={styles.stopButton} onClick={() => history.push('/FakeWinner', handleTeamWinner())}>
            Finish
          </button>
        </div>
        </div>
  );
};

const styles = {
  // Your styles object
};

export default BattlePage;
