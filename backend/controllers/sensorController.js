import {Sensor} from "../model/index.js";
import { createSchema } from "../validations/sensorValidation.js";

const getSensor = (req, res) => {
  const sensor = req.sensor;

  try {
    res.status(200).json({sensor});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get sensor." });
  }
};

const updateSensor = (req, res) => {
  const error = createSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});

  const sensor = req.sensor;
  const { name } = req.body;

  try {
    sensor.name = name;
    res.status(200).json({sensor});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get sensor." });
  }
};

const deleteSensor = async (req, res) => {
  const sensor = req.sensor;

  try {
    await sensor.destroy();
    res.status(200).json({message: 'Sensor deleted.'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get sensor." });
  }
};

const getAreaSensors = async (req, res) => {
  const areaId = req.area.id;

  try {
    // Create the new area sensor
    const sensors = await Sensor.findAll({
      where: {
        areaId,
      },
    });

    return res.status(200).json({sensors});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not get sensors." });
  }
};

const  createAreaSensor = async (req, res) => {
  const error = createSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});
  const { name } = req.body;
  const areaId = req.area.id;

  try {
    // Create the new area sensor
    const sensor = await Sensor.create({
      name,
      areaId,
    });

    return res.status(201).json({sensor});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Could not create sensor." });
  }
};

export {
  getSensor,
  updateSensor,
  deleteSensor,
  getAreaSensors,
  createAreaSensor,
};
