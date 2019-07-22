import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import ContextMenu from '../../ContextMenu/ContextMenu';

import { MdDeleteForever } from 'react-icons/md';
import { deleteItem } from '../../../../redux/actions/tableaux';

class TableauLink extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isContextOpen: false
        }
    }

    onOpenContext = (event) => {
        event.preventDefault();
        this.setState({
            isContextOpen: true
        })
    }

    onCloseContext = () => {
        this.setState({
            isContextOpen: false
        })
    }

    render(){
        let tableau = this.props.tableau;
        let id = this.props.id;
        return (
            <React.Fragment>
                <Link to={"/projet/" + id} onContextMenu={this.onOpenContext}>
                    <button className="dashboard__table-select-button">{ tableau.titre }</button>
                </Link>
                {this.state.isContextOpen && (
                    <ContextMenu>
                        <div><MdDeleteForever/><button onClick={() => this.props.dispatch(deleteItem('tableau', tableau))}>Supprimer</button></div>
                    </ContextMenu>
                )}
            </React.Fragment>
        )
    }
};

export default connect()(TableauLink);