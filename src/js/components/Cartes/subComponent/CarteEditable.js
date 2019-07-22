import React from 'react';

const CarteEditable = ({titre, onChangeCarteValue, onValidateCarteValue}) => (
    <div className="rounded carte__edit__component">
        <input onChange={onChangeCarteValue} value={titre}/>
        <button onClick={onValidateCarteValue}>Enregistrer</button>
    </div>
);

export default CarteEditable;