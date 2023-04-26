const {Client} = require('pg')
const client = new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:"Swetha123*",
    database:"Real_Estate_Management"
})
client.connect();



const express = require('express');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/home.html');
})

app.use(express.static(__dirname));

app.post('/register', async (req, res) => {
  const { name, email, password, role, agency, jobTitle, contactInfo, budget, preferred_location, move_in_date } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    console.log(role);
    const result = await client.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role;
    `, [name, email, password, role]);

    console.log(result);
    const user = result.rows[0];
    // Insert additional data based on the user's role
    if (role === 'agent') {
      await client.query('INSERT INTO agent (email_address, name, real_estate_agency, job_title, contact_information) VALUES ($1, $2, $3, $4, $5)', [email, name, agency, jobTitle, contactInfo]);
    } else if (role === 'renter') {
      await client.query('INSERT INTO renter (email_address,name, budget, preferred_location, move_in_date) VALUES ($1, $2, $3, $4, $5)', [email,name, budget, preferred_location, move_in_date]);
    }
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
