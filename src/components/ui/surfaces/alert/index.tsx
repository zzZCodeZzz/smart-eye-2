import React, {FunctionComponent, useState} from "react";
import {Backdrop, createStyles, Fade, Modal, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        box: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: 2,
            outline: "none",

            "& h2": {
                textTransform: "uppercase",

                "& .MuiSvgIcon-root": {
                    transform: `translateY(${theme.spacing(0.5)}px)`
                }
            }
        },
    }),
);

type AlertProps = {
    title: string;
    message: string;
}

const Alert:FunctionComponent<AlertProps> = ({title, message}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.box}>
                    <h2 id="transition-modal-title">{<WarningIcon />} {title}</h2>
                    <p id="transition-modal-description">{message}</p>
                </div>
            </Fade>
        </Modal>
    );
};

export default Alert;
