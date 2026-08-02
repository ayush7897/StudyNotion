const Razorpay = require("razorpay");

console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET ? "Loaded" : "Missing");


exports.instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET,
});

// const RAZORPAY_KEY = "rzp_test_TJLXbRFiewwCg6"

// const RAZORPAY_SECRET = "wlBaqI029ow0QpPYFwImGUZZ"

// exports.instance = new Razorpay({
// 	key_id: RAZORPAY_KEY,
// 	key_secret: RAZORPAY_SECRET,
// });