import mongoose, { Schema, Document } from "mongoose"

type Sex='男' | '女'

export interface UserDocument extends Document {
  firstName: String
  lastName: String
  //fullName: String
  email: String 
  sex: Sex
  age: Number
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      required: true,
      enum: ['男', '女']
    },
  },
  {
    timestamps: true,
  }
)

userSchema.virtual('fullName').get(function(this: UserDocument) {
  return `${this.firstName} ${this.lastName}`
})
/*
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
*/

//export function find(): Array<User> {
//  return users
//}
export default mongoose.model<UserDocument>('User', userSchema);

