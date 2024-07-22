import { Scenario, ScenarioStep, User } from "../model/index.js";

const getStepById = async (req, res, next) => {
  try {
    const stepId = req.params.stepId;
    const userId = req.user.id;

    const step = await ScenarioStep.findOne({
      where: {
        id: stepId,
      },
      include: [
        {
          model: Scenario,
          as: "scenario",
          required: true,
          where: {
            userId,
          },
        },
      ],
    });

    if (step) {
      req.step = step;
    } else {
      return res.status(404).json({ error: "Step not found." });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to find step." });
  }
};

export { getStepById };
