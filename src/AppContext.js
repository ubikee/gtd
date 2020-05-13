import React, { useState } from 'react'
import API from './AppAPI'

export const AppContext = React.createContext()
export const AppContextProvider = ({ children }) => {

    const [logged, setLogged] = useState(false)
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState()
    
    async function login(email, password) {
        const onOK = () => {
            API.init()
            setLogged(true)
        }
        API.login(email, password, onOK)
    }

    async function loadTasks() {
        const tasks = await API.tasks()
        setTasks(tasks)
    }

    async function selectTask(id) {
        const response = await API.task(id)
        setTask(response)
    }

    async function createTask(form) {
        form.state = 'INBOX'
        form.created = new Date().toDateString()
        await API.addTask(form)
        loadTasks()
    }

    async function updateTask(id, form) {
        console.log('update', id, form)
        await API.updateTask(id, form)
        loadTasks()
    }

    async function deleteTask(id) {
        await API.deleteTask(id)
        loadTasks()
    }

    const value = {
        logged,
        login,

        tasks,
        task,
        loadTasks,
        selectTask,
        createTask,
        updateTask,
        deleteTask,
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}