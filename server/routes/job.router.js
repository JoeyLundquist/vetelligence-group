const express = require('express');
const pool = require('../modules/pool');
const jobRouter = express.Router();

// GET request for all job data to display
jobRouter.get('/', (req, res) => {
  const sqlQuery = `
    ;`
  pool.query(sqlQuery)
    .then((results) => {
        res.send(results.rows)
    })
    .catch((err) => {
        console.log('GET failed in job router', err);
    });
});

// POST route for employer to input a job
jobRouter.post ('/', (req, res) => {
    console.log('in POST', req.body);

  const sqlQuery = `
    INSERT INTO job (name, email, phone, city, state, skills)
    VALUES ($1, $2, $3, $4, $5, $6)`;
  const sqlParams = [
    req.body.jobInputData.name,
    req.body.jobInputData.email,
    req.body.jobInputData.phone,
    req.body.jobInputData.city,
    req.body.jobInputData.state,
    req.body.jobInputData.skills,
 ];
  pool.query(sqlQuery, sqlParams)
  .then((results) => {
    console.log('POST is sending', results.rows);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('error in post router', err);
    res.sendStatus(500);
  })
});

// PUT route to update the status on the Vet Page list view
jobRouter.put('/:vetID', (req, res) => {
  const sqlQuery = `
    UPDATE veterans
    SET status = $1
    WHERE id = $2`;
  const sqlParams = [
    req.body.status,
    req.params.vetID
  ];
  pool.query(sqlQuery, sqlParams)
  .then((results) => {
    console.log('PUT is updating', results.rows);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('error in PUT router', err);
    res.sendStatus(500);
  })
});

// Delete route to remove a job from the Employer Page
jobRouter.delete('/:id', (req, res) => {
  const jobID = req.params.id

  const sqlQuery = `
    DELETE FROM job
    WHERE job.id = $1;`

  const sqlParams = [
    jobID,
  ]

  pool.query(sqlQuery, sqlParams)
  .then(response => {
    console.log(response.rows, "This was the response")
      res.sendStatus(200)
  })
  .catch(err => {
    console.log(`Error in the server DELETE route with ${err}`);
    res.sendStatus(500);
  })
});

module.exports = jobRouter;