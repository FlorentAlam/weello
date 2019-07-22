import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

// import Profile from './Profile';

// import { connect } from 'react-redux';

const Navigation = (props) => (
    <nav>
        <Link to='/'><h5>Weello</h5></Link>
        <div className="user__block">
                <React.Fragment>
                    {/* <Link to="/connection"><button className="connection">Connexion</button></Link>
                    <Link to="/inscription"><button className="inscription">Inscription</button></Link> */}
                </React.Fragment>
                {/* <Profile/> */}
        </div>
    </nav>
);

export default Navigation;