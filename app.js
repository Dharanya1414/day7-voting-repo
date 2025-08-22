import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Create Context
const VoteContext = createContext();

const VotingPage = () => {
  const { votes, setVotes } = useContext(VoteContext);

  const handleVote = (candidate) => {
    setVotes({ ...votes, [candidate]: votes[candidate] + 1 });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🗳️ Voting Page</h1>
      {Object.keys(votes).map((candidate) => (
        <div key={candidate} style={{ margin: "10px" }}>
          <h3>{candidate}: {votes[candidate]}</h3>
          <button onClick={() => handleVote(candidate)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

const ResultsPage = () => {
  const { votes } = useContext(VoteContext);
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const leadingCandidate = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>📊 Results Page</h1>
      {Object.keys(votes).map((candidate) => (
        <h3 key={candidate}>{candidate}: {votes[candidate]} votes</h3>
      ))}
      <h2>🏆 Leading Candidate: {leadingCandidate}</h2>
      <h4>Total Votes: {totalVotes}</h4>
    </div>
  );
};

const App = () => {
  const [votes, setVotes] = useState({
    "Candidate A": 0,
    "Candidate B": 0,
    "Candidate C": 0,
  });

  return (
    <VoteContext.Provider value={{ votes, setVotes }}>
      <Router>
        <nav style={{ textAlign: "center", margin: "20px" }}>
          <Link to="/" style={{ margin: "10px" }}>Voting Page</Link>
          <Link to="/results" style={{ margin: "10px" }}>Results Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </VoteContext.Provider>
  );
};

export default App;
yId("root")).render(<App />);
