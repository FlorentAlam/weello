import React from 'react';
import { connect } from 'react-redux';
import './addListe.css';
import { addListToTableau } from '../../../../redux/actions/tableaux';
import { checkInput } from '../../utils/inputFunctions';

class AddListe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            titre: '',
            inputSelected: false
        }
    }

    onChangeTitre = (event) => {
        this.setState({
            titre: event.target.value
        })
    }

    onSubmitListe = () => {
        if(checkInput(this.state.titre)){
            this.props.dispatch(addListToTableau(this.props.tableau, this.state.titre));
            this.setState({
                titre: ''
            });
            this.onSelectInput();
        }
        
    }

    onSelectInput = () => {
        this.setState((prevState) => ({
            inputSelected: !prevState.inputSelected
        }))
    }

    render(){
        return(
            <div className={this.state.inputSelected ? "addListe visible rounded" : "addListe hidden rounded"}>
                <input 
                    onFocus={this.onSelectInput} 
                    name="liste_titre" 
                    onChange={this.onChangeTitre} 
                    value={this.state.titre} 
                    placeholder="Ajouter une liste..."
                    className="rounded"
                />
                {
                    this.state.inputSelected &&
                    <div className="addListe_hidden">
                        <button className="addButton rounded" onClick={this.onSubmitListe}>Enregistrer</button>
                        <button className="closeButton" onClick={this.onSelectInput}>X</button>
                    </div>
                }
                
            </div>
        )
    }
};

export default connect()(AddListe);