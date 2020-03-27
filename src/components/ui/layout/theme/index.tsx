import {createMuiTheme, withStyles} from "@material-ui/core";
import {FunctionComponent} from "react";

export const theme = createMuiTheme({
    palette:{
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
            paper: "#1f2d36"
        },
    }
});

const globalStyles = () => ({
    "@global": {
        body: {
            userSelect: "none"
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
