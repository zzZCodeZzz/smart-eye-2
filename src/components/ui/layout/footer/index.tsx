import React, {Fragment, FunctionComponent} from "react";
import {AppBar, Container, createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useActiveDevice} from "../../../../redux/device/deviceStoreSelectors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            padding: theme.spacing(2.5)
        },
        footer: {
            background: theme.palette.secondary.main,
            "& span" : {
                display: "block"
            }
        },
        right: {
            [theme.breakpoints.up("sm")]: {
                textAlign: "right"
            }
        }
    })
);

const Footer: FunctionComponent = () => {

    const activeDevice = useActiveDevice();

    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="static">
                <Container maxWidth="lg" className={classes.gridContainer}>
                    <Grid container justify="space-between" alignItems="center" spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            Verbindungsart: {activeDevice && activeDevice.connection_type}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Seriennummer: {activeDevice && activeDevice.serial_number}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Batterie: {activeDevice && activeDevice.battery_type}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Letzt kalibrierung: ?
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Aktiv: {activeDevice && activeDevice.last_seen}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Temparatur: {activeDevice && activeDevice.temperature}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Standort: Wolfratshause
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            Boardnummer: {activeDevice && activeDevice.board_number}
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            <AppBar position="static" component="footer" className={classes.footer}>
                <Container maxWidth="lg" className={classes.gridContainer}>
                    <Grid container spacing={3} justify="space-between" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <span>RadEye PRD-ER 33525</span>
                            <span>DESKTOP-RMTM4VA</span>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.right}>
                            Thermo Fisher Scientific
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </Fragment>
    );
};


export default Footer;
