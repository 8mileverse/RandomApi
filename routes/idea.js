const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

const ideas = [
  {
    id: 1,
    text: "Idea 1 - This is a great idea for a new app",
    tag: "Technology",
    username: "TonyStark",
    date: "2021-09-01",
  },
  {
    id: 2,
    text: "Idea 2 - This is a great idea for a new business",
    tag: "Business",
    username: "BruceWayne",
    date: "2021-09-02",
  },
  {
    id: 3,
    text: "Idea 3 - This is a great idea for a new product",
    tag: "Product",
    username: "PeterParker",
    date: "2021-09-03",
  },
];

// Get All Ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({
      success: true,
      data: ideas,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

//Get Single Ideas
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({
        success: false,
        error: "Resource not found",
      });
    }
    res.json({
      success: true,
      data: idea,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

// Add Ideas
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const savedIdea = await idea.save();
    res.status(201).json({
      success: true,
      data: savedIdea,
    });
    console.log(savedIdea);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
    console.log(err);
  }
});

// Update Ideas
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
        return res.status(404).json({
          success: false,
          error: "Resource not found",
        });
      };

// Check if the user is authorized to update the idea
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        data: updatedIdea,
      });
      console.log(updatedIdea);
    }

    
    //username does not match
    return res.status(403).json({
      success: false,
      error: "You are not authorized to Update this resource",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
    console.log(error);
  }
});

// Delete All Ideas
router.delete("/", async (req, res) => {
  try {
    await Idea.deleteMany({});
    res.status(200).json({
      success: true,
      data: {},
      message: "All Ideas deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
    console.log(error);
  }
});

// Delete Ideas
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        data: {},
      });
    }
    //if username dosen't match
    return res.status(403).json({
      success: false,
      error: "You are not authorized to delete this idea",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
    console.log(error);
  }
});

module.exports = router;
