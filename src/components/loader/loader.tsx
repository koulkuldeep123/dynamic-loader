import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader">
            <div className="loader-inner"></div>
        </div>
    );
};
export default React.memo(Loader);