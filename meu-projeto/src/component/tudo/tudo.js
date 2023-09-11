import React, { useState, useEffect } from 'react';
import Projetos from '../projetos/projetos';
import Dashboard from '../dashboard/Dashboard';

function Tudo() {
    const isAuthenticated = true; 
  
    return (
      <div>

        {isAuthenticated && <Projetos />}
  
        {isAuthenticated && (
            <div>
            <Dashboard/>
           
          </div>
        )}
      </div>
    );
}

export default Tudo;