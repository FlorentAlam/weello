import uuid from 'uuid';

/*
--------------------------------------SCHEMA

state: {
    tableauId: {
        _id: tableauId,
        titre: String,
        listes: {
            listeId: {
                _id: listeId,
                fromTableau: tableauId,
                titre: String,
                cartes: {
                    carteId: {
                        id: carteId,
                        titre: String,
                        fromTableau: tableauId,
                        fromListe: listeId,
                        commentaire: String,
                        description: String,
                        echeance: String,
                        checklist: [
                            {
                                titre: String,
                                checked: Boolean
                            }
                        ]
                    }
                    fromId: [ids]
                }
            }
            fromId: [ids]
        }
    }
    fromId: [ids]
}


*/


const defaultTableauxState = {fromId: []};

const saveToLocalStorage = (state) => {
    localStorage.setItem('weelloTableaux', JSON.stringify(state));
    return state;
}

const getNewId = () => {
    return uuid();
}

const addTableau = (state, action) => {
    let { payload } = action;
    let tableauId = getNewId();
    return {
        ...state,
        [tableauId]: {
            titre: payload,
            listes: {fromId: []},
            _id: tableauId
        },
        fromId: [...state.fromId, tableauId]
    }
}

const addListe = (state, action) => {
    let { titre, tableau } = action;
    let listeId = getNewId();

    return {
        ...state,
        [tableau._id]: {
            ...state[tableau._id],
            listes: {
                ...state[tableau._id].listes,
                [listeId]: {
                    titre,
                    cartes: {fromId: []},
                    fromTableau: tableau._id,
                    _id: listeId,
                    position: state[tableau._id].listes.fromId.length
                },
                fromId: [...state[tableau._id].listes.fromId, listeId]
            }
        }
    }
}

const addCarte = (state, action) => {
    let { titre, liste } = action;
    let carteId = getNewId();

    return {
        ...state,
        [liste.fromTableau]: {
            ...state[liste.fromTableau],
            listes: {
                ...state[liste.fromTableau].listes,
                [liste._id]: {
                    ...state[liste.fromTableau].listes[liste._id],
                    cartes: {
                        ...state[liste.fromTableau].listes[liste._id].cartes,
                        [carteId]: {
                            _id: carteId, 
                            titre: titre, 
                            fromTableau: liste.fromTableau, 
                            fromListe: liste._id, 
                            etiquette: 'rgb(250, 250, 250)', //carte background color
                            checklist: [], 
                            position: state[liste.fromTableau].listes[liste._id].cartes.fromId.length
                        },
                        fromId: [...state[liste.fromTableau].listes[liste._id].cartes.fromId, carteId]
                    }
                }
            }
        }
    }
}

const updateList = (state, action) => {
    let { field, liste, value} = action;
    return {
        ...state,
        [liste.fromTableau]: {
            ...state[liste.fromTableau],
            listes: {
                ...state[liste.fromTableau].listes,
                [liste._id]: {
                    ...state[liste.fromTableau].listes[liste._id],
                    [field]: value
                }
            }
        }
    }
}

const addChecklist = (state, carte, value) => {
    return {
        ...state,
        [carte.fromTableau]: {
            ...state[carte.fromTableau],
            listes: {
                ...state[carte.fromTableau].listes,
                [carte.fromListe]: {
                    ...state[carte.fromTableau].listes[carte.fromListe],
                    cartes: {
                        ...state[carte.fromTableau].listes[carte.fromListe].cartes,
                        [carte._id]: {
                            ...state[carte.fromTableau].listes[carte.fromListe].cartes[carte._id],
                            checklist: [
                                ...state[carte.fromTableau].listes[carte.fromListe].cartes[carte._id].checklist,
                                {titre: value, checked: false}
                            ]
                        }
                    }
                }
            }
        }
    }
}

const updateChecklist = (state, action) => {
    let { carte, index } = action;

    let checklist = [...state[carte.fromTableau].listes[carte.fromListe].cartes[carte._id].checklist];
    checklist[index].checked = !checklist[index].checked;

    return {
        ...state,
        [carte.fromTableau]: {
            ...state[carte.fromTableau],
            listes: {
                ...state[carte.fromTableau].listes,
                [carte.fromListe]: {
                    ...state[carte.fromTableau].listes[carte.fromListe],
                    cartes: {
                        ...state[carte.fromTableau].listes[carte.fromListe].cartes,
                        [carte._id]: {
                            ...state[carte.fromTableau].listes[carte.fromListe].cartes[carte._id],
                            checklist
                        }
                    }
                }
            }
        }
    }
}

const updateCarte = (state, action) => {
    let { field, carte, value } = action;

    if(field === 'checklist') return addChecklist(state, carte, value);
    console.log(field, carte, value);
    return {
        ...state,
        [carte.fromTableau]: {
            ...state[carte.fromTableau],
            listes: {
                ...state[carte.fromTableau].listes,
                [carte.fromListe]: {
                    ...state[carte.fromTableau].listes[carte.fromListe],
                    cartes: {
                        ...state[carte.fromTableau].listes[carte.fromListe].cartes,
                        [carte._id]: {
                            ...state[carte.fromTableau].listes[carte.fromListe].cartes[carte._id],
                            [field]: value
                        }
                    }
                }
            }
        }
    }
}

const deleteItem = (itemType, state, item) => {
    switch(itemType){
        case 'tableau':
            let {[item._id]: removedValue, ...rest} = state;
            let newFromId = state.fromId.filter(id => id !== item._id);
            
            return {
                ...rest,
                fromId: newFromId
            };

        case 'carte':
            const { fromTableau, fromListe, _id } = item; 
            let { [_id]: keyToBeRemoved, ...carteRest } = state[fromTableau].listes[fromListe].cartes;
            let newCarteFromId = state[fromTableau].listes[fromListe].cartes.fromId.filter(id => id !== _id);
            return {
                ...state,
                [item.fromTableau]: {
                    ...state[item.fromTableau],
                    listes: {
                        ...state[item.fromTableau].listes,
                        [item.fromListe]: {
                            ...state[item.fromTableau].listes[item.fromListe],
                            cartes: {
                                ...carteRest,
                                fromId: newCarteFromId
                                }
                            }
                        }
                    }
                }
            
        default: 
            return state;
    }
}

const changeListPosition = (state, action) => {
    let { liste, currentPos, nextPos } = action;
    let hoveredListID = state[liste.fromTableau].listes.fromId.filter(listeId => state[liste.fromTableau].listes[listeId].position === nextPos)[0];
    return {
        ...state,
        [liste.fromTableau]: {
            ...state[liste.fromTableau],
            listes: {
                ...state[liste.fromTableau].listes,
                [liste._id]: {
                    ...state[liste.fromTableau].listes[liste._id],
                    position: nextPos
                },
                [hoveredListID]: {
                    ...state[liste.fromTableau].listes[hoveredListID],
                    position: currentPos
                }
            }
        }
    }
}

const tableauxReducer = (state = defaultTableauxState, action) => {
    switch(action.type){
        // Create    
        case 'ADD_TABLEAU':
            return saveToLocalStorage(addTableau(state, action));
        case 'ADD_LISTE':
            return saveToLocalStorage(addListe(state, action));
        case 'ADD_CARTE':
            return saveToLocalStorage(addCarte(state, action));
        // Read
        case 'LOAD_TABLEAUX':
            return JSON.parse(localStorage.getItem('weelloTableaux')) || state;
        // Update
        case 'UPDATE_LISTE':
            return saveToLocalStorage(updateList(state, action));
        case 'UPDATE_CARTE':
            return saveToLocalStorage(updateCarte(state, action));
        case 'TOGGLE_CHECKBOX':
            return saveToLocalStorage(updateChecklist(state, action));
        // Position change
        case 'CHANGE_LIST_POSITION':
            return saveToLocalStorage(changeListPosition(state, action));
        // Suppression
        case 'DELETE_ITEM':
            return saveToLocalStorage(deleteItem(action.itemType, state, action.item))
        default:
            return state;
    }
}

export default tableauxReducer;