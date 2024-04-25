// type for tweets
export interface Tweet {
    id: number;
    username: string;
    profile_image: string;
    first_name: string;
    last_name: string;
    content: string;
    interactions: {
      likes: number;
      retweets: number;
      liked: number;
      retweeted: number;
    };
  }
  