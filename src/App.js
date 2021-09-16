import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header/header';
import Matches from './Components/Matches/matches';

function App() {
  return (
    <Router >
      <Header />
      <Switch>
        <Route exact path="/">

        </Route>
        <Route exact path="/stats">
          <Matches />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
