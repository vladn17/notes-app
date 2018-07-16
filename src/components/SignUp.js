import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import firebase from '../firebase'
import './style.css'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const {history} = this.props;
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                firebase.database().ref(`users/${authUser.user.uid}`).set({email:this.state.email});
                this.setState({
                    email: '',
                    password: ''
                });
                history.push('/home');
            })
            .catch( error => {
            alert(error.message);
        });
    }

    render() {
        const disabled = this.state.password === '' || this.state.email === '';
        return (
            <div className="container">
                <div className="absolute-center">
                    <div><h1 className="display-3 text-center">Note App</h1></div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">E-mail:</label>
                            <input name="email" id="email" type="email" className="form-control"
                                   value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input name="password" id="password" type="password" className="form-control"
                                   value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <input type="submit" className="btn btn-primary" disabled={disabled} value="Зарегистрироваться"/>
                    </form>
                    <p className="text-center"><Link to="/">Вернуться на страницу входа</Link></p>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp)