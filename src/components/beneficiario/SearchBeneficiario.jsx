import React from 'react';
import { Grid, TextField, Box, Button, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { dashAxios } from '../../config/DashRcAxios';
import { BeneficiarioContext } from '../../contexts/BeneficiarioContext';


function SearchBeneficiario () {
  const { formState: formStatedocu, onInputChange: onInputChangedocu, onResetForm: onResetFormdocu } = useForm({
    documento: "",
  });

  const { state, getBeneficiarios, getBeneficiario, initBeneficiario } = React.useContext(BeneficiarioContext)
  const [beneficiario, setBeneficiario] = React.useState("");

  const buscarBeneficiario = async () => {
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
    getBeneficiario(data.beneficiario.docs[0]._id);
    onResetFormdocu();
      //alert("beneficiario encontrado")
  } catch (error) {
    console.log(error, 'error');
    setBeneficiario("");
    initBeneficiario();
    //onResetForm();
    if (error.response.status === 404){
      alert("Respuesta: " + error.response.data.msg)
    }
  }
  }

  return (
    <>
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
            value={formStatedocu?.documento}
            onChange={ (event ) => onInputChangedocu(event) }
        />
      </Grid>
      <Grid item xs={12} md={3.5} sx={{ 
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
                    >Buscar Beneficiario</Button>
      </Grid>

    </>
  )
}

export default SearchBeneficiario ;
