import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import firebase from '../firebase'
import './style.css'

class PasswordReset extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
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
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({
                    email: ''
                });
                history.push('/');
            })
            .catch( error => {
                alert(error.message);
            });
    };

    render() {
        return (
            <div className="container">
                <div className="absolute-center">
                    <div>
                        <h1 className="display-3 text-center">Note App</h1>
                        <h4 className="text-center">Сброс пароля</h4>
                        <p>Введите ваш электронный адрес и мы отправим вам письмо с инструкциями по сбросу пароля</p>
                    </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">E-mail:</label>
                                <input name="email" id="email" type="email" className="form-control"
                                       value={this.state.email} onChange={this.handleChange}/>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Восстановить" disabled={this.state.email === ''}/>
                        </form>
                    <p className="text-center"><Link to="/">Вернуться на страницу входа</Link></p>
                </div>
            </div>
        )
    }
}

export default withRouter(PasswordReset)