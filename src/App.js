import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Pelicula from './Components/Pelicula/Pelicula'
import RegisterForm from './Components/RegisterForm/RegisterForm'

import './App.css';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/pelicula" exact component={Pelicula}/>
       <Route path="/registro" exact component={RegisterForm}/>
     </Switch>
   </Router>
  );
}


export default App;
