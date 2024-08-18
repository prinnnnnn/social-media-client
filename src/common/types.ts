export interface Post {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    location: string,
    description: string,
    picturePath: string,
    userPicturePath: string,
    likes: {
        [key: string]: boolean;
    },
    comments: string[]
}

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    picturePath: string,
    friends: string[],
    location: string,
    occupation: string,
    viewedProfile: number,
    impressions: number
}

export interface UserFormProps {
    firstName?: string
    lastName?: string
    email: string
    password: string
    location?: string
    occupation?: string
    picture?: string | File
}