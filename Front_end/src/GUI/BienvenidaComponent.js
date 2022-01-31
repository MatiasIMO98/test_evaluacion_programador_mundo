import { Container, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBarComponent from './NavBarComponent';

const useStyles = makeStyles((theme) => ({
    canva: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    list: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    bold: {
        fontWeight: 'bold'
    }
}));

export default function BienvenidaComponent() {
    const classes = useStyles();
    return (
        <Container component="main">
            <NavBarComponent>
            </NavBarComponent>
            <div className={classes.canva}>
                <List>
                    <ListItem className={classes.list}>
                        <Typography variant="h3" className={classes.bold} gutterBottom>
                            Bienvenido al mantenedor de Calles
                        </Typography>
                    </ListItem>
                </List>
            </div>
        </Container>
    );
}