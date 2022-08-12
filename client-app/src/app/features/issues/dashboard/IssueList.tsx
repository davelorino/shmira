import React, { useState, SyntheticEvent } from 'react';
import { Issue } from '../../../models/issue';
import { Segment, Item, Button, Label } from 'semantic-ui-react';


interface Props {
    issues: Issue[];
    selectIssue: (id: string) => void;
    deleteIssue: (id: string) => void;
    submitting: boolean;
}

export default function IssueList({issues, selectIssue, deleteIssue, submitting}: Props) {
    const [target, setTarget] = useState('');

    function handleIssueDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
         setTarget(e.currentTarget.name);
         deleteIssue(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {issues.map(issue => (
                    <Item key={issue.id}>
                        <Item.Content>
                            <Item.Header as='a'>{issue.name}</Item.Header>
                            <Item.Meta>{issue.status}</Item.Meta>
                            <Item.Description>
                                <div> 
                                    {issue.description_text}
                                </div>
                                <div> 
                                    {issue.priority}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => selectIssue(issue.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={issue.id}
                                    loading={submitting && target === issue.id} 
                                    onClick={(e) => handleIssueDelete(e, issue.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' />
                                <Label basic content={issue.status} />
                            </Item.Extra>

                            
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}