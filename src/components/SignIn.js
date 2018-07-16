import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import firebase from '../firebase'
import './style.css'

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount(){
        const {authProp, history} = this.props;
        if(authProp){
            history.push('/home');
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const {history} = this.props;
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                this.setState({
                    email: '',
                    password: ''
                });
                history.push('/home');
            })
            .catch( error => {
                alert(error.message);
            });
    };

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
                        <input type="submit" className="btn btn-primary" disabled={disabled} value="Войти"/>
                    </form>
                    <div className="alert alert-primary signin-alert">
                        Нет аккаунта? <Link to="/signup">Регистрация</Link>
                    </div>
                    <div className="alert alert-primary signin-alert">
                        Забыли пароль? <Link to="/password-reset">Восстановить</Link>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(SignIn)