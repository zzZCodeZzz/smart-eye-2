import {Input, InputAdornment, Theme, withStyles} from "@material-ui/core";
import React, {FunctionComponent, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {ConditionalBox} from "../../surfaces/paper";
import AntLabel from "../label";


const CssTextField = withStyles(({palette}: Theme) => ({
    root: {
        "& .MuiInput-input": {
            textTransform: "uppercase"
        },
        "&.MuiInput-underline:after": {
            borderBottomColor: palette.secondary.main,
        },
        "& .Mui-disabled": {
            cursor: "not-allowed",

            "& > fieldset": {
                borderColor: palette.secondary.main,
                opacity: "0.2",
            }
        }
    },
}))(Input);

type AntTextFieldProps = {
    name: string;
    disabled?: boolean;
    withPaper?: boolean;
    adornment?: string | ReactElement;
}

const AntInput: FunctionComponent<AntTextFieldProps> = ({name, disabled, withPaper, adornment}) => {

    // const dispatch = useDispatch();
    const {t} = useTranslation();

    // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(
    //     updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0")
    // );

    // const classes = useStyles();

    return (
        <ConditionalBox condition={withPaper}>
            <AntLabel>{t(name)}</AntLabel>
            <CssTextField
                id="outlined-full-width"
                placeholder=""
                endAdornment={adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : ""}
                fullWidth
                disabled={disabled}
                // onChange={onChange}
            />
        </ConditionalBox>
    )
};

export default AntInput;
