import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Avatar, Divider, Typography, Stack } from "@mui/material";
import SocialsButton from "./SocialsButton";
import SvgIconStyle from "./SvgIconStyle";
import cssStyles from "../assets/cssStyles";
import Image from "./Image";

const OverlayStyle = styled("div")(({ theme }) => ({
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 8,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
}));

export const StudentCard = ({ student, DeleteAction, upDateAction }) => {
    return (
        <Card sx={{ textAlign: "center", borderRadius: 5 }}>
            <Box sx={{ position: "relative" }}>
                <SvgIconStyle
                    src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                    sx={{
                        width: 144,
                        height: 62,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: -26,
                        mx: "auto",
                        position: "absolute",
                        color: "background.paper",
                    }}
                />
                <Avatar
                    alt="avatar"
                    src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_21.jpg"
                    sx={{
                        width: 64,
                        height: 64,
                        zIndex: 11,
                        left: 0,
                        right: 0,
                        bottom: -32,
                        mx: "auto",
                        position: "absolute",
                    }}
                />
                <OverlayStyle />
                <Image
                    src="https://minimal-assets-api.vercel.app/assets/images/covers/cover_17.jpg"
                    alt={"img"}
                    ratio="16/9"
                />
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 6 }}>
                {student?.Name}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {student?.Email}
            </Typography>

            <Stack alignItems="center">
                <SocialsButton initialColor sx={{ my: 2.5 }} />
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Box
                sx={{
                    py: 3,
                    display: "flex",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    justifyContent: "space-around",
                }}
            >
                <div>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ mb: 0.75, color: "text.disabled" }}
                    >
                        Update
                    </Typography>
                    <Box>{upDateAction}</Box>
                </div>

                <div>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ mb: 0.75, color: "text.disabled" }}
                    >
                        Delete
                    </Typography>
                    <Box>{DeleteAction}</Box>
                </div>
            </Box>
        </Card>
    );
};
