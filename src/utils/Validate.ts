const rules: { [key: string]: { regExp: RegExp, errorMessage: string} } = {
  empty: {
    regExp: /^\s*$/,
    errorMessage: 'Поле не должно быть пустым.'
  },
  first_name: {
    regExp: /^[A-ZА-ЯЁ][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage: 'Поле может содержать только латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).'
  },
  second_name: {
    regExp: /^[A-ZА-ЯЁ][A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage: 'Поле может содержать только латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).'
  },
  login: {
    regExp: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
    errorMessage: 'Поле может содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).'
  },
  email: {
    regExp: /^[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*@[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/,
    errorMessage: 'Поле может содержать латиницу, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.'
  },
  password: {
    regExp: /^.*(?=.{8,40})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
    errorMessage: 'Поле может содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
  },
  new_password: {
    regExp: /^.*(?=.{8,40})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
    errorMessage: 'Поле может содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
  },
  confirm_password: {
    regExp: /^.*(?=.{8,40})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
    errorMessage: 'Поле может содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
  },
  phone: {
    regExp: /^\+?\d{10,15}$/,
    errorMessage: 'Поле может содержать от 10 до 15 символов, состоит из цифр, может начинается с плюса.'
  },
  message: {
    regExp: /^\s*$/,
    errorMessage: 'Поле не должно быть пустым.'
  },
  display_name: {
    regExp: /[A-Za-zА-ЯЁа-яё-]*$/,
    errorMessage: 'Поле не должно быть пустым.'
  }
};

export const getValidate = (type: string, value: string): {validate: boolean, message: string} => {
  if (type !== undefined) {
    const response = {
      validate: true,
      message: ''
    };

    if (rules[type] !== undefined) {
      response.validate = (!rules.empty.regExp.test(value) && rules[type].regExp.test(value));
      if (rules.empty.regExp.test(value)) {
        response.message = rules.empty.errorMessage;
      } else if (!rules[type].regExp.test(value)) {
        response.message = rules[type].errorMessage;
      }
    } else {
      response.validate = (!rules.empty.regExp.test(value));
      if (rules.empty.regExp.test(value)) {
        response.message = rules.empty.errorMessage;
      }
    }
    return response;
  } else {
    throw new Error(`Ошибка валидации данных. Поле: ${type}, Значение: ${value}`);
  }
};
