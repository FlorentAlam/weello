import React from 'react';

import AddTableau from './AddTableau';

class CreateTable extends React.Component{
    constructor(props){
        super(props);
        this.state = { createTable: false }
    }

    onCreateTable = () => {
        this.setState((prevState) => ({
            createTable: !prevState.createTable
        }));
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.createTable
                    ? <AddTableau onCreateTable={this.onCreateTable} onValidateCreation={this.onCreateTable}/>
                    : <button className="dashboard__add-table__button" onClick={this.onCreateTable}>Créer un projet</button>
                }
            </React.Fragment>
        )
    }
}

export default CreateTable;