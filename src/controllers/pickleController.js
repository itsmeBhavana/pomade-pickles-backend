import {
  createPickle as createPickleRepository,
  getPickles as getPicklesRepository,
  getPickle as getPickleRepository,
  deletePickle as deletePickleRepository,
} from "../repository/picklesRepository.js";

export const getPickles = async (req, res) => {
  try {
    const response = await getPicklesRepository();
    return res.status(200).json({
      message: "Pickles received",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const createPickle = async (req, res) => {
  try {
    const response = await createPickleRepository({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
    });
    return res.status(200).json({
      data: response,
      message: "Pickle received",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getPickle = async (req, res) => {
  try {
    const response = await getPickleRepository(req.params.id);
    return res.status(200).json({
      data: response,
      message: "Pickle fetched",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deletePickle = async (req, res) => {
  try {
    const response = await deletePickleRepository(req.params.id); // Assuming Mongoose is being used
    return res.status(200).json({
      message: "Pickle removed successfully",
      data: response,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing pickle", success: false });
  }
};
