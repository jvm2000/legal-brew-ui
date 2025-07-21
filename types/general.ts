export type User = {
  id: string,
  username: string,
  full_name: string,
  email: string,
  contact_no: string
}

export type Post = {
  id: string,
  description: string,
  hyperlink: string,
  images: string[],
  user: User,
  comments: Comment[],
  reactions: Reaction[],
  updated_at: any
}

export type Comment = {
  content: string,
  created_at: any,
  user: User
}

export type Reaction = {
  content: string,
  created_at: any,  
  user_id: string
}

export type Cart = {
  id: string,
  user_id: string,
  user: User
}
