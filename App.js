import React from 'react' 
import Login from './Login'
import Dashboard from './Dashboard'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

function App(props) {
    return (
        <BrowserRouter>
            <div>                                
            <Route path="/" component={Login} exact={true} />
               <Redirect to="/dashboard" component={Dashboard}  />                
            </div>
        </BrowserRouter>
    )
}

export default App
