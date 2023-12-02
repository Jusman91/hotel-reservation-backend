import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "pelase add your first name"],
    unique: true,
    minLength: [3, "yor name must be at least 3 characters"],
    maxLength: [10, "your name is up to 10 chars long"]
  },
  email: {
    type: String,
    required: [true, "please add your email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "please add your password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

export default mongoose.model('User', UserSchema);