import {TextField} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import AntPaper from "../../surfaces/paper";


// const useStyles = makeStyles(() =>
//     createStyles({
//         checkLabel: {
//             textTransform: "uppercase"
//         }
//     })
// );

type AntTextFieldProps = {
    name: string;
}

const AntTextField: FunctionComponent<AntTextFieldProps> = ({name}) => {

    // const dispatch = useDispatch();
    const {t} = useTranslation();

    // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(
    //     updateDeviceLocalAndRemote(event.target.name, event.target.checked ? "1" : "0")
    // );

    // const classes = useStyles();

    return (
        <AntPaper>
            <TextField
                id="outlined-full-width"
                label={t(name)}
                style={{ margin: 8 }}
                placeholder=""
                helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                // onChange={onChange}
            />
        </AntPaper>
    )
};

export default AntTextField;
