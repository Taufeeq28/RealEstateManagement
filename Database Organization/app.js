// client.connect();
// client.query(`
// CREATE TABLE IF NOT EXISTS users (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   email TEXT NOT NULL,
//   password TEXT NOT NULL,
//   role TEXT NOT NULL
// );
// `)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Pool} = require('pg')
app.use(bodyParser.json());
const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:"Swetha123*",
    database:"Real_Estate_Management"
})

app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

  try {
    const client = await pool.connect();
    const result = await client.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role;
    `, [name, email, password, role]);
    const id = result.rows[0].id;
    res.json({ id });
    client.release();

    // const user = result.rows[0];

    // res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
