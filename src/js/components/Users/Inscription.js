import React from 'react';
import { Link } from 'react-router-dom';

class Inscription extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            nom: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    onChange(event, type){
        let {value} = event.target;
        if(type === 'mail'){
            this.setState({
                email: value
            })
        } else if(type === 'password'){
            this.setState({
                password: value
            })
        } else {
            this.setState({
                nom: value
            })
        }
    }

    onCreate(){
        if(this.checkEmail() && this.checkPassword()){
            console.log(this.state)
            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    username: this.state.nom,
                    email: this.state.email,
                    password: this.state.password
                })
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
                <h1>Créer un compte Weello</h1>
                <div>ou <Link to="/connection">se connecter à votre compte</Link></div>
                <div className="user__form__content">
                    <div>
                        <label htmlFor="nom">Nom</label>
                        <input type="text" name="nom" onChange={(event) => this.onChange(event, 'nom')} value={this.state.nom}/>
                    </div>
                    <div>
                        <label htmlFor="mail">E-mail</label>
                        <input type="email" name="mail" onChange={(event) => this.onChange(event, 'mail')} value={this.state.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" onChange={(event) => this.onChange(event, 'password')} value={this.state.password}/>
                    </div>
                    <button onClick={this.onCreate}>Créer un nouveau compte</button>
                </div>
            </div>
        )
    }
}

export default Inscription;