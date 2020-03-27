import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(({spacing}: Theme) =>
    createStyles({
        label: {
            display: "inline-block",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            marginTop: spacing(1),
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
            overflow: "hidden"
        }
    })
);

type antLabelProps = {
    children: ReactNode;
}

const AntLabel: FunctionComponent<antLabelProps> = ({children}) => {

    const classes = useStyles();

    return <Typography component="label" className={classes.label}>{children}</Typography>

};

export default AntLabel;
