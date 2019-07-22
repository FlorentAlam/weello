import React from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import { updateCarte } from '../../../../redux/actions/tableaux';

class Echeance extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openCalendar: false,
            selectedDate: ''
        }
    }

    onToggleCalendar = () => {
        this.setState(prevState => ({
            openCalendar: !prevState.openCalendar
        }))
    }

    onChangeDate = (date) => {
        this.setState({
            selectedDate: date
        });
    }

    onAddEcheance = () => {
        this.props.dispatch(updateCarte('echeance', this.state.selectedDate, this.props.carte));
        this.onToggleCalendar();
    }

    render(){
        let date = new Date(this.props.currentEcheance);
        date.setDate(date.getDate() + 1);
        let isEcheancePassed = new Date() >= date;
        return(
            <li className="popup__echeance">
                <h5>Echeance</h5>
                {this.props.currentEcheance && <p className={isEcheancePassed ? "echeanceTermine" : ""}>{date.toLocaleDateString()}</p>}
                {!this.state.openCalendar && <button onClick={this.onToggleCalendar}>Modifier l'écheance</button>}
                {this.state.openCalendar && <button onClick={this.onAddEcheance}>Valider cette écheance</button>}
                {this.state.openCalendar && <Calendar onChange={this.onChangeDate}/>}
            </li>
        )
    }
};

const mapStateToProps = (state, props) => ({
    currentEcheance: state.tableaux[props.carte.fromTableau].listes[props.carte.fromListe].cartes[props.carte._id].echeance || false
});

export default connect(mapStateToProps)(Echeance);