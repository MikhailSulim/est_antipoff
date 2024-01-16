import './Form.scss';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { REG_EMAIL, ERRORS } from '../../utils/constants';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';

interface FormProps {
  email: string;
  password: string;
}

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<FormProps>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await dispatch(loginUser(data)).then(() => navigate('/'));
  };

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

        <input
          className="form__submit-btn"
          type="submit"
          value={`${isLoading ? 'Авторизация...' : 'Войти'}`}
        />
        <p className="form__text">
          Не зарегистрированы?<Link to="/signup"> Зарегистрироваться </Link>{' '}
        </p>
      </form>
    </main>
  );
};

export default FormLogin;
