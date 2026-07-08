const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

// Sử dụng MONGODB_URI từ file .env nếu có, nếu không thì dùng URI mặc định
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://lvhai2k2_viora:Levanhai%40123@cluster0.o8iu0jl.mongodb.net/myapp?retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, default: "" },
  phone: { type: String, default: "" },
  avatar: { type: String, default: "" },
  role: { type: String, required: true, default: "user" }, // 'user' | 'staff' | 'admin'
  accountType: { type: String, required: true, default: "customer" }, // 'customer' | 'affiliate' | 'admin'
  isEmailVerified: { type: Boolean, default: false },
  status: { type: String, default: "active" }, // 'active' | 'blocked'
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true, collection: 'users' });

const User = mongoose.model("User", userSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const email = "admin@viora.vn";
    const password = "admin";
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    // Xóa admin cũ nếu có để tạo lại mật khẩu mới
    await User.deleteOne({ username: email });

    const newAdmin = new User({
      username: email,
      email: email,
      passwordHash: passwordHash,
      fullName: "Super Admin",
      role: "admin",
      accountType: "admin",
      isEmailVerified: true,
      status: "active"
    });

    await newAdmin.save();
    console.log(`\n🎉 Đã tạo thành công tài khoản Admin mẫu!`);
    console.log(`👉 Email / Username: ${email}`);
    console.log(`👉 Mật khẩu: ${password}\n`);
    
  } catch (err) {
    console.error("Lỗi khi tạo tài khoản:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
