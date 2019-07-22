import React from 'react';
import Liste from '../../Listes/main/Liste';
import AddListe from '../subComponent/AddListe';
import { connect } from 'react-redux';
import Draggable from '../../Draggable/Draggable';
import CartePopup from '../../CartePopup/main/CartePopup';
import { closePopUp } from '../../../../redux/actions/popup';
import { getTableau } from '../../../../redux/filters/tableaux';

class Tableau extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCarte: '',
            tableau: {},
            tableauLoaded: false,
            key: 0,
            hoveredItemTranslation: 0,
            hoveredItemPosition: ''
        }
    }

    componentDidMount(){
        this.setState({
            tableau: this.props.tableaux,
            key: Math.random()
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            tableau: props.tableaux,
            key: Math.random()
        })
    }

    itemIsHovered = (movingItemPosition, hoveredItemPosition) => {
        if(movingItemPosition < hoveredItemPosition){
            this.setState({
                hoveredItemPosition: hoveredItemPosition,
                hoveredItemTranslation: -20
            });
        } else if(movingItemPosition > hoveredItemPosition){
            this.setState({
                hoveredItemPosition: hoveredItemPosition,
                hoveredItemTranslation: 20
            })
        }
        
    }

    reinitTranslation = () => {
        this.setState({
            hoveredItemTranslation: 0
        });
    }

    

    render(){
        let { tableau } = this.props;
        let listes = tableau.listes.fromId.sort((currentKey, nextKey) => { 
            return tableau.listes[currentKey].position - tableau.listes[nextKey].position
        });
        return(
            <div className="tableau" key={this.state.key} onContextMenu={this.onOpenContext}>
                {
                    tableau.listes &&
                    listes.map((listeID, index) => (
                        <Draggable reinitTranslation={this.reinitTranslation} key={index} translation={index === this.state.hoveredItemPosition ? this.state.hoveredItemTranslation : 0} position={tableau.listes[listeID].position} item={tableau.listes[listeID]} itemIsHovered={(hoveredPosition) => this.itemIsHovered(tableau.listes[listeID].position, hoveredPosition)}>
                            <Liste 
                                liste={tableau.listes[listeID]}
                                listeId={listeID}
                                tableauId={this.props.match.params.id}
                            />
                        </Draggable>
                    ))
                }
                    <div><AddListe tableau={tableau} tableId={this.props.match.params.id} onAddListe={this.onAddListe}/></div>
                    {this.props.popup.isOpen && <CartePopup carte={this.props.popup.carte} listeTitre={this.props.popup.listeTitre} onClose={() => this.props.dispatch(closePopUp())}/>}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        tableau: getTableau(state.tableaux, props.match.params.id),
        popup: state.popup
    }
};

export default connect(mapStateToProps)(Tableau);