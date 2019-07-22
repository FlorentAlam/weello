import React from 'react';

const ProgressBar = ({value}) => (
        <div className="progressBar__container">
            <div className="progressBar__progress" style={{width: (value + '%')}}></div>
        </div>
    );

export default ProgressBar;