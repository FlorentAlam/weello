import React from 'react';
import Header from './Header';
import Description from './Description';
import Commentaire from './Commentaire';

const LeftPanel = ({carte, listeTitre, onClose}) => (
    <div className="left-panel">
        <Header listeTitre={listeTitre} carteTitre={carte.titre} onClose={onClose}/>
        <Description carte={carte}/>
        <Commentaire carte={carte}/>
    </div>
);

export default LeftPanel;