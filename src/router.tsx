import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';



export default function Router() {

  return  (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
    </BrowserRouter>
  )

}