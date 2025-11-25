import validator from "validator";

export const validateNoveltyCategory = (parametros) => {
    const errors = [];

    const specialCharPattern = /[!@#$%^&'*(),.?":{}|<>]/;
    const nombre = (parametros && (parametros.nombre ?? parametros.Category_Name ?? "")).toString();
    const nombreTrim = nombre.trim();

    if (!nombreTrim || validator.isEmpty(nombreTrim)) {
        errors.push("El nombre de la categoría es obligatorio.");
    } else if (!validator.isLength(nombreTrim, { min: 3, max: 50 })) {
        errors.push("El nombre de la categoría debe tener entre 3 y 50 caracteres.");
    } else if (specialCharPattern.test(nombreTrim)) {
        errors.push("El nombre de la categoría no debe contener caracteres especiales.");
    }

    return {
        errors,
        isValid: errors.length === 0
    }
}

export const validateSuppliesCategory = (parametros) => {
    const errors = [];
    const specialCharPattern = /[!@#$%^&'*(),.?":{}|<>]/;
    const nombre = (parametros && (parametros.nombre ?? parametros.Category_Name ?? "")).toString();
    const nombreTrim = nombre.trim();

    if (!nombreTrim || validator.isEmpty(nombreTrim)) {
        errors.push("El nombre de la categoría es obligatorio.");
    } else if (!validator.isLength(nombreTrim, { min: 3, max: 50 })) {
        errors.push("El nombre de la categoría debe tener entre 3 y 50 caracteres.");
    } else if (specialCharPattern.test(nombreTrim)) {
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

export function validateNovelty(data) {
    const errors = [];

    // Validacion de cantidad (que no este vacia y sea un numero)
    if (validator.isEmpty((data.Quantity || '').toString())) {
        errors.push('La cantidad es obligatoria');
    } else if (!validator.isNumeric((data.Quantity || ''))) {
        errors.push('La cantidad debe ser un numero');
    }

    // Validacion de descripcion (que no este vacia)
    if (validator.isEmpty(data.Description || '')) {
        errors.push('La descripcion es obligatoria');
    }

    // Validacion de fecha (que no este vacia y sea una fecha valida)
    if (validator.isEmpty(data.Date_Novelty || '')) {
        errors.push('La fecha es obligatoria');
    } else if (!validator.isDate(data.Date_Novelty || '')) {
        errors.push('La fecha no es valida');
    }

    return errors;
}
