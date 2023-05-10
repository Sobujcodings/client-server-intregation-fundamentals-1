import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data), console.log(data)
      })
  }, [])



  // form submit function/handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.email.value)
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = { email, password };
    // object diye var assign korle property value 2tai pabo
    // submit btn  e  click korle ai api te/server e form r user ta jabe
    // form r user(email,pass k POST akare server e padhiye dilam ai link e recive o korbo)
    // ata recieve necher ta hoice recieve r bakira same
    
    // post API
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
      // body r vhitore kore padhalam recieve korbo aibhabei (json baniye padhate hobe coz api r data json formt e thake)
      // form r new user ta k padhalam ai link r body te
    })

      // res (recive data from server after adding id pushing) e ja pabo sheta ai then e
      .then(res => res.json())
      // .then(data => setUsers(data)) X
      // agee jetaa ache shetar(shei array) sathe add korbo tai no push spreaad korrbo staate thtakay
      .then(allData => {
        // console.log(data)
        // ** ai datai holo update users gulo ager + form r shob shetai state set korbo push kora jay na tai ager  ta  k copy kore shetay boshaya dibo
        form.reset();
        // const newUser = [...users, allData]  //*ager ta bad/duplicate bad new ai updated users list state e set hobe
        // ** akhane user update hoye jacche exchage r moto ager tar sathe notun user k add kortechi
        setUsers(allData);
        // *** atai users mane after updated total data abar set korate click korlei kaj korbe refresh na dileo
        // console.log(allData)
        // *** new user server e add korar por abar set kore update data UI te dekhalam
      })
  }



  return (
    <>
      <h1>User management System</h1>
      <h3>Users : {users.length}</h3>



      <div>
        <form onSubmit={handleSubmit}>
          <input type="email" required name="email" /><br />
          <input type="password" required name="password" /><br />
          <button>Submit</button>
        </form>
      </div>


      <div>

        {
          users.map(user => <p>{user.id} : {user.name} {user.email}</p>)
        }

      </div>



    </>
  )
}

export default App
