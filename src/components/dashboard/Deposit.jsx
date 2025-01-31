import { Grid, Link, Paper, Typography } from '@mui/material';
import React from 'react';
import { dashAxios } from '../../config/DashRcAxios';
import { useNavigate } from 'react-router-dom';
//import moment from 'moment'
import 'moment/locale/es';
import moment from 'moment/min/moment-with-locales';
moment.locale('es');

export const Deposit = () => {
    const [beneCant, setBeneCant] = React.useState(0);
    const navigate = useNavigate();

    const  preventDefault = (event) => {
        event.preventDefault();
    }
    const leerBeneficiarios = async () => {
        try {
            const {  data  } = await dashAxios.get('/dashboard/main');
            console.log(data, "cant benef");
            setBeneCant(data.benefcant);
        } catch (error) {      
            //console.log(error, "error")      
            const msg = error.response.data.msg;
            alert(
            "Respuesta: " + msg
            );
        }
        }

    const fechahoy = () => {
        
        console.log(moment().locale('es'), "moment.locale"); 
        var localLocale = moment().locale('es');
        moment.locale('es');
        //localLocale.locale('es');
        //localLocale.locale(false);
        return localLocale.format('LL');
    }

    React.useEffect(() => {leerBeneficiarios() },[])    

  return (
    <>
        <Typography 
            component="p" 
            variant="h2" 
            //color= 'text.secondary'
            >
            {beneCant}
        </Typography>
        <Typography 
            //color="text.secondary" 
            //color=  "text.secondary"
            sx={{ pt:4 }}
            >
            Total de Beneficiarios
        </Typography>
        <Typography 
            //color="text.secondary" 
            //color=  "white"
            sx={{ pb: 2 }}
            >
            {"Al " + fechahoy()  }
        </Typography>
        <div>
            <Link 
            color="primary" 
             //color="inherit"
            href="#" onClick={() => navigate(`/Beneficiarios`)}>
            Ver todos
            </Link>
        </div>
    </>

  )
}
