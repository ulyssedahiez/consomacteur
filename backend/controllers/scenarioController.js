import { Scenario } from "../model/index.js";
import { createSchema } from "../validations/scenarioValidation.js";
import * as scenarioService from "../services/scenarioService.js";

const createScenario = async (req, res) => {
  try {
    const error = createSchema.validate(req.body).error;
    if (error) return res.status(400).json(error);

    const { name } = req.body;
    const userId = req.user.id;

    const scenario = await Scenario.create({
      name,
      userId,
    });

    res.status(200).json({scenario});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create scenario." });
  }
};

const updateScenario = async (req, res) => {
  try {
    const error = createSchema.validate(req.body).error;
    if (error) return res.status(400).json({error});

    const { name } = req.body;
    const scenario = req.scenario;

    scenario.name = name;

    await scenario.save();

    res.status(200).json({scenario});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update scenario." });
  }
};

const deleteScenario = async (req, res) => {
  try {
    const scenario = req.scenario;

    await scenario.destroy();

    res.status(200).json({ message: "Scenario deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete scenario." });
  }
};

const getScenario = (req, res) => {
  try {
    const scenario = req.scenario;
    res.status(200).json({scenario});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get scenario." });
  }
};

const getScenarios = async (req, res) => {
  try {
    const userId = req.user.id;
    const scenarios = await Scenario.findAll({
      where: {
        userId,
      },
    });

    res.status(200).json({scenarios});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get scenarios." });
  }
};

const startScenario = async (req, res) => {
  try {
    await scenarioService.startScenario(req.scenario);
    res.status(200).json({ message: "Scenario started." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to start scenario." });
  }
};

const pauseScenario = async (req, res) => {
  try {
    await scenarioService.pauseScenario(req.scenario);
    res.status(200).json({ message: "Scenario paused." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to pause scenario." });
  }
};

const stopScenario = async (req, res) => {
  try {
    await scenarioService.stopScenario(req.scenario);
    res.status(200).json({ message: "Scenario stop." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to stop scenario." });
  }
};

export {
  createScenario,
  updateScenario,
  deleteScenario,
  getScenario,
  getScenarios,
  startScenario,
  pauseScenario,
  stopScenario,
};
