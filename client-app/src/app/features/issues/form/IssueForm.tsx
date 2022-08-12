import React, { ChangeEvent, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Issue } from '../../../models/issue';

interface Props {
    issue: Issue | undefined;
    closeForm: () => void;
    createOrEdit: (issue: Issue) => void;
    submitting: boolean;
}

export default function IssueForm({issue: selectedIssue, closeForm, createOrEdit, submitting}: Props) {

    const initialState = selectedIssue ?? {
        id: '',
        name: '',
        description: '',
        description_text: '',
        status: '',
        priority: '',
        created_at: ''
    }

    const [issue, setIssue] = useState(initialState);

    function handleSubmit() {
        createOrEdit(issue);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setIssue({...issue, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={issue.name} name='name' onChange={handleInputChange}/>
                <Form.Input placeholder='Short Description' value={issue.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Long Description' value={issue.description_text} name='description_text' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type='date' value={issue.created_at} name='created_at' onChange={handleInputChange}/>
                <Form.Input placeholder='Priority' value={issue.priority} name='priority' onChange={handleInputChange}/>
                <Form.Input placeholder='Status' value={issue.status} name='status' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right'  type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}