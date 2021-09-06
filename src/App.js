import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header/header';
import MatchSelector from './Components/MatchSelector/match.selector';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">

        </Route>
        <Route exact path="/stats">
          <MatchSelector />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
