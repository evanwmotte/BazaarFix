import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function PictsSlideshow({ image }) {
    
    return (
        <div className="slide-container" style={{width:"500px", height:"400px", borderRadius:"30px", boxShadow:"5px 5px 10px gray"}}>
            <Fade>
                {image.map(img =>
                    <div className="each-fade">
                        <div className="image-container" >
                            <img src={img} alt="" style={{width:"500px", height:"400px", borderRadius:"30px"}}/>
                        </div>
                    </div>
                )}
            </Fade>
        </div>
    )
}