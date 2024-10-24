import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from '@mui/material'
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';
import { Loading } from '../../components/ui/Loading';
import { useForm } from '../../hooks/useForm';
import { dashAxios } from '../../config/DashRcAxios';
import { useNavigate } from 'react-router-dom';

export const EditUserPage = () => {
    const { _id } = useParams();
    console.log(_id, "id del user")
    const navigate = useNavigate();
    const { getUser, state, editUser } = useContext(UserContext);

    const { formState, onInputChange, onResetForm} = useForm({
        nombre: state?.user.nombre,
        apellido: state?.user.apellido,
        email: state?.user.email,
        password: state?.user.password,
        documento: state?.user.documento,
        changepassword: state?.user.changepassword,
        rol: state?.user.rol,
        is_active: state?.user.is_active
    });
    
    useEffect( () => {
        //if(_id){
            getUser(_id);
        //}
    }, [])

    const userEdit = async () => {
        //validar
        if (formState.nombre == "" || formState.apellido == "" || formState.email == "" || formState.documento == 0 || formState.rol == "")
        {
            alert("Tiene que completar todos los datos!!!")
            return;
        }
        //esta todo OK guardo las modificaciones del User
        try {
            let modificarUser = {
                id: _id,
                nombre: formState.nombre,
                apellido: formState.apellido,
                email: formState.email,
                password: formState.documento,
                documento: formState.documento,
                changepassword: formState.changepassword,
                rol: formState.rol,
                is_active: formState.is_active
            }

            editUser(modificarUser);
            alert('Se actualizo el Usuario con exito!');
            //inicializo CustomHooks
            onResetForm();
            navigate(`/usuarios/`)
          } catch (error) {      
            console.log(error, "error")      
            const msg = error.response.data.msg;
            alert(
              "Respuesta: " + msg
            );
          }
    }

  return (
    <Paper>
        <Box padding={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ 
                        borderBottom: 2, 
                        marginLeft: 3, 
                        paddingBottom: 2,  
                        borderColor: '#ebe3e3',
                        marginBottom:  5
                    }}
                >
                    <Typography variant='h6' fontFamily={'fantasy'}>Modificar Usuario</Typography>
                    <Typography variant='caption'>Creado: {moment(state.user.created_at).format("DD/MM/YYYY hh:mm:ss") }</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="Nombre"
                        value={formState.nombre}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        id="apellido"
                        label="Apellido"
                        name="apellido"
                        autoComplete="Apellido"
                        value={formState.apellido}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="Email"
                        value={formState?.email}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        type='number'
                        required
                        fullWidth
                        id="documento"
                        label="Documento"
                        name="documento"
                        autoComplete="Documento"
                        value={formState?.documento}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="rol"
                        select
                        label="Rol"
                        name="rol"
                        value={formState?.rol}
                        onChange={ (event ) => onInputChange(event) }
                        //disabled
                    >
                        <MenuItem key={1} value={'admin'}>Administrador</MenuItem>
                        <MenuItem key={2} value={'user'}>Usuario</MenuItem>
                        <MenuItem key={3} value={'consulta'}>Consulta</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControlLabel 
                        label="Usuario Habilitado" 
                        control={
                            <Checkbox 
                                name="is_active"
                                id="is_active"
                                //defaultChecked={ formState?.is_active ? true : false}
                                checked={ formState?.is_active ? true : false}
                                value={formState?.is_active}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                //onChange={ (event ) => onInputChange(event) }
                                onClick={ (event) => onInputChange({target:{name: event.target.name, value: event.target.checked}}) }
                            />
                        } 
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button 
                        variant='contained' 
                        size='large' 
                        color='info'
                        onClick={ () => userEdit()}
                    >GUARDAR MODIFICACIONES
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Paper>
  )
}
