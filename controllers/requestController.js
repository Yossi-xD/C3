const Request = require("../models/Request");
const Payment = require("../models/paymentModel");

const createRequest = async (req, res) => {
  try {
    const {
  title,
  description,
  region,
  payment,
  productLocation,
  userLocation
} = req.body;


   const newRequest = new Request({
  title,
  description,
  region,
  payment,
  productLocation,
  userLocation,
  status: "pending",
  email: req.user.email,
  createdBy: req.user._id
});


    await newRequest.save();

    const newPayment = new Payment({
      title,
      amount: payment,
      status: "Pending",
      email: req.user.email,
      requestId: newRequest._id  // ✅ Link to request
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

const getAllRequests = async (req, res) => {
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

const deleteRequest = async (req, res) => {
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

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err });
  }
};

const updateRequest = async (req, res) => {
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

const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "accepted";
    request.assignedTo = req.user._id; // ✅ Link to the traveler
    await request.save();
    res.json({ message: "Request accepted", request });
  } catch (err) {
    res.status(500).json({ message: "Error accepting request" });
  }
};


const markDelivered = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // ✅ Only the assigned traveler can mark as delivered
    if (request.assignedTo?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Update request status
    request.status = "delivered";
    await request.save();

    // ✅ Update payment status to Done
    await Payment.findOneAndUpdate(
      { requestId: request._id },
      { status: "Done" }
    );

    res.json({ message: "Marked as delivered", request });
  } catch (err) {
    console.error("❌ Error marking as delivered:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// EXPORTS
exports.createRequest = createRequest;
exports.getAllRequests = getAllRequests;
exports.deleteRequest = deleteRequest;
exports.updateRequest = updateRequest;
exports.acceptRequest = acceptRequest;
exports.markDelivered = markDelivered;

