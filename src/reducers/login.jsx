import { LOGIN } from '../actions/actionTypes'

let initState = {
    status: 'init'
}

const login = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                status: action.status
            })
        default:
            return state;
    }
}

export default login