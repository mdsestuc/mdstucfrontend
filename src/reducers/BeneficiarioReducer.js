import { types } from "../types/types";

export const BeneficiarioReducer = (state, action) => {
    
    switch (action.type) {

        case types.beneficiario.getBeneficiarios:
          return {
            ...state,
            isLoading: false,
            beneficiarios: action.payload.beneficiarios,
            totalRows: action.payload.totalRows
          }
        case types.beneficiario.getProvincias:
          return {
            ...state,
            provincias: action.payload.provincias
          }
        case types.beneficiario.getDepartamentos:
          return {
            ...state,
            departamentos: action.payload.departamentos
          }
        case types.beneficiario.getLocalidades:
          return {
            ...state,
            localidades: action.payload.localidades
          }
        case types.beneficiario.getMunicipios:
          return {
            ...state,
            municipios: action.payload.municipios
          }
        case types.beneficiario.getGeneros:
          return{
            ...state,
            genero: action.payload.genero
          }
        case types.beneficiario.getEstudios:
          return{
            ...state,
            estudios: action.payload.estudios
          }
        case types.beneficiario.getProgramasociales:
          return{
            ...state,
            programasociales: action.payload.progsocial
          }
        case types.beneficiario.getOneBene:
          return {
            ...state,
            isLoading: false,
            beneficiario: action.payload.benefi1
          }
        case types.beneficiario.initBeneficiario:
          return {
            ...state,
            isLoading: false,
            beneficiario: action.payload.beneficiario
          }
        case types.beneficiario.deleteBeneficiario:
          return {
            ...state,
            isLoading: false,
            beneficiarios: action.payload.benes
          }

         default: state;
    }

}