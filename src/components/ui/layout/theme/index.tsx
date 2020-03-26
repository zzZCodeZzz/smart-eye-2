import {createMuiTheme, withStyles} from "@material-ui/core";
import {FunctionComponent} from "react";

export const theme = createMuiTheme({
    palette:{
        type: "dark",
        primary: {
            main: "#344550"
        },
        secondary: {
            main: "#e53935",
            light: "#424242"
        }
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
