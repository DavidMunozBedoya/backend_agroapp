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

    return{
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