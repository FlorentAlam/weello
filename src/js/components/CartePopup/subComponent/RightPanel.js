import React from 'react';
import { connect } from 'react-redux';
import Etiquettes from './Etiquettes';
import Checklist from './Checklist';
import Echeance from './Echeance';
import { deleteItem, updateCarte } from '../../../../redux/actions/tableaux';

const RightPanel = ({dispatch, carte, onClose}) => (
    <div className="right-panel">
        <div>
            <h3>Ajouter</h3>
            <ul>
                <Etiquettes currentEtiquette={carte.etiquette} onChangeEtiquette={(etiquette) => dispatch(updateCarte('etiquette', etiquette, carte))}/>
                <Checklist carte={carte}/>
                <Echeance carte={carte}/>
            </ul>
        </div>
        <div>
            <h3>Actions</h3>
            <ul className="suppression">
                <li onClick={() => {
                    dispatch(deleteItem('carte', carte));
                    onClose();
                }}>Supprimer</li>
            </ul>
        </div>
    </div>
);

export default connect()(RightPanel);