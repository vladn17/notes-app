import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Home from './Home'
import AddNote from './AddNote'
import firebase from "../firebase";
import PasswordReset from './PasswordReset'




class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            authUser: null
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(authUser => {
            authUser ? this.setState({authUser: authUser}) : this.setState({authUser: null})
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={()=> <SignIn authProp={this.state.authUser}/>}/>
                    <Route exact path="/signup" component={()=> <SignUp authProp={this.state.authUser}/>}/>
                    <Route exact path="/home" component={()=> <Home authProp={this.state.authUser}/>}/>
                    <Route exact path="/addnote" component={()=> <AddNote authProp={this.state.authUser}/>}/>
                    <Route exact path="/password-reset" component={()=> <PasswordReset/>}/>
                </div>
            </Router>
        );
    }
}




export default App