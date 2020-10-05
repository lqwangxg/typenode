type Sex='男' | '女'
interface  User {
  name: String
  email: String 
  sex: Sex
  age: Number
}

const users: Array<User> = [
  {
    name: '桃太郎',
    email: 'user1@example.com',
    sex: '男',
    age: 19,
  },
  {
    name: '浦島太郎',
    email: 'user2@example.com',
    sex: '男',
    age: 22,
  },
  {
    name: '雪女',
    email: 'user3@example.com',
    sex: '女',
    age: 33,
  },
]

export function find(): Array<User> {
  return users
}
