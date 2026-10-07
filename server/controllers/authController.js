import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'careerflow_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = '7d';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function sanitizeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

export async function register(req, res) {
  try {
    const { name, email, password, title, university } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required fields.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.createUser({
      name,
      email,
      passwordHash,
      title,
      university
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: sanitizeUser(newUser)
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while registering account.'
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: sanitizeUser(user)
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login.'
    });
  }
}

export async function demoLogin(req, res) {
  try {
    let demoUser = db.findUserByEmail('demo@careerflow.dev');
    if (!demoUser) {
      // Re-seed if needed
      const hash = await bcrypt.hash('DemoPass123!', 10);
      demoUser = await db.createUser({
        name: 'Alex Rivera',
        email: 'demo@careerflow.dev',
        passwordHash: hash,
        title: 'Aspiring Software Engineer & Web Developer',
        university: 'Stanford University / Computer Science'
      });
    }

    const token = generateToken(demoUser);

    return res.json({
      success: true,
      message: 'Welcome to the Demo Experience!',
      token,
      user: sanitizeUser(demoUser)
    });
  } catch (err) {
    console.error('Demo login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during demo login.'
    });
  }
}

export async function getMe(req, res) {
  try {
    const user = db.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const stats = db.getStats(user.id);

    return res.json({
      success: true,
      user: sanitizeUser(user),
      stats
    });
  } catch (err) {
    console.error('GetMe error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching user profile.'
    });
  }
}
