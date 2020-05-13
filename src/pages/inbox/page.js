import React, { Fragment, useContext, useEffect } from 'react'
import { SiteContext, Header, Text, DataTable, Button, Icon } from 'ywana-core6'
import { AppContext } from '../../AppContext'
import { CaptureDialog } from './dialogs/CaptureDialog'
import { TaskEditor } from './editor'

/**
 * Inbox
 */
const Page = () => {

    const site = useContext(SiteContext)
    const context = useContext(AppContext)
    useEffect(() => { context.loadTasks() }, [])

    function capture() {
        const onOK = form => context.createTask(form)
        site.openDialog(<CaptureDialog onOK={onOK} />)
    }

    function select(row) {
        context.selectTask(row.id)
    }

    async function remove(id) {
        const accept = await site.confirm('Se va a Eliminar', "¿ Estas seguro ?")
        if (accept === true) context.deleteTask(id)
    }

    const tasks = context.tasks
        .filter(task => task.state === 'INBOX')
        .map(task => {
            task.action = <Icon icon="delete" clickable action={() => remove(task.id)} />
            return task
        })

    const data = {
        columns: [
            { id: 'description', label: 'Descripción' },
            { id: 'action' }
        ],
        rows: tasks
    }
    const title = <Text use="headline6">Bandeja</Text>
    return (
        <Fragment>
            <Header icon={{ icon: 'inbox' }} title={title} >
                <Button label="Capturar" action={capture} raised />
            </Header>
            <main>
                <DataTable {...data} onRowSelection={select} />
            </main>
            <aside>
                <TaskEditor />
            </aside>
        </Fragment>
    )
}

export default Page