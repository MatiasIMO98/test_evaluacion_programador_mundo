import React, { useEffect, useState } from "react";
import NavBarComponent from "./NavBarComponent";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CallesExistentesComponent() {
    const [filas, setFilas] = useState([]);
    const getCalleCompleta = async () => {
        const response = await fetch(`http://tep_v3.test/api/calleCompleta`);
        const data = await response.json();
        setFilas(data);
    };

    useEffect(() => {
        getCalleCompleta();
    }, []);

    return (
        <div>
            <NavBarComponent></NavBarComponent>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Calles Existentes">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Calle</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Ciudad</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Provincia</TableCell>
                            <TableCell align='left' style={{ fontWeight: "bold" }}>Región</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filas.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align='left'>{row.nombre}</TableCell>
                                <TableCell align='left'>{row.nombreCiudad}</TableCell>
                                <TableCell align='left'>{row.nombreProvincia}</TableCell>
                                <TableCell align='left'>{row.nombreRegion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}