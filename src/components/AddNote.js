import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import firebase from '../firebase'

class AddNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: ''
        };
    }

    componentDidMount() {
        const {history} = this.props;
        firebase.auth().onAuthStateChanged(authUser => {
            if(!authUser) history.push('/');
        });
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {authProp, history} = this.props;
        const dateMs = Date.now();
        const notesRef = firebase.database().ref(`notes/${authProp.uid}`);
        const note = {
            title: this.state.title,
            description: this.state.description,
            dateMs: dateMs
        };
        notesRef.push(note);
        this.setState({
            title: '',
            description: ''
        });
        history.push('/home');
    };

    render () {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Добавить заметку</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Название:</label>
                        <input name="title" id="title" type="text" className="form-control" value={this.state.title} onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание:</label>
                        <textarea name="description" id="description" className="form-control form-control-lg" value={this.state.description} onChange={this.handleChange} required></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary toolbar" value="Добавить"/>
                </form>
                <Link to="/home" className="btn btn-primary">Вернуться назад</Link>
            </div>
        );
    }
}

export default withRouter(AddNote)