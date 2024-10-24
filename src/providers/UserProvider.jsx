import { useReducer, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { UserReducer } from "../reducers/UserReducer"
import { dashAxios } from "../config/DashRcAxios"
import { types } from "../types/types"


const initialState = {
    isLoading: true,
    isActive: false,
    users: [],
    user: {},
    totalRows: 0,
    errorMessage: '',
    succesMessage: '',
}


export const UserProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(UserReducer,  initialState);


    const getUsers = async (page = 1) =>  {

        const limit = 25;
        //const { data } = await dashAxios.get(`users?limit=${limit}&page=${page}`);
        const { data } = await dashAxios.get(`users?limit=${limit}&page=${page}`);
        console.log(data)
                
        if(!data.users.docs){
            return dispatch({
                type: types.user.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No Existen usuarios en el sistema',
                }
            })
        };

        //canbio _id con id
        let arreglado =  data.users.docs.map( (p,i) => {
  
            // crear nueva propiedad de nombre producto{i + 1}
            p[`id`] = p._id;
            p[`name`] = p.nombre;
            // remover la propiedad actual
            //delete p.producto;
            // retornar el nuevo objeto
            return p;
          });
        
        dispatch({
            type: types.user.getUsers,
            payload:  {
                users:  data.users.docs,
                totalRows: data.users.totalPages
            }
        });
    }


    const getUser = (_id) => {
        console.log(_id, 'en el getuser')

        try {
            const user = state.users.find((item) => item._id == _id);
            console.log(user, 'pasa find del user0')
            if(!user){
                return dispatch({
                    type: types.user.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existe el usuario en el sistema',
                    }
                })
            }
            console.log('pasa find del user1')

            dispatch({
                type: types.user.getOneUser,
                payload: {
                    user
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }


    const editUser = async (modificarUser) => {

        const {
            id,
            nombre,
            apellido,
            email,
            password,
            documento,
            changepassword,
            rol,
            is_active } = modificarUser;

/*         const { data } = await dashAxios.put(`users/${_id}`, {
            dataUser,
        }); */

        const { data } = await dashAxios.put('/usuariosEdit/', {
            id,
            nombre,
            apellido,
            email,
            password,
            documento,
            changepassword,
            rol,
            is_active,
        });

        console.log(data)
    }

        
    const deleteUser = async (id) => {

        const { data } = await dashAxios.delete(`userdelete/${id}`);

        if(data){
/*             const users = state.users.filter( (item) => {
                if(item.id == id){
                    item.is_active = false
                }

                return item;
            }); */
            const users = state.users.filter ( user => user.id != id)

            dispatch({
                type: types.user.deleteUser,
                payload: {
                    users,
                }
            })
        }
    }
    const addUser = async (newUser) => {

        const {
                nombre,
                apellido,
                email,
                password,
                documento,
                changepassword,
                rol,
                is_active } = newUser;

        const { data } = await dashAxios.post('/usuariosAdd/', {
            nombre,
            apellido,
            email,
            password,
            documento,
            changepassword,
            rol,
            is_active,
          });

    }


    const activeUser = async (id, is_active) => {

        const { data }  =  await dashAxios.put(`/activeUser/`, {
            id,
            is_active,
        });

        console.log(data, "data")

        if(data){
            const users =  state.users.filter( (item) => {
                if(item.id == id){
                    item.is_active = !is_active;
                }

                return item;
            });

            dispatch({
                type: types.user.activeUser,
                payload: {
                    users
                }
            });
        }


    }

    return (
        <UserContext.Provider value={{
            state,
            getUsers,
            getUser,
            addUser,
            editUser,
            deleteUser,
            activeUser,            
        }}>
            { children }
        </UserContext.Provider>
    )

}