import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Grid} from "@material-ui/core";


const useStyles = makeStyles(() =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
            padding: "10px 0",
        }
    }),
);

const AlarmSettings = () => {

    const classes = useStyles();

    return(
        <Grid container className={classes.gridContainer} spacing={3}>
            Ha
        </Grid>
    );
};

export default AlarmSettings;
