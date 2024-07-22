import { House } from "../model/index.js";
import { createSchema } from "../validations/houseValidation.js";

const getHouse = async (req, res) => {
  const house = await House.findOne({
    where: { userId: req.user.id, id: req.params.houseId },
  });
  if (house) {
    res.status(200).json({house});
  } else {
    res.status(404).json({ error: "House not found." });
  }
};

const getHouses = async (req, res) => {
  const houses = await House.findAll({ where: { userId: req.user.id } });
  if (houses) {
    res.status(200).json({houses});
  } else {
    return res.status(404).json({ error: "House not found." });
  }
};

const createHouse = async (req, res) => {
  const error = createSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});

  const { name } = req.body;
  const house = new House({
    name,
    userId: req.user.id,
  });

  const existingHouse = await House.findOne({
    where: { userId: req.user.id, name: name },
  });
  if (existingHouse) {
    return res.status(400).json({ error: "This house already exist" });
  }

  await house.save();

  res.json({house});
};

const updateHouse = async (req, res) => {
  const error = createSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});

  const { name } = req.body;
  const house = req.house;

  house.name = name;

  await house.save();

  res.status(200).json({house});
};

const deleteHouse = async (req, res) => {
  try {
    const house = req.house;

    await house.destroy();

    res.status(200).json({ error: "House deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete house." });
  }
};

export { getHouse, getHouses, createHouse, updateHouse, deleteHouse };
