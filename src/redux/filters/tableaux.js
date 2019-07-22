export const filterTableaux = (tableaux, id) => {
    return tableaux.filter(tableau => tableau._id === id)[0];
}

export const getTableau = (state, tableauId) => {
    return state[tableauId];
}

export const getListes = (state, tableauId) => {
    return state[tableauId].listes;
}

export const getOneListe = (state, tableauId, listeId) => {
    return state[tableauId].listes[listeId];
}

export const getCartes = (state, tableauId, listeId) => {
    return state[tableauId].listes[listeId].cartes;
}