import mongoose from "mongoose";

interface Iuser {
  name: string;
  email: string;
  password?: string; //google user will not have password
  picture?: string;
  googleId?: string;
  provider?: "email" | "google";
  accessToken?: string;
  refreshToken?: string;
  isVerified: boolean;
  verificationToken?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordTokenExpiry?: Date | null;
}

const userSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    default: null,
  },
  provider: {
    type: String,
    enum: ["email", "google"],
    default: "email",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  //for reset password
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordTokenExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model<Iuser>("User", userSchema);
export default User;
