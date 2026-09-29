import express from "express";

const router = express.Router();

// POST /api/newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    console.log("Newsletter subscription:", normalizedEmail);

    return res.status(201).json({
      success: true,
      message: "You have successfully subscribed to our newsletter.",
    });
  } catch (error) {
    console.error("Newsletter error:", error);

    return res.status(500).json({
      message: "Failed to subscribe to the newsletter.",
    });
  }
});

export default router;