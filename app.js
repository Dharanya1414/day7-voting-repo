import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Context to store votes
const VoteContext = createContext();

function VotingPage() {
  const { votes, setVotes } = useContext(VoteContext);

  const handleVote = (candidate) => {
    setVotes({ ...votes, [candidate]: votes[candidate] + 1 });
  };

  return (
    <div>
      <h1>Voting Page</h1>
      <button onClick={() => handleVote("A")}>Vote Candidate A</button>
      <button onClick={() => handleVote("B")}>Vote Candidate B</button>
      <button onClick={() => handleVote("C")}>Vote Candidate C</button>

      <h2>Current Votes</h2>
      <p>Candidate A: {votes.A}</p>
      <p>Candidate B: {votes.B}</p>
      <p>Candidate C: {votes.C}</p>
    </div>
  );
}

function ResultsPage() {
  const { votes } = useContext(VoteContext);

  const totalVotes = votes.A + votes.B + votes.C;
  let leader = "No votes yet";
  if (totalVotes > 0) {
    leader = Object.keys(votes).reduce((a, b) =>
      votes[a] > votes[b] ? a : b
    );
  }

  return (
    <div>
      <h1>Results Page</h1>
      <p>Candidate A: {votes.A}</p>
      <p>Candidate B: {votes.B}</p>
      <p>Candidate C: {votes.C}</p>
      <h2>Leading Candidate: {leader}</h2>
    </div>
  );
}

export default function App() {
  const [votes, setVotes] = useState({ A: 0, B: 0, C: 0 });

  return (
    <VoteContext.Provider value={{ votes, setVotes }}>
      <Router>
        <nav>
          <Link to="/">Voting</Link> | <Link to="/results">Results</Link>
        </nav>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </VoteContext.Provider>
  );
}


