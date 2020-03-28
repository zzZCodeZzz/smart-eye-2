import {createMuiTheme, fade, withStyles} from "@material-ui/core";
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
        },
        ".MuiTableCell-root.MuiTableCell-head": {
            height: "10rem",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            position: "relative",
            // whiteSpace: "nowrap",
        },
        ".MuiTableCell-root.MuiTableCell-head div": {
            transform: "translate(-0.8rem, 1rem) rotate(320deg)",
            transformOrigin: "left bottom",
            width: "3.25rem",
        },
        ".MuiTableRow-root:nth-child(even)": {
            background: fade(theme.palette.primary.main, 0.1)
        },
        ".MuiTableSortLabel-icon ": {
            position: "absolute",
            top: "4rem"
        },
        ".MuiTableCell-root.MuiTableCell-footer": {
            borderBottom: "none",
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
