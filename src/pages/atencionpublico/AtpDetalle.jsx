import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import moment from 'moment';
import { Grid, TextField, Box, Button, ListSubheader, Typography, IconButton, Paper } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useForm } from '../../hooks/useForm';
import { dashAxios } from '../../config/DashRcAxios';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
//import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import Paper from '@mui/material/Paper';

import { red } from '@mui/material/colors';
import { Cast } from '@mui/icons-material';
import { VisitasFechas } from './VisitasFechas';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
  

export const AtpDetalle = ({index, atp, origen, actividades, rubros, experticie, deleteAtp}) => {

    const theme = useTheme();
    const [personName, setPersonName] = React.useState(()=> atp?.actividades !== null ? atp.actividades.map( (b) => b._id) : []);
    const [origenName, setOrigenName] = React.useState(()=> atp?.origen !== null ? atp.origen.map( (a) => a._id):[]);
    const [personrubro, setPersonrubro] = React.useState(()=> atp.actividades.length !== 0 ? atp.actividades[0].idrubro : []);
    const [marcha, setMarcha] = React.useState(atp.marcha);
    const [prioridad, setPrioridad] = React.useState(atp.prioridad);
    const [actividadesrubro, setActividadesrubro] = React.useState(()=> atp.actividades.length !== 0 ? actividades.filter((a) => (a.idrubro === atp.actividades[0].idrubro )) : actividades);
    const [visitas, setVisitas] = React.useState(atp.visitas);
    
    const navigate = useNavigate();

    console.log(atp._id, 'atp._id')

    const handleChange1 = (event) => {
        const { target: { value },  } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
      const handleChangeOrigen = (event) => {
        const { target: { value },  } = event;
        setOrigenName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    
    const eligerubro = (_id) => {
      setPersonrubro(_id);
      //console.log(actividades,"actividades desde rubro");
      let actirubro = actividades.filter((a) => (a.idrubro === _id ));
      setActividadesrubro(actirubro);
      setPersonName([]);
      //console.log(actirubro, "actirubro")
    }

    let atpvisitasort = atp.visitas.sort();

    const { formState, onInputChange, addProvisetForm, onResetForm} = useForm({
      id: atp._id,
      fechainicio: moment(atp.fechainicio).format("YYYY-MM-DD"),
      emprendimientonombre: atp.emprendimientonombre,
      solicita: atp.solicita,
      observaciones: atp.observaciones,
      experticie: atp.idexperticie,
      fechaatp: moment.utc(atp.fechaatp).format("YYYY-MM-DD"),
      //fechaatp: moment.utc(atpvisitasort).format("YYYY-MM-DD"),
      addvisita: moment.utc().format("YYYY-MM-DD")
    });
    const modificarAtp = async () => {
      //validar
      if (formState.emprendimientonombre == "" || formState.solicita == "" || formState.observaciones == "" || origenName == "" || personName == "" || prioridad == "" || marcha == "")
        {
            alert("Tiene que completar todos los datos!!!")
            return;
        }
        //esta todo OK guardo las modificaciones del atp
        try {
            let modiAtp = {
                atpid: formState.id,
                fechainicio: formState.fechainicio,
                emprendimientonombre: formState.emprendimientonombre,
                origen: origenName,
                solicita: formState.solicita,
                observaciones: formState.observaciones,
                marcha: marcha,
                actividades: personName,
                prioridad: prioridad,
                experticie: formState.experticie,
                fechaatp: formState.fechaatp,
                visitas: visitas,
            }
            const { data } = await dashAxios.put('/atpModificar/', modiAtp);
  
            //inicializo CustomHooks
            //onResetForm();
            //navigate(`/Beneficiarios/`)
            //inicializa();
            alert('Se Modifico el ATP del Beneficiario con exito!');
            navigate('/atencionpublico');
        } catch (error) {      
            //console.log(error, "error")      
            const msg = error.response.data.msg;
            alert(
              "Respuesta: " + msg
            );
          }
      
    }
      // Eliminar Beneficiario
  const onClickDelete = ( id ) => {
    if(window.confirm('¿Esta seguro que desea eliminar el Atp?')){
      deleteAtp(id);
    }
  }
  const AddVisita = () => {
    //let resul = visitas;
    //console.log(visitas, "add visitas")
    //console.log(resul, "add resul")
    //resul.push(formState.addvisita);
    //console.log(resul, "add visitas resul")
    let resulta = visitas.filter((visi) => {  console.log( moment.utc(visi).format("YYYY-MM-DD"), formState.addvisita, "comparcion"); return (moment.utc(visi).format("YYYY-MM-DD") === formState.addvisita)});
    console.log(resulta.length, "resulta")
    if (resulta.length > 0)
    {
      window.confirm('Ya Existe la fecha que quiere ingresar!');
      return;
    }
    
    setVisitas([...visitas, formState.addvisita]);
    console.log(visitas, "set visitas")
  }

  //let fechahoy = moment().format("YYYY-MM-DD");
    
  //const [fechavisitas, setFechavisitas] = React.useState([fechahoy, moment(fechahoy).subtract(1, 'd').format("YYYY-MM-DD"), moment(fechahoy).subtract(2, 'd').format("YYYY-MM-DD")]);

  return (
    <>
        <Accordion expanded={expanded === index} onChange={handleChange(index)} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary item  aria-controls="panel1d-content" id="panel1d-header" >

        <Grid container item xs={12} md={12} spacing={1}>

          <Grid item xs={12} md={2}>
            <TextField 
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              type='Date'
              id="fechainicio"
              label="Fecha inicio"
              name="fechainicio"
              autoComplete="Fecha inicio"
              value={formState?.fechainicio}
              onChange={ (event ) => onInputChange(event) }
            />
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
                id="emprendimientonombre"
                label="Emprendimiento Nombre"
                name="emprendimientonombre"
                autoComplete="Emprendimiento Nombre"
                value={formState.emprendimientonombre}
                onChange={ (event ) => onInputChange(event) }
            />
                </Grid>
            <Grid item xs={12} md={5}>
                <FormControl sx={{mt: 2, width: 400 }}>
                <InputLabel id="demo-multiple-name-label" required>Origen</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={origenName}
                    onChange={handleChangeOrigen}
                    input={<OutlinedInput label="Origen" />}
                    MenuProps={MenuProps}
                >
                    {
                    
                    Object.keys(origen).length > 0
                    ?
                    origen.map((name) => (
                    <MenuItem
                        key={name._id}
                        value={name._id}
                        style={getStyles(name, origenName, theme)}
                    >
                        {name.nombre}
                    </MenuItem>
                    ))
                    :
                    null
                    }
                </Select>
                </FormControl>        
            </Grid>
        </Grid>

        </AccordionSummary>
        <AccordionDetails>
        <Box padding={1}>
        <Grid container display={'flex'}   spacing={1}>
          <Grid item xs={12} md={6}>
          <TextField 
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              //maxlength = {10}
              // inputProps={{
              //     maxlength: 40
              // }}
              multiline
              rows={4}
              id="solicita"
              label="Solicita"
              name="solicita"
              autoComplete="Solicita"
              value={formState.solicita}
              onChange={ (event ) => onInputChange(event) }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
              // error={state.errorMessage.length > 0 ?  true : false}
              margin="normal"
              required
              fullWidth
              //maxlength = {10}
              // inputProps={{
              //     maxlength: 40
              // }}
              multiline
              rows={4}
              id="observaciones"
              label="Observaciones"
              name="observaciones"
              autoComplete="Observaciones"
              value={formState.observaciones}
              onChange={ (event ) => onInputChange(event) }
          />
        </Grid>
        <Grid item xs={12} md={1.6}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="marcha"
              select
              label="Marcha"
              name="marcha"
              value={marcha ? marcha : ""}
              //onChange={ (event ) => onInputChange(event) }
          >
              <MenuItem 
                  key={"SI"} 
                  value={"SI"}
                  onClick={ () => {setMarcha("SI");} }
                  >
                  {"SI"}</MenuItem>
              <MenuItem 
                  key={"NO"} 
                  value={"NO"}
                  onClick={ () => {setMarcha("NO");} }
                  >
                  {"NO"}</MenuItem>
          </TextField>
      </Grid>
      <Grid item xs={12} md={1.7}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="prioridad"
              select
              label="Prioridad"
              name="prioridad"
              value={prioridad ? prioridad : ""}
              //onChange={ (event ) => onInputChange(event) }
          >
              <MenuItem 
                  key={"CRITICA"} 
                  value={"CRITICA"}
                  onClick={ () => {setPrioridad("CRITICA");} }
                  >
                  {"CRITICA"}</MenuItem>
              <MenuItem 
                  key={"MEDIA"} 
                  value={"MEDIA"}
                  onClick={ () => {setPrioridad("MEDIA");} }
                  >
                  {"MEDIA"}</MenuItem>
              <MenuItem 
                  key={"BAJA"} 
                  value={"BAJA"}
                  onClick={ () => {setPrioridad("BAJA");} }
                  >
                  {"BAJA"}</MenuItem>
          </TextField>
      </Grid>
      <Grid item xs={12} md={2.7}>
      <FormControl sx={{mt: 2, width: 200 }}>
        <InputLabel id="demo-multiple-name-label" required>Linea</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          //multiple
          value={personrubro.length === 0 ? '' : personrubro}
          //onChange={handleChange}
          input={<OutlinedInput label="Actividad" />}
          MenuProps={MenuProps}
        >
          {rubros.length > 0
          ?
          rubros.map((name) => (
            <MenuItem
              key={name._id}
              value={name._id}
              // style={getStyles(name, personrubro, theme)}
              onClick={()=> {eligerubro(name._id)}}
            >
              {name.nombre}
            </MenuItem>
          ))
        :
        null
        }
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl sx={{mt: 2, width: 475 }}>
          <InputLabel id="demo-multiple-name-label" required>Actividad</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange1}
            input={<OutlinedInput label="Actividad" />}
            MenuProps={MenuProps}
          >
            {
            Object.keys(actividadesrubro).length > 0
            ?
            actividadesrubro.map((name) => (
              <MenuItem
                key={name._id}
                value={name._id}
                style={getStyles(name, personName, theme)}
              >
                {name.nombre}
              </MenuItem>
            ))
          :
          null
          }
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={2.5}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="experticie"
            select
            label="Experticie"
            name="experticie"
            value={formState?.experticie}
            onChange={ (event ) => onInputChange(event) }
        >
            {experticie.length > 0
            ?
            experticie.map((exper) => <MenuItem 
                key={exper.id} 
                value={exper._id}
                //onClick={ () => {addProvisetForm(exper._id, exper.nombre, iniciarProvincia.genero);} }
                >
                {exper.nombre}</MenuItem>)
            :
            null
            }

          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField 
            // error={state.errorMessage.length > 0 ?  true : false}
            margin="normal"
            //required
            fullWidth
            type='Date'
            id="fechaatp"
            label="Fecha ATP"
            name="fechaatp"
            autoComplete="Fecha ATP"
            value={formState?.fechaatp}
            onChange={ (event ) => onInputChange(event) }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <VisitasFechas 
              visitas={visitas.sort()} 
              setVisitas={setVisitas}
              formState = {formState} 
              onInputChange = {onInputChange}  />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField 
          // error={state.errorMessage.length > 0 ?  true : false}
          margin="normal"
          //required
          fullWidth
          type='Date'
          id="addvisita"
          label="Agregar Fecha de visita"
          name="addvisita"
          autoComplete="Agregar Fecha de visita"
          value={formState?.addvisita}
          onChange={ (event ) => onInputChange(event) }
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            variant="outlined" 
            size="medium"
            sx={{ my: 3 }}
            //margin={25}
            //mt={50}
            //color='info' 
            onClick={() => AddVisita()}
          >Add Visita</Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
              variant='contained' 
              size='large' 
              color='info' 
              onClick={() => modificarAtp()}
          >GUARDAR</Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
     
              size='large' 

              variant="contained" color="error" 
              
             onClick={() => onClickDelete(formState.id)}
          >Eliminar</Button>
        </Grid>
        </Grid>
        </Box>
        </AccordionDetails>
      </Accordion>

    </>
  )
}
