import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//importar conponentes
import Menu from './components/Menu'
import Inicio from './components/Inicio'
import Realizar_compra from './components/Realizar_compra'
import Total_compra from './components/Total_compra'

function App() {
  return (
    <Router>
      <Menu/>

      <Switch>
        <Route exact path="/" component={Inicio}/>
        <Route exact path="/realizar_compra" component={Realizar_compra}/>
        <Route exact path="/total_compra" component={Total_compra}/>
      </Switch>
    </Router>
  );
}

export default App;