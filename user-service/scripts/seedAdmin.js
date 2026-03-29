require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  const adminName = process.env.ADMIN_NAME || "CineBook Admin";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@cinebook.lk";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  const adminPhone = process.env.ADMIN_PHONE || "0770000000";

  try {
    await connectDB();

    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = new User({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        phone: adminPhone,
        role: "admin",
      });

      await adminUser.save();

      console.log("Admin user created successfully.");
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
    } else {
      adminUser.name = adminName;
      adminUser.phone = adminPhone;
      adminUser.role = "admin";

      if (adminPassword) {
        adminUser.password = adminPassword;
      }

      await adminUser.save();

      console.log("Admin user updated successfully.");
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
    }
  } catch (error) {
    console.error("Admin seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();
