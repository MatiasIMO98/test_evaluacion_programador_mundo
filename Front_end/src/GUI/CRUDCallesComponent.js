
import React, { useEffect, useState } from "react";
import NavBarComponent from "./NavBarComponent";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CrearCalle from "./CrearCalleComponent";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from "@material-ui/core";


export default function Mantenedor() {

    const [severity, setSeverity] = useState("success");

    const [mensaje, setMensaje] = useState("");

    const [open, setOpen] = useState(false);

    const [abierto, setAbierto] = useState(false);
    const handleAbierto = () => { setAbierto(true) };
    const handleCierre = () => setAbierto(false);

    const [abierto2, setAbierto2] = useState(false);
    const handleAbierto2 = () => { setAbierto2(true) };
    const handleCierre2 = () => setAbierto2(false);

    //inicio traspaso modificar
    const [regiones, setRegiones] = useState([]);
    const [proUsable, setProUsable] = useState([]);
    const [ciUsable, setCiUsable] = useState([]);
    const [regionActual, setRegionActual] = useState();
    const [provinciaActual, setProvinciaActual] = useState();
    const [ciudadActual, setCiudadActual] = useState();
    const [calleActual, setCalleActual] = useState();
    const [idModificar, setIdModificar] = useState();

    const getRegiones = async () => {
        const response = await fetch(`http://tep_v3.test/api/regiones`);
        const data = await response.json();
        setRegiones(data);
        console.log(data);

    }
    const getProUsable = async (id) => {
        const respuesta = await fetch(`http://tep_v3.test/api/provinciaPorRegion/${id}`);
        const data = await respuesta.json();
        setProUsable(data);

    }

    const getCiUsable = async (id) => {
        const respuesta = await fetch(`http://tep_v3.test/api/ciudadPorProvincia/${id}`);
        const data = await respuesta.json();
        setCiUsable(data);
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

    useEffect(() => {
        getRegiones();
    }, []);

    //fin primera area traspaso modificar



    const [notificacion, setNotificacion] = useState(false);

    const handleBorrarDef = () => {
        borrarCalle(idEliminar);
        setNotificacion(false);
    }

    const handleCerrarNotif = () => {
        setNotificacion(false);
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const [filas, setFilas] = useState([]);

    const borrarCalle = (idEliminar) => {
        const response = fetch(`http://tep_v3.test/api/calle/${idEliminar}`, {
            method: 'delete'
        }).then((response) => {
            if (response.status === 200) {
                getCalles();
                handleClick();
                setSeverity('info');
                setMensaje('Calle Borrada con Exito');
            } else {
                getCalles();
                handleClick();
                setSeverity('error');
                setMensaje('La Calle no ha sido Borrada');
            }
        });

    }

    const [idEliminar, setDeBorrado] = useState();



    const getCalles = async () => {
        const response = await fetch(`http://tep_v3.test/api/calleCompleta`);
        const data = await response.json();
        setFilas(data);
        console.log(data);
    };

    useEffect(() => {
        getCalles();
    }, []);

    //agraga modificar    
    const cambiarCalle = (idModificar) => {
        const response = fetch(`http://tep_v3.test/api/actualizarCalle/${idModificar}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ nombre: calleActual, ciudad: ciudadActual })
        }
        ).then((response) => {
            if (response.status === 200) {
                getCalles();
                handleClick();
                setSeverity('info');
                setMensaje('Calle Modificada con Exito');
            } else {
                getCalles();
                handleClick();
                setSeverity('error');
                setMensaje('La Calle no ha sido Modificada');
            }
        });
    };
    //fin modificar

    return (
        <div>
            <NavBarComponent></NavBarComponent>
            <Button style={{ backgroundColor: "#69a420" }} variant="contained" onClick={handleAbierto}>Ingresar Nueva Calle</Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Calles Existentes">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align='right'>Calle</TableCell>
                            <TableCell align='right'>Ciudad</TableCell>
                            <TableCell align='right'>Provincia</TableCell>
                            <TableCell align='right'>Región</TableCell>
                            <TableCell align='right'>Botones Modificar</TableCell>
                            <TableCell align='right'>Botones Borrar</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {filas.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align='right'>{row.nombre}</TableCell>
                                <TableCell align='right'>{row.nombreCiudad}</TableCell>
                                <TableCell align='right'>{row.nombreProvincia}</TableCell>
                                <TableCell align='right'>{row.nombreRegion}</TableCell>
                                <TableCell align='right'><Button variant="contained"
                                    onClick={() => {
                                        handleAbierto2();
                                        getProUsable(row.id);
                                        getCiUsable(row.provincia);
                                        setRegionActual(row.id);
                                        setProvinciaActual(row.provincia);
                                        setCiudadActual(row.ciudad);
                                        setCalleActual(row.nombre);
                                        setIdModificar(row.id);
                                    }}

                                >Modificar</Button></TableCell>


                                <TableCell align='right'><Button color="error" variant="contained" onClick={() => { setNotificacion(true); setDeBorrado(row.id) }}>Borrar</Button></TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><MuiAlert onClose={handleClose} severity={severity}>{mensaje}</MuiAlert></Snackbar>
                <CrearCalle abierto={abierto} setAbierto={setAbierto} cerrado={handleCierre} setSeverity={setSeverity} setMensaje={setMensaje} getCalles={getCalles} setOpen={setOpen}></CrearCalle>
                <Modal
                    open={abierto2}
                    onClose={handleCierre2}
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
                                    {regiones.map((region) => {

                                        return <MenuItem value={region.id}>{region.nombre}</MenuItem>
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
                                        return <MenuItem value={pro.id}>{pro.nombre}</MenuItem>
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
                                        return <MenuItem value={ci.id}>{ci.nombre}</MenuItem>
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
                            <Button variant="contained" onClick={() => { cambiarCalle(idModificar) }}>Guardar</Button>
                        </div>

                    </Box>
                </Modal>



                <Dialog open={notificacion} >
                    <DialogTitle id="alert-dialog-title">
                        {"¿Realmente Deseas Borrar?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            El Borrado es Definitivo y no puede deshacerse.
                            ¿Realmente deseas Borrar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCerrarNotif}>Cancelar</Button>
                        <Button onClick={handleBorrarDef} autoFocus>
                            Borrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>


        </div>
    );
}