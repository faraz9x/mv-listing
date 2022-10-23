import React from 'react'
import './skeleton.scss'
function Skeleton({_width,_height}) {
 
    return (
        <div className="skeleton-box" style={{width:_width,height:_height}}></div> 
    )
}

export default Skeleton
