import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, TextField, Box, Button, ListSubheader, Typography, IconButton, Paper } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';

export const VisitasFechas = ({atp}) => {
    const [visitas, setVisitas] = React.useState(atp.visitas);
    const onClickDeletevisita = (i) => {
        if (window.confirm('Esta Seguro de Eliminar esta Visita'))
        {
          console.log(visitas, 'visitas')
          //visitas.splice(i,1);
          let resulta = visitas
    
          console.log(resulta, 'resulta visitas')
          resulta.splice(i,1)
          console.log(i, 'index')
          console.log(resulta, 'resulta despues del splice')
          setVisitas(resulta);
          console.log(visitas, 'visitas despues del setVisitas ')
          
        }
      }
    
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 200 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Fechas Visitas</TableCell>
          <TableCell align="right">Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {visitas.map((row, index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row">
          {moment(row).format("DD-MM-YYYY")}
        </TableCell>
        <TableCell align="right">
        <IconButton
          onClick={() => onClickDeletevisita(index)}
          title='Eliminar Fecha'
        >
          <DeleteOutlineIcon
            fontSize='medium'
            color={'info'}
            //color={row.is_active ? 'info' : 'disabled'}
          />
        </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>

  )
}
