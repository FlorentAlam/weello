import React from 'react';
import { IoIosClose } from "react-icons/io";

const Header = ({carteTitre, listeTitre, onClose}) => (
    <div className="popup__header">
        <div>
            <h3>{carteTitre}</h3>
            <span>Dans la liste <b>{listeTitre}</b></span>
        </div>
        <button onClick={onClose} className="close__popup"><IoIosClose/></button>
    </div>
);

export default Header;