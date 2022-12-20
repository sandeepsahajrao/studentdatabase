const path = require('path');
const fs = require('fs');
const bodyparser = require('body-parser')
const express = require('express');
const storage = require('node-persist');
// const bodyParser = require('body-parser');
const app = express()
const jsonbody = bodyparser.json()
storage.init()


app.get('/allstudent', async (req, res) => {
 
    const students=(await storage.getItem("students"))
    let html=`<h1>Students DataBase:ALL students</h1>
        <table border=1 style="font-size:26px;color:black;width:600px;text-align: center;">
            <thead >
                <tr >
                    <th>Id</th>
                    <th>Name</th>
                    <th>GPA</th>
                </tr>
            </thead>
        </table>`
    const allstu=students.forEach(ele => {
      html+=
        `<div>
            <table  border=1 style="font-size:26px;color:black;width:600px;text-align: center;">
         
                <tbody style="border:none;width:200px">
                    <tr >
                    <td>${ele.id}</td>
                    <td>${ele.name}</td>
                    <td>${ele.gpa}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
        
    });
    res.send(html)
})

app.get('/student/:id', async (req, res) => {
    
    const students=(await storage.getItem("students"))
   
    let html=`<h1>Students DataBase:BY id</h1>
        <table border=1 style="font-size:26px;color:black;width:600px;text-align: center;">
            <thead >
                <tr >
                    <th>Id</th>
                    <th>Name</th>
                    <th>GPA</th>
                </tr>
            </thead>
        </table>`
    const allstu=students.forEach(ele => {
        // console.log(req.params.id==ele.id)
        if(req.params.id==ele.id){
            
            html+=
              `<div>
                  <table  border=1 style="font-size:26px;color:black;width:600px;text-align: center;">
               
                      <tbody style="border:none;width:200px">
                          <tr >
                          <td>${ele.id}</td>
                          <td>${ele.name}</td>
                          <td>${ele.gpa}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              `;
            }    
        });
        res.send(html)
})
// last app.get
app.get('/topper', async (req, res) => {
    const students=(await storage.getItem("students"))

    let html=`<h1>Students DataBase:Topper</h1>
        <table border=1 style="font-size:26px;color:black;width:600px;text-align: center;">
            <thead >
                <tr >
                    <th>Id</th>
                    <th>Name</th>
                    <th>GPA</th>
                </tr>
            </thead>
        </table>`
    let arr=[]
    let temp=Infinity;
    for(let i=0;i<students.length;i++){
        arr.push(Number(students[i].gpa))
    }
    for(let i=0;i<arr.length;i++){
    for(let j=0;j<arr.length;j++){
            if(arr[i]>arr[j]){
                temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp
            }
    }
    }
    console.log(arr)

    for(let i=0;i<students.length;i++){
        if(arr[0]===(Number(students[i].gpa))){
            html+=
            `<div>
                <table  border=1 style="font-size:26px;color:black;width:600px;text-align: center;">
             
                    <tbody style="border:none;width:200px">
                        <tr >
                        <td>${students[i].id}</td>
                        <td>${students[i].name}</td>
                        <td>${students[i].gpa}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            `;
       }
    }
      res.send(html)
})

app.post('/student', jsonbody, async (req, res) => {
    // const { id, name, gpa } = req.body;
    // await storage.setItem(id, name, gpa);
    const students = (await storage.getItem("students")) || [];
    const newStudent = req.body;
    newStudent.id = students.length + 1;
    await storage.setItem("students", [...students, newStudent]);
    res.send("student add ")
})

app.listen(8000, () => {
    console.log('server Stared')
})
