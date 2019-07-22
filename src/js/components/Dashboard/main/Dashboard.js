import React from 'react';

import CreateTable from '../subComponent/CreateTable';
import TableauLink from '../subComponent/TableauLink';
import { connect } from 'react-redux';
import './Dashboard.css';

const Dashboard = ({tableaux}) => (
    <div className="dashboard">
        {
            tableaux &&
            tableaux.fromId.map((tableauId) => (
                <div className="tableauLink__container" key={tableauId}>
                    <TableauLink tableau={tableaux[tableauId]} id={tableauId}/>
                </div>
            ))
        }
        <CreateTable/>
    </div> 
)

const mapStateToProps = (state) => {
    return {
        tableaux: state.tableaux
    }
}

export default connect(mapStateToProps)(Dashboard);