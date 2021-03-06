import React, {FunctionComponent, ReactNode} from "react";
import {Container, createStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        main: {
            flexGrow: 1,
            overflowX: "hidden",
            padding: "20px",
        }
    })
);

type mainContainerProps = {
    children: ReactNode;
};

const MainContainer: FunctionComponent<mainContainerProps> = ({children}) => {

    const classes = useStyles();

    return <Container component="main" maxWidth={"xl"} className={classes.main}> {children} </Container>;
};


export default MainContainer;
