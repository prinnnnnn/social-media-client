import { useState } from "react";
import { Post } from "../common/types";

/* Icons */
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material'

/* Components */
import { 
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { AppTheme } from "../theme";

interface Props {
    post: Post,
}

const PostWidget: React.FC<Props> = ({ post }) => {

    const { palette } = useTheme<AppTheme>();
    const [comments, setComments] = useState<boolean>(false);
    const loggedInUserId = useAppSelector(state => state.user!._id);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.token);
    const isLiked = post.likes.get(loggedInUserId);

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <></>
    );
};

export default PostWidget;
