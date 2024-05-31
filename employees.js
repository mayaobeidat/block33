const express = require('express');
const pg = require('pg');
const router = express.Router();

router.use(express.json())

const client = new pg.Client('postgres://localhost/acme_hr_direct');
client.connect()

// get all employees
router.get('/', async(req, res, next)=>{
    try{
        const response = await client.query(`SELECT * FROM employees ORDER BY id ASC`);
        res.send(response.rows)
    }catch(err){
        next(err)
    }
});

// get employee by id
router.get('/:id', async(req, res, next) =>{
    try{
        const response = await client.query(`SELECT * FROM employees WHERE id = $1`, [req.params.id]);
        res.send(response.rows[0])
    } catch(err){
        next(err)
    }
});

// delete employee
router.delete('/:id', async(req, res, next) =>{
    try{
        const response = await client.query(`DELETE from employees WHERE id = $1`, [Number(req.params.id)])
        res.send({
            id:req.params.id
        }).sendStatus(204)
    } catch(err){
        next(err)
    }
});

// add employee
router.post('/', async(req, res, next) =>{
    try{
        const response = await client.query(`INSERT INTO employees(name, department_id, created_at) VALUES($1, $2, now())`,
        [req.body.name, req.body.department_id]);
        res.send({
            name: req.body.name,
            is_favorite: req.body.department_id,
        })
    } catch(err){
        next(err)
    }
});

// update employee
router.put("/:id", async(req,res,next)=>{
    try{
       const response = await client.query(`UPDATE employees SET name=$1, department_id=$2, updated_at=now() WHERE id=$3 RETURNING *`,
           [req.body.name, Number(req.body.department_id), Number(req.params.id) ]);
       res.send(response.rows[0]);
    }catch(err){
        next(err)
    }
});

module.exports = router;