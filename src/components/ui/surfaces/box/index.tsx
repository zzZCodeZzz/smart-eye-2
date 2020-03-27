import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import {theme} from "../../layout/theme";

const useStyles = makeStyles(({spacing, palette}: Theme) =>
    createStyles({
        withPaper: {
            position: "relative",
            height: "100%",
            boxSizing: "border-box",
            padding: spacing(2),
            background: palette.background.paper,
            borderRadius: 4,
        },
        noPaper: {
            paddingBottom: theme.spacing(1),
            // "&:not(:last-child)": {
            //     paddingTop: theme.spacing(3)
            // }
        },
    }),
);

type AntBoxProps = {
    className?: string;
    children: ReactNode;
    normalizeHeight?: boolean;
}

type ConditionalBoxTypes = AntBoxProps & {
    condition: boolean | undefined;
}

const AntBox: FunctionComponent<AntBoxProps> = ({children, className}) => {
    const classes = useStyles();

    return (
        <Box boxShadow={2} className={`${classes.withPaper} ${className && className}`}>
            {children}
        </Box>
    );
};

export default AntBox;

export const ConditionalBox: FunctionComponent<ConditionalBoxTypes> = ({condition, children, normalizeHeight}) => {
    const classes = useStyles();

    return condition
        ? <AntBox normalizeHeight={normalizeHeight}>{children}</AntBox>
        : <div className={classes.noPaper}>{children}</div>;
};

