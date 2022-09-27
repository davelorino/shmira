import React, { useEffect, useState } from 'react';
import { Grid, List,  } from 'semantic-ui-react';
import IssueList from './IssueList';
import SprintList from './SprintList';
import { Issue } from '../../../models/issue';
import { Sprint } from '../../../models/sprint';
import LoadingComponent from '../../../layout/LoadingComponent';
import IssueForm from '../form/CreateIssueForm';
import { Project } from '../../../models/project';
import {useStore} from '../../../stores/store';
import {observer} from 'mobx-react-lite';
import IssueLists from '../../../layout/Lists/IssueLists';
import IssueListsNoActiveSprint from '../../../layout/Lists/IssueListsNoActiveSprint';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import Filters from './Filters/Filters';
import LoginForm from '../form/login/LoginForm';
import { toast } from 'react-toastify';
import _ from 'lodash';



export default observer(function IssuesDashboard() {

    const {issueStore, userStore, commonStore, accountStore} = useStore();
    const {selectedIssue, 
           editMode, 
           updateIssue,
           updateIssues, 
           deleteIssue, 
           selectedProject,
           loading, 
           selectProject,
           allProjects,
           allSprints,
           issuesByDate,
           updateIssueAndSprint
        } = issueStore;

    const { user_logged_in } = userStore;

    


    const isPositionChanged = (destination: any, source: any) => {
    if (!destination) return false;
    const isSameList = destination.droppableId === source.droppableId;
    const isSamePosition = destination.index === source.index;
    return !isSameList || !isSamePosition;
    };



    const handleIssueDrop = ({destination, source, draggableId}: DropResult) => {
        if (!isPositionChanged(source, destination)) return;

        var source_sprint_name = source!.droppableId.substring(source!.droppableId.indexOf('-') + 1, source!.droppableId.length);
        var destination_status_name = destination!.droppableId.substring(0, destination!.droppableId.indexOf('-'));
        var destination_sprint_name = destination!.droppableId.substring(destination!.droppableId.indexOf('-') + 1, destination!.droppableId.length);

        var source_sprint = selectedProject?.sprints.find(sprint => sprint.name === source_sprint_name);
        var source_sprint_id = source_sprint!.id;
        
        var destination_sprint = selectedProject?.sprints.find(sprint => sprint.name === destination_sprint_name);
        var destination_sprint_id = destination_sprint!.id;
        
        const issue_id = draggableId;

        var issueToUpdate = issuesByDate.find(issue => issue.id.toLowerCase() === issue_id.toLowerCase());

        var number_of_todo = 0;
        var number_of_inprogress = 0;
        var number_of_review = 0;

        selectedProject!.sprints.filter(sprint => sprint.name === destination_sprint_name).map(sprint => {
            number_of_todo = sprint.issues.filter(issue => issue.status == "To Do").length;
            number_of_inprogress = sprint.issues.filter(issue => issue.status == "In Progress").length;
            number_of_review = sprint.issues.filter(issue => issue.status == "Review").length;

            if(number_of_todo > 0){
                number_of_todo = number_of_todo - 1;
            }
            if(number_of_inprogress > 0){
                number_of_inprogress = number_of_inprogress - 1;
            }
            if(number_of_review > 0){
                number_of_review = number_of_review - 1;
            }
        })
        
        
        issueToUpdate!.status = destination_status_name;
        if(issueToUpdate!.status == "To Do"){
            issueToUpdate!.sort_order = destination!.index;
        }
        if(issueToUpdate!.status == "In Progress"){
            issueToUpdate!.sort_order = parseInt('20'.concat((destination!.index + number_of_todo).toString()));
        }
        if(issueToUpdate!.status == "Review"){
            issueToUpdate!.sort_order = parseInt('300'.concat((destination!.index + number_of_todo + number_of_inprogress).toString()));
        }
        if(issueToUpdate!.status == "Done"){
            issueToUpdate!.sort_order = parseInt('4000'.concat((destination!.index + number_of_todo + number_of_inprogress + number_of_review).toString()))
        }

        var issuesToUpdate: any[] = [];

        selectedProject!.sprints.map(sprint => {
            // Take out of source sprint
            
            if(sprint.name === source_sprint_name){
               sprint.issues = sprint.issues.filter(issue => issue.id.toLowerCase() !== issue_id.toLowerCase()).sort((a, b) => b.sort_order - b.sort_order)
            }
            
            // Insert into destination sprint
            if(sprint.name === destination_sprint_name){
                
                //number_of_done = sprint.issues.filter(issue => issue.status == "Done").length;
                console.log("Issue indexes before splice:")
                sprint.issues.sort((a, b) => a.sort_order - b.sort_order).map((issue, index) => {
                    console.log(issue.name.concat(' index = ', index.toString()));
                })
                var splice_index = 0;
                if(issueToUpdate!.status == "To Do"){
                    splice_index = destination!.index;
                }
                if(issueToUpdate!.status == "In Progress"){
                    splice_index = destination!.index + (number_of_todo);
                }
                if(issueToUpdate!.status == "Review"){
                    splice_index = destination!.index + (number_of_todo) + (number_of_inprogress);
                }
                if(issueToUpdate!.status == "Done"){
                    splice_index = destination!.index + (number_of_todo - 1) + (number_of_inprogress) + (number_of_review);
                }
                sprint.issues.sort((a,b) => a.sort_order - b.sort_order).splice(splice_index, 0, issueToUpdate!);
                
                sprint.issues.sort((a,b) => a.sort_order - b.sort_order).map((issue, index) => {
                    
                    if(issue.status == "To Do"){
                        issue.sort_order = index;
                        //console.log(issue.name);
                        //console.log(issue.sort_order);
                    }
                    if(issue.status == "In Progress"){
                        issue.sort_order = parseInt('20'.concat(index.toString()));
                        //console.log(issue.name);
                        //console.log(issue.sort_order);
                    }
                    if(issue.status == "Review"){
                        issue.sort_order = parseInt('300'.concat(index.toString()));
                        //console.log(issue.name);
                        //console.log(issue.sort_order);
                    }
                    if(issue.status == "Done"){
                        issue.sort_order = parseInt('4000'.concat(index.toString()));
                        //console.log(issue.name);
                        //console.log(issue.sort_order);
                    }
                    
                })
                
                issuesToUpdate = _.cloneDeep(sprint.issues);

            }
        }); 

        issuesToUpdate.map(issue => {
            delete issue['assignees']
        })        

        if(destination_sprint_name === source_sprint_name){
            updateIssues(issuesToUpdate);
        } else {
            updateIssueAndSprint(
                source_sprint_id,
                destination_sprint_id,
                issueToUpdate!.name,
                issueToUpdate!.id,
                issueToUpdate!
                );
        }
    
      };



        

    return(
        <div>
            {
                //loading === true && <LoadingComponent />
            }
            <DragDropContext onDragEnd={handleIssueDrop}>
             <Filters />
            {selectedProject?.sprints.filter(sprint => sprint.is_active === true).map(sprint => (
                
                
            <div key={sprint.id} style={{marginLeft: 40}} >


                    <div key={sprint.id}>
                    <div style={{display: 'inline-block'}}> {sprint.name}</div> <div style ={{fontSize: '11px', paddingLeft: '20px', display: 'inline-block', color: "grey"}}>{sprint.date_start.substr(0, 10)} - {sprint.date_end.substr(0, 10)}</div>
                    <IssueLists sprint={sprint} key={sprint.id}/>
                    </div>
           
            </div>
            ))}
            {selectedProject?.sprints.filter(sprint => sprint.is_active === true).length === 0 &&
                
                        <IssueListsNoActiveSprint />
            
            }
            </DragDropContext>

             
                {editMode &&
                <IssueForm />
                }
              
                </div>
    )
})