import React, {Component} from 'react'
import firebase from "../firebase";
import NoteList from "./NoteList";
import {withRouter, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: [],
            sorted: false,
            sortedColumn: 'date'
        };
    }

    sortByColumn =(column) => {
        let sortedNotes = this.state.notes.slice().sort((a,b)=>{
            return ((a[column]>b[column]) ? 1 : -1);
        });
        this.setState({
            notes: sortedNotes,
            sorted: true
        });
    };

    handleClick = (event) =>{
        if(this.state.sorted && this.state.sortedColumn===event.target.name){
            let newSorted = this.state.notes.slice().reverse();
            this.setState({
                notes: newSorted
            });
        }
        else {
            this.sortByColumn(event.target.name);
            this.setState({
                sorted: true,
                sortedColumn: event.target.name
            });
        }
    };

    componentDidMount(){
        const {history} = this.props;
        firebase.auth().onAuthStateChanged(authUser => {
            if(!authUser) history.push('/');
        });
        const {authProp} = this.props;
        if(authProp){
        const notesRef = firebase.database().ref(`notes/${authProp.uid}`);
        notesRef.on('value', (snapshot)=>{
            let notes = snapshot.val();
            let newNotes = [];
            for(let key in notes){
                newNotes.push({
                    title: notes[key].title,
                    description: notes[key].description,
                    dateMs: notes[key].dateMs
                });
            }
            newNotes.reverse();
            this.setState({
                notes: newNotes
            });
        });}
    }

    componentWillUnmount(){
        const {authProp} = this.props;
        if(authProp){
            const {authProp} = this.props;
            const notesRef = firebase.database().ref(`notes/${authProp.uid}`);
            notesRef.off();
        }
    }

    doSingOut = () => {
        //const {history} = this.props;
        firebase.auth().signOut();
        //history.push('/');
    };

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Notes App</h1>
                    <button type="button" className="btn btn-primary float-right" onClick={this.doSingOut}>Выход</button>
                </div>
                <div className="container toolbar">
                    <div className="row">
                        <div className="col">
                            <div className="btn-group" role="group">
                                <button name="title" type="button" className="btn btn-primary" onClick={this.handleClick}>По названию</button>
                                <button name="description" type="button" className="btn btn-primary" onClick={this.handleClick}>По описанию</button>
                                <button name="dateMs" type="button" className="btn btn-primary" onClick={this.handleClick}>По дате</button>
                            </div>
                        </div>
                        <div className="col">
                                <Link to='/addnote' className="btn btn-outline-primary float-right">Добавить заметку</Link>
                        </div>
                    </div>
                </div>
                <NoteList notes={this.state.notes}/>
            </div>
        );
    }
}




export default withRouter(Home)