import React, { useState } from "react";

/* ICONS */
import {
    EditOutlined,
    DeleteOutline,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
} from "@mui/material";

import FlexBetween from "./FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setPosts } from "../state";
import { AppTheme } from "../theme";
import { useMobileScreen } from "./hooks";
import axios from "axios";
import { backendIpAddress } from "../services/url";

const MyPostWidget = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.token);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [post, setPost] = useState<string | null>(null);
    const { palette } = useTheme<AppTheme>();
    const userId = useAppSelector((state) => state.user?._id);
    const isNonMobileScreen = useMobileScreen(1000);
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();

        formData.append("userId", userId!);
        formData.append("description", post!);

        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const { data } = await axios.post(
            `${backendIpAddress}/posts/`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(setPosts({ posts: data }));
        setImage(null);
        setPost("");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage />
                <InputBase
                    placeholder="What's on your mind?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        bgcolor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        accept={{
                            image: [".jpg", ".jpeg", ".png"],
                        }}
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Picture Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {image?.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween
                    gap="0.25rem"
                    onClick={() => setIsImage((prev) => !prev)}
                >
                    <ImageOutlined />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobileScreen ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Attachment
                            </Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        bgcolor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
