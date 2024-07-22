import { Scenario } from "../model/index.js";

const getScenarioById = async (req, res, next) => {
  try {
    const id = req.params.scenarioId;
    const userId = req.user.id;
    const scenario = await Scenario.findOne({
      where: {
        id,
        userId,
      },
    });

    if (scenario) {
      req.scenario = scenario;
    } else {
      return res.status(404).json({ error: "Scenario not found." });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to find scenario." });
  }
};

export { getScenarioById };
