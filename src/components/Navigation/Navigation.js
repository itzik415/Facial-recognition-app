import React from 'react';

const Navigation = (props) => {
    return (
        <nav className='navigation'>
            <p 
                onClick={() => props.onRouteChange('signin')} 
                className='navigation-signOut'>
                Sign Out</p>
        </nav>
    )
}

export default Navigation;