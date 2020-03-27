import React, {Fragment} from "react";
import {useActiveDeviceConfigurationFlags} from "../../../../redux/device/deviceStoreSelectors";
import AntBox from "../../../ui/surfaces/box";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import AntSelect from "../../../ui/inputs/select";
import AntSwitch from "../../../ui/inputs/switch";
import {H2, H3} from "../../../ui/typography";

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
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <AntBox>
                        <H2>{categoryKey}</H2>
                        {Object.entries(category).map(([subCategoryKey, subCategory]) => (
                            <Fragment>
                                <H3>{subCategoryKey}</H3>
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
                    </AntBox>
                </Grid>))}
        </Grid>
    )
};

export default FunctionSettings;
