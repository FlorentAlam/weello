import React from 'react';
// import Deconnection from '../Users/Deconnection';

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showMenu: false
        }

        this.onSelectProfile = this.onSelectProfile.bind(this);
    }

    onSelectProfile(){
        this.setState((prevState) => {
            return {
                showMenu: !prevState.showMenu
            }
        })
    }

    render(){
        return(
            <React.Fragment>
                <div onClick={this.onSelectProfile} className="profile"></div>
                
                {
                    this.state.showMenu &&
                    <div className="profile__menu">
                        <p>Harianrhod</p>
                        <hr/>
                        <li>
                            <ul>Profil</ul>
                            <ul>Cartes</ul>
                            <ul>Paramètres</ul>
                        </li>
                        <hr/>
                        <li>
                            <ul>Aide</ul>
                            <ul>Raccourcis</ul>
                            <ul>Changer de langue</ul>
                        </li>
                        <hr/>

                        {/* <Deconnection/> */}
                    </div>
                    
                }
                
            </React.Fragment>
        )
    }
}

export default Profile;