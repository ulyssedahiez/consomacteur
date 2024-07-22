import { Area } from "../model/index.js";
import { createSchema } from "../validations/areaValidation.js";

const getArea = async (req, res) => {
  const area = req.area;

  try {
    res.status(200).json({area});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update area." });
  }
};

const updateArea = async (req, res) => {
  const error = createSchema.validate(req.body).error;
  if (error) return res.status(400).json({ error: error });

  const area = req.area;
  const { name } = req.body;

  try {
    area.name = name;

    await area.save();

    res.status(200).json({area});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update area." });
  }
};

const deleteArea = async (req, res) => {
  const area = req.area;

  try {
    await area.destroy();

    res.status(200).json({ message: "Area deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete area." });
  }
};

const getHouseAreas = async (req, res) => {
  try {
    const areas = await Area.findAll({ where: { houseId: req.house.id, parentAreaId: null } });
    res.status(200).json({areas});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Unable to get house areas.'});
  }
};

const createHouseArea = async (req, res) => {
  const error = createSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});

  const { name } = req.body;
  const area = new Area({
    name,
    houseId: req.house.id,
  });

  await area.save();

  res.json({area});
};

const getSubAreas = async (req, res) => {
  const parentAreaId = req.area.id;

  try {
    const areas = await Area.findAll({
      where: { parentAreaId },
    });

    return res.status(201).json({areas});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not get sub-areas." });
  }
};

const createSubArea = async (req, res) => {
  const { name } = req.body;
  const parentAreaId = req.area.id;
  const houseId = req.area.houseId;

  try {
    // Create the new sub-area
    const areas = await Area.create({
      name,
      parentAreaId,
      houseId,
    });

    return res.status(201).json({ areas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not create sub-area." });
  }
};

export {
  getArea,
  updateArea,
  deleteArea,
  getHouseAreas,
  createHouseArea,
  getSubAreas,
  createSubArea,
};
