import { useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthReducer } from "../reducers/AuthReducer";
import { types } from "../types/types";
import { dashAxios } from "../config/DashRcAxios";

const initialState =  {
    user: null,
    isLogged: false,
    errorMessage: '',
    isLoading: true,
}

export const AuthProvider = ({ children }) =>  {

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const login = async (email,  password) =>  {

        try {
            const { data } = await dashAxios.post('/auth/', {
                email,
                password
            });

            console.log(data.usuario, 'data user')

            localStorage.setItem('tokenRc', data.token);
    
            dispatch({
                type:  types.auth.onLogin,
                payload:  {
                    user: data.usuario
                }
            });
        } catch (error) {
            const { data }  = error.response
            console.log(data, 'data user')
            dispatch({
                type: types.auth.onLogout,
                payload: {
                    errorMessage: data.msg
                }
            })
        }
    }
    
    
    const logout = () => {
        
        localStorage.clear();

        dispatch({
            type: types.auth.onLogout,
            payload: {
                errorMessage: ''
            }
        });
    }


    const checkAuthToken = async () => {

        try {
            const token = localStorage.getItem('tokenRc');
            console.log(token, "token ingreso")
            if(!token){
                return dispatch({
                    type: types.auth.onLogout,
                    payload: {
                        errorMessage: ''
                    }
                });
            }

            console.log('devuelve review de login00000')

            const { data } = await dashAxios.get('/auth/user/review/token/');
            console.log('pasa el axios');
            console.log(data, 'devuelve review de token')
            localStorage.setItem('tokenRc', data.token);

            dispatch({
                type:  types.auth.onLogin,
                payload: {
                    user: data.usuario
                }
            });
            
        } catch (error) {
            console.log('ingresa error axios review')
            localStorage.clear();
            dispatch({
                type: types.auth.onLogout,
                payload: {
                    errorMessage: ''
                }
            });
        }
    }

    return (
        <AuthContext.Provider value={{
            state,
            login,
            logout,
            checkAuthToken,
        }}>
            { children }
        </AuthContext.Provider>
    )
}