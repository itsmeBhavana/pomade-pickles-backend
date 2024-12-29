import Pickle from "../schema/pickle.js";

export const createPickle = async ({
  name,
  description,
  price,
  quantity,
  imageUrl,
  category,
}) => {
  try {
    const pickle = await Pickle.create({
      name,
      description,
      price,
      quantity,
      imageUrl,
      category,
    });
    return pickle;
  } catch (error) {
    throw error;
  }
};

export const getPickles = async () => {
  try {
    const pickles = await Pickle.find();
    return pickles;
  } catch (error) {
    throw error;
  }
};

export const getPickle = async (pickleId) => {
  try {
    const pickle = await Pickle.findById(pickleId);
    return pickle;
  } catch (error) {
    throw error;
  }
};

export const deletePickle = async (pickleId) => {
  try {
    const pickle = await Pickle.findByIdAndDelete(pickleId);
    return pickle;
  } catch (error) {
    throw error;
  }
};
