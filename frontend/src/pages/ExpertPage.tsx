import React from 'react';
import Header from '../components/Header/Header';
import ExpertInfo from '../components/ExpertInfo/ExpertInfo';

const ExpertPage: React.FC = () => {
  return (
    <div>
      <Header main={false} />
      <ExpertInfo />
    </div>
  );
};

export default ExpertPage;
