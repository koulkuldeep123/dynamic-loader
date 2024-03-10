import React from 'react';
import { Item as ItemsProps} from '../common-type.ts';

const ListItem: React.FC<ItemsProps> = ({ id, title, url }) => {

    return (
        <>
            <p>ID: {id}</p>
            <p>Title: {title}</p>
            <p><img src={url} alt={title} style={{width:'200px', height:'200px'}} /></p>
        </>);
};

export default ListItem;
