import { Area, House } from "../model/index.js";

const getAreaById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const areaId = req.params.areaId;

    const area = await Area.findOne({
      where: { id: areaId },
      include: [
        {
          model: House,
          as: "house",
          where: { userId },
          required: true,
        },
      ],
    });

    if (!area) return res.status(404).json({ error: "Area not found" });

    req.area = area;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find area." });
  }
};

export { getAreaById };
