import './Form.scss';

import { useForm, SubmitHandler } from 'react-hook-form';

import { REG_EMAIL, ERRORS } from '../../utils/constants';
import authApi from '../../utils/authApi';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormProps {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const FormRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch,
  } = useForm<FormProps>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    const { name, email, password } = data;
    setIsLoading(true);
    authApi
      .register(name, email, password)
      .then(() => {
        alert('Вы успешно зарегистрировались!');
        navigate('/signin');
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  };

  const [isShowPwd, setIsShowPwd] = useState<boolean>(false);
  const [isShowPwdConfirm, setIsShowPwdConfirm] = useState<boolean>(false);

  const toggleShowPwd: () => void = () => {
    setIsShowPwd(!isShowPwd);
  };

  const toggleShowPwdConfirm: () => void = () => {
    setIsShowPwdConfirm(!isShowPwdConfirm);
  };

  return (
    <main className="form">
      <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form__title ">Регистрация</h2>

        <label className="form__input">
          Имя
          <input
            className={`form__input-field ${
              errors?.name ? 'form__input-field-error' : ''
            }`}
            {...register('name', {
              required: ERRORS.REQUIRED,
              minLength: { value: 2, message: ERRORS.NAME },
            })}
            onChange={() => clearErrors('name')}
          />
          {errors?.name && (
            <p className="form__input-error">{errors?.name?.message}</p>
          )}
        </label>

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
              className={`form__input-field ${
                errors?.password ? 'form__input-field-error' : ''
              }`}
              {...register('password', {
                required: ERRORS.REQUIRED,
                minLength: { value: 8, message: ERRORS.PASSWORD },
              })}
              onChange={() => clearErrors('password')}
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

        <label className="form__input">
          Подтвердите пароль
          <div className="form__input-box">
            <input
              type={isShowPwdConfirm ? 'text' : 'password'}
              className={`form__input-field ${
                errors?.confirm ? 'form__input-field-error' : ''
              }`}
              {...register('confirm', {
                required: ERRORS.REQUIRED,
                validate: (value) =>
                  value === watch('password') || ERRORS.CONFIRM,
              })}
              onChange={() => clearErrors('confirm')}
            />
            <button
              type="button"
              className={`form__input-icon ${
                isShowPwdConfirm
                  ? 'form__input-icon_show'
                  : 'form__input-icon_hide'
              }`}
              onClick={toggleShowPwdConfirm}
            />
          </div>
          {errors?.confirm && (
            <p className="form__input-error">{errors?.confirm?.message}</p>
          )}
        </label>

        <input
          className="form__submit-btn"
          type="submit"
          value={`${isLoading ? 'Регистрация...' : 'Зарегистрироваться'}`}
        />
        <p className="form__text">
          Зарегистрированы?<Link to="/signin"> Войти </Link>{' '}
        </p>
      </form>
    </main>
  );
};

export default FormRegister;
