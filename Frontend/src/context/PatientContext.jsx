import React, { createContext, useEffect, useState } from 'react';

export const PatientContext = createContext();

function PatientContextProvider(probs) {

    const value = {
        
    }

    return (
        <div>
            <PatientContext.Provider value={value}>
                {probs.children}
            </PatientContext.Provider>
        </div>
    )
}

export default PatientContextProvider;
