import React from 'react';

const ImageLinkForm = (props) => {
    return (
        <div className="ImageLinkForm__container">
            <p className='ImageLinkForm__container-paragraph'>
                This Magic Brain will detact faces in your pictures. Give it a try
            </p>
            <div className='ImageLinkForm__container-holder'>
                <input 
                type='text'
                className="ImageLinkForm__container-input"
                onChange={props.onInputChange} />
                <button 
                    className="ImageLinkForm__container-button"
                    onClick={props.onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;