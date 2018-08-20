import React from 'react';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="faceRecognition__container">
            <div className='faceRecognition__container-div'>
                <img 
                    id='inputImage' 
                    className="faceRecognition__container-image" 
                    alt='' 
                    src={imageUrl} />
                <div 
                    className='faceRecognition__container-boundingBox'
                    style={{top: box.topRow, 
                            right: box.rightCol, 
                            bottom: box.bottomRow, 
                            left: box.leftCol}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;