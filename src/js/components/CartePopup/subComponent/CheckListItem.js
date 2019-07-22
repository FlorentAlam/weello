import React from 'react';

const CheckListItem = ({item, index, onToggleCheck}) => (
    <div>
        <input type="checkbox" id={item.titre} name={item.titre}
        defaultChecked={item.checked} onClick={() => onToggleCheck(index)}/>
        <label htmlFor={item.titre}>{item.titre}</label>          
    </div>
);


export default CheckListItem;