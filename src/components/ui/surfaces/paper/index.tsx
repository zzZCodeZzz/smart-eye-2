import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) =>
    createStyles({
        paper: {
            padding: spacing(2),
            color: palette.text.secondary,
        },
        normalizeHeight: {
            [breakpoints.up("sm")]: {
                minHeight: "7.5rem",
            }
        }
    }),
);


type AntPaperProps = {
    children: ReactNode;
    normalizeHeight?: boolean;
}

const AntPaper: FunctionComponent<AntPaperProps> = ({children, normalizeHeight}) => {

    const classes = useStyles();

    return (
        <Paper className={`${classes.paper} ${normalizeHeight && classes.normalizeHeight}`}>
            {children}
        </Paper>
    );
};

export default AntPaper;
