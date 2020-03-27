import React, {Fragment} from "react";
import {useActiveDeviceConfigurationFlags} from "../../../../redux/device/deviceStoreSelectors";
import AntPaper from "../../../ui/surfaces/paper";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Divider, Grid, Typography} from "@material-ui/core";
import AntSelect from "../../../ui/inputs/select";
import AntSwitch from "../../../ui/inputs/switch";

const useStyles = makeStyles(() =>
    createStyles({
        gridContainer: {
            justifyContent: "center",
        }
    }),
);

const FunctionSettings = () => {
    const configurationFlags = useActiveDeviceConfigurationFlags();

    const classes = useStyles();

    return (
        <Grid container className={classes.gridContainer} spacing={3}>
            {Object.entries(configurationFlags).map(([categoryKey, category]) => (
                <Grid item xs={12} sm={6} md={3}>
                    <AntPaper>
                        <Typography variant={"h6"}>{categoryKey}</Typography>
                        {Object.entries(category).map(([subCategoryKey, subCategory]) => (
                            <Fragment>
                                <Typography style={{fontWeight: "bold"}}>{subCategoryKey}</Typography>
                                <Divider/>
                                {Object.entries(subCategory).map(([confFlagKey, confFlag]) => (
                                    confFlag.options.length > 2
                                        ? <AntSwitch
                                            name={confFlagKey}
                                            target={"device"}
                                            uncheckedLabel={confFlag.options[0]}
                                            checkedLabel={confFlag.options[1]}
                                            value={confFlag.value}
                                        />
                                        : <AntSelect
                                            name={confFlagKey}
                                            options={confFlag.options}
                                            value={String(confFlag.value)}
                                        />))}
                            </Fragment>))}
                    </AntPaper>
                </Grid>))}
        </Grid>
    )
};

export default FunctionSettings;
