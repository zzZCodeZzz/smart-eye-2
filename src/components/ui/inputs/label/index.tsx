import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        label: {
            fontSize: "0.75rem",
            textTransform: "uppercase"
        }
    })
);

type antLabelProps = {
    children: ReactNode;
}

const AntLabel: FunctionComponent<antLabelProps> = ({children}) => {

    const classes = useStyles();

    return <Typography component="span" className={classes.label}>{children}</Typography>

};

export default AntLabel;
