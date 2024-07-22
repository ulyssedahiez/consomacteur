import { Area, House, Sensor } from "../model/index.js";

const getSensorById = async (req, res, next) => {
  try {
    const sensorId = req.params.sensorId;
    const userId = req.user.id;

    const sensor = await Sensor.findOne({
      where: { id: sensorId },
      include: [
        {
          model: Area,
          as: "area",
          required: true,
          include: [
            {
              model: House,
              as: "house",
              where: { userId },
              required: true,
            },
          ],
        },
      ],
    });

    if (!sensor) return res.status(404).json({ error: "Sensor not found." });

    req.sensor = sensor;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find sensor." });
  }
};

export { getSensorById };
