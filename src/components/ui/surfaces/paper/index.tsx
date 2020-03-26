import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    }),
);


type AntPaperProps = {
    children: ReactNode;
}

const AntPaper: FunctionComponent<AntPaperProps> = ({children}) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            {children}
        </Paper>
    );
};

export default AntPaper;
