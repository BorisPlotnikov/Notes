// /src/components/Spinner.js

import React, { useEffect, useState } from 'react';
import '../css';

const Spinner = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return showSpinner ? <div className="spinner"></div> : null;
};

export default Spinner;
