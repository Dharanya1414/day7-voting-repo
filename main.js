const { useState, createContext, useContext } = React;
const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

// --- Context to share votes globally ---
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

function useVotes() {
  return useContext(VoteContext);
}

// --- Voting Page ---
function VotingPage() {
  const { votes, addVote } = useVotes();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Voting Page</h2>
      <p>Click a button to vote for your candidate:</p>

      <button onClick={() => addVote("A")}>Vote Candidate A</button>
      <p>Votes: {votes.A}</p>

      <button onClick={() => addVote("B")}>Vote Candidate B</button>
      <p>Votes: {votes.B}</p>

      <button onClick={() => addVote("C")}>Vote Candidate C</button>
      <p>Votes: {votes.C}</p>

      <br />
      <Link to="/results">Go to Results</Link>
    </div>
  );
}

// --- Results Page ---
function ResultsPage() {
  const { votes } = useVotes();

  const leading = Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Results Page</h2>
      <p>Candidate A: {votes.A} votes</p>
      <p>Candidate B: {votes.B} votes</p>
      <p>Candidate C: {votes.C} votes</p>
      <h3>Leading Candidate: {leading}</h3>

      <br />
      <Link to="/">Back to Voting</Link>
    </div>
  );
}

// --- App Router ---
function App() {
  return (
    <VoteProvider>
      <BrowserRouter basename="/day7-voting-repo">
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </VoteProvider>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
