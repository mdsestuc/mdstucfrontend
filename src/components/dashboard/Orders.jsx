import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { dashAxios } from '../../config/DashRcAxios';
import { useNavigate } from 'react-router-dom';
import 'moment/locale/es';
import moment from 'moment/min/moment-with-locales';
moment.locale('es');
import { BeneficiarioContext } from '../../contexts/BeneficiarioContext';



function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { state } = React.useContext(BeneficiarioContext);
  const [listaBene, SetListaBene] = React.useState([]);
  const navigate = useNavigate();
  //moment.locale('es');
/*   moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  }
  ); */
  
  const benelist = async () => {
    try {
      const {  data  } = await dashAxios.get('/dashboard/beneficiarios/list');
      console.log(data, "list 5 benef");
      SetListaBene(data.benef5list);
  } catch (error) {      
      console.log(error, "error")      
      const msg = error.response.data.msg;
      alert(
      "Respuesta: " + msg
      );
  }
  

  }

  React.useEffect(
    ()=>{
      benelist();
    }, []
  );
  return (
    <React.Fragment>
      {listaBene.length > 0
      ?
      <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Beneficiario</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Provincia</TableCell>
            <TableCell align="right">Localidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaBene.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{moment.utc(row.created_at).format('LL')}</TableCell>
              <TableCell>{row.apellido + ', ' + row.nombre}</TableCell>
              <TableCell>{row.documento.toLocaleString()}</TableCell>
              <TableCell>{row.provincia}</TableCell>
              <TableCell align="right">{`${row.localidad}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={() => navigate(`/Beneficiarios`)} sx={{ mt: 3 }}>
        Ver mas Beneficiarios
      </Link>
      </>
      :
      null
      }
    </React.Fragment>
  );
}