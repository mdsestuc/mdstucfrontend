import { useEffect, useMemo, useState } from 'react';



export const useForm = ( initialForm = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );


    // useEffect(() => {
    //     setFormState( initialForm );
    // }, [ initialForm ])

    console.log(initialForm, 'initialForm')
    console.log(formState, 'formState')
    const onInputChange = ({ target }) => {
        const { name, value, selectedIndex } = target;
        // console.log(name, "name")
        // console.log(value, "value")
        // console.log(target, "target")
        setFormState({
            ...formState,
            [ name ]: value
        });
        // if (name === 'provincia') { setFormState({
        //     ...formState,
        //     idprovincia: id
        // })}

    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const addProvisetForm = ( id, nombre, tipo ) => {
        console.log(id, nombre, tipo, 'hooks valores')
        switch (tipo) {
            case 'Provincia':
                setFormState({
                    ...formState,
                    idprovincia: id,
                    provincia: nombre
                });                
                break;       
            case 'Departamento':
                setFormState({
                    ...formState,
                    iddepartamento: id,
                    departamento: nombre
                });
                break;
            case 'Localidad':
                setFormState({
                    ...formState,
                    idlocalidad: id,
                    localidad: nombre
                });
                break;
            case 'Municipio':
                setFormState({
                    ...formState,
                    idmunicipio: id,
                    municipio: nombre
                });
                break;
            case 'Genero':
                setFormState({
                    ...formState,
                    idsexo: id,
                    genero: nombre
                });
                break;
            case 'Estudio':
                setFormState({
                    ...formState,
                    idestudio: id,
                    estudio: nombre
                })
                break;
            default:
                break;
        }

    }
    const addLatyLon = (lat, lon) =>{
        console.log(lat, lon, 'lon y lat')
        setFormState({
            ...formState,
            latitud: lat,
            longitud: lon,
        })
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        addProvisetForm,
        addLatyLon,

    }
}