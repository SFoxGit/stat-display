import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header/header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">

        </Route>
        <Route exact path="/stats">

        </Route>
      </Switch>
    </Router>
  );
}

export default App;
