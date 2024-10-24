import React, { useState } from 'react';
import { Grid, TextField, Box, Button, Typography, Paper } from '@mui/material';
import SearchBeneficiario from '../../components/beneficiario/SearchBeneficiario';
import { BeneficiarioContext } from '../../contexts/BeneficiarioContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { dashAxios } from '../../config/DashRcAxios';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import moment from 'moment';
import { AtpDetalle } from './AtpDetalle';

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



export const EliminarAtp = () => {
  const { state, getBeneficiarios, getBeneficiario, initBeneficiario } = React.useContext(BeneficiarioContext)
  const {beneficiario} = state;
  const [listaatp, setListaatp] = useState([]);

  const leerAtp = async () => {
    // console.log(Object.keys(state.beneficiario).length, 'length de beneficiario')
    setListaatp([]);
    if (Object.keys(state.beneficiario).length > 0) { 
      //console.log("se ejecuta useEffect")
      try {
        const limit = 1000000000;
        const page = 1;

        const { data } = await dashAxios.get(`/buscaratp?limit=${limit}&page=${page}`, {headers: { idbeneficiario: state.beneficiario._id}});
        console.log(data, "req atp")
        setListaatp(data.atp.docs);
        //alert('Se pudo leer el ATP del Beneficiario con exito!');

    } catch (error) {      
        //console.log(error, "error")      
        const msg = error.response.data.msg;
        alert(
          "Respuesta: " + msg
        );
      }

    }
  }

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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
  const [actividades, setActividades] = React.useState("");
  const listaactividades = async () => {

    const limit = 25;
    const page = 1;
    try {
      const { data } = await dashAxios.get(`/listaractividades?limit=${limit}&page=${page}`)
      setActividades(data.actividades.docs);
      console.log(data.actividades.docs, 'actividades')
    } 
    catch (error) {
      console.log(error, 'error');
      setActividades("");
       if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)}
    }
  }
  const [rubros, setRubros] = React.useState("");
  const listarubros = async() =>{
    const limit = 1000000000;
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
  const deleteAtp = async (id) => {
    console.log(id, 'delete Atp')
    //setListaatp({});
    try { 
      const { data } = await dashAxios.delete(`/atpdelete/${id}`);
      console.log(data, 'respuesta data')

      if(data){
        //let idbene = state.beneficiario._id;
        //initBeneficiario();
        //let atpresul = listaatp.filter(uno => uno._id !== id);
        //setListaatp(atpresul);
        //getBeneficiario(idbene);
        leerAtp();
      }
      //leerAtp();
    }
    catch(error) {
        console.log(error);

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
 
  
  React.useEffect( () => {leerAtp(); }, [state?.beneficiario] );

  React.useEffect(
    () => {listaorigen(); listaactividades();listarubros();listaexperticie()}, []);

  return (
    <div>
      <Box padding={1}>
      <Grid container display={'flex'}   spacing={3}>
      <Grid item xs={12} sx={{ 
                        borderBottom: 2, 
                        marginLeft: 3,
                        paddingBottom: 2,  
                        borderColor: '#ebe3e3',
                        marginBottom:  5
                    }}
                >
      <Typography variant='h6' fontFamily={'fantasy'}>Modificar o Elimina ATP</Typography>
      </Grid>
      <SearchBeneficiario />
      </Grid>
      <Grid>
      {
      state?.beneficiario != undefined
      ? 
      Object.keys(state?.beneficiario).length > 0        
      ?
      <Paper>
      <Box padding={3}>
        <Grid container spacing={3}>
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
      </Grid>
      </Box>
      </Paper>
      :
      null
      :
      null
      }
      {listaatp.length > 0
      ?
        listaatp.map( (atp, index) => 
           <AtpDetalle 
              index= {index} 
              key={index}
              atp={atp}
              origen={origen}
              actividades={actividades}
              rubros={rubros}
              experticie={experticie}
              //setListaatp={setListaatp}
              //listaatp={listaatp} 
              deleteAtp={deleteAtp}
              />
/*         <Accordion expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
              value={moment(atp.fechainicio).format("YYYY-MM-DD")}
              //onChange={ (event ) => onInputChange(event) }
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
                value={atp.emprendimientonombre}
                //onChange={ (event ) => onInputChange(event) }
            />
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>)
 */      
      )
      :
      null
      } 
    </Grid>
    </Box>
{/*     <table>
    {listaatp.length > 0
      ?
         listaatp.map( (atp, index) => 
          <tr>
            <td>{  atp.emprendimientonombre }</td>
            <td>
              <Button onClick={()=> deleteAtp(atp._id)}>Eliminar</Button>
            </td>
          </tr>
         ) 
      :
      null
    }  
    </table> */}
    </div>
  )
}
