import React, {FunctionComponent, ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Divider, Typography} from "@material-ui/core";

const useStyles = makeStyles(({spacing, typography}: Theme) =>
    createStyles({
        h2: {
            fontSize: typography.h6.fontSize,
            fontWeight: typography.fontWeightBold,
            textTransform: "uppercase",
            // marginBottom: `${spacing(2)}px`,
            display: "block",
            width: "100%"
        },
        h3: {
            fontWeight: typography.fontWeightMedium,
            margin: `${spacing(3)}px 0 ${spacing(1)}px`,
            display: "block",
            width: "100%"
        }
    })
);

type TypographyProps = {
    children: ReactNode | string;
}

export const H2: FunctionComponent<TypographyProps> = ({children}) => {

    const classes = useStyles();

    return (
        <Typography component="h2" className={classes.h2}>
            {children}
        </Typography>
    )

};

export const H3: FunctionComponent<TypographyProps> = ({children}) => {

    const classes = useStyles();

    return (
        <Typography component="h3" className={classes.h3}>
            {children}
            <Divider/>
        </Typography>
    )

};
