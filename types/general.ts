export type User = {
  id: string,
  username: string,
  full_name: string,
  email: string,
  contact_no: string,
  birthdate: string,
  images: any[],
  password: string,
  verified: boolean,
  role: string
}

export type Post = {
  id: string,
  description: string,
  hyperlink: string,
  images: any[],
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
  id?: string,
  content: string,
  created_at: any,  
  user_id: string
}

export type Cart = {
  id: string,
  user_id: string,
  user: User
}

export type Services = {
  id?: string,
  name: string,
  price: number,
  loading?: boolean,
  description: string,
  image: string
}

export type Appointment = {
  id?: string,
  scheduledDay: string,
  scheduledTime: string,
  services: Services[],
  setup: 'office' | 'online'
  user: User
}
