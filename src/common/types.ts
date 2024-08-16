export interface Post {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    location: string,
    description: string,
    picturePath: string,
    userPicturePath: string,
    likes: Map<string, boolean>,
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