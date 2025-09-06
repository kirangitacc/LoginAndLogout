import express from 'express';
import cors from 'cors';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data.db');

let db = null;

const createTables = async () => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS userdetails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      gender TEXT,
      phone TEXT,
      address TEXT
    )
  `);
};

const initializeDBAndServer = async () => {
  try {
    console.log('Opening database...');
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('Creating tables...');
    await createTables();

    console.log('Starting server...');
    app.listen(3001, () => {
      console.log('Server running at http://localhost:3001');
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};



initializeDBAndServer();

const tokenAuthentication = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers['authorization'];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1];
  }
  if (jwtToken === undefined) {
    response.status(401).json('Invalid JWT Token');
  } else {
    jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async (error, payload) => {
      if (error) {
        response.status(401).json('Invalid JWT Token');
      } else {
        request.userId = payload.id;
        next();
      }
    });
  }
};

app.get('/user/:id', tokenAuthentication, async (request, response) => {
  const { id } = request.params;
  try {
    const query = 'SELECT * FROM userdetails WHERE id = ?';
    const user = await db.get(query, [id]);
    if (user) {
      response.json(user);
    } else {
      response.status(404).json('User not found');
    }
  } catch (error) {
    response.status(500).json('Error fetching user data');
  }
});

app.post('/register', async (request, response) => {
  const { username, email, password, gender, phone, address} = request.body;
  console.log(request.body);
  if (!username || !email || !password || !gender || !phone || !address) {
    return response.status(400).json({ message: 'All fields are required' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'Password is too short' });
  }
  try {
    const userDetails = await db.get(
      `SELECT * FROM userdetails WHERE username = ? OR email = ?`,
      [username, email]
    );
    if (userDetails === undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const addUserQuery = `
        INSERT INTO userdetails (username, email, password, gender, phone, address)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await db.run(addUserQuery, [username, email, hashedPassword, gender, phone, address]);
      response.json({ message: 'User Registered successfully' });
    } else {
      response.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  console.log(request.body);
  try {
    const user = await db.get(`SELECT * FROM userdetails WHERE email = ?`, [email]);
    if (!user) {
      response.status(400).json('Invalid user');
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const payload = { id: user.id, username: user.username };
        const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN');
        response.json({ jwtToken, userId: user.id});
      } else {
        response.status(400).json('Invalid password');
      }
    }
  } catch (error) {
    response.status(500).json('Internal Server Error');
  }
});

export default app
