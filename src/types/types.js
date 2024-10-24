export const types =  {

    auth: {
        onLogin:   '[AUTH] - LOGIN',
        onLogout:  '[AUTH] - LOGOUT',
    },
    user: {
        getUsers:   '[USERS] - USERS ALL',
        getOneUser: '[USERS] - USER BY ID',
        editUser:   '[USERS] - USER UPDATE',
        deleteUser: '[USERS] - USER DELETE',
        activeUser: '[USERS] - USER ACTIVE',
        messages:   '[USERS] - USER ERROR MESSAGE',
        loading:    '[USERS] - USER LOADING',
    },
    beneficiario: {
        getBeneficiarios: '[BENEF] - BENEF ALL',
        messages:   '[BENEF] - BENEFICIARIO ERROR MESSAGE',
        getProvincias: '[BENEF] - PROVINCIAS ALL',
        getDepartamentos: '[BENEF] - DEPARTAMENTOS ALL',
        getLocalidades: '[BENEF] - LOCALIDADES ALL',
        getMunicipios:  '[BENEF] - MUNICIPIOS ALL',
        getGeneros: '[BENEF] - GENEROS ALL',
        getProgramasociales: '[BENEF] - PROGRAMAS SOCIALES ALL',
        getEstudios: '[BENEF] - ESTUDIOS ALL',
        getOneBene:  '[BENEF] - BENE BY ID',
        deleteBeneficiario: '[BENEF] - BENEF DELETE',
        initBeneficiario: '[BENEF] - BENEF INIT',
    }
}