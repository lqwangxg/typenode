import mongoose, { Schema, Document } from "mongoose"

type Sex='M' | 'W'

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

const users =  mongoose.model<UserDocument>('Users', userSchema);
export default users;
