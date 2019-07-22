import React from 'react';
import { connect } from 'react-redux';
import { addCardToList } from '../../../../redux/actions/tableaux';
import { checkInput } from '../../utils/inputFunctions';

class AddCarte extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editable: false,
            value: ''
        }
    }

    onValueChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    onToggleEditable = () => {
        this.setState((prevState) => ({
            editable: !prevState.editable
        }))
    }

    onValidateCarte = () => {
        if(checkInput(this.state.value)){
            this.props.dispatch(addCardToList(this.props.liste, this.state.value));
            this.setState({
                editable: false,
                value: ''
            });
        }
        
    }

    render(){
        return(
            <div className="addAction">
                {
                    this.state.editable
                    ?   <div className="addActionInput">
                            <input type='text' onChange={this.onValueChange} value={this.state.value}/>
                            <div>
                                <button className="addButton rounded" onClick={this.onValidateCarte}>Ajouter</button>
                                <button className="closeButton" onClick={this.onToggleEditable}>X</button>
                            </div>
                        </div>
                    :   <button className="cardAddAction" onClick={this.onToggleEditable}>Ajouter une action</button>
                }
            </div>
        )
    }
}

export default connect()(AddCarte);