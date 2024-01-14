import './Header.scss';
import { MOBILE_SCREEN_WIDTH } from '../../utils/constants';
import { useWindowWidth } from '../../hooks/useWindowWidth';

import React, { useEffect, useState } from 'react';

interface HeaderProps {
  main: boolean;
  data?: {
    imageUrl: string;
    name: string;
  };
}

const Header: React.FC<HeaderProps> = ({ main, data }) => {
  const windowWidth = useWindowWidth();
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    windowWidth > MOBILE_SCREEN_WIDTH ? setMobile(false) : setMobile(true);
  }, [windowWidth]);

  return (
    <header className="header">
      {main ? (
        <div className="header__container">
          <h1 className="header__title">Наша команда</h1>
          <p className="header__description">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </p>
        </div>
      ) : (
        <>
          <div className="header__container">
            <div className="header__partner">
              <img
                className="header__image"
                src={data?.imageUrl}
                alt="фото специалиста"
              />
              <div className="header__partner-info">
                <h1 className="header__title">Артур Королёв</h1>
                <p className="header__role">Партнёр</p>
              </div>
            </div>
          </div>

          {mobile ? (
            <button
              type="button"
              className="header__btn-mob header__btn-mob_back"
              onClick={() => {}}
            >
              <svg>
                <use xlinkHref="/images/sprite.svg#back" />
              </svg>
            </button>
          ) : (
            <button type="button" className="header__btn header__btn_back">
              Назад
            </button>
          )}
        </>
      )}
      {mobile ? (
        <button
          type="button"
          className="header__btn-mob header__btn-mob_exit"
          onClick={() => {}}
        >
          <svg>
            <use xlinkHref="/images/sprite.svg#exit" />
          </svg>
        </button>
      ) : (
        <button type="button" className="header__btn header__btn_exit">
          Выход
        </button>
      )}
    </header>
  );
};

export default Header;
