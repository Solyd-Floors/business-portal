import React from "react";
import injectUser from "../../HoC/injectUser";

const NullWhileFalsyCurrentUser = props => {
    if (!props.current_user) return null
    return props.children
}

export default injectUser(NullWhileFalsyCurrentUser)