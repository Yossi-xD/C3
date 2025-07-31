const Request = require("../models/Request"); // ✅ matches the file name
const Payment = require("../models/paymentModel"); // ✅ auto-payment

// CREATE REQUEST + AUTO PAYMENT
const createRequest = async (req, res) => {
  try {
    const { title, description, region, payment } = req.body;

    const newRequest = new Request({
      title,
      description,
      region,
      payment,
      email: req.user.email,
      createdBy: req.user._id
    });

    await newRequest.save();

    // ✅ Automatically create a pending payment
    const newPayment = new Payment({
      title,
      amount: payment,
      status: "Pending",
      email: req.user.email
    });

    await newPayment.save();

    res.status(201).json({
      message: "Request created!",
      request: newRequest,
      payment: newPayment
    });
  } catch (err) {
    console.error("❌ Error creating request + payment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET REQUESTS BASED ON ROLE
exports.getAllRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let requests;

    if (userRole === "requester") {
      requests = await Request.find({ createdBy: userId }).sort({ createdAt: -1 });
    } else {
      requests = await Request.find();
    }

    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE REQUEST
exports.deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (
      req.user.role !== "requester" ||
      request.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to delete this request" });
    }

    // ✅ Also cancel matching payments
    await Payment.updateMany(
      { email: req.user.email, title: request.title },
      { $set: { status: "Canceled" } }
    );

    await request.deleteOne();
    res.json({ message: "Request deleted successfully, related payments canceled." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err });
  }
};

// UPDATE REQUEST
exports.updateRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (
      req.user.role !== "requester" ||
      request.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to update this request" });
    }

    Object.assign(request, req.body);
    await request.save();

    res.json({ message: "Request updated successfully", request });
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ message: "Failed to update request", error: err });
  }
};

// EXPORTS
exports.createRequest = createRequest;
