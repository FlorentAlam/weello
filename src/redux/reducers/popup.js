const initialPopupState = {isOpen: false}

const popupReducers = (state = initialPopupState, action) => {
    let newState = {...state};
    switch(action.type){
        case 'OPEN_POPUP':
            newState.isOpen = true;
            newState.carte = action.content.carte;
            newState.listeTitre = action.content.listeTitre;
            return newState;
        case 'CLOSE_POPUP':
            newState.isOpen = false;
            return newState;
        default:
            return state;
    }
}

export default popupReducers;