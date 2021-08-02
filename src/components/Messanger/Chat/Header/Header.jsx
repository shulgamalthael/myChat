import React from 'react';

const Header = ({ currentCompId, avatarUrl }) => {
    // console.log(avatarUrl);
    return(
        <>
            <img className="companion-avatar" src={avatarUrl} alt="Companion avatar" />
            <div className="companion-name">
                <p className="companion-name-text">{currentCompId}</p>
            </div>
        </>
    )
}

export default Header;