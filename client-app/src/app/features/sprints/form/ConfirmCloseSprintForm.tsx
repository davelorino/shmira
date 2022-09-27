import React, { useState } from 'react';
import { Button, Label, Grid, Dropdown, Input, TextArea} from 'semantic-ui-react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Sprint } from '../../../models/sprint';
import { Issue } from '../../../models/issue';
import { ProjectSprintAndBacklog } from '../../../models/projectSprintAndBacklog';
import { SprintIssue } from '../../../models/sprintissue';
import * as Yup from 'yup';
import { Assignee } from '../../../models/assignee';
import { StyledLabelAvatar, StyledAvatar, AvatarIsActiveLabelBorder } from '../dashboard/Filters/Styles';
import {InvisibleTextInput, StyledInput} from '../../../shared/form/Styles';
import ReactQuill from 'react-quill';
import  "react-quill/dist/quill.snow.css";
import parse from 'html-react-parser';
import Icon from '../../../layout/Icon/index';
import IssuePriorityIcon from '../../../layout/IssuePriorityIcon';
import {StyledLabel} from './Styles';
import {HoverDiv} from './Styles';

export default observer(function ConfirmCloseSprintForm() {

    const {issueStore, modalStore, smallModalStore, userStore} = useStore();
    const {
        selectedIssue,
        allSprints, 
        selectedProject,
        allProjects, 
        closeForm, 
        createIssue, 
        updateIssue,
        updateIssueAndSprint, 
        selectedSprint,
        selectSprint,
        loading,
        updateSprint,
    } = issueStore;


    const initialState = selectedIssue ?? {
        id: '',
        name: '',
        description: '',
        description_text: '',
        status: '',
        priority: '',
        days: '',
        hours: '',
        minutes: '',
        original_estimated_duration: '',
        //created_at: null,
        sprint: '',
        assignees: []
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('The issue title is a required MyTextInput.')
    })


    var [quillDescriptionEditText, setQuillDescriptionEditText] = useState("");
    var [selectedAssignees, setSelectedAssignees] = useState();
    var [selectedReporter, setSelectedReporter] = useState();
    const [issue, setIssue] = useState(initialState);
    const [issueTitle, setIssueTitleState] = useState("")
    var [description_edit_state, setDescriptionEditState] = useState(false);
    var [issue_title_edit_state, setIssueTitleEditState] = useState(false);
    var [log_time_edit_state, setLogTimeEditState] = useState(false);




    function handleSprintChange(sprint_id: string) {

        var sprint_issue_to_remove = {
            sprint_id: selectedIssue!.sprint_id,
            issue_id: selectedIssue!.id,
            issue_name: selectedIssue!.name
        }

        var sprint_issue_to_add = {
            sprint_id: sprint_id,
            issue_id: selectedIssue!.id,
            issue_name: selectedIssue!.name
        }

        selectedIssue!.sprint_id = sprint_id;

        updateIssueAndSprint(
            sprint_issue_to_remove.sprint_id,
            sprint_issue_to_add.sprint_id,
            sprint_issue_to_add.issue_name,
            sprint_issue_to_add.issue_id,
            selectedIssue!
            );

    }

    function handleCloseSprint() {
        var project_sprint: ProjectSprintAndBacklog = {
            project_id: selectedProject!.id,
            sprint_id: selectedSprint!.id,
            backlog_id: selectedProject!.sprints.find(sprint => sprint.name === "Backlog")!.id
        }
        console.log("Project sprint =");
        console.log(project_sprint);
        issueStore.closeSprintAndPushIssuesToBacklog(project_sprint);
    }


    return (
  
        <div >
            

            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={issue} 
                onSubmit={values => console.log(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
             <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                <h5>Are you sure you want to complete the sprint? Any remaining tickets will be moved to the backlog.</h5>
                
                <Button size='tiny' color='blue' content='Complete' onClick={() => handleCloseSprint() } float='center' />
                <Button size='tiny' content='Cancel' onClick={() => smallModalStore.closeSmallModal} float='center' />

            </Form>
            )}
            </Formik>
           

        </div>
    )
})