import React from 'react';

const colors = ['yellowgreen', 'darkcyan', 'crimson', 'chocolate', 'gold'];

const Etiquettes = ({currentEtiquette, onChangeEtiquette}) => (
    <li>
        <h5>Etiquettes</h5>
        <div className="etiquettes__container">
            {colors.map(color => (
                <div key={color} className={color + (currentEtiquette === color ? " selectedEtiquette" : "")} onClick={() => onChangeEtiquette(color)}></div>
            ))}
        </div>

    </li>
);

export default Etiquettes;