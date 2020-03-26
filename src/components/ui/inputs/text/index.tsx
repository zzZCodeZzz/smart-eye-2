import {TextField, Theme, withStyles} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import {ConditionalPaper} from "../../surfaces/paper";


const CssTextField = withStyles(({palette}: Theme) => ({
    root: {
        "& label.MuiInputLabel-shrink": {
            textTransform: "uppercase",
            transform: "translate(9px, -6px) scale(0.8)",
            padding: "0 0.5rem",
            background: palette.secondary.light
        },
        "& .Mui-disabled": {
            cursor: "not-allowed",

            "& > fieldset": {
                borderColor: palette.secondary.main,
                opacity: "0.2",
            }
        }
    },
}))(TextField);

type AntTextFieldProps = {
    name: string;
    disabled?: boolean;
    withPaper?: boolean;
}

const AntTextField: FunctionComponent<AntTextFieldProps> = ({name, disabled, withPaper}) => {

    // const dispatch = useDispatch();
    const {t} = useTranslation();

    // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(
    //     updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0")
    // );

    // const classes = useStyles();

    return (
        <ConditionalPaper condition={withPaper}>
            <CssTextField
                id="outlined-full-width"
                label={t(name)}
                placeholder=""
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                variant="outlined"
                color="secondary"
                margin="normal"
                disabled={disabled}
                // onChange={onChange}
            />
        </ConditionalPaper>
    )
};

export default AntTextField;
