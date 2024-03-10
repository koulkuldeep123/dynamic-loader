import React from 'react';
import { Link } from 'react-router-dom';
import {DashboardProps} from "../common-type.ts";
import ListItem from "../list-item/list-item.tsx";

const Dashboard: React.FC<DashboardProps> = ({ favorites }) => {
    return (
        <div className="container">
            <h1>Dashboard</h1>
            <Link className="link" to="/list">Go to List</Link>
            <>
                {favorites.map(item => (
                    <div className="list-item" key={item.id}>
                        <ListItem url={item.url} id={item.id} title={item.title} />
                    </div>
                ))}
            </>
        </div>
    );
};

export default Dashboard;