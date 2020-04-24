import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './Login'
import { Dashboard } from './Dashboard'
import { Profile } from './Profile'
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';



class Main extends React.Component {
   
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/login" component={Login} />
                                <Route path="/profile" component={Profile} />
                                <Route path="/signup" component={SignUp} />
                                <Route exact path="/" component={Home} />
                            </div>
                        </Router>
                    </div>
                </div> 
            </div>
        );
    }
}

export { Main };