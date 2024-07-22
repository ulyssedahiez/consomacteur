import { ScenarioStep } from "../model/index.js";
import { createSchema } from "../validations/stepValidation.js";

const updateStep = async (req, res) => {
  try {
    const error = createSchema.validate(req.body).error;
    if (error) return res.status(400).json({ error });

    const step = req.step;

    Object.assign(step, req.body);

    await step.save();

    res.status(200).json({step});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update scenario step." });
  }
};

const deleteStep = async (req, res) => {
  try {
    const step = req.step;
    const nextStep = await step.getNextStep();
    const previousStep = await step.getPreviousStep();

    await step.destroy();

    if (previousStep) {
      previousStep.setNextStep(nextStep);
      await previousStep.save();
    }

    if (nextStep) {
      nextStep.setPreviousStep(previousStep);
      await nextStep.save();
    }

    console.log(previousStep, nextStep);

    res.status(200).json({ message: "Step deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete scenario step." });
  }
};

const getStep = (req, res) => {
  try {
    const step = req.step;
    res.status(200).json({step});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get scenario step." });
  }
};

const createScenarioStep = async (req, res) => {
  try {
    const error = createSchema.validate(req.body).error;
    if (error) return res.status(400).json({ error });

    const scenarioId = req.scenario.id;

    const lastStep = await ScenarioStep.findOne({
      where: {
        scenarioId,
        nextStepId: null,
      },
    });

    const previousStepId = lastStep ? lastStep.id : null;

    const step = await ScenarioStep.create({
      scenarioId,
      ...req.body,
      previousStepId,
    });

    if (lastStep) {
      lastStep.nextStepId = step.id;
      await lastStep.save();
    }

    res.status(200).json({step});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create scenario step." });
  }
};

const getScenarioSteps = async (req, res) => {
  try {
    const scenarioId = req.scenario.id;

    const steps = await ScenarioStep.findAll({
      where: {
        scenarioId,
      },
    });

    res.status(200).json({steps});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get scenario steps." });
  }
};

export {
  updateStep,
  deleteStep,
  getStep,
  createScenarioStep,
  getScenarioSteps,
};
