import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Context for sharing vote data
const VoteContext = createContext();

function VotingPage() {
  const { votes, setVotes } = useContext(VoteContext);

  const handleVote = (candidate) => {
    setVotes({ ...votes, [candidate]: votes[candidate] + 1 });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Voting Page</h1>
      {Object.keys(votes).map((candidate) => (
        <div key={candidate} style={{ margin: "10px" }}>
          <h3>{candidate}: {votes[candidate]} votes</h3>
          <button onClick={() => handleVote(candidate)}>Vote {candidate}</button>
        </div>
      ))}
      <br />
      <Link to="/results">Go to Results</Link>
    </div>
  );
}

function ResultsPage() {
  const { votes } = useContext(VoteContext);
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const leader = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Results Page</h1>
      {Object.keys(votes).map((candidate) => (
        <h3 key={candidate}>
          {candidate}: {votes[candidate]} votes
        </h3>
      ))}
      <h2>Total Votes: {totalVotes}</h2>
      <h2>Leading Candidate: {leader}</h2>
      <br />
      <Link to="/">Back to Voting</Link>
    </div>
  );
}

export default function App() {
  const [votes, setVotes] = useState({
    "Candidate A": 0,
    "Candidate B": 0,
    "Candidate C": 0,
  });

  return (
    <VoteContext.Provider value={{ votes, setVotes }}>
      <Router>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </VoteContext.Provider>
  );
}

