import React from 'react';
import { connect } from 'react-redux';

import CarteEditable from './CarteEditable';
import CarteTitle from './CarteTitle';
import { updateCarte } from '../../../../redux/actions/tableaux';
import { checkInput } from '../../utils/inputFunctions';

class CarteContent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            editable: false,
            titre: ''
        }
    }

    componentWillMount(){
        this.setState({
            titre: this.props.carte.titre
        })
    }

    onSaveEdition = () => {
        if(checkInput(this.state.titre)){
            this.props.dispatch(updateCarte('titre', this.state.titre, this.props.carte));
            this.setState((prevState) => ({
                editable: !prevState.editable
            }));
        } 
    }

    onEditCardValue = (event) => {
        this.setState({
            titre: event.target.value
        });
    }

    onEdit = () => {
        this.setState({
            editable: true
        });
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.state.editable
                    ? <CarteEditable onChangeCarteValue={this.onEditCardValue} onValidateCarteValue={this.onSaveEdition} titre={this.state.titre} />
                    : <CarteTitle listeTitre={this.props.listeTitre} carte={this.props.carte} titre={this.state.titre} onEditSelect={this.onEdit}/>
                }
            </React.Fragment>

        )
    }
};

export default connect()(CarteContent);