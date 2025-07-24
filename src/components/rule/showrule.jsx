import React, { useState } from 'react';
import RulesModal from './rule'
import './rule.css'

export default function ShowRulesButton(){
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='Bblock'>
      <button className = "Rbutton" onClick={() => setShowModal(true)}></button> 
      <RulesModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};
