import './MobileBtnExit.scss';

import React from 'react';


const MobileBtnExit: React.FC = () => {
  return (
    <button className="mobile-btn" onClick={()=>{}}>
      <svg>
        <use xlinkHref='/images/sprite.svg#exit' />
      </svg>
    </button>
  );
};

export default MobileBtnExit;
