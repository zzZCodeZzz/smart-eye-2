import {createMuiTheme, withStyles} from "@material-ui/core";
import {FunctionComponent} from "react";

export const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#424242"
        },
        secondary: {
            main: "#e53935",
            light: "#344550"
        },
        background: {
            default: "#1f2d36",
            paper: "#24323b"
        },
    }
});

const globalStyles = () => ({
    "@global": {
        body: {
            userSelect: "none",
        },
        main: {
            flexGrow: 1,
            flexShrink: 0,
        },
        footer: {
            flexShrink: 0,
        },
        header: {
            flexShrink: 0,
        },
        ".App" : {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }

    }
});

type MyCSSBaselineTypes = {
    classes: object;
}

const MyCssBaseline: FunctionComponent<MyCSSBaselineTypes> = () => {
    return null;
};

export default withStyles(globalStyles)(MyCssBaseline);
