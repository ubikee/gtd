import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, TextField } from 'ywana-core6'
import { AppContext } from '../../AppContext'
import './editor.css'

/**
 * Task Editor
 */
export const TaskEditor = () => {

    const context = useContext(AppContext)
    const [form, setForm] = useState()
    const [isValid, setValid] = useState(false)

    const task = context.task
    useEffect(() => {
        setForm(task)
    }, [task])

    function changeForm(changes, validation) {
        setForm(Object.assign({}, form, changes))
        setValid(validation)
    }

    async function save() {
        console.log(task)
        await context.updateTask(task.id, form)
    }

    if (!form) return (<div>vacio</div>)

    return (
        <div className="task-editor">
            <main>
                <Form onChange={changeForm}>
                    <TextField span="1" id="description" label="¿ Qué quieres hacer ?" required value={form.description} />
                </Form>
            </main>
            <footer>
                <Button label="Guardar" disabled={!isValid} action={save} />
            </footer>
        </div>
    )
}