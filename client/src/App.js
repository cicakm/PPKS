import "./App.css";
import axios from "axios";

function apiCall() {
  axios.get("http://localhost:8080").then((data) => {
    console.log(data.data);
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Make API call</button>
      </header>
    </div>
  );
}

export default App;
