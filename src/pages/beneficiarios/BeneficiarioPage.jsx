import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Grid, IconButton, Paper, Skeleton, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { BeneficiarioContext } from '../../contexts/BeneficiarioContext';
import moment from 'moment';

export const BeneficiarioPage = () => {

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const { state, getBeneficiarios, getBeneficiario, deleteBeneficiario } = useContext(BeneficiarioContext)
  //const { state, getUsers, getUser, deleteUser,  activeUser } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect( () => {
    getBeneficiarios(page);
  }, []);

  // Eliminar Beneficiario
  const onClickDelete = ( id ) => {
    if(window.confirm('¿Esta seguro que desea eliminar el Beneficiario?')){
      deleteBeneficiario(id);
    }
  }

  const getButtonsActions = (row) => {

    return (
      <>
        {  
          <IconButton
            color='info'
            title='Editar'
            onClick={() => { getBeneficiario(row._id), navigate(`/Beneficiarios/editar/${row._id}`)}}
          >
            <DriveFileRenameOutlineIcon
              fontSize='medium'
              color={'info'}
            />
          </IconButton>
        }

        { 
          <IconButton
            onClick={() => onClickDelete(row._id)}
            title='Eliminar Beneficiario'
          >
            <DeleteOutlineIcon
              fontSize='medium'
              color={'info'}
              //color={row.is_active ? 'info' : 'disabled'}
            />
          </IconButton>
        }
      </>
    )
  }

  const columns = [
    {
      //flex: 0.05,
      field: 'nombre',
      headerName: 'Beneficiario',
      renderCell: ({ row }) => {
        return `${row.apellido || ''},${row.nombre || ''}`
      },
      width: 350
    },
    {
      //flex: 0.10,
      field: 'documento',
      headerName: 'Documento',
      renderCell: ({ row }) => {
        return new Intl.NumberFormat("es-CL").format(row.documento);
        //return <PatternFormat format="##.###.###"  value={row.documento} valueIsNumericString={true} />
      }, 
      minWidth: 150,
    },
    {
      //flex: 0.25,
      field: 'provincia',
      headerName: 'Provincia',
      Width: 60,
    },
    {
      field: 'idsexo',
      headerName: 'Sexo',
      //flex: 1,
      valueFormatter: ({ value }) => {
        // Assuming user_id is an object with id and name properties
        const { nombre } = value || {}; // Destructure nombre
        return `${nombre || ''}`;
      },
      Width: 60
    },
    {
      //flex: 0.05,
      field: 'created_at',
      headerName: 'Creado',
      width: 200,
      renderCell: ({ row }) => {
        return moment(row.updated_at).format("DD/MM/YYYY hh:mm:ss")
      }
    },
    {
      flex: 0,
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Box>
            {getButtonsActions(row)}
          </Box>
        )
      }
    },
  ];





    
  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12} sx={{  
              marginLeft: 3,
          }}
      > */}
      <Grid container item xs={12} md={12} sx={{ marginLeft: 1}}>
          <Grid  item xs={12} md={9} sx={{ 
                        //borderBottom: 2, 
                        //marginLeft: 3, 
                        //paddingBottom: 2,  
                        //borderColor: '#ebe3e3',
                        marginTop: 1,
                    }}> 
          <Typography 
            variant='h5' 
            fontFamily={'fantasy'}
            //alignContent ={'flex-end'}
          >
            Lista Beneficiarios
      
            </Typography>
            </Grid>

            <Grid  item xs={12} md={3} sx={{ 
                        //borderBottom: 2, 
                        //marginLeft: 3, 
                        //paddingBottom: 2,  
                        //borderColor: '#ebe3e3',
                        //justifyContent: 'flex-end',
                        //display: 'flex',
                        ///alignItems: 'flex-center',
                        //flexDirection: 'column',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        //flexDirection: 'column',
                        marginTop: 1,
                    }}>
              <Button item 
                variant='contained' 
                size='large' 
                color='info'
                onClick={() => navigate(`/beneficiarios/add`)}
                >
                  AGREGAR
              </Button>
            </Grid>   
      </Grid>      

      <Grid item xs={12} md={12}>
        <Paper>
          <div style={{ width: '100%' }}>
            <DataGrid 
              // className='animate__animated animate__fadeIn'
              loading={state.isLoading}
              autoHeight
              // checkboxSelection
              rows={state.beneficiarios} 
              columns={columns} 
              paginationMode='client'
              pageSize={pageSize}
              page={page}
              pageSizeOptions={[5, 10, 100]}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ 
                boxShadow: 1,
                border: 1,
                borderColor: '#ccc',
                '& .MuiDataGrid-columnHeaders': { 
                  borderRadius: 0, 
                  backgroundColor: "rgba(0,141,255,0.2)" 
                } 
              }}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onPageChange={(newPage) => setPage(newPage)}
              // localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}
