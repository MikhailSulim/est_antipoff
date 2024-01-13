import './Form.scss';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { REG_EMAIL, ERRORS } from '../../utils/constants';

interface FormProps {
  email: string;
  password: string;
}

const FormLogin: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<FormProps>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormProps> = (data) =>
    console.log(JSON.stringify(data));

  const [isShowPwd, setIsShowPwd] = useState<boolean>(false);

  const toggleShowPwd: () => void = () => {
    setIsShowPwd(!isShowPwd);
  };

  return (
    <main className="form">
      <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form__title ">Авторизация</h2>
        <label className="form__input">
          Электронная почта
          <input
            className={`form__input-field ${
              errors?.email ? 'form__input-field-error' : ''
            }`}
            {...register('email', {
              required: ERRORS.REQUIRED,
              pattern: { value: REG_EMAIL, message: ERRORS.EMAIL },
            })}
            onChange={() => clearErrors('email')}
          />
          {errors?.email && (
            <p className="form__input-error">{errors?.email?.message}</p>
          )}
        </label>
        <label className="form__input">
          Пароль
          <div className="form__input-box">
            <input
              type={isShowPwd ? 'text' : 'password'}
              onCopy={(event) => event.preventDefault()}
              onPaste={(event) => event.preventDefault()}
              className={`form__input-field ${
                errors?.password ? 'form__input-field-error' : ''
              }`}
              {...register('password', {
                required: ERRORS.REQUIRED,
                minLength: { value: 8, message: ERRORS.PASSWORD },
              })}
              onChange={(event) => {
                clearErrors('password');
              }}
            />
            <button
              type="button"
              className={`form__input-icon ${
                isShowPwd ? 'form__input-icon_show' : 'form__input-icon_hide'
              }`}
              onClick={toggleShowPwd}
            />
          </div>
          {errors?.password && (
            <p className="form__input-error">{errors?.password?.message}</p>
          )}
        </label>

        <input className="form__submit-btn" type="submit" value="Войти" />
      </form>
    </main>
  );
};

export default FormLogin;
