const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");

const createInquiry = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Please provide the required inquiry details.",
      errors: errors.array()
    });
  }

  try {
    const inquiry = await Contact.create({
      name: req.body.name,
      companyName: req.body.companyName,
      email: req.body.email,
      phone: req.body.phone,
      serviceNeeded: req.body.serviceNeeded,
      projectBrief: req.body.projectBrief
    });

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been received. The ExonClouds team will contact you soon.",
      data: inquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to submit inquiry right now.",
      error: error.message
    });
  }
};

const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve inquiries.",
      error: error.message
    });
  }
};

module.exports = {
  createInquiry,
  getAllInquiries
};
