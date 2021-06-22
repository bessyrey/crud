import { isEmpty, size } from 'lodash'              /*Se agrega la libreria lodosh*/ 
import React, { useState } from 'react'
import shortid from 'shortid'                 /*se agrega la libreria shortied */

function App() {
  const [task, setTask] = useState("")       /*estado que almacena el nombre de la tarea nueva*/
  const [tasks, setTasks] = useState([])     /*se crea el arreglo para las nuevas tareas*/
  const [editMode, setEditMode]= useState(false)
  const [id, setId] = useState("")            /*Guarda el estado del id de la tarea a modificar */
  
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

  const saveTask = (e) => {
    e.preventDefault()
    if(isEmpty(task)){
      console.log("Task empty")
      return 
    }
 
     const editedTasks = tasks.map(item => item.id === id ? { id, name: task}: item)
     setTasks(editedTasks)
     setEditMode(false)
     setTask("")
     setId("")
  }

   const deleteTask = (id) => {        /*se filtran todas las tareas menos la q el ususrio borro*/
     const filteredTasks = tasks.filter(task => task.id !== id)
     setTasks(filteredTasks)
   }

   const editTask = (theTask) => {        /*se filtran todas las tareas menos la q el ususrio borro*/
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  } 
   
   
  return (
   <div className="container mt-5">
     <h1>Tarea</h1>
     <hr/>
     <div className= "row">
      <div className="col-8">
       <h4 className="text-center">Lista de Tareas</h4>
       
       {
         size(tasks) === 0 ? (
           <h5 className="text-center">Aun no hay Tareas Programadas.</h5>
         ) : ( 
            <ul className="list-group">
              {
                tasks.map((task) => (                                 /*map se usa para iterar objetos*/
                <li className="list-group-item" key={task.div}>       
                  <span className="lead">{task.name}</span>
                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick = {() => deleteTask(task.id)}           
                  >
                  Eliminar
                  </button>
                  <button 
                     className="btn btn-warning btn-sm float-right"
                     onClick={() => editTask(task)}
                     >
                     { editMode ? "Guardar" : "Editar" }
                 </button>
               </li>

          ))    
        }
           </ul>
       )
      }

      </div>
      <div className="col-4">
       <h4 className="text-center">
       { editMode ? "Modificar Tarea": "Agregar Tarea"}
       </h4>
       <form onSubmit={editMode ? saveTask : addTask}>
         <input
          type="text"
          className="form-control mb-2"
          placeholder="Ingrese la Tarea..." 
          onChange={(text) => setTask(text.target.value) }  /*para cambiar el estado */
          value={task}
         />
         <button className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
          type="submit"
          >
          { editMode ? "Guardar" : "Agregar" }
         </button>
       </form>
      </div>
     </div>
   </div>
  )
}

export default App
