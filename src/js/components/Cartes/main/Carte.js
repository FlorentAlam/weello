import React from 'react';
import CarteContent from '../subComponent/CarteContent';

import './carte.css';

const Carte = ({ carte, listeTitre }) => (
    <div className="carte">
        <CarteContent 
            etiquette={carte.etiquette}
            carte={carte}
            listeTitre={listeTitre}
        />
    </div>
)

export default Carte;