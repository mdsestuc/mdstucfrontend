import { types } from "../types/types";

export const AuthReducer = (state={}, action ) => {

        switch (action.type) {

            case types.auth.onLogin:
                console.log(action.payload, 'reducre onlogin')
                console.log(action.payload.user, 'reducre onlogin')
                return {
                    ...state,
                    user: action.payload.user,
                    isLogged: true,
                    errorMessage: '',
                    isLoading: false
                };

            case types.auth.onLogout:
                return {
                    ...state,
                    user: null,
                    isLogged: false,
                    errorMessage: action.payload.errorMessage,
                    isLoading: false
                };
        
            default:
                return state;
        }

}