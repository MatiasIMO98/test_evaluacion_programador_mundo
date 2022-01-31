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

    const [regiones, setRegiones] = useState([]);
    const [provPorReg, setProvPorReg] = useState([]);
    const [ciuPorProv, setCiuPorProv] = useState([]);
    const [regionSelect, setRegionSelect] = useState();
    const [provinciaSelect, setProvinciaSelect] = useState();
    const [ciudadSelect, setCiudadSelect] = useState();
    const [calleSelect, setCalleSelect] = useState();
    const [idModificar, setIdModificar] = useState();
    const [idEliminar, setDeBorrado] = useState();
    const [filas, setFilas] = useState([]);

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

    useEffect(() => {
        getRegiones();
        getCalles();
    }, []);

    const getRegiones = async () => {
        const response = await fetch(`http://tep_v3.test/api/regiones`);
        const data = await response.json();
        setRegiones(data);
        console.log(data);
    }
    const getProvPorReg = async (id) => {
        const respuesta = await fetch(`http://tep_v3.test/api/provinciaPorRegion/${id}`);
        const data = await respuesta.json();
        setProvPorReg(data);
    }
    const getCiuPorProv = async (id) => {
        const respuesta = await fetch(`http://tep_v3.test/api/ciudadPorProvincia/${id}`);
        const data = await respuesta.json();
        setCiuPorProv(data);
    }

    const vaciarCampos = () => {
        setRegionSelect();
        setProvinciaSelect();
        setCiudadSelect();
        setCalleSelect();
    }

    const [notificacion, setNotificacion] = useState(false);

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

    const getCalles = async () => {
        const response = await fetch(`http://tep_v3.test/api/calleCompleta`);
        const data = await response.json();
        setFilas(data);
        console.log(data);
    };

    //agraga modificar    
    const cambiarCalle = (idModificar) => {
        const response = fetch(`http://tep_v3.test/api/actualizarCalle/${idModificar}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({ nombre: calleSelect, ciudad: ciudadSelect })
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

    const handleBorrarDef = () => { borrarCalle(idEliminar); setNotificacion(false); }
    const handleCerrarNotif = () => { setNotificacion(false); }
    const handleClick = () => { setOpen(true); };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>

            <NavBarComponent></NavBarComponent>
            <br></br>
            <Button style={{ backgroundColor: "#69a420", float: 'right' }} variant="contained" onClick={handleAbierto}>Ingresar Nueva Calle</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Calles Existentes">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Calle</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Ciudad</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Provincia</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Región</TableCell>
                            <TableCell align='right' style={{ fontWeight: "bold" }}>Controles de acción</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {filas.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align='left'>{row.nombre}</TableCell>
                                <TableCell align='left'>{row.nombreCiudad}</TableCell>
                                <TableCell align='left'>{row.nombreProvincia}</TableCell>
                                <TableCell align='left'>{row.nombreRegion}</TableCell>
                                <TableCell align='right'><Button variant="contained"
                                    onClick={() => {
                                        handleAbierto2();
                                        getProvPorReg(row.region);
                                        getCiuPorProv(row.provincia);
                                        setRegionSelect(row.region);
                                        setProvinciaSelect(row.provincia);
                                        setCiudadSelect(row.ciudad);
                                        setCalleSelect(row.nombre);
                                        setIdModificar(row.id);
                                    }}

                                >Modificar</Button>


                                    <Button color="error" variant="contained" onClick={() => { setNotificacion(true); setDeBorrado(row.id) }}>Borrar</Button></TableCell>
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
                        <div>
                            <FormControl>
                                <InputLabel id="Regiones-Disponibles">Región</InputLabel>
                                <Select
                                    labelId="Regiones-Disponibles"
                                    id="simple-region"
                                    value={regionSelect}
                                    label="Regiones"
                                    onChange={(event) => {
                                        setRegionSelect(event.target.value);
                                        getProvPorReg(event.target.value);
                                        setCiuPorProv([])
                                    }}
                                >
                                    {regiones.map((region) => {

                                        return <MenuItem value={region.id}>{region.nombre}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel id="Provincias-Disponibles">Provincia</InputLabel>
                                <Select
                                    labelId="Provincias-Disponibles"
                                    id="simple-provincia"
                                    value={provinciaSelect}
                                    label="Provincias"
                                    onChange={
                                        (event) => {
                                            setProvinciaSelect(event.target.value);
                                            getCiuPorProv(event.target.value)
                                        }}
                                >
                                    {provPorReg.map((pro) => {
                                        return <MenuItem value={pro.id}>{pro.nombre}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <br></br>
                        <div>
                            <FormControl>
                                <InputLabel id="Ciudades-Disponibles">Ciudad</InputLabel>
                                <Select
                                    labelId="Ciudades-Disponible"
                                    id="simple-ciudad"
                                    value={ciudadSelect}
                                    label="Ciudades"
                                    onChange={(event) => { setCiudadSelect(event.target.value) }}
                                >
                                    {ciuPorProv.map((ci) => {
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
                                value={calleSelect}
                                onChange={(event) => { setCalleSelect(event.target.value) }}
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