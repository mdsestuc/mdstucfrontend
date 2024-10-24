import { useReducer } from "react";
import { BeneficiarioContext } from "../contexts/BeneficiarioContext"
import { BeneficiarioReducer } from "../reducers/BeneficiarioReducer";
import { dashAxios } from "../config/DashRcAxios"
import { types } from "../types/types"


const initialState = {
    isLoading: true,
    isActive: false,
    beneficiarios: [],
    beneficiario: {},
    totalRows: 0,
    errorMessage: '',
    succesMessage: '',
    provincias: [],
    provincia: {},
    departamentos: [],
    departamento: {},
    localidades: [],
    localidad: {},
    municipios: [],
    municipio: {},
    genero: [],
    estudios: [],
    programasociales: [],
}

export const BeneficiarioProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(BeneficiarioReducer,  initialState);

    
    const addBeneficiario = async (newBeneficiario) => {
        const {
                nombre,
                apellido,
                documento,
                idprovincia,
                provincia,
                iddepartamento,
                departamento,
                idmunicipio,
                municipio,
                idlocalidad,
                localidad,
                domicilio,
                numero,
                piso,
                cp,
                idsexo,
                genero,
                fechanacimiento,
                nrocel1,
                nrocel2,
                latitud,
                longitud,
                idestudio,
                estudio,
                jubilacion,
                pension,
                programasocialId } = newBeneficiario;

        const { data } = await dashAxios.post('/beneficiariosAdd/', {
            nombre,
            apellido,
            documento,
            idprovincia,
            provincia,
            iddepartamento,
            departamento,
            idmunicipio,
            municipio,
            idlocalidad,
            localidad,
            domicilio,
            numero,
            piso,
            cp,
            idsexo,
            genero,
            fechanacimiento,
            nrocel1,
            nrocel2,
            latitud,
            longitud,
            idestudio,
            estudio,
            jubilacion,
            pension,
            programasocialId
          });

    }

    const getBeneficiario = (_id) => {

        try {
            const benefi1 = state.beneficiarios.find((item) => item._id == _id);
            console.log(benefi1, 'pasa find del user0')
            if(!benefi1){
                return dispatch({
                    type: types.beneficiario.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existe el Beneficiario en el sistema',
                    }
                })
            }
            console.log('pasa find del benefi1')

            dispatch({
                type: types.beneficiario.getOneBene,
                payload: {
                    benefi1
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const initBeneficiario = () => {
        try {
            const beneficiario = {};
            dispatch({
                type: types.beneficiario.initBeneficiario,
                payload: {
                    beneficiario
                }
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const editBeneficiario = async (modificarBeneficiario) => {

        const {
            id,
            nombre,
            apellido,
            documento,
            idprovincia,
            provincia,
            iddepartamento,
            departamento,
            idmunicipio,
            municipio,
            idlocalidad,
            localidad,
            domicilio,
            numero,
            piso,
            cp,
            idsexo,
            genero,
            fechanacimiento,
            nrocel1,
            nrocel2,
            latitud,
            longitud,
            idestudio,
            estudio,
            jubilacion,
            pension,
            programasocialId } = modificarBeneficiario;

        const { data } = await dashAxios.put('/beneficiarioEdit/', {
            id,
            nombre,
            apellido,
            documento,
            idprovincia,
            provincia,
            iddepartamento,
            departamento,
            idmunicipio,
            municipio,
            idlocalidad,
            localidad,
            domicilio,
            numero,
            piso,
            cp,
            idsexo,
            genero,
            fechanacimiento,
            nrocel1,
            nrocel2,
            latitud,
            longitud,
            idestudio,
            estudio,
            jubilacion,
            pension,
            programasocialId
        });

        console.log(data)
    }

    const deleteBeneficiario = async (id) => {

        const { data } = await dashAxios.delete(`beneficiariodelete/${id}`);

        if(data){
            const benes = state.beneficiarios.filter ( bene => bene.id != id)
            dispatch({
                type: types.beneficiario.deleteBeneficiario,
                payload: {
                    benes,
                }
            })
        }
    }

    
    const getMunicipios = async (id) => {
        const data = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=id,nombre&max=200`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const respuesta = await data.json();
        console.log(respuesta, "municipios")
        if(!respuesta.municipios){
            return dispatch({
                type: types.beneficiario.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No se cargaron las municipios en el sistema'
                }
            })
        }
        dispatch({
            type: types.beneficiario.getMunicipios,
            payload: {
                municipios: respuesta.municipios.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)),
            }
        });
    }
    const getLocalidades = async (id) => {
        const data = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}&campos=id,nombre&max=200`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const respuesta = await data.json();
        console.log(respuesta, "localidades")
        if(!respuesta.localidades){
            return dispatch({
                type: types.beneficiario.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No se cargaron las localidades en el sistema'
                }
            })
        }
        dispatch({
            type: types.beneficiario.getLocalidades,
            payload: {
                localidades: respuesta.localidades.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)),
            }
        });
    }
    const getDepartamentos = async (id) => {
        const data = await fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${id}&campos=id,nombre&max=200`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const respuesta = await data.json();
        console.log(respuesta, "departamentos");
        if(!respuesta.departamentos){
            return dispatch({
                type: types.beneficiario.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No se cargaron los departmentos en el sistema'
                }
            });
        }
        dispatch({
            type: types.beneficiario.getDepartamentos,
            payload:  {
                departamentos:  respuesta.departamentos.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)),
            }
        });
    }

    const getProvincias = async () => {        
        const data = await fetch(`https://apis.datos.gob.ar/georef/api/provincias`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            } 
        });
        const respuesta = await data.json();
        console.log(respuesta, 'provincias body');
        if(!respuesta.provincias){
            return dispatch({
                type: types.beneficiario.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No se cargaron las Provincias en el sistema',
                }
            })
        };
        console.log('llega al dispatch provincias')
        dispatch({
            type: types.beneficiario.getProvincias,
            payload:  {
                provincias:  respuesta.provincias.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)),
            }
        });
    }
    const getEstudios = async (page=1) => {
        const limit = 25;
        const { data } = await dashAxios.get(`/listarestudios?limit=${limit}&page=${page}`)
        console.log(data, 'list etudios');
        if (!data.estudio.docs){
            return dispatch({
                type: types.beneficiario.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No Existen Estudios en el sistema',
                }
            })            
        }
        dispatch({
            type: types.beneficiario.getEstudios,
            payload: { estudios: data.estudio.docs, }
        });        
    }
    const getGenero = async (page=1) => {
        const limit = 25;
        const { data } = await dashAxios.get(`/listargenero?limit=${limit}&page=${page}`);
        console.log(data, 'list genero');
        if(!data.genero.docs){
            return dispatch({
                    type: types.beneficiario.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existen Generos en el sistema',
                    }
            })
        }
        dispatch({
            type: types.beneficiario.getGeneros,
            payload: { genero: data.genero.docs, }
        });
    }
    const getProgramasociales = async (page=1) => {
        const limit = 25;
        const { data } = await dashAxios.get(`/listarprogramassociales?limit=${limit}&page=${page}`);
        console.log(data, 'list programas');
        if(!data.progsocial.docs){
            return dispatch({
                    type: types.beneficiario.messages,
                    payload: {
                        messageStatus: 'ERROR',
                        msg: 'No Existen Programas Sociales en el sistema',
                    }
            })
        }
        dispatch({
            type: types.beneficiario.getProgramasociales,
            payload: { progsocial: data.progsocial.docs, }
        });
    }
    const getBeneficiarios = async (page = 1) =>  {
        const limit = 25;
        //const { data } = await dashAxios.get(`users?limit=${limit}&page=${page}`);
        const { data } = await dashAxios.get(`listarbeneficiarios?limit=${limit}&page=${page}`);
        console.log(data)
        if(!data.bene.docs){
            return dispatch({
                type: types.beneficiario.messages,
                payload: {
                    messageStatus: 'ERROR',
                    msg: 'No Existen Beneficarios en el sistema',
                }
            })
        };

        //canbio _id con id
        let arreglado =  data.bene.docs.map( (p,i) => {

            // crear nueva propiedad de nombre producto{i + 1}
            p[`id`] = p._id;
            return p;
            });
      
        dispatch({
            type: types.beneficiario.getBeneficiarios,
            payload:  {
                beneficiarios:  data.bene.docs,
                totalRows: data.bene.totalPages
            }
        });
    }
    return (
        <BeneficiarioContext.Provider value={{
            state,
            getBeneficiarios,
            getProvincias,
            getDepartamentos,
            getLocalidades,
            getMunicipios,
            getGenero,
            addBeneficiario,
            getBeneficiario,
            editBeneficiario,
            deleteBeneficiario,
            getEstudios,
            getProgramasociales,
            initBeneficiario,
            //activeUser,            
        }}>
            { children }
        </BeneficiarioContext.Provider>
    )

}