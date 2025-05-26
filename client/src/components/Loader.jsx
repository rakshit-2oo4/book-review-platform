import React from 'react';
import { BarLoader } from 'react-spinners'; // npm install react-spinners

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <BarLoader color="var(--primary-color)" width={150} />
        </div>
    );
};

export default Loader;