import React, { useState } from 'react';
import { Grid, TextField, Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import { useForm } from '../../hooks/useForm';
import { dashAxios } from '../../config/DashRcAxios';
import { JsonToExcel } from "react-json-to-excel";
import { downloadExcel } from "react-export-table-to-excel";
import XLSX from "xlsx-js-style"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
/* import   ReactExport  from 'react-data-export';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet; */

const rows = [
  {name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs:24, protein:4.0},
  {name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein:4.3},
  {name: 'Eclair', calories: 262, fat: 16.0, carbs:24, protein:6.0},
  {name: 'Cupcake', calories: 305, fat: 3.7, carbs:67, protein:4.3},
  {name: 'Gingerbread', calories: 356, fat: 16.0, carbs:49, protein:3.9},
];


const Atpfechas = () => {
  const { formState, onInputChange, onResetForm} = useForm({
    fechainicial: moment.utc().format("YYYY-MM-DD"),
    fechafinal: moment.utc().format("YYYY-MM-DD"),
  });

  const [atpFecha, setAtpFecha] = useState([]);
  const [atpexcel, setAtpexcel] = useState([]);

  const ListaAtpFechas = async () => {
    window.confirm("Listado de atp99")
    try {
      const limit = 1000000000;
      const page = 1;

      const { data } = await dashAxios.get(`/listatpfecha?limit=${limit}&page=${page}`, {headers: { fechainicial: formState.fechainicial, fechafinal: formState.fechafinal}});
      console.log(data, "req atp fecha")
      setAtpFecha(data.atp);
      alert('Se pudo leer el ATP del Beneficiario con exito!');

      if (data.atp) {
        let atpuni = data.atp.map( (cada) => {
          return({Beneficiario: cada.idbeneficiario.apellido + ", " + cada.idbeneficiario.nombre,
              Documento: cada.idbeneficiario.documento,
              Domicilio: cada.idbeneficiario.domicilio,
              Numero: cada.idbeneficiario.numero,
              Localidad: cada.idbeneficiario.localidad,
              Genero: cada.idbeneficiario.idsexo.nombre,
              Celular: cada.idbeneficiario.nrocel1,
              FechaATP : moment.utc(cada.fechaatp).format("DD-MM-YYYY"),
              FechaInicio: moment.utc(cada.fechainicio).format("DD-MM-YYYY"),
              EmprendimientoNombre: cada.emprendimientonombre,
              Origen: devolverString(cada, "origen"),
              Solicita: cada.solicita,
              Marcha: cada.marcha,
              Observaciones: cada.observaciones,
              Prioridad: cada.prioridad,
              Actividades: devolverString(cada, "actividades"),
              Experticie:  cada.idexperticie.nombre,
              Latitud: cada.idbeneficiario.latitud,
              Longitud: cada.idbeneficiario.longitud,
              Visitas: devolverString (cada, "visitas")
            })
        })
/*         let atprows = data.atp.map( (cada) => {
          return({Beneficiario: cada.idbeneficiario.apellido + ", " + cada.idbeneficiario.nombre,
              Documento: cada.idbeneficiario.documento,
              Domicilio: cada.idbeneficiario.domicilio,
              Numero: cada.idbeneficiario.numero,
              Localidad: cada.idbeneficiario.localidad,
              Genero: cada.idbeneficiario.idsexo.nombre,
              Celular: cada.idbeneficiario.nrocel1,
              FechaATP : moment.utc(cada.fechaatp).format("DD-MM-YYYY"),
              FechaInicio: moment.utc(cada.fechainicio).format("DD-MM-YYYY"),
              EmprendimientoNombre: cada.emprendimientonombre,
              Origen: devolverString(cada, "origen"),
              Solicita: cada.solicita,
              Marcha: cada.marcha,
              Observaciones: cada.observaciones,
              Prioridad: cada.prioridad,
              Actividades: devolverString(cada, "actividades"),
              Experticie:  cada.idexperticie.nombre,
              Visitas: devolverString (cada, "visitas")
            })
        })
 */                
        setAtpexcel(atpuni);


      } 

  } catch (error) {      
      console.log(error, "error")      
      const msg = error.response.data.msg;
      alert(
        "Respuesta: " + msg
      );
    }

  }
  const devolverString = (cada, propiedad) => {
    let devolver="";
    switch (propiedad) {
      case "origen":
        devolver = cada.origen.map( (ori) => ori.nombre);
        break;
      case "actividades":
        devolver = cada.actividades.map( (acti) => acti.nombre);
        break;
      case "visitas":
        devolver = cada.visitas.map( (visi) => moment.utc(visi).format("DD-MM-YYYY"));
        console.log(devolver, devolver.toString(), "visitas");
        break;
      default:
        devolver = "";
        break;
    }
    return (devolver.toString())
  }

  const header = ["Beneficiario", 
    "Documento", 
    "Domicilio",
    "Numero",
    "Localidad",
    "Genero",
    "Celular",
    "FechaATP",
    "FechaInicio",
    "EmprendimientoNombre",
    "Origen",
    "Solicita",
    "Marcha",
    "Observaciones",
    "Prioridad",
    "Actividades",
    "Experticie",
    "Latitud",
    "Longitud",
    "Visitas"
    ];
  const body = [
    ["Edison", "Padilla", 14],
    ["Cheila", "Rodrigez", 56],
  ];

  /**
   * @description:
   *  also accepts an array of objects; the method (downloadExcel) will take
   *  as order of each column, the order that each property of the object brings with it.
   *  the method(downloadExcel) will only take the value of each property.
   */
  const body2 = [
    { firstname: "Edison", lastname: "Padilla", age: 14 },
    { firstname: "Cheila", lastname: "Rodrigez", age: 56 },
  ];
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "react-export-table-to-excel",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        // accept two different data structures
        //body: body || body2,
        body: atpexcel,
      },
    });
  }

const excelexport = () => {
  // STEP 1: Create a new workbook
  const wb = XLSX.utils.book_new();

  // STEP 2: Create data rows and styles
  let row = [
    [  
    ],
    [ 
    { v: `Listado de Beneficiarios ATP registrados desde ${moment.utc(formState.fechainicial).format("DD-MM-YYYY")} al ${moment.utc(formState.fechafinal).format("DD-MM-YYYY")}`, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 15, bold: true, }}}
    ],
    [
    ],    
    [ 
    { v: "Beneficiario", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Documento", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Domicilio", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Numero", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Localidad", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Genero", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}} }},
    { v: "Celular", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Fecha ATP", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Fecha Inicio", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Nombre del Emprendimiento", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Origen", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Solicita", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Marcha", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Observaciones", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Prioridad", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Actividades", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Experticie", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Latitud", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Longitud", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
    { v: "Fecha de Visitas", t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, bold: true, }, fill:{ fgColor: {rgb:"a9a9a9"}}}},
  ],
];

atpexcel.length > 0 ?
  atpexcel.map((cada) =>  { 
      ( row.push([
        { v: cada.Beneficiario, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Documento, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Domicilio, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Numero, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Localidad, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Genero, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Celular, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.FechaATP, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.FechaInicio, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.EmprendimientoNombre, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Origen, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Solicita, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Marcha, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Observaciones, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Prioridad, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Actividades, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Experticie, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Longitud, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Latitud, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }},
        { v: cada.Visitas, t: "s", s: { alignment: {horizontal: "left" }, font: { name: "Arial", sz: 10, }, }} ])
      )     
    }
  )    
  :
  row.push( 
  [
  ],);

  var wscols = [
    {wch:45},
    {wch:30},
    {wch:40},
    {wch:10},
    {wch:30},
    {wch:20},
    {wch:15},
    {wch:15},
    {wch:15},
    {wch:50},
    {wch:20},
    {wch:40},
    {wch:10},
    {wch:50},
    {wch:15},
    {wch:40},
    {wch:25},
    {wch:25},
    {wch:25},
    {wch:40},
  ];

  console.log(row, "row")
  // STEP 3: Create worksheet with rows; Add worksheet to workbook
  const ws = XLSX.utils.aoa_to_sheet(row);
  ws['!cols'] = wscols;
  XLSX.utils.book_append_sheet(wb, ws, "atp");

  // STEP 4: Write Excel file to browser
  XLSX.writeFile(wb, "atp.xlsx");
}

return (
    <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
                <TextField 
                // error={state.errorMessage.length > 0 ?  true : false}
                margin="normal"
                required
                fullWidth
                type='Date'
                id="fecha inicio"
                label="Fecha inicio"
                name="fechainicial"
                autoComplete="Fecha inicio"
                value={formState?.fechainicial}
                onChange={ (event ) => onInputChange(event) }
                />
            </Grid>
            <Grid item xs={12} md={2}>            
                <TextField 
                // error={state.errorMessage.length > 0 ?  true : false}
                margin="normal"
                required
                fullWidth
                type='Date'
                id="fecha Final"
                label="Fecha final"
                name="fechafinal"
                autoComplete="Fecha Final "
                value={formState?.fechafinal}
                onChange={ (event ) => onInputChange(event) }
                /> 
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                  variant='contained' 
                  size='large' 
                  color='info' 
                  sx={{ my: 3 }}
                  onClick={() => ListaAtpFechas()}
                >Buscar Atp</Button>
            </Grid>
{/*             <Grid>
              <JsonToExcel
                title="Download as Excel"
                data={atpexcel}
                fileName="sample-file"
                btnClassName="custom-classname"
              />
            </Grid> */}
            <Grid item xs={12} md={12}>
{/*                 <ExcelFile element={<button>Download Data With Styles</button>}>
                    <ExcelSheet dataSet={multiDataSet} name="Organization"/>
                </ExcelFile> */}
    {/*  
    <div>
      <Button onClick={handleDownloadExcel}>download excel</Button>

     <table>
        <tbody>
          <tr>
            {header.map((head) => (
              <th key={head}> {head} </th>
            ))}
          </tr>

          {body.map((item, i) => (
            <tr key={i}>
              {item.map((it) => (
                <td key={it}>{it}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}


            </Grid>
            <Grid item xs={12} md={12}>
              {atpexcel.length > 0 
              ?
              <Button onClick={excelexport}>download excel 22222</Button>
              :
              null
              }
            </Grid>
            <Grid item xs={12} md={12} >
              {atpexcel.length > 0 
              ?
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, width: "max-content" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{background: 'grey'}}>Beneficiario</TableCell>
                      <TableCell sx={{background: 'grey'}} align="right">Documento</TableCell>
                      <TableCell sx={{background: 'grey'}}>Domicilio</TableCell>
                      <TableCell sx={{background: 'grey'}}>Numero</TableCell>
                      <TableCell sx={{background: 'grey'}}>Localidad</TableCell>
                      <TableCell sx={{background: 'grey'}}>Genero</TableCell>
                      <TableCell sx={{background: 'grey'}}>Celular</TableCell>
                      <TableCell sx={{background: 'grey', width: 150}}>Fecha ATP</TableCell>
                      <TableCell sx={{background: 'grey', width: 150}}>Fecha Inicio Act.</TableCell>
                      <TableCell sx={{background: 'grey'}}>Nombre Emprendimiento</TableCell>
                      <TableCell sx={{background: 'grey'}}>Origen</TableCell>
                      <TableCell sx={{background: 'grey'}}>Solicita</TableCell>
                      <TableCell sx={{background: 'grey'}}>Marcha</TableCell>
                      <TableCell sx={{background: 'grey'}}>Observaciones</TableCell>
                      <TableCell sx={{background: 'grey'}}>Prioridad</TableCell>
                      <TableCell sx={{background: 'grey'}}>Actividad</TableCell>
                      <TableCell sx={{background: 'grey'}}>Experticie</TableCell>
                      <TableCell sx={{background: 'grey'}}>Latitud</TableCell>
                      <TableCell sx={{background: 'grey'}}>Longitud</TableCell>
                      <TableCell sx={{background: 'grey'}}>Visitas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {atpexcel.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.Beneficiario}</TableCell>
                        <TableCell align="right">{row.Documento}</TableCell>
                        <TableCell >{row.Domicilio}</TableCell>
                        <TableCell align="right">{row.Numero}</TableCell>
                        <TableCell >{row.Localidad} </TableCell>
                        <TableCell >{row.Genero}</TableCell>
                        <TableCell >{row.Celular}</TableCell>
                        <TableCell sx={{width: 150}}>{row.FechaATP}</TableCell>
                        <TableCell sx={{width: 150}}>{row.FechaInicio}</TableCell>
                        <TableCell >{row.EmprendimientoNombre}</TableCell>
                        <TableCell >{row.Origen}</TableCell>
                        <TableCell >{row.Solicita}</TableCell>
                        <TableCell >{row.Marcha}</TableCell>
                        <TableCell >{row.Observaciones}</TableCell>
                        <TableCell >{row.Prioridad}</TableCell>
                        <TableCell >{row.Actividades}</TableCell>
                        <TableCell >{row.Experticie}</TableCell>
                        <TableCell >{row.Latitud}</TableCell>
                        <TableCell >{row.Longitud}</TableCell>
                        <TableCell >{row.Visitas}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              :
              null
              }
            </Grid>
    </Grid>
  )
}

export default Atpfechas