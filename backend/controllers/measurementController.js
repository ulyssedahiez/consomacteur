import { Measurement } from "../model/index.js";
import { createSchema } from "../validations/measurementValidation.js";

const createSensorMeasurement = async (req, res) => {
  try {
    const error = createSchema.validate(req.body).error;
    if (error) return res.status(400).json({error});

    const sensorId = req.sensor.id;
    const { value, type, unit } = req.body;

    const measurement = await Measurement.create({
      type,
      value,
      unit,
      sensorId,
    });

    res.status(200).json({measurement});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create sensor measurement." });
  }
};

const getSensorMeasurements = async (req, res) => {
  try {
    const sensorId = req.sensor.id;

    const measurements = await Measurement.findAll({
      where: {
        sensorId,
      },
    });

    res.status(200).json({measurements});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not find sensor measurements." });
  }
};

export { createSensorMeasurement, getSensorMeasurements };
