
const _translated = {
    "requestBody.email must be a valid email": "Email is not valid",
    "requestBody.email is a required field": "Email is a required field",
    "requestBody.password must be at least 8 characters": "Password must be at least 8 characters",
    "requestBody.password is a required field": "Password is a required field"
}

const translated = error => {
    if (_translated[error]) return _translated[error]
    return error;
}

const ValidationErrors = props => {
    let errors = props.errors;
    if (!errors) errors = []
    else if (typeof(errors) === "object" && errors.length) {}
    else if (errors.list) errors = errors.list;
    else if (errors.message) errors = [ errors.message ]
    else errors = []
    if (typeof(props.children) === "function"){
        return errors.map(error => props.children(translated(error)))
    } else {
        if (errors.length) return props.children
    }
    return null
}

export default ValidationErrors;