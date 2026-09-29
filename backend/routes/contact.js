import express from "express";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required.",
      });
    }

    console.log("Contact message received:", {
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received successfully.",
    });
  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      message: "Failed to send contact message.",
    });
  }
});

export default router;