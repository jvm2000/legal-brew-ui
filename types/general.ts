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
  comments: string[],
  reactions: string[],
  updated_at: any
}

export type Comment = {
  content: string,
  created_at: any,
  user: User
}