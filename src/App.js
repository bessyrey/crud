import { isEmpty } from 'lodash'              /*Se agrega la libreria lodosh*/ 
import React, { useState } from 'react'
import shortid from 'shortid'                 /*se agrega la libreria shortied */

function App() {
  const [task, setTask] = useState("")       /*estado que almacena el nombre de la tarea nueva*/
  const [tasks, setTasks] = useState([])     /*se crea el arreglo para las nuevas tareas*/
  
  const addTask = (e) => {
    e.preventDefault()                       /*creamos un evento*/
    if (isEmpty(task)) {
      console.log("Task empty")
      return
    }

    const newTask = {                    /*creamos una variable para agregar una nueva tarea */
      id: shortid.generate(),            /*genera un codigo alfanumerico q no se repite*/
      name: task                        /*colocamos un nombre a esa tarea */
    }

    setTasks([...tasks, newTask ])     /*Spread operator con arreglo para agrear a la coleccion de tasks la nueva tarea*/ 
    setTask("")
  }
  

  return (
   <div className="container mt-5">
     <h1>Tarea</h1>
     <hr/>
     <div className= "row">
      <div className="col-8">
       <h4 className="text-center">Lista de Tareas</h4>
       <ul className="list-group">
        {
          tasks.map((task) => (
            <li className="list-group-item" key={task.div}>
           <span className="lead">{task.name}</span>
           <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
           <button className="btn btn-warning btn-sm float-right">Editar</button>
           </li>

          ))    
        }
        </ul>
      </div>
      <div className="col-4">
       <h4 className="text-center">Formulario</h4>
       <form onSubmit={addTask}>
         <input
          type="text"
          className="form-control mb-2"
          placeholder="Ingrese la Tarea..." 
          onChange={(text) => setTask(text.target.value) }  /*para cambiar el estado */
          value={task}
         />
         <button className="btn btn-dark btn-block"
          type="submit"
          >
         Agregar
         </button>
       </form>
      </div>
     </div>
   </div>
  )
}

export default App
