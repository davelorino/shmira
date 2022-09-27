import React, { useState, SyntheticEvent } from 'react';
import { Segment, Item, Button, Label, Container, Header } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import IssueList from './IssueList';

export default observer(function SprintList() {

    const {issueStore} = useStore();
    const {allSprints} = issueStore;

    return(
        <Container>

             {allSprints.map(sprint => (
            <>
            <h3>
                {sprint.name}
            </h3>
            <IssueList sprintIssues={sprint.issues}/>
            </>
            ))}
        </Container>
    )
})