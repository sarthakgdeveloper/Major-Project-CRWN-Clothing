import React from 'react';

import {withRouter} from 'react-router-dom'

import '../menu-items/menu-items.scss';


function MenuItem({title,imageUrl,size,history,match,linkUrl }){
    console.log(linkUrl)
    return (
    <div className= {`${size?size:''} menu-item`} onClick = {() => history.push(`${match.url}${linkUrl}`)}>
        <div style = {{
        backgroundImage: `url(${imageUrl})`
        }} className="background-image"></div>
        <div className="content" >
            <h1 className="tittle">{title}</h1>
            <span className="subtittle">SHOP NOW</span>
        </div>
    </div>
    )
}

export default withRouter(MenuItem);