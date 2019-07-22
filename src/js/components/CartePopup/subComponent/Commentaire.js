import React from 'react';
import { connect } from 'react-redux';
import { updateCarte } from '../../../../redux/actions/tableaux';


class Commentaire extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            commentaireValue: ''
        }
    }

    componentWillMount(){
        this.setState({
            commentaireValue: this.props.carte.commentaire
        })
    }

    onChangeCommentaire = (event) => {
        this.setState({
            commentaireValue: event.target.value
        })
    }

    onSubmitCommentaire = () => {
        if(this.state.commentaireValue.length > 0){
            this.props.dispatch(updateCarte('commentaire', this.state.commentaireValue, this.props.carte));
        }
    }

    render(){
        let { commentaireValue } = this.state;
        return (
            <div className="popup__commentaire">
                <h3>Ajouter un commentaire</h3>
                <textarea rows='4' placeholder="Ecrivez un commentaire" onBlur={this.onSubmitCommentaire} onChange={this.onChangeCommentaire} value={commentaireValue}></textarea>
            </div>
        );
    }
}

export default connect()(Commentaire);