import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import ExpertInfo from '../components/ExpertInfo/ExpertInfo';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { getExpertById } from '../redux/expertsSlice';
import { RootState } from '../redux/store';
import Preloader from '../components/Preloader/Preloader';

const ExpertPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getExpertById(id));
  }, [dispatch, id]);

  const { currentExpert, isLoadingCurrent } = useSelector(
    (state: RootState) => state.experts
  );
  return (
    <div>
      {isLoadingCurrent ? (
        <Preloader />
      ) : (
        <>
          <Header main={false} data={currentExpert} />
          <ExpertInfo data={currentExpert} />
        </>
      )}
    </div>
  );
};

export default ExpertPage;
