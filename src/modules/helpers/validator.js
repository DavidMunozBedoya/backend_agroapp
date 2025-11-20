import validator from "validator";

export const validateNoveltyCategory = (parametros) => {
    const errors = [];

    const specialCharPattern = /[!@#$%^&'*(),.?":{}|<>]/;

    if (!parametros.nombre || validator.isEmpty(parametros.nombre.trim())) {
        errors.push("El nombre de la categoría es obligatorio.");
    } else if (!validator.isLength(parametros.nombre.trim(), { min: 3, max: 50 })) {
        errors.push("El nombre de la categoría debe tener entre 3 y 50 caracteres.");
    }
    else if (specialCharPattern.test(parametros.nombre)) {
        errors.push("El nombre de la categoría no debe contener caracteres especiales.");
    }

    return{
        errors,
        isValid: errors.length === 0
    }
}

export const validateSuppliesCategory = (parametros) => {
    const errors = [];
    const specialCharPattern = /[!@#$%^&'*(),.?":{}|<>]/;

    if (!parametros.nombre || validator.isEmpty(parametros.nombre.trim())) {
        errors.push("El nombre de la categoría es obligatorio.");
    } else if (!validator.isLength(parametros.nombre.trim(), { min: 3, max: 50 })) {
        errors.push("El nombre de la categoría debe tener entre 3 y 50 caracteres.");
    }
    else if (specialCharPattern.test(parametros.nombre)) {
        errors.push("El nombre de la categoría no debe contener caracteres especiales.");
    }
    return {
        errors,
        isValid: errors.length === 0
    };
}
export function validateUser(data) {

    const errors = [];

    // validacion de nombre (que no este vacio y que solo contenga letras y espacios)
    if (validator.isEmpty(data.user_name || '')) {
        errors.push('El nombre es obligatorio');
    } else if (!validator.isAlpha(data.user_name || '', 'es-ES', { ignore: ' ' })) {
        errors.push('El nombre solo puede contener letras y espacios');
    }

    // validacion de email (que no este vacio y que sea un email valido)
    if (validator.isEmpty(data.email_user || '')) {
        errors.push('El email es obligatorio');
    } else if (!validator.isEmail(data.email_user || '')) {
        errors.push('El email no es válido');
    }

    // validacion de password (que no este vacio y que tenga al menos 6 caracteres)
    if (validator.isEmpty(data.password || '')) {
        errors.push('La contraseña es obligatoria');
    } else if (!validator.isLength(data.password || '', { min: 6 })) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    // validacion del telefono (que no este vacio y que tenga solo numeros)
    const phoneNumber = (data.phone_number || '').toString();
    if (validator.isEmpty(phoneNumber)) {
        errors.push('El telefono es obligatorio');
    } else if (!validator.isNumeric(phoneNumber)) {
        errors.push('El telefono solo debe contener numeros');
    }

    return errors;
};
