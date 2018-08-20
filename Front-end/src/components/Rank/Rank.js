import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div className="Rank__container">
            <p className="Rank__container-text">{`${name}, your current rank is...`}</p>
            <p className="Rank__container-rank">{entries}</p>
        </div>
    );
}

export default Rank;