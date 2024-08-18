import { useState } from "react";
import { Post } from "../common/types";

/* Icons */
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";

/* Components */
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { AppTheme } from "../theme";
import { backendIpAddress } from "../services/url";
import axios from "axios";
import { setPost } from "../state";

interface Props {
    index: number;
    post?: Post;
}

const PostWidget: React.FC<Props> = ({ index }) => {
    
    const { palette } = useTheme<AppTheme>();
    const [isComments, setIsComments] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const post = useAppSelector((state) => state.posts[index]);
    const loggedInUserId = useAppSelector((state) => state.user!._id);
    const token = useAppSelector((state) => state.token);
    const isLiked = useAppSelector(
        (state) => state.posts[index].likes[`${loggedInUserId}`]
    );
    const likesCount = useAppSelector(
        (state) => Object.keys(state.posts[index].likes).length
    );

    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {

        const { data } = await axios.patch(
            `${backendIpAddress}/posts/${post._id}/like`,
            { userId: loggedInUserId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch(setPost({ post: data }));

    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={post.userId}
                name={`${post.firstName} ${post.lastName}`}
                subtitle={post.location}
                userPicturePath={post.userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {post.description}
            </Typography>

            {post.picturePath && (
                <img
                    width="100%"
                    height="auto"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`${backendIpAddress}/assets/${post.picturePath}`}
                    alt=""
                />
            )}

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likesCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton
                            onClick={() => setIsComments((prev) => !prev)}
                        >
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{post.comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {isComments && (
                <Box mt="0.5rem">
                    {post.comments.map((comment, i) => (
                        <Box key={`${post.firstName} ${post.lastName}-${i}`}>
                            <Divider />
                            <Typography
                                sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
                            >
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
