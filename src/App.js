import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
// import MovieList from './components/MovieList/MoviesList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import ErrorScreen from './components/Error/Error';
import Chart from "./components/Stats/Stats";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
            <Navbar/>
        </header>
        {/* <div className="container"> */}
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="/stats" exact component={Chart} />
            <Route component={ErrorScreen} />
          </Switch>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
