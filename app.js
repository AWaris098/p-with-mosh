const Joi = require('joi')
const express = require('express');
const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'}
]

app.get('/courses', (req, res) => {
    res.send(courses)
});

app.get('/courses/:id', (req, res) => {
   const course =courses.find(c => c.id === parseInt(req.params.id))
   if (!course) res.status(404).send('The course with given ID is not found')
    res.send(course)
});

app.post('/courses', (req, res) => {

    const schema = {
        name : Joi.string().min(3).required()
    }
   const result = Joi.validate(req.body, schema)
     
    if(result.error){
        res.status(404).send(result.error.details[0].message)
        return;
    }



    const course ={
      id : courses.length +1,
      name : req.body.name
    }

    courses.push(course)
    res.send(course)
})

app.listen(port, () => console.log(`port listning on ${port}`))