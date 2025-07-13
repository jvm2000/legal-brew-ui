export type User = {
  id: string,
  username: string,
  full_name: string,
  email: string,
  contact_no: string
}

export type Post = {
  description: string,
  hyperlink: string,
  images: string[],
  user: User,
  comments: string[],
  reactions: string[]
}