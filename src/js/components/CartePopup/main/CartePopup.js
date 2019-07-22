import React from 'react';
import { connect } from 'react-redux'; 

import './CartePopup.css';

import LeftPanel from '../subComponent/LeftPanel';
import RightPanel from '../subComponent/RightPanel';

const CartePopup = ({listeTitre, carteRedux, onClose}) => (
    <div className="popup">
        <div className="background"></div>
        <div className="content rounded">
            <LeftPanel carte={carteRedux} listeTitre={listeTitre} onClose={onClose}/>
            <RightPanel carte={carteRedux} onClose={onClose}/>
        </div>
    </div>
    )

const mapStateToProps = (state, props) => ({
    carteRedux: state.tableaux[props.carte.fromTableau].listes[props.carte.fromListe].cartes[props.carte._id]
})

export default connect(mapStateToProps)(CartePopup);