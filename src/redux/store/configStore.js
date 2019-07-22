import { createStore, combineReducers } from 'redux';

import tableauxReducer from '../reducers/tableaux';
import popupReducers from '../reducers/popup';

export default () => {
    const store = createStore(combineReducers({
        tableaux: tableauxReducer,
        popup: popupReducers
    }));

    return store;
}