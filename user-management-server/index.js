const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var cors = require('cors');


// middle-wire 
app.use(cors());
app.use(express.json());
// this last middlewire to avoid console undifined in req.body


const users = [
    { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'babita', email: 'babita@gmail.com' },
    { id: 3, name: 'bilkis', email: 'bilkis@gmail.com' },
]


// route
app.get('/', (req, res) => {
    res.send('user-management-server')
});

// normal get (usual)
app.get('/users', (req, res) => {
    res.send(users);
});



// (POST) client form user for post (tahole link ak holeo  alada ashbe ata post n set alada) (recive korle req diye dekhbo)
app.post('/users',(req,res)=>{
    // console.log(req.body);
    const NewUser = req.body;
    // ager user r sathe ai form r notun user push kore dilei hobe coz ata react jsx nah spread operator lagbe na
    // just id number ta k kono jayga theke ashbe na,tai static bhabe bariye nibo (ager + akhn kar ta) 1+1 = 2
    // const NewUser = [...users,formData]; client e staate thakay eibhabe use korbo
    NewUser.id = users.length + 1 ;  // new user e akta id nam e property set kore value o diye dilam
    //akhn ai newuser with id ta ke ager user r vhitore push kore dibo
    // id set korar pore push korbo form r user from client side
    // newuser holo single form r user gula
    // console.log(NewUser)
    users.push(NewUser);
    // abr shei uppdated new data/users k paadhiyeo dibo jate updated users ta client UI te dekhate pari
    res.send(users)
    // user k push korar por users ta update hoye jabe old+new data niye
    console.log(users)
})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    // will be seen on the cmd (use nodemon index.js to run)
})