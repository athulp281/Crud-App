import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Stack, TextField } from "@mui/material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const UpdateForm = ({
    updateForm,
    setUpdateForm,
    setStudent,
    student,
}) => {
    console.log(student);
    const [data, setData] = React.useState({
        ID: "",
        Name: "",
        Email: "",
    });

    React.useEffect(() => {
        setData({
            ...data,
            ID: student.ID,
            Name: student.Name,
            Email: student.Email,
        });
    }, [student]);

    console.log(data);
    const handleClose = () => {
        setUpdateForm(false);
    };
    const handleClick = (e) => {
        const Name = data.Name;
        const Email = data.Email;
        const id = data.ID;
        console.log(Name, Email, id);
        e.preventDefault();
        axios
            .put("http://localhost:8081/update/" + id, {
                Name,
                Email,
            })
            .then((res) => {
                console.log(res);
                setUpdateForm(false);
                axios
                    .get("http://localhost:8081/")
                    .then((res) => setStudent(res.data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth={"sm"}
                open={updateForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Update Student"}</DialogTitle>
                <DialogContent>
                    <Box sx={{ padding: 3 }}>
                        <Stack direction={"column"} spacing={2}>
                            <Box>
                                <TextField
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
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                pt: 2,
                            }}
                        >
                            <Button variant="contained" onClick={handleClick}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
