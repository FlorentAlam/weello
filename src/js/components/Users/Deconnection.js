import React from 'react';
import { connect } from 'react-redux';
import { unloadUser } from '../../../redux/actions/users';

class Deconnection extends React.Component{
    constructor(props){
        super(props);

        this.unloadUser = this.unloadUser.bind(this);
    }

    unloadUser(){
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.props.dispatch(unloadUser());
    }

    render(){
        return (
            <li>
                <ul onClick={this.unloadUser}>Se déconnecter</ul>
            </li>
        )
    }
}

export default connect()(Deconnection);