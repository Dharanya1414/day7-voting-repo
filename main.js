const { useState, createContext, useContext } = React;
const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

// Context for votes
const VoteContext = createContext();

function VoteProvider({ children }) {
  const [votes, setVotes] = useState({ A: 0, B: 0, C: 0 });

  const addVote = (candidate) => {
    setVotes((prev) => ({ ...prev, [candidate]: prev[candidate] + 1 }));
  };

  return (
    <VoteContext.Provider value={{ votes, addVote }}>
      {children}
    </VoteContext.Provider>
  );
}

// Voting Page
function VotingPage() {
  const { votes, addVote } = useContext(VoteContext);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🗳️ Voting App</h1>
      {["A", "B", "C"].map((c) => (
        <div key={c} style={{ margin: "10px" }}>
          <h2>Candidate {c}</h2>
          <p>Votes: {votes[c]}</p>
          <button onClick={() => addVote(c)}>Vote</button>
        </div>
      ))}
      <Link to="/results">Go to Results ➡️</Link>
    </div>
  );
}

// Results Page
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>📊 Results</h1>
      <p>Candidate A: {votes.A}</p>
      <p>Candidate B: {votes.B}</p>
      <p>Candidate C: {votes.C}</p>
      <h2>🏆 Leading Candidate: {leader}</h2>
      <Link to="/">⬅️ Back to Voting</Link>
    </div>
  );
}

// App with Router
function App() {
  return (
    <VoteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </VoteProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
