const Joi = require('joi');
const express = require('express');
const app = express()

app.use(express.json());

const port = process.env.PORT || 3000

const courses =[ 
       {id :1, name : 'course1'},
       {id :2, name : 'course2'},
       {id :3, name : 'course3'}
    
]

app.get("/", (req, res) => {
    res.send("now Iam from practise-4")
});

app.get("/courses", (req, res) => {
    res.send(courses)
});

app.get("/courses/:id", (req, res) => {
    const user = courses.find((c) => c.id ===parseInt(req.params.id))
    if(!user) res.status(404).send("This id could not match course id please try another Id")
     res.send(user)
     return;
});

app.post("/courses", (req, res) => {
  

    const { error } = validateCourse(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    


    const course ={
        id : courses.length +1,
        name : req.body.name,
    }
    courses.push(course)
    res.send(course)
});

app.put('/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id ===parseInt(req.params.id))
    if(!course) res.status(404).send("This id could not match course id please try another Id")
     
      const { error } = validateCourse(req.body)
        if(error){
            res.status(400).send(error.details[0].message)
        }

        course.name = req.body.name
        res.send(course)
});

function  validateCourse(course){
     
    const schema = Joi.object ({
        name: Joi.string().min(3).required()
    });
        return schema.validate(course)
}



app.listen(port, () => {
    console.log("Port listning up on " +port)
}) 





    //   DUMMY 2 FILE 
    const express = require('express');
    const Joi = require('joi');
    const app = express()
    // const bodyParser = require('body-parser')
    
    const port = process.env.PORT || 3001
    
    app.use(express.json())
    
    const courses = [
        {id : 1 , name : 'course1'},
        {id : 2 , name : 'course2'},
        {id : 3 , name : 'course3'},
    ]
    
    app.get('/', (req, res) => {
        res.send('Hello this is my new try')
    });
    
    app.get('/courses', (req, res) => {
        res.send(courses)
    });
    
    app.get('/courses/:id', (req, res) => {
        const course = courses.find((c)=> c.id === parseInt(req.params.id))
        if(!course){
            res.status(404).send('Id is not match by given id')
            return;
        }
        res.send(course)
    });
    
    app.post('/courses', (req, res) => {
    
        const schema = Joi.object({
            name : Joi.string().min(3).required()
        })
        const result = (req.body,schema)
            console.log(result)
    
        if(!req.body.name || req.body.name.length<3){
           res.status(404).send('Name is require and name length minimum more than 3 ')
              return;
        } 
    
        const course = {
            id : courses.length +1,
            name : req.body.name
        }
        courses.push(course)
        res.send(course)
    });
    
    
    app.listen(port, () => {
        console.log(`Port listning up on ${port}`)
    })