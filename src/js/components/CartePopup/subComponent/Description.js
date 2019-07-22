import React from 'react';
import { connect } from 'react-redux';
import { updateCarte } from '../../../../redux/actions/tableaux';


class Description extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            descriptionValue: ''
        }
    }

    componentWillMount(){
        this.setState({
            descriptionValue: this.props.carte.description
        })
    }

    onChangeDescription = (event) => {
        this.setState({
            descriptionValue: event.target.value
        })
    }

    onSubmitDescription = () => {
        if(this.state.descriptionValue.length > 0){
            this.props.dispatch(updateCarte('description', this.state.descriptionValue, this.props.carte));
        }
    }

    render(){
        let { descriptionValue } = this.state;
        return (
            <div className="popup__description">
                <h3>Ajouter une description</h3>
                <textarea rows='4' placeholder="Ajoutez une description" onBlur={this.onSubmitDescription} onChange={this.onChangeDescription} value={descriptionValue}></textarea>
            </div>
        );
    }
}

export default connect()(Description);