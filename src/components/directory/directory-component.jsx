import React from 'react';
import MenuItem from '../menu-items/menu-items-component';
import '../directory/directory.scss';
import {connect} from 'react-redux';
import {selectDirectorySections} from '../../redux/directory/directory.selectort';
import {createStructuredSelector} from 'reselect';

const Directory = ({sections}) => {
    return(
        <div className="directory-menu">
            {sections.map(({id, ...otherSectionProps}) => {
                console.log(otherSectionProps)
                return (
                <MenuItem key = {id} {...otherSectionProps}/>
            )})}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections,
})

export default connect(mapStateToProps)(Directory);