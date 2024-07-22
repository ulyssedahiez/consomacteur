import { User } from "../model/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ValidationError } from "sequelize";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

const register = async (req, res) => {
  const error = registerSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});
  const { email, password, firstName, lastName } = req.body;

  // Vérification que l'utilisateur n'existe pas déjà
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ message: "Cet utilisateur existe déjà" });
  }

  // Hachage du mot de passe avant stockage dans la base de données
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création d'un nouvel utilisateur
  const user = new User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });

  const validationError = await user.validate().catch(err => {return err});
  if (validationError instanceof ValidationError) {
    res.status(400).json({validationError});
    console.log(validationError);
  } else {
    await user.save();

    res.json({ message: "Utilisateur créé avec succès" });
  }
};

const login = async (req, res) => {
  const error = loginSchema.validate(req.body).error;
  if (error) return res.status(400).json({error});
  const { email, password } = req.body;

  // Récupération de l'utilisateur depuis la base de données
  const user = await User.findOne({ where: { email: email } });

  // Vérification que l'utilisateur existe
  if (!user) {
    return res
      .status(401)
      .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  // Vérification du mot de passe
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res
      .status(401)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }

  // Génération d'un token JWT pour l'utilisateur
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  // Envoi du token dans la réponse
  res.json({ token });
};

// Middleware pour vérifier l'authentification d'un utilisateur
const requireAuth = async (req, res, next) => {
  // Récupération du token d'authentification depuis les en-têtes de la requête
  const token = req.headers.authorization;

  // Vérification que le token existe
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token d'authentification manquant" });
  }

  try {
    // Vérification que le token est valide
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Récupération de l'utilisateur depuis la base de données
    const user = await User.findByPk(decodedToken.id, {
      attributes: { exclude: ["password"] },
    });

    // Vérification que l'utilisateur existe
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    // Ajout de l'utilisateur à la requête pour utilisation dans les routes suivantes
    req.user = user;

    // Appel du prochain middleware
    next();
  } catch (err) {
    // Erreur si le token est invalide
    return res
      .status(401)
      .json({ error: "Token d'authentification invalide" });
  }
};

// déconnexion d'un utilisateur
const logout = (req, res) => {
  // Suppression du token d'authentification de l'utilisateur
  // Le token est supprimé du côté client en supprimant ou en modifiant le cookie ou en vidant le localStorage
  res.json({ message: "Utilisateur déconnecté avec succès" });
};

export { register, login, requireAuth, logout };
