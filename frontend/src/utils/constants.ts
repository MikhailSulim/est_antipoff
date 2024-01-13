export const EXPERTS_BASE_URL: string = 'https://reqres.in/api/users?page=2';
export const REG_EMAIL: RegExp = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;


interface Errors {
    [key: string]: string
}

export const ERRORS: Errors = {
    REQUIRED: 'Поле обязательно для заполнения',
    NAME: 'Минимальная длина имени 2 символа',
    EMAIL: 'Некорректный адрес электронной почты',
    PASSWORD: 'Минимальная длина пароля 8 символов',
    CONFIRM: 'Пароли не совпадают'
}