import React from "react"
import {Route, Switch, useRouteMatch, Link} from "react-router-dom";

const Settings = (): JSX.Element => {

    const {path, url} = useRouteMatch();

    return (
        <div>
            {/*Todo Navbar für settings*/}
            <Link to={`${url}/general`}/>
            <Switch>
                <Route path={`${path}/general`}>
                    general
                </Route>
                <Route path={`${path}/text`}>
                    text
                </Route>
                <Route path={`${path}/alarm`}>
                    alarm
                </Route>
                <Route path={`${path}/function`}>
                    function
                </Route>
            </Switch>
        </div>
    )
};

export default Settings;
