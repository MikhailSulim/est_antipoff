import './Header.scss';

import React from 'react';

interface HeaderProps {
  main: boolean;
  data?: {
    imageUrl: string;
    name: string;
  };
}

const Header: React.FC<HeaderProps> = ({ main, data }) => {
  return (
    <header className="header">
      <div className="header__container">
        {main ? (
          <>
            <h1 className="header__title">Наша команда</h1>
            <p className="header__description">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.
            </p>
          </>
        ) : (
          <>
            <div className="header__partner">
              <img
                className="header__image"
                src={data?.imageUrl}
                alt="фото специалиста"
              />
              <div className="header__partner-info">
                <h2 className="header__title">sdsd</h2>
                <p className="header__role">Партнёр</p>
              </div>
            </div>
            <button type="button" className="header__btn header__btn-prev">
              Назад
            </button>
          </>
        )}

        <button type="button" className="header__btn header__btn-exit">
          Выход
        </button>
      </div>
    </header>
  );
};

export default Header;
