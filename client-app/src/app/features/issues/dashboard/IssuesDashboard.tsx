import React from 'react';
import { Grid, List,  } from 'semantic-ui-react';
import { Issue } from '../../../models/issue';
import IssueList from './IssueList';
import IssueDetails from '../details/IssueDetails';
import IssueForm from '../form/IssueForm';

interface Props {
    issues: Issue[];
    selectedIssue: Issue | undefined;
    selectIssue: (id: string) => void;
    cancelSelectIssue: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (issue: Issue) => void;
    deleteIssue: (id: string) => void;
    submitting: boolean;
}

export default function IssuesDashboard({issues, selectedIssue, 
    selectIssue, cancelSelectIssue, editMode, openForm, closeForm, 
    createOrEdit, deleteIssue, submitting}: Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <IssueList issues={issues} 
                selectIssue={selectIssue}
                deleteIssue={deleteIssue}
                submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width = '6'>
                {
                selectedIssue && !editMode &&
                <IssueDetails issue={selectedIssue}
                              cancelSelectIssue={cancelSelectIssue}
                              openForm={openForm}
                />
                }
                {editMode &&
                <IssueForm 
                    closeForm={closeForm} 
                    issue={selectedIssue} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}