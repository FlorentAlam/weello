import React from 'react';
import './card.css';
import { connect } from 'react-redux';
import ListeTitle from '../subComponent/ListeTitle';
import Carte from '../../Cartes/main/Carte';
import AddCarte from '../subComponent/AddCarte';
import { getOneListe, getCartes } from '../../../../redux/filters/tableaux';

class Liste extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            status: {
                carteId: '',
                cartes: null,
                createCarte: false
            }
        }
    }

    onAddCarte(){
        this.setState((prevState) => ({
            createCarte: !prevState.createCarte
        }))
    } 

    render(){
        let { liste, cartes } = this.props;
        return(
            <div className="card rounded liste">
                <ListeTitle liste={liste}/>
                <div className="liste_content">
                {
                    cartes &&
                    cartes.fromId.map(carteId => (
                        <React.Fragment key={carteId}>
                            <Carte 
                                carte={cartes[carteId]}
                                listeTitre={liste.titre}/>
                        </React.Fragment>
                    ))
                }
                </div>
                <AddCarte liste={liste}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    liste: getOneListe(state.tableaux, props.tableauId, props.listeId),
    cartes: getCartes(state.tableaux, props.tableauId, props.listeId)
})

export default connect(mapStateToProps)(Liste);