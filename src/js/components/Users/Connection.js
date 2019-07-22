import React from 'react';
import { Link } from 'react-router-dom';

import Erreur from './Erreur';
import { connect } from 'react-redux';
import { loadUser } from '../../../redux/actions/users';

import './users.css';

class Connection extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            erreur: false,
            erreurMessage: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onConnect = this.onConnect.bind(this);
    }

    onChange(event, type){
        let {value} = event.target;
        if(type === 'mail'){
            this.setState({
                email: value
            })
        } else {
            this.setState({
                password: value
            })
        }
    }

    onConnect(){
        if(this.checkEmail() && this.checkPassword()){
            fetch('http://localhost:3000/users/connection', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(result => {
                if(result.token){
                    this.props.dispatch(loadUser(result.user));
                    document.cookie = "token=" + result.token;
                    this.props.history.push('/');
                } else {
                    this.setState({
                        erreur: true,
                        erreurMessage: result.erreur
                    })
                }
            })
        }
    }

    checkEmail(){
        let length = this.state.email.length > 0 ? true : false;
        let arobase = this.state.email.indexOf('@') >= 0 ? true : false;
        return length && arobase;
    }

    checkPassword(){
        return this.state.password.length > 0 ? true : false
    }

    render(){
        return(
            <div className="user__form">
                <h1>Se connecter a Weello</h1>
                <div>ou <Link to="/inscription">créer un compte</Link></div>
                <div className="user__form__content">
                    {
                        this.state.erreur &&
                        <Erreur message={this.state.erreurMessage}/>
                    }
                    <div>
                        <label htmlFor="mail">E-mail</label>
                        <input type="email" name="mail" onChange={(event) => this.onChange(event, 'mail')} value={this.state.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" onChange={(event) => this.onChange(event, 'password')} value={this.state.password}/>
                    </div>
                    <button onClick={this.onConnect}>Connexion</button>
                </div>
            </div>
        )
    }
}

export default connect()(Connection);