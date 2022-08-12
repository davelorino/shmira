import React from 'react';
import {Card, Icon, Image, Button} from 'semantic-ui-react';
import { Issue } from '../../../models/issue';
import dogue from '../../../layout/favicon.png';

interface Props {
    issue: Issue;
    cancelSelectIssue: () => void;
    openForm: (id: string) => void;
}


export default function IssueDetails({issue, cancelSelectIssue, openForm}: Props) {
    return (
        <Card fluid>
            <Image src={dogue}/>
            <Card.Content>
                <Card.Header></Card.Header>
                    {issue.name}
                <Card.Meta>
                    <span>Created at placeholder</span>
                </Card.Meta>
                <Card.Description>
                    {issue.description_text}
                </Card.Description>
                
            </Card.Content>
            <Card.Content extra>
               <Button.Group widths='2'>
                    <Button onClick={() => openForm(issue.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectIssue} basic color='grey' content='Cancel' />
               </Button.Group>
            </Card.Content>
        </Card>

    )
}