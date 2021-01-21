
const ValidationErrors = props => {
    let errors = props.errors;
    if (!errors) errors = []
    else if (typeof(errors) === "object" && errors.length) {}
    else if (errors.list) errors = errors.list;
    else if (errors.message) errors = [ errors.message ]
    else errors = []
    return errors.map(error => props.children(error))
}

export default ValidationErrors;