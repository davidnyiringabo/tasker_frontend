import { useState, useEffect } from "react"
import tick from "/check-circle.png"
import cross from "/x.png"
import dot from "/dot.png"
import trash from "/trash-2.png"
import "./taskscomponents.css"
import axios from "axios"
import AllTasks from "./AllTasks"
import { useNavigate } from "react-router-dom"

const TasksContainer = ({})=>{
  const navigate = useNavigate()
  const[prompTheUserModel ,setPrompTheUserModel] = useState(false)
  const cookie= document.cookie.split('=')
  const userLogginEmail = cookie[1]

const [deletedId ,setDeleteId] = useState("")

  console.log(userLogginEmail)

    const [tasks,setTasks] = useState([
    ]);

    useEffect( ()=>{

      axios.get(`http://localhost:7100/v1/api/tasks/${userLogginEmail}`)
             .then((response)=>{
              const userTasks = response.data

              setTasks(userTasks)
              console.log(response.data)

             })
    },[userLogginEmail])
    const firstTasks = [tasks[0],tasks[1]]


    const deleteTask = ()=>{

      console.log("it is clicked")


        axios.get(`http://localhost:7100/v1/api/deleteTask/${deletedId}`)
               .then((response)=>{
                console.log(response.data)
               })
               navigate("/main/tasks")
      // },[userLogginEmail])

      setPrompTheUserModel(false)


    }

    return(
        <div className='overviewTasksContainer'>
                    {tasks.length > 1 ? firstTasks.map((task:any)=>{
                      return(
                    
                        <div className='singleTask'>
                            <div className='single-task-upper'>
                              <h3>{task.description}</h3>
                              <h3>Completed {task.completed ? <img src={tick}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {task.deadline}</h4>
                            <div className='taskCategory'>
                              <img src={dot}/>
                              <h6>{task.category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6> today at {task.deadline}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}}><img src={trash} onClick={()=>{setPrompTheUserModel(true); setDeleteId(task._id); console.log("it is deleted")}}/> Remove</button>
                              </div>
                            </div>
                        </div>
                       
                    )
                    } ) : tasks.length ==1 ? (
                          (
                         <div className='singleTask'>
                            <div className='single-task-upper'>
                              <h3>{tasks[0].description}</h3>
                              <h3>Completed {tasks[0].completed ? <img src={tick}/> : <img src={cross}/> }</h3>
                            </div>
                            <h4>Set on {tasks[0].deadline}</h4>
                            <div className='taskCategory'>
                              <img src={dot}/>
                              <h6>{tasks[0].category}</h6>
                            </div>
                            <div className="single-task-bottom">
                              <div className="single-task-bottom-left">
                                <h5>Deadline</h5>
                                <h6> today at {tasks[0].deadline}</h6>
                              </div>
                              <div className="single-task-bottom-right">
                                <button type='button' style={{border:'1px solid #0075FF',color:'#0075FF'}}><img src={tick}/> Complete</button>
                                <button type='button' style={{border:'1px solid #BA4A4A',color:'#BA4A4A'}} onClick={()=>{setPrompTheUserModel(true); setDeleteId(tasks[0]._id)}}><img src={trash}/> Remove</button>
                              </div>
                            </div>
                        </div>
                      )
                      ) : <h3>There is no task yet</h3>}

                  {prompTheUserModel && (
                    <div className="modelContainer">
                        <div className="overlay">
                            <div className="promp-user-container">
                                <div className="promp-model-header">
                                    <button type='button' onClick={()=>setPrompTheUserModel(!prompTheUserModel)} className="close-view-all-tasks-model">close</button>
                                </div>
                            <div className="promp-user-bottom">
                                <h3>Are you sure you want to remove this task? </h3>
                                <button type="button" onClick={deleteTask}>Yes</button>
                                <button type="button" onClick={()=> setPrompTheUserModel(false)}>No</button>

                            </div>

                                
                            </div>
                        </div>
                    </div>
            )}
                  </div>
    )
}

export default TasksContainer