const Reveiw = require("../models/reviewSchema");

const createReview = async (req, res) => {
  const { user, opinion, product } = req.body;
  if (!user || !opinion || !product) {
    return res.json({ error: "not allowed" });
  }
  try {
    const isreviewed = await Reveiw.findOne({ user: user, product:product });
    if (isreviewed) {
      return res.json({ error: "You are allowed to review only once" });
    }
    const review = await Reveiw.create(req.body);
    res.json({ message: "Thanks for your review!" });
  } catch (error) {
    res.json({ error: error });
  }
};

const fetchReviews = async (req, res) => {
    try {
        const reviews = await Reveiw.find({product: req.params.productId}).populate('user', 'username email')
        res.json(reviews)
    } catch (error) {
        res.json({error: error})
    }
};

module.exports = { createReview, fetchReviews };
