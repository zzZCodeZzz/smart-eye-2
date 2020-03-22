import React from 'react';
import './App.css';
import {BrowserRouter, Switch as RouterSwitch, Route} from "react-router-dom";
import Settings from "./settings";
import {Switch} from "@material-ui/core";

import {Theme, withStyles, createStyles, Grid, Typography} from "@material-ui/core";

const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }),
)(Switch);

function App() {
    return (
        <div className="App">
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Off</Grid>
                    <Grid item>
                        <AntSwitch checked={true} name="checkedC" />
                    </Grid>
                    <Grid item>On</Grid>
                </Grid>
            </Typography>
            {/*Todo hier muss die appbar kommen*/}
            <BrowserRouter>
              <RouterSwitch>
                <Route path={"/measurement"}>
                  measurement
                </Route>
                <Route path={"/log"}>RouterSwitch
                  log
                </Route>
                <Route path={"/settings"}>
                  <Settings/>
                </Route>
              </RouterSwitch>
            </BrowserRouter>
        </div>
    );
}

export default App;
