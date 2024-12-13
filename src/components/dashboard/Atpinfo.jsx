import { Grid, Link, Paper, Typography } from '@mui/material';
import React from 'react';
import { dashAxios } from '../../config/DashRcAxios';
import { useNavigate } from 'react-router-dom';
//import moment from 'moment'
import 'moment/locale/es';
import moment from 'moment/min/moment-with-locales';
moment.locale('es');

const Atpinfo = () => {
    const [atpCant, setAtpCant] = React.useState(0);
    const navigate = useNavigate();

    const leerAtp = async () => {
        try {
            const {  data  } = await dashAxios.get('/dashboard/atp/main');
            console.log(data, "cant atp");
            setAtpCant(data.atpcant);
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

    React.useEffect(() => {leerAtp() },[])    

  return (
    <>
        <Typography 
            component="p" 
            variant="h2" 
            //color= 'text.secondary'
            >
            {atpCant }
        </Typography>
        <Typography 
            //color="text.secondary" 
            //color=  "text.secondary"
            sx={{ pt:4 }}
            >
            Total de Atp
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
            href="#" onClick={() => navigate(`/atencionpublico`)}>
            Ingresar nuevo Atp
            </Link>
        </div>
    </>

  )
}

export default Atpinfo