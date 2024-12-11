import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  userType: 'user' | 'admin' | 'moderator'; 
  profileImage: string | null; 
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userType: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user', 
  },
  profileImage: {
    type: String,
    default: null, 
  },
}, { timestamps: true });


userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
