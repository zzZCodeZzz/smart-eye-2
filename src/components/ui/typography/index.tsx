import React, {FunctionComponent, ReactNode, Fragment} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Divider, Typography} from "@material-ui/core";

const useStyles = makeStyles(({spacing}: Theme) =>
    createStyles({
        h3: {
            fontWeight: "bold",
            margin: `${spacing(2)}px 0 ${spacing(1)}px`
        }
    })
);

type TypographyProps = {
    children: ReactNode | string;
}

export const H3: FunctionComponent<TypographyProps> = ({children}) => {

    const classes = useStyles();

    return (
        <Fragment>
            <Typography variant="h6" component="h3" className={classes.h3}>
                {children}
                <Divider/>
            </Typography>
        </Fragment>
    )

};
