import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Stack, TextField } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateStudent = ({ open, setOpen, setStudent }) => {
    const [status, setStatus] = React.useState({
        error: false,
        msg: "",
    });
    const [data, setData] = React.useState({
        Name: "",
        Email: "",
    });

    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = (e) => {
        e.preventDefault();
        const Name = data.Name;
        const Email = data.Email;

        axios
            .post("http://localhost:8081/create", {
                Name,
                Email,
            })
            .then((res) => {
                setOpen(false);
                setStatus({
                    ...status,
                    error: false,
                    msg: "success",
                });
                setData({
                    Name: "",
                    Email: "",
                });

                axios
                    .get("http://localhost:8081/")
                    .then((res) => {
                        setStudent(res.data);
                    })
                    .catch((err) => console.log("err-=-=-=-=-=-", err));
            })
            .catch((err) => {
                setStatus({
                    ...status,
                    error: true,
                    msg: err.response.data,
                });
            });
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Create Student"}</DialogTitle>
                <DialogContent>
                    <form>
                        <Box padding={3}>
                            <Stack direction={"column"} spacing={2}>
                                <Box>
                                    <TextField
                                        required
                                        fullWidth
                                        value={data.Name}
                                        label="Student Name"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                Name: e.target.value,
                                            })
                                        }
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        type="email"
                                        required
                                        fullWidth
                                        value={data.Email}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                Email: e.target.value,
                                            })
                                        }
                                        label="Email"
                                    />
                                </Box>
                            </Stack>
                            {status.error === true ? (
                                <Box padding={2}>
                                    <Alert severity="error">{status.msg}</Alert>
                                </Box>
                            ) : null}

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    pt: 2,
                                }}
                            >
                                <Button
                                    disabled={
                                        data.Email && data.Name ? false : true
                                    }
                                    type="submit"
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
