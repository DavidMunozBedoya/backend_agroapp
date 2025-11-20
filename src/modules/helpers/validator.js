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