
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DiatRouter from './DiatRouter';




function App() {
console.log(process.env.REACT_APP_SUPABSE_KEY)
  return (
    <div className="App">
      <DiatRouter/>
    </div>
  );
}

export default App;
