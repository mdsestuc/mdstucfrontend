import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import { useParams } from 'react-router-dom'
import { Skeleton, Box, Button, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from '@mui/material'
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';
import { Loading } from '../../components/ui/Loading';
import { useForm } from '../../hooks/useForm';
import { dashAxios } from '../../config/DashRcAxios';
import { useNavigate } from 'react-router-dom';
import { BeneficiarioContext } from '../../contexts/BeneficiarioContext';
import { MapView } from "./MapView";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import { IMaskInput } from 'react-imask';
import { useMask } from '@react-input/mask';
import { FormatShapes } from '@mui/icons-material';

      
export const BeneficiarioAdd = () => {

    // const { _id } = useParams();
    // console.log(_id, "id del user")
    const navigate = useNavigate();
    //variables para Hooks
    let iniciarProvincia = { id: "90", 
                            nombre: "Tucumán", 
                            provincia: 'Provincia', 
                            departamento: 'Departamento',
                            localidad: 'Localidad',
                            municipio: 'Municipio',
                            genero: 'Genero',
                            estudio: 'Estudio'};
    //const { getUser, state, addUser } = useContext(UserContext);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        //const currentIndex = checked.indexOf(value._id);
        const currentIndex = checked.findIndex((progra) => progra === value._id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value._id);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const { state, 
            getBeneficiarios, 
            getProvincias, 
            getDepartamentos,
            getLocalidades,
            getMunicipios,
            getGenero,
            addBeneficiario,
            getEstudios,
            getProgramasociales,
             } = useContext(BeneficiarioContext);

    const { formState, onInputChange, addProvisetForm, onResetForm, addLatyLon} = useForm({
        nombre: "",
        apellido: "",
        documento: "",
        idprovincia: "",
        provincia: "",
        iddepartamento: "",
        departamento: "",
        idmunicipio: "",
        municipio: "", 
        idlocalidad: "",
        localidad: "",
        domicilio: "",
        numero: "",
        piso: "",
        cp: "",
        idsexo: "",
        genero: "",
        idestudio: "",
        estudio: "",
        jubilacion: "No",
        pension: "No",
        //observaciones: "",
        fechanacimiento: moment().format("YYYY-MM-DD") ,
        nrocel1: "+549",
        nrocel2: "+549",
        latitud: "0",
        longitud: "0"        
    });

    //const inputRefdocu = useMask({ mask: '__.___.___', replacement: { _: /\d/ } });
    const inputRefcel1 = useMask({ mask: '+549__________', replacement: { _: /\d/ } });
    const inputRefcel2 = useMask({ mask: '+549__________', replacement: { _: /\d/ } });

    const agregarBeneficiario = async () => {
        //validar
        if (formState.nombre == "" || formState.apellido == "" || formState.documento == 0 || formState.provincia == "" || formState.domicilio == "" || formState.numero == "" || formState.genero == "" || formState.nrocel1 == "")
        {
            alert("Tiene que completar todos los datos!!!")
            return;
        }
        //esta todo OK guardo el nuevo Beneficiario
        try {
            let newBeneficiario = {
                nombre: formState.nombre,
                apellido: formState.apellido,
                documento: formState.documento,
                idprovincia: formState.idprovincia,
                provincia: formState.provincia,
                iddepartamento: formState.iddepartamento,
                departamento: formState.departamento,
                idmunicipio: formState.idmunicipio,
                municipio: formState.municipio, 
                idlocalidad: formState.idlocalidad,
                localidad: formState.localidad,
                domicilio: formState.domicilio,
                numero: formState.numero,
                piso: formState.piso,
                cp: formState.cp,
                idsexo: formState.idsexo,
                genero: formState.genero,
                fechanacimiento: formState.fechanacimiento,
                nrocel1: formState.nrocel1,
                nrocel2: formState.nrocel2,
                latitud: formState.latitud,
                longitud: formState.longitud,
                idestudio: formState.idestudio,
                estudio: formState.estudio,
                jubilacion: formState.jubilacion,
                pension: formState.pension,
                programasocialId: checked
            }
            await addBeneficiario(newBeneficiario);
            alert('Se genero el nuevo Beneficiario con exito!');
            //inicializo CustomHooks
            onResetForm();
            navigate(`/Beneficiarios/`)
        } catch (error) {      
            console.log(error, "error")      
            const msg = error.response.data.msg;
            alert(
              "Respuesta: " + msg
            );
          }
    }
    const [coordenadas, SetCoordenadas] = useState([]);
    const BuscarLatLong = async () => {
        //validar
        if (formState.domicilio == "" || formState.numero == "" || formState.localidad == "" || formState.provincia == "" || formState.cp == "" )
            {
                alert("Tiene que completar todos los datos del domicilio!!!")
                return;
            }
        try {
        //const data = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${id}&campos=id,nombre&max=200`, {
            const data = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${formState.domicilio} ${formState.numero}, ${formState.localidad}, ${formState.provincia}, ${formState.cp}, Argentina`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const respuesta = await data.json();
            console.log(respuesta, "respuesta");
            if(respuesta.length === 0){
                alert("sin datos")

            }
            else {
                //alert("con datos");
                SetCoordenadas(respuesta);
                addLatyLon(respuesta[0].lat, respuesta[0].lon);
            }

            
        } catch (error) {
            alert(error)
        }   

    }

    useEffect( () => {        
        getProvincias();
        getDepartamentos(iniciarProvincia.id);
        getLocalidades(iniciarProvincia.id);
        getMunicipios(iniciarProvincia.id);
        getGenero();
        getEstudios();
        getProgramasociales();
        addProvisetForm(iniciarProvincia.id, iniciarProvincia.nombre, iniciarProvincia.provincia);
    }, []);

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
                    <Typography variant='h6' fontFamily={'fantasy'}>Agregar Beneficiario</Typography>
                    <Typography variant='caption'>Creado: {moment().format("DD/MM/YYYY hh:mm:ss") }</Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{
                            maxlength: 40
                        }}
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="Nombre"
                        value={formState?.nombre}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{
                            maxlength: 40
                        }}
                        id="apellido"
                        label="Apellido"
                        name="apellido"
                        autoComplete="Apellido"
                        value={formState?.apellido}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        onInput = {(e) =>{
                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,8)
                        }}
                        type='number' 
                        //inputRef={inputRefdocu} inputRefdocu
                        id="documento"
                        label="Documento"
                        name="documento"
                        autoComplete="Documento"
                        value={formState?.documento}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="provincia"
                        select
                        label="Provincia"
                        name='provincia'
                        value={formState?.provincia}
                        //onChange={ (event ) => {onInputChange(event);  }}
                    >
                        {
                        state.provincias != undefined ?
                        state.provincias.map((provi) => <MenuItem 
                            key={provi.id} 
                            value={provi.nombre}
                            onClick={ () => {
                                addProvisetForm(provi.id, provi.nombre, iniciarProvincia.provincia);
                                provi.id != state.idprovincia ? getDepartamentos(provi.id) : null ;
                                provi.id != state.idprovincia ? getLocalidades(provi.id) : null ;
                                provi.id != state.idprovincia ? getMunicipios(provi.id) : null ;
                                }
                            }
                            >
                            {provi.nombre}</MenuItem>)
                        :
                        null
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="departamento"
                        select
                        label="Departamento"
                        name='departamento'
                        value={formState?.departamento}
                    >
                        {state.departamentos.map((depa) => <MenuItem 
                            key={depa.id} 
                            value={depa.nombre}
                            onClick={ () => {addProvisetForm(depa.id, depa.nombre, iniciarProvincia.departamento);} }
                            >
                            {depa.nombre}</MenuItem>)
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="localidad"
                        select
                        label="Localidad"
                        name='localidad'
                        value={formState?.localidad}
                    >
                        {state.localidades.map((loca) => <MenuItem 
                            key={loca.id} 
                            value={loca.nombre}
                            onClick={ () => {addProvisetForm(loca.id, loca.nombre, iniciarProvincia.localidad);} }
                            >
                            {loca.nombre}</MenuItem>)
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="municipio"
                        select
                        label="Municipio"
                        name='municipio'
                        value={formState?.municipio}
                    >
                        {state.municipios.map((muni) => <MenuItem 
                            key={muni.id} 
                            value={muni.nombre}
                            onClick={ () => {addProvisetForm(muni.id, muni.nombre, iniciarProvincia.municipio);} }
                            >
                            {muni.nombre}</MenuItem>)
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        //maxlength = {10}
                        inputProps={{
                            maxlength: 40
                        }}
                        id="domicilio"
                        label="Domicilio"
                        name="domicilio"
                        autoComplete="Domicilio"
                        value={formState?.domicilio}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{
                            maxlength: 20
                        }}
                        id="numero"
                        label="Numero"
                        name="numero"
                        autoComplete="Numero"
                        value={formState?.numero}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        //required
                        fullWidth
                        inputProps={{
                            maxlength: 20
                        }}
                        id="piso"
                        label="Piso"
                        name="piso"
                        autoComplete="Piso"
                        value={formState?.piso}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={1.5}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{
                            maxlength: 10
                        }}
                        id="cp"
                        label="Cp"
                        name="cp"
                        autoComplete="Cp"
                        value={formState?.cp}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={2.5}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="genero"
                        select
                        label="Genero"
                        name="genero"
                        value={formState?.genero}
                        //onChange={ (event ) => onInputChange(event) }
                    >
                        {state.genero.map((gene) => <MenuItem 
                            key={gene.id} 
                            value={gene.nombre}
                            onClick={ () => {addProvisetForm(gene._id, gene.nombre, iniciarProvincia.genero);} }
                            >
                            {gene.nombre}</MenuItem>)
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        type='Date'
                        id="fechanacimiento"
                        label="Fecha nacimiento"
                        name="fechanacimiento"
                        autoComplete="Fecha nacimiento"
                        value={formState?.fechanacimiento}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        id="nrocel1"
                        label="Celular 1"
                        name="nrocel1"
                        inputRef={inputRefcel1}
                        //autoComplete="Numero Celular 1"
                        value={formState?.nrocel1}
                        onChange={ (event ) => onInputChange(event) }
                    >
                    </TextField >
                </Grid>
                <Grid item xs={12} md={2.4}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        id="nrocel2"
                        label="Celular 2"
                        name="nrocel2"
                        inputRef={inputRefcel2}
                        //autoComplete="Numero Celular 1"
                        value={formState?.nrocel2}
                        onChange={ (event ) => onInputChange(event) }
                    >
                    </TextField >
                </Grid>
                <Grid item xs={12} md={2.6}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        //required
                        fullWidth
                        id="latitud"
                        label="Latitud"
                        name="latitud"
                        autoComplete="Latitud"
                        value={formState?.latitud}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={2.6}>
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        //required
                        fullWidth
                        id="longitud"
                        label="Longitud"
                        name="longitud"
                        autoComplete="Longitud"
                        value={formState?.longitud}
                        onChange={ (event ) => onInputChange(event) }
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button 
                        variant='contained' 
                        size='large' 
                        color='info' 
                        onClick={() => BuscarLatLong()}
                    >Buscar Latitud y Longitud</Button>
                </Grid>
                <Grid item xs={12} md={12}>
                    {formState.latitud !== "0" ? 
                    <MapView latitud = {formState.latitud } longitud={formState.longitud} coordenadas={coordenadas} SetCoordenadas={SetCoordenadas} addLatyLon={addLatyLon} />
                    :
                    null
                    }                
                </Grid>   
                <Grid item xs={12} md={3}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="estudio"
                        select
                        label="Estudios"
                        name='estudio'
                        value={formState?.estudio}
                        //onChange={ (event ) => {onInputChange(event);  }}
                    >
                        {
                        state.estudios != undefined ?
                        state.estudios.map((estu) => <MenuItem 
                            key={estu.id} 
                            value={estu.nombre}
                            onClick={ () => {                                
                                addProvisetForm(estu._id, estu.nombre, iniciarProvincia.estudio);
                                }
                            }
                            >
                            {estu.nombre}</MenuItem>)
                        :
                        null
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12} md={2} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="jubilacion"
                        id="jubilacion"
                        select
                        label="Jubilacion"
                        value={formState?.jubilacion}
                        onChange={ (event ) => {onInputChange(event);  }}
                    >
                        <MenuItem key={1} value={'No'}>No</MenuItem>
                        <MenuItem key={2} value={'Si'}>Si</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={2} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pension"
                        id="pension"
                        select
                        label="Pension"
                        value={formState?.pension}
                        onChange={ (event ) => {onInputChange(event);  }}
                    >
                        <MenuItem key={1} value={'No'}>No</MenuItem>
                        <MenuItem key={2} value={'Si'}>Si</MenuItem>
                    </TextField>
                </Grid>
                {/* <Grid item xs={12} md={5} >
                    <TextField 
                        // error={state.errorMessage.length > 0 ?  true : false}
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        id="observaciones"
                        label="observaciones"
                        name="observaciones"
                        autoComplete="observaciones"
                        value={formState?.observaciones}
                        onChange={ (event ) => onInputChange(event) }
                    />

                </Grid>  */}
                <Grid item xs={12} md={5} container direction="row" justifyContent="center">
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {state.programasociales.map((value) => {
                            const labelId = `checkbox-list-label-${value._id}`;
                            return (
                            <ListItem
                                key={value._id}
                                // secondaryAction={
                                // <IconButton edge="end" aria-label="comments">
                                //     <CommentIcon />
                                // </IconButton>
                                // }
                                // disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(value)} dense="true">
                                <ListItemIcon>
                                    <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value._id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`Programa: ${value.nombre}`} />
                                </ListItemButton>
                            </ListItem>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button 
                        variant='contained' 
                        size='large' 
                        color='info' 
                        onClick={() => agregarBeneficiario()}
                    >GUARDAR</Button>
                </Grid> 
            </Grid>
        </Box>
    </Paper>
  )
}
