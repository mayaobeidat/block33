const express = require('express');
const pg = require('pg');
const router = express.Router();

router.use(express.json())

const client = new pg.Client('postgres://localhost/acme_hr_direct');
client.connect()

// get all departments
router.get('/', async(req, res, next)=>{
    try{
        const response = await client.query(`SELECT * FROM department ORDER BY id ASC`);
        res.send(response.rows)
    }catch(err){
        next(err)
    }
});

// get employees by department id
router.get('/:department_id', async(req, res, next) =>{
    try{
        const response = await client.query(`SELECT * FROM employees WHERE department_id = $1`, [req.params.department_id]);
        res.send(response.rows)
    } catch(err){
        next(err)
    }
});

module.exports = router;