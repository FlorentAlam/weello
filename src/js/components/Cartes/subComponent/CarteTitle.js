import React from 'react';
import ProgressBar from './ProgressBar';
import { connect } from 'react-redux';
import { openPopUp } from '../../../../redux/actions/popup';

const CarteTitle = ({carte, onEditSelect, listeTitre, dispatch}) => {
    let checklist, totalOfCheckboxes, totalChecked;
    if(carte.checklist){
        checklist = carte.checklist;
        totalOfCheckboxes = checklist.length;
        totalChecked = checklist.filter(item => item.checked).length;
    }
    return(
        <div className="rounded carte__title" style={{borderColor: carte.etiquette}}>
            <p onClick={() => dispatch(openPopUp({carte, listeTitre}))}>{carte.titre}</p>
            <button className="carte__edit-button" onClick={onEditSelect}>Editer</button>
            {carte.checklist && !!carte.checklist.length && <ProgressBar value={(totalChecked/totalOfCheckboxes) * 100}/>}
        </div>
    )
} ;

export default connect()(CarteTitle);