import React from 'react';
import './ExpertInfo.scss';

interface ExpertInfoProps {
  data?: {
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

const ExpertInfo:React.FC<ExpertInfoProps> = ({data}) => {
  return (
    <main className="expert">
      <div className="expert__container">
        <p className="expert__info">
          Клиенты видят в нем эксперта по вопросам разработки комплексных
          решений финансовых продуктов, включая такие аспекты, как
          организационная структура, процессы, аналитика и ИТ-компоненты. Он
          помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать
          процессы за счет применения новейших технологий и увеличивать продажи,
          используя самые современные аналитические инструменты. <br />
          <br /> В работе с клиентами недостаточно просто решить конкретную
          проблему или помочь справиться с трудностями. Не менее важно уделять
          внимание обмену знаниями: "Один из самых позитивных моментов — это
          осознание того, что ты помог клиенту перейти на совершенно новый
          уровень компетентности, уверенность в том, что после окончания проекта
          у клиента есть все необходимое, чтобы дальше развиваться
          самостоятельно". <br />
          <br /> Помимо разнообразных проектов для клиентов финансового сектора,
          Сорин ведет активную предпринимательскую деятельность. Он является
          совладельцем сети клиник эстетической медицины в Швейцарии,
          предлагающей инновационный подход к красоте, а также инвестором других
          бизнес-проектов.
        </p>
        <div className="expert__contacts">
          <div className="expert__contact">
            <svg>
              <use xlinkHref="images/sprite.svg#phone" />
            </svg>
            <span className="expert__contact-text">+7 (954) 333-44-55</span>
          </div>
          <div className="expert__contact">
            <svg>
              <use xlinkHref="images/sprite.svg#email" />
            </svg>
            <span className="expert__contact-text">{data?.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExpertInfo;
