import React, {Fragment, FunctionComponent} from "react";
import {AppBar, Container, createStyles, Grid, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useActiveDevice} from "../../../../redux/device/deviceStoreSelectors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            background: theme.palette.secondary.main
        },
        container: {
            padding: theme.spacing(3)
        },
        right: {
            textAlign: "right"
        }
    })
);

// TODO @manu geht das?
// const infoGrid = (item) => (
//     <Grid item xs={12} sm={4} md={3}>
//          infoGridItem
//     </Grid>
// )

const Footer: FunctionComponent = () => {

    const activeDevice = useActiveDevice();

    console.log(activeDevice);

    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="static">
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container justify="space-between" alignItems="center">
                        Verbindungsart: {activeDevice && activeDevice.connection_type}
                        Seriennummer: {activeDevice && activeDevice.serial_number}
                        Batterie: {activeDevice && activeDevice.batteryType}
                        Letzt kalibrierung: ?
                        Aktiv: {activeDevice && activeDevice.last_seen}
                        Temparatur: {activeDevice && activeDevice.temperature}
                        Standort: Wolfratshause
                        Boardnummer: {activeDevice && activeDevice.board_number}
                    </Grid>
                </Container>
            </AppBar>
            <AppBar position="static" component="footer" className={classes.footer}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container justify="space-between">
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
