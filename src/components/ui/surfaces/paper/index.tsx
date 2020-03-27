import React, {FunctionComponent, ReactNode, Fragment} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) =>
    createStyles({
        paper: {
            height: "100%",
            boxSizing: "border-box",
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
    className?: string;
    children: ReactNode;
    normalizeHeight?: boolean;
}

const AntPaper: FunctionComponent<AntPaperProps> = ({children, normalizeHeight, className}) => {

    const classes = useStyles();

    return (
        <Paper className={`${classes.paper} ${normalizeHeight && classes.normalizeHeight} ${className && className}`}>
            {children}
        </Paper>
    );
};

export default AntPaper;


type ConditionalPaperTypes = AntPaperProps & {
    condition: boolean | undefined;
}

export const ConditionalPaper: FunctionComponent<ConditionalPaperTypes> = ({condition, children, normalizeHeight}) =>
    condition ? <AntPaper normalizeHeight={normalizeHeight}>{children}</AntPaper> : <Fragment>{children}</Fragment>;
