export const loadTableaux = () => ({
    type: 'LOAD_TABLEAUX'
});

export const addTableau = (tableau) => ({
    type: 'ADD_TABLEAU',
    payload: tableau
});

export const addListToTableau = (tableau, titre) => ({
    type: 'ADD_LISTE',
    tableau, titre
});

export const addCardToList = (liste, titre) => ({
    type: 'ADD_CARTE',
    liste, titre
});

export const updateList = (field, value, liste) => ({
    type: 'UPDATE_LISTE',
    field, value, liste
});

export const updateCarte = (field, value, carte) => ({
    type: 'UPDATE_CARTE',
    field, value, carte
});

export const toggleCheckbox = (carte, index) => ({
    type: 'TOGGLE_CHECKBOX',
    carte, index
});

export const deleteItem = (itemType, item) => ({
    type: 'DELETE_ITEM',
    itemType, item
});

export const changeListPosition = (liste, currentPos, nextPos) => ({
    type: 'CHANGE_LIST_POSITION',
    liste, currentPos, nextPos
});