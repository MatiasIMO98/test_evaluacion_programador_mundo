
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from "@material-ui/core";

export default function EditarCalle(props) {




  const [regiones, setRegiones] = useState([]);
  const [proUsable, setProUsable] = useState([]);
  const [ciUsable, setCiUsable] = useState([]);
  const [regionActual, setRegionActual] = useState();
  const [provinciaActual, setProvinciaActual] = useState();
  const [ciudadActual, setCiudadActual] = useState();
  const [calleActual, setCalleActual] = useState();



  const getRegiones = async () => {
    const response = await fetch(`http://backend.test/api/regiones`);
    const data = await response.json();
    setRegiones(data);
    console.log(data);

  }
  const getProUsable = async (id) => {
    const respuesta = await fetch(`http://backend.test/api/provincias/regiones/${id}`);
    const data = await respuesta.json();
    setProUsable(data);

  }

  const getCiUsable = async (id) => {
    const respuesta = await fetch(`http://backend.test/api/ciudades/provincia/${id}`);
    const data = await respuesta.json();
    setCiUsable(data);
  }

  const handleCierre = () => { props.setAbierto(false); console.log(regionActual); vaciarCampos(); };

  useEffect(() => {
    getRegiones();
  }, []);

  const cambiarCalle = (idVariable) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ca_nombre: calleActual, ci_id: ciudadActual })
    };
    fetch("http://backend.test/api/nada/${idVariable}", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          props.setSeverity('info');
          props.setMensaje('Calle Modificada con Exito');
          props.setOpen(true);
          props.getCalles();
          vaciarCampos();
        } else {
          props.setSeverity('error');
          props.setMensaje('La Calle no ha sido Modificada');
          props.setOpen(true);
          props.getCalles();
          vaciarCampos();
        }


      });

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const vaciarCampos = () => {
    setRegionActual();
    setProvinciaActual();
    setCiudadActual();
    setCalleActual();
  }


  return (

    <Modal
      open={props.abierto}
      onClose={handleCierre}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={style}
        autoComplete="off"
      >
        <FormControl>
          <div>
            <InputLabel id="Regiones-Disponibles">Región</InputLabel>
            <Select
              labelId="Regiones-Disponibles"
              id="simple-region"
              value={regionActual}
              label="Regiones"
              onChange={(event) => {
                setRegionActual(event.target.value);
                getProUsable(event.target.value);
                setCiUsable([])
              }}
            >
              {regiones.map((reg) => {

                return <MenuItem value={reg.re_id}>{reg.re_nombre}</MenuItem>
              })}
            </Select>
          </div>
        </FormControl>


        <div>
          <FormControl>
            <InputLabel id="Provincias-Disponibles">Provincia</InputLabel>
            <Select
              labelId="Provincias-Disponibles"
              id="simple-provincia"
              value={provinciaActual}
              label="Provincias"
              onChange={
                (event) => {
                  setProvinciaActual(event.target.value);
                  getCiUsable(event.target.value)
                }}
            >
              {proUsable.map((pro) => {
                return <MenuItem value={pro.pr_id}>{pro.pr_nombre}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl>
            <InputLabel id="Ciudades-Disponibles">Ciudad</InputLabel>
            <Select
              labelId="Ciudades-Disponible"
              id="simple-ciudad"
              value={ciudadActual}
              label="Ciudades"
              onChange={(event) => { setCiudadActual(event.target.value) }}
            >
              {ciUsable.map((ci) => {
                return <MenuItem value={ci.ci_id}>{ci.ci_nombre}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <InputLabel id="simple-nombre-calle">_</InputLabel>
          <TextField
            required
            id="simple-nombre-calle"
            label="Nombre de la calle"
            value={calleActual}
            onChange={(event) => { setCalleActual(event.target.value) }}
          />
        </div>


        <div>
          <Button variant="contained" onClick={() => { cambiarCalle() }}>Guardar</Button>
        </div>

      </Box>
    </Modal>
  );

}
