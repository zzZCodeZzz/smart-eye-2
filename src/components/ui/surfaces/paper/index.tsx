import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";


const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) =>
    createStyles({
        box: {
            height: "100%",
            boxSizing: "border-box",
            padding: spacing(2),
            color: palette.text.secondary,
            borderRadius: 4,
            // boxShadow: shadows(3)
        },
        container: {
            "&not(last-child)": {
                paddingBottom: "16px"
            }
        },
        //TODO remove this shit everywhere
        normalizeHeight: {
            [breakpoints.up("sm")]: {
                minHeight: "7.5rem",
            }
        }
    }),
);

type AntBoxProps = {
    className?: string;
    children: ReactNode;
    normalizeHeight?: boolean;
}

const AntBox: FunctionComponent<AntBoxProps> = ({children, normalizeHeight, className}) => {

    const classes = useStyles();

    return (
        <Box boxShadow={2} className={`${classes.box} ${normalizeHeight && classes.normalizeHeight} ${className && className}`}>
            {children}
        </Box>
    );
};

export default AntBox;


type ConditionalBoxTypes = AntBoxProps & {
    condition: boolean | undefined;
}

export const ConditionalBox: FunctionComponent<ConditionalBoxTypes> = ({condition, children, normalizeHeight}) => {

    const classes = useStyles();

    return condition ? <AntBox normalizeHeight={normalizeHeight}>{children}</AntBox> : <div className={classes.container}>{children}</div>;
};

