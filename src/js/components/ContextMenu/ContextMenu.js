import React from 'react';
import './ContextMenu.css';

const ContextMenu = (props) => (
    <div className="context__menu">
        {props.children}
    </div>
);

export default ContextMenu;