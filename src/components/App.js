import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import routes from '../configs/routes';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import NotFound from '../screens/NotFound';


const App = props => {
  return (
      <Router>
        <Switch>
          <Route exact path={[routes.SEARCH, routes.SEARCHKEYWORD]} component={Search} />
          
          <Route exact path={routes.DETAILMOVIE} render={props => <Details {...props} isMovie />} />
          <Route exact path={routes.DETAILTV} render={props => <Details {...props} isTv />} />
          <Route exact path={routes.HOME} component={Home} />

          <Route component={NotFound} />
        </Switch>
      </Router>
  )
}

export default App