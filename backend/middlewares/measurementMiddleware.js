import { Measurement, House, Area, Sensor } from "../model/index.js";

const getMeasurementById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const measurementId = req.params.measurementId;

    const measurement = await Measurement.findOne({
      where: { id: measurementId },
      include: [
        {
          model: Sensor,
          as: "sensor",
          required: true,
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
        },
      ],
    });

    if (!measurement) return res.status(404).json({ error: "Measurement not found" });

    req.measurement = measurement;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find measurement." });
  }
};

export { getMeasurementById };
