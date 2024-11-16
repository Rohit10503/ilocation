import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h1>Kaise ho, Hum aa gaye</h1>
      <Home/>

    </div>
  );
}

export default App;
