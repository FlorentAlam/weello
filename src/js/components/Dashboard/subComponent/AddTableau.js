import React from 'react';

import { connect } from 'react-redux';
import { addTableau } from '../../../../redux/actions/tableaux';
import { checkInput } from '../../utils/inputFunctions';

class AddTableau extends React.Component{
    constructor(props){
        super(props);
        this.state = { titre: '' }
    }

    onChangeTitre = (event) => {
        this.setState({
            titre: event.target.value
        })
    }

    onSubmitTable = () => {
        if(checkInput(this.state.titre)){
            this.props.dispatch(addTableau(this.state.titre));
            this.props.onValidateCreation();
        } 
        
    }

    render(){
        return(
            <div className="dashboard__add-table__form">
                <input 
                    onChange={this.onChangeTitre} 
                    value={this.state.titre} 
                    placeholder="Titre"
                    className="rounded"
                />
                <button 
                    onClick={this.onSubmitTable}
                    className="rounded"
                >Créer ce projet</button>
            </div>
        )
    }
};

export default connect()(AddTableau);