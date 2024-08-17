import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setPosts } from "../state/index";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile = false }) => {

    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.posts);    
    const token = useAppSelector(state => state.token);    

    return <div>PostsWidget</div>;
};

export default PostsWidget;
