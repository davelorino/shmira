import React, { useState, SyntheticEvent } from 'react';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Issue } from '../../../models/issue';


interface Props {
    sprintIssues: Issue[];
}

export default observer(function IssueList({sprintIssues}: Props) {
    const {issueStore} = useStore();
    const {deleteIssue, issuesByDate, allSprints, loading, activeUsers} = issueStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteIssue(id);
    }
    
    
    return (
        <Segment>
            <Item.Group divided>
                {sprintIssues.map(issue => 
                    {
                        activeUsers.length === 0 || activeUsers.includes(issue.id) && 
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
                            <Button onClick={() => issueStore.selectIssue(issue.name)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={issue.id}
                                    loading={loading && target === issue.name} 
                                    onClick={(e) => handleActivityDelete(e, issue.name)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' />
                                <Label basic content={issue.status} />
                            </Item.Extra>

                            
                        </Item.Content>
                    </Item>
                    }
                   
                )}
            </Item.Group>
        </Segment>
    )
})