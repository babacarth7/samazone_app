const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/config");
const data = require("./utils/data");
const Product = require("./models/product.model");

const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretary",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Routes
app.use("/", authRoutes);
app.use("/", orderRoutes);
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Samazone App v1",
  });
});

app.get("/api/seed", async (req, res) => {
  await mongoose.connect(config.db);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  res.send({ message: "Seeded successfully" });
});

const startServer = async () => {
  try {
    await mongoose.connect(config.db);
    console.log(`MongoDB connected to ${config.db}`);

    app.listen(config.port, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Server is listening on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer().then();
