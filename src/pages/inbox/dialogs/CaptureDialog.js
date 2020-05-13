import React, { Fragment, useContext, useState } from 'react'
import { Dialog, DialogButton, TextField, SiteContext, Form } from 'ywana-core6'

/**
 *  Capture Dialog
 */
export const CaptureDialog = ({ onOK }) => {

    const site = useContext(SiteContext)
    const [form, setForm] = useState()
    const [isValid, setValid] = useState(false)
    
    const onAction = (action) => {
        if (action === 'OK' && onOK ) onOK(form) 
        site.closeDialog()
    }

    const onChange = (form, validation) => {
        setForm(form)
        setValid(validation)
    }

    const actions = (
        <Fragment>
            <DialogButton action="CLOSE">Cancel</DialogButton>
            <DialogButton action="OK" isDefaultAction raised disabled={!isValid}>OK</DialogButton>
        </Fragment>
    )

    return (
        <Dialog title="Captura" open={true} onAction={onAction} actions={actions}>
            <br/>
            <Form columns={1} outlined onChange={onChange}>
                <TextField span="1" id="description" label="¿ Qué quieres hacer ?" required />
                
            </Form>
        </Dialog>
    )
}
