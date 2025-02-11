const express = require("express");
const authRoute  = require("./auth");
const customerRouter = require("./customer");
const ownerRouter = require("./owner");
const adminRouter = require("./admin");
const notificationRouter = require("./notification");
const billingRouter = require("./billing");
const photoRouter = require("./photo");
const revenueRouter = require("./revenue");

const router = express.Router();
router.use("/auth",authRoute);
router.use("/customer",customerRouter);
router.use("/owner",ownerRouter);
router.use("/admin",adminRouter);
router.use("/admin",adminRouter);
router.use("/notification",notificationRouter);
router.use("/billing",billingRouter);
router.use("/photo",photoRouter);
router.use("/revenue",revenueRouter);

module.exports = router;
