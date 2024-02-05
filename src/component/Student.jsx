import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";
import axios from "axios";
import { CreateStudent } from "./CreateStudent";
import { UpdateForm } from "./UpdateForm";
import { StudentCard } from "./StudentCard";

export const Student = () => {
    const [student, setStudent] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [singleData, setSingleData] = React.useState(false);
    const [updateForm, setUpdateForm] = React.useState(false);
    useEffect(() => {
        axios
            .get("http://localhost:8081/")
            .then((res) => setStudent(res.data))
            .catch((err) => console.log(err));
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios
                .delete("http://localhost:8081/delete/" + id)
                .then(() => {
                    axios
                        .get("http://localhost:8081/")
                        .then((res) => setStudent(res.data))
                        .catch((err) => console.log(err));
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <CreateStudent
                setOpen={setOpen}
                open={open}
                setStudent={setStudent}
            />
            <UpdateForm
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                setStudent={setStudent}
                student={singleData}
            />

            <Box
                sx={{
                    backgroundImage:
                        'url("https://t4.ftcdn.net/jpg/02/40/63/55/360_F_240635575_EJifwRAbKsVTDnA3QE0bCsWG5TLhUNEZ.jpg")',
                    backgroundSize: "cover", // or 'contain', or any other CSS background-size value
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: 3,
                    }}
                >
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add Student
                    </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h4" sx={{ color: "#fff" }}>
                        Students
                    </Typography>
                </Box>

                <Box padding={3}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {student?.map((item) => {
                            return (
                                <Grid item xs={2} sm={4} md={3} key={item.ID}>
                                    <Box>
                                        <StudentCard
                                            student={item}
                                            upDateAction={
                                                <Box>
                                                    <Button
                                                        size="small"
                                                        onClick={() => {
                                                            setUpdateForm(true);
                                                            setSingleData(item);
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                </Box>
                                            }
                                            DeleteAction={
                                                <Box>
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            }
                                        />
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};
