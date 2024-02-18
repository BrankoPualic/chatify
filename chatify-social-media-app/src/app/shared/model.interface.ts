export interface Post {
  post_id: number;
  post_description: string;
  post_date: string;
  like_count: number | null;
  comment_count: number | null;
  file_src_array: string[];
  file_type: string;
  post_username: string;
  post_profile_picture: string;
  is_liked: number;
  user_id: number;
}

export interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  biography: string;
  picture: string;
  role: number;
}

export interface Comment {
  comment_id: number;
  comment_date: string;
  comment_text: string;
  like_count: number | null;
  post_id: number;
  profile_picture_src: string;
  user_id: number;
  username: string;
  is_liked: number;
}

export interface Message {
  message_id: number;
  sender_id: number;
  username: string;
  profile_picture_src: string;
  message_text: string;
  message_date: string;
}
