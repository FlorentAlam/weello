import React from 'react';
import { connect } from 'react-redux';
import { updateList } from '../../../../redux/actions/tableaux';
import { checkInput } from '../../utils/inputFunctions';

class ListeTitle extends React.Component{
    constructor(){
        super();
        this.state = {
            titre: '',
            editable: false
        }
    }

    componentWillMount(){
        this.setState({
            titre: this.props.liste.titre
        })
    }

    onInputClick = () => {
        this.setState({
            editable: true
        })
    }

    onSubmit = (event) => {
        if(event.key === 'Enter' && checkInput(this.state.titre)){
            this.props.dispatch(updateList('titre', this.state.titre, this.props.liste))
            this.setState({
                editable: false
            });
        }
    }

    onInputChange = (event) => {
        this.setState({
            titre: event.target.value
        })
    }

    render(){
        return(
            <div className="cardTitle">
                <input onClick={this.onInputClick} onKeyPress={this.onSubmit} onChange={(event) => this.onInputChange(event)} type="text" value={this.state.titre} className={this.state.editable ? '' : 'notEditable'}/>
                <button>...</button>
            </div>
        )
    }
}

export default connect()(ListeTitle);