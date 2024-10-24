import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from '../../hooks/useForm';
import { Grid, TextField, Box, Button, Typography } from '@mui/material';
import { dashAxios } from "../../config/DashRcAxios";
import { AxiosError } from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import  SearchBeneficiario  from '../../components/beneficiario/SearchBeneficiario';
import { BeneficiarioContext } from '../../contexts/BeneficiarioContext';


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

const names = [
  {id: '01', name:'Oliver Hansen'},
  {id: '02', name:'Van Henry'},
  {id: '03', name:'April Tucker'},
  {id: '04', name:'Ralph Hubbard'},
  {id: '05', name:'Omar Alexander'},
  {id: '06', name:'Carlos Abbott'},
  {id: '07', name:'Miriam Wagner'},
  {id: '08', name:'Bradley Wilkerson'},
  {id: '09', name:'Virginia Andrews'},
  {id: '10', name:'Kelly Snyder'},
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const AtencionPage = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [origenName, setOrigenName] = React.useState([]);
  const [personrubro, setPersonrubro] = React.useState([]);
  const [marcha, setMarcha] = React.useState("");
  const [prioridad, setPrioridad] = React.useState("");
  const { state, getBeneficiarios, getBeneficiario, initBeneficiario } = React.useContext(BeneficiarioContext)
  const {beneficiario} = state;
  const navigate = useNavigate();

  const handleChange = (event) => {
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
  const { formState, onInputChange, addProvisetForm, onResetForm} = useForm({
    //documento: "",
    fechainicio: moment().format("YYYY-MM-DD"),
    emprendimientonombre: "",
    solicita: "",
    observaciones:"",
    experticie:"",
  });
    const { formState: formStatedocu, onInputChange: onInputChangedocu, onResetForm: onResetFormdocu } = useForm({
    documento: "",
  });

  // const [beneficiario, setBeneficiario] = React.useState("");

/*   const buscarBeneficiario = async () => {
    if (formStatedocu.documento === "" || formStatedocu.documento.length < 4)
    {
      alert("Tiene ingresar el Documento!!!")
      return;
    }
    const limit = 25;
    const page = 1;
    try {
    const { data } = await dashAxios.get(`/benebuscardocu?limit=${limit}&page=${page}`, { headers: { docubuscar: formStatedocu.documento}})
    //console.log(AxiosError.response.status, 'beneficiarios');
    setBeneficiario(data.beneficiario.docs);
    console.log(data.beneficiario.docs, 'beneficiario')
      //alert("beneficiario encontrado")
  } catch (error) {
    console.log(error, 'error');
    setBeneficiario("");
    onResetForm();
    if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)
    }
  }
  }
 */
  const [actividades, setActividades] = React.useState("");
  const [actividadesrubro, setActividadesrubro] = React.useState("");

  const listaactividades = async () => {

    const limit = 1000000000;
    const page = 1;
    try {
      const { data } = await dashAxios.get(`/listaractividades?limit=${limit}&page=${page}`)
      setActividades(data.actividades.docs);
      console.log(data.actividades.docs, 'actividades desde inicio')
    } 
    catch (error) {
      console.log(error, 'error');
      setActividades("");
       if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)}
    }
  }

  const [origen, setOrigen] = React.useState("");
  const listaorigen = async () => {
    const limit = 25;
    const page = 1;
    try {
      const { data } = await dashAxios.get(`/listarorigen?limit=${limit}&page=${page}`)
      setOrigen(data.origen.docs);
      console.log(data.origen.docs, 'origen')
    } 
    catch (error) {
      console.log(error, 'error');
      setOrigen("");
       if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)}
    }
  }
  const [experticie, setExperticie] = React.useState("");
  const listaexperticie = async () => {
    const limit = 100000000;
    const page = 1;
    try {
      const { data } = await dashAxios.get(`/listarexperticie?limit=${limit}&page=${page}`)
      setExperticie(data.experticie.docs);
      console.log(data.experticie.docs, 'experticie')
    } 
    catch (error) {
      console.log(error, 'error');
      setExperticie("");
       if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)}
    }
  }
  const [rubros, setRubros] = React.useState("");
  const listarubros = async() =>{
    const limit = 2500;
    const page = 1;
    try {
      const {data} = await dashAxios.get(`/listarrubros?limit=${limit}&page=${page}`)
      setRubros(data.rubro.docs);
      console.log(data.rubro.docs, "rubros del inicio");
    } catch (error) {
      console.log(error, 'error');
      setRubros("");
       if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)}      
    }
  }
  const eligerubro = (_id) => {
    setPersonrubro(_id);
    //console.log(actividades,"actividades desde rubro");
    let actirubro = actividades.filter((a) => (a.idrubro === _id ));
    setActividadesrubro(actirubro);
    setPersonName([]);
    //console.log(actirubro, "actirubro")
  }
  const agregarAtp = async () => {
    //validar
    if (formState.emprendimientonombre == "" || formState.solicita == "" || formState.observaciones == "" || origenName == "" || personName == "" || prioridad == "" || marcha == "")
      {
          alert("Tiene que completar todos los datos!!!")
          return;
      }
      //esta todo OK guardo el nuevo Beneficiario
      try {
          let newAtp = {
              idbeneficiario: state.beneficiario._id,
              fechainicio: formState.fechainicio,
              emprendimientonombre: formState.emprendimientonombre,
              origen: origenName,
              //origenName,
              //origen: "",
              solicita: formState.solicita,
              observaciones: formState.observaciones,
              marcha: marcha,
              actividades: personName,
              experticie: formState.experticie,
              prioridad: prioridad,                    
          }
          const { data } = await dashAxios.post('/atpAdd/', newAtp);

          //inicializo CustomHooks
          //onResetForm();
          //navigate(`/Beneficiarios/`)
          inicializa();
          alert('Se genero el ATP del Beneficiario con exito!');
      } catch (error) {      
          //console.log(error, "error")      
          const msg = error.response.data.msg;
          alert(
            "Respuesta: " + msg
          );
        }
    
  }
  const inicializa = () => {
    //setBeneficiario("");
    initBeneficiario();
    onResetForm();
    onResetFormdocu();
    setPersonName([]);
    setOrigenName([]);
    setMarcha("");
    setPrioridad("");
    setPersonrubro("")
  }
  
React.useEffect(
    () => {initBeneficiario(); 
           listaactividades(); 
           listaorigen(); 
           getBeneficiarios(); 
           listarubros();
           listaexperticie();}, []);
  

  return (
    <div>
      <Box padding={1}>
      <Grid container item xs={12} md={12} display={'flex'}   spacing={1}>

        <SearchBeneficiario />
        <Grid item xs={12} md={3}></Grid>     
        <Grid item  xs={12} md={3.5}  sx={{ 
                        //borderBottom: 2, 
                        //marginLeft: 3, 
                        //paddingBottom: 2,  
                        //borderColor: '#ebe3e3',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        marginTop: 3,
                    }}>
                    <Button 
                        variant='outlined' 
                        size='large' 
                        color='info' 
                        //alignItems='center'
                        onClick={() => {initBeneficiario(); navigate(`/eliminaratp`); }}
                    >Modificar/Eliminar</Button>
  
        </Grid>      


{/*       <Grid item xs={12} md={2}>
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
            value={formStatedocu?.documento}
            onChange={ (event ) => onInputChangedocu(event) }
        />
      </Grid>
      <Grid item xs={12} md={3} sx={{ 
                        //borderBottom: 2, 
                        //marginLeft: 3, 
                        //paddingBottom: 2,  
                        //borderColor: '#ebe3e3',
                        marginTop: 3,
                    }}>
                    <Button 
                        variant='contained' 
                        size='large' 
                        color='info' 
                        onClick={() => buscarBeneficiario()}
                    >BUSCAR BENEFICIARIO</Button>
      </Grid>
 */}      </Grid>

      {/* Muestro el beneficiario */ console.log(Object.keys(state.beneficiario).length, "length beneficiario")}
      {Object.keys(state.beneficiario).length > 0        
      ?
        // <h1>{beneficiario[0].nombre}</h1>
        <>
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
                  <Typography variant='h6' fontFamily={'fantasy'}>Agregar ATP</Typography>
                  <Typography variant='caption'>Creado: {moment().format("DD/MM/YYYY hh:mm:ss") }</Typography>
              </Grid>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Beneficiario </TableCell>
              <TableCell align="right">Documento</TableCell>
              <TableCell align="right">Localidad</TableCell>
              <TableCell align="right">Genero</TableCell>
              <TableCell align="right">Telefono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <TableRow
                key={state.beneficiario._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {state.beneficiario.apellido+", "+state.beneficiario.nombre}
                </TableCell>
                <TableCell align="right">{state.beneficiario.documento}</TableCell>
                <TableCell align="right">{state.beneficiario.localidad}</TableCell>
                <TableCell align="right">{state.beneficiario.idsexo.nombre}</TableCell>
                <TableCell align="right">{state.beneficiario.nrocel1}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
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
            value={formState?.emprendimientonombre}
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
            {origen.length > 0
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
            value={formState?.solicita}
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
            value={formState?.observaciones}
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
            value={marcha}
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
            value={prioridad}
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
          onChange={handleChange}
          input={<OutlinedInput label="Actividad" />}
          MenuProps={MenuProps}
        >
          {actividadesrubro.length > 0
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
      <Grid item xs={12} md={12}>
          <Button 
              variant='contained' 
              size='large' 
              color='info' 
              onClick={() => agregarAtp()}
          >GUARDAR</Button>
      </Grid>

      </Grid>
        </Box>
    </Paper>

      </>
  
      : null
    }


      </Box>
    </div>
  );
}




// export default function MultipleSelect() {

// }