import React, { useState, createContext, useContext } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "https://cdn.skypack.dev/react-router-dom";

// Create Context
const VoteContext = createContext();

function VoteProvider({ children }) {
  const [votes, setVotes] = useState({ A: 0, B: 0, C: 0 });

  const vote = (candidate) => {
    setVotes((prev) => ({ ...prev, [candidate]: prev[candidate] + 1 }));
  };

  return (
    <VoteContext.Provider value={{ votes, vote }}>
      {children}
    </VoteContext.Provider>
  );
}

function VotingPage() {
  const { votes, vote } = useContext(VoteContext);

  return (
    <div>
      <h1>Voting Page</h1>
      {["A", "B", "C"].map((c) => (
        <div key={c}>
          <span>Candidate {c}: {votes[c]}</span>
          <button onClick={() => vote(c)}>Vote</button>
        </div>
      ))}
      <p>
        <Link to="/results">Go to Results</Link>
      </p>
    </div>
  );
}

function ResultsPage() {
  const { votes } = useContext(VoteContext);

  const leading = Object.keys(votes).reduce((a, b) => 
    votes[a] >= votes[b] ? a : b
  );

  return (
    <div>
      <h1>Results</h1>
      <ul>
        {Object.entries(votes).map(([c, v]) => (
          <li key={c}>Candidate {c}: {v} votes</li>
        ))}
      </ul>
      <h2>Leading Candidate: {leading}</h2>
      <p>
        <Link to="/">Back to Voting</Link>
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VotingPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <VoteProvider>
    <App />
  </VoteProvider>,
  document.getElementById("root")
);
