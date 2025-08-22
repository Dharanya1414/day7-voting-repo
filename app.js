const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

// Context for vote counts
const VoteContext = React.createContext();

function App() {
  const [votes, setVotes] = React.useState({
    A: 0,
    B: 0,
    C: 0,
  });

  const totalVotes = votes.A + votes.B + votes.C;
  const leadingCandidate = Object.keys(votes).reduce((a, b) =>
    votes[a] >= votes[b] ? a : b
  );

  const addVote = (candidate) => {
    setVotes((prev) => ({ ...prev, [candidate]: prev[candidate] + 1 }));
  };

  return (
    <VoteContext.Provider value={{ votes, addVote, totalVotes, leadingCandidate }}>
      <BrowserRouter>
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Voting Page</Link>
          <Link to="/results">Results Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </VoteContext.Provider>
  );
}

function VotingPage() {
  const { addVote, votes } = React.useContext(VoteContext);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Voting Page</h2>
      {Object.keys(votes).map((candidate) => (
        <div key={candidate} style={{ margin: "10px 0" }}>
          <span>Candidate {candidate}</span>
          <button onClick={() => addVote(candidate)} style={{ marginLeft: "10px" }}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
}

function ResultsPage() {
  const { votes, totalVotes, leadingCandidate } = React.useContext(VoteContext);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Results Page</h2>
      {Object.keys(votes).map((candidate) => (
        <p key={candidate}>
          Candidate {candidate}: {votes[candidate]} votes
        </p>
      ))}
      <p>Total Votes: {totalVotes}</p>
      <h3>Leading Candidate: {leadingCandidate}</h3>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
