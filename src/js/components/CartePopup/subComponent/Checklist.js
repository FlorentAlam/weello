import React from 'react';
import { connect } from 'react-redux';
import { updateCarte, toggleCheckbox } from '../../../../redux/actions/tableaux';
import CheckListItem from './CheckListItem';

class Checklist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAddItemActive: false,
            elementValue: ''
        }
    }

    onChangeItem = (event) => {
        this.setState({
            elementValue: event.target.value
        });
    }

    onAddItemClick = () => {
        this.setState({
            isAddItemActive: true
        })
    }

    onValidateAddItem = () => {
        if(this.state.elementValue.length === 0){
            this.setState({
                isAddItemActive: false
            });
        } else {
            this.props.dispatch(updateCarte('checklist', this.state.elementValue, this.props.carte));
            this.setState({
                elementValue: '',
                isAddItemActive: false
            })
        }
        
    }

    onToggleCheck = (index) => {
        this.props.dispatch(toggleCheckbox(this.props.carte, index))
    }

    render(){
        return(
            <li>
                <h5>Checklist</h5>
                <div className="popup__checklist">
                    <div className="popup__checklist__items">
                        {this.props.carte.checklist && this.props.carte.checklist.map((item, index) => (
                            <CheckListItem item={item} index={index} onToggleCheck={this.onToggleCheck}/>
                        ))}
                    </div>
                    {this.state.isAddItemActive && <input type="text" value={this.state.elementValue} onChange={this.onChangeItem}/>}
                    {this.state.isAddItemActive && <button onClick={this.onValidateAddItem}>Valider</button>}
                    {!this.state.isAddItemActive && <button onClick={this.onAddItemClick}>Ajouter un element</button>}
                    
                </div>
            </li>
        )
    }
}

export default connect()(Checklist);