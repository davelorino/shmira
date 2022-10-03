import React, {useEffect, useState} from 'react';
import { SprintSectionBacklog } from './Styles';
import { observer } from 'mobx-react-lite';
import Filters from '../sprints/dashboard/Filters/Filters';
import styled, {css} from 'styled-components';
import { useStore } from '../../stores/store';
import SprintSectionContainer from './SprintSectionContainer';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import _ from 'lodash';

const font = {
    regular: 'font-family: "CircularStdBook"; font-weight: normal;',
    medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
    bold: 'font-family: "CircularStdBold"; font-weight: normal;',
    black: 'font-family: "CircularStdBlack"; font-weight: normal;',
    size: (size: any) => `font-size: ${size}px;`,
  };

const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
`;


const color = {
  primary: '#0052cc', // Blue
  success: '#0B875B', // green
  danger: '#E13C3C', // red
  warning: '#F89C1C', // orange
  secondary: '#F4F5F7', // light grey

  textDarkest: '#172b4d',
  textDark: '#42526E',
  textMedium: '#5E6C84',
  textLight: '#8993a4',
  textLink: '#0052cc',

  backgroundDarkPrimary: '#181A1A',
  backgroundMedium: '#dfe1e6',
  backgroundLight: '#ebecf0',
  backgroundLightest: '#F4F5F7',
  backgroundLightPrimary: '#D2E5FE',
  backgroundLightSuccess: '#E4FCEF',

  borderLightest: '#dfe1e6',
  borderLight: '#C1C7D0',
  borderInputFocus: '#4c9aff',
}

const sizes = {
  appNavBarLeftWidth: 64,
  secondarySideBarWidth: 230,
  minViewportWidth: 1000,
}

const zIndexValues = {
  modal: 1000,
  dropdown: 101,
  navLeft: 100,
}


const mixin = {

  hardwareAccelerate: css`
    transform: translateZ(0);
  `,
  cover: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
    clickable: css`
    cursor: pointer;
    user-select: none;
  `
}

const NavLeft = styled.aside`
z-index: ${zIndexValues.navLeft};
position: fixed;
top: 0;
left: 0;
overflow-x: hidden;
margin-top: 39px;
height: 100vh;
width: ${sizes.appNavBarLeftWidth}px;
background: ${color.backgroundDarkPrimary};
transition: all 0.1s;
${mixin.hardwareAccelerate}
&:hover {
  width: 200px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.6);
}
`
const Item = styled.div`
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding-left: 10px;
  color: #deebff;
  transition: color 0.1s;
  ${mixin.clickable}
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  i {
    position: absolute;
    left: 18px;
  }
`;


export default observer(function SprintPage() {

    const { issueStore } = useStore();
    const { issuesByDate, selectedProject, updateIssues, updateIssueAndSprint } = issueStore;
    var [sprintDetailsExpanded, setSprintDetailsExpanded] = useState<Array<boolean>>([]);

    useEffect(() => {
        var initialDetailsExpandedArray: boolean[] = [];
        selectedProject!.sprints.map((sprint, index) => {
            initialDetailsExpandedArray.push(true);
        })
        setSprintDetailsExpanded(initialDetailsExpandedArray)}, [])
    
    

    const ItemText = styled.div`
    margin-right: 12px;
    visibility: visible;
    opacity: 1;
    transition: all 0.1s;
    transition-property: right, visibility, opacity;
    ${font.bold}
    ${font.size(12)}
    `;

    const isPositionChanged = (destination: any, source: any) => {
    if (!destination) return false;
    const isSameList = destination.droppableId === source.droppableId;
    const isSamePosition = destination.index === source.index;
    return !isSameList || !isSamePosition;
    };

    const handleIssueDrop = ({destination, source, draggableId}: DropResult) => {
    
        if (!isPositionChanged(source, destination)) return;

        var source_sprint_id = source!.droppableId
        var destination_sprint_id = destination!.droppableId
        
        var source_sprint = selectedProject?.sprints.find(sprint => sprint.id === source_sprint_id);
        
        var destination_sprint = selectedProject?.sprints.find(sprint => sprint.id === destination_sprint_id);
        var destination_sprint_id = destination_sprint!.id;
        
        const issue_id = draggableId;

        var issueToUpdate = issuesByDate.find(issue => issue.id.toLowerCase() === issue_id.toLowerCase());

        var number_of_todo = 0;
        var number_of_inprogress = 0;
        var number_of_review = 0;

        selectedProject!.sprints.filter(sprint => sprint.id === destination_sprint_id).map(sprint => {
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
            
            if(sprint.id === source_sprint_id){
               sprint.issues = sprint.issues.filter(issue => issue.id.toLowerCase() !== issue_id.toLowerCase()).sort((a, b) => b.sort_order - b.sort_order)
            }
            
            // Insert into destination sprint
            if(sprint.id === destination_sprint_id){
                
                //number_of_done = sprint.issues.filter(issue => issue.status == "Done").length;
                
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
                    
                    console.log(issue.name.concat(' index = ', index.toString()));
                    
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
            delete issue['comments']
        })        

        if(destination_sprint_id === source_sprint_id){
            updateIssues(issuesToUpdate);
        } else {
            var issueToUpdateSanitized: any = {
                ...issueToUpdate
            }
            delete issueToUpdateSanitized['assignees'];
            delete issueToUpdateSanitized['comments'];
            updateIssueAndSprint(
                source_sprint_id,
                destination_sprint_id,
                issueToUpdate!.name,
                issueToUpdate!.id,
                issueToUpdateSanitized!
                );
        }

    };


   
    return(
        <>
         <DragDropContext onDragEnd={handleIssueDrop}>
        <Filters />
        {
            selectedProject!.sprints.filter(sprint => sprint.name !== "Backlog" && sprint.is_active).map( (sprint, index) => (
                <SprintSectionContainer sprintDetailsExpanded={sprintDetailsExpanded} setSprintDetailsExpanded={setSprintDetailsExpanded} sprint={sprint} key={index} index={index} />
            ))
        }

        {
            selectedProject!.sprints.filter(sprint => sprint.name !== "Backlog" && !sprint.is_active).map( (sprint, index) => (
                <SprintSectionContainer sprintDetailsExpanded={sprintDetailsExpanded} setSprintDetailsExpanded={setSprintDetailsExpanded} sprint={sprint} key={index} index={index} />
            ))
        }

        
        {
            selectedProject!.sprints.filter(sprint => sprint.name === "Backlog")
                                    .map( (sprint, index) => (
                    <>
                        <SprintSectionBacklog> 
                        <div> 
                                {
                                    sprint.issues.length === 0 && 
                                    <SprintSectionContainer sprint={sprint} index={index} sprintDetailsExpanded={sprintDetailsExpanded} setSprintDetailsExpanded={setSprintDetailsExpanded} >
                                        
                                        <div style={{color: '#FFFFFF !important'}}> Your backlog is empty. </div>
                                        
                                    </SprintSectionContainer>
                                }
                                {
                                    sprint.issues.length > 0 && 
                                    <div style={{right: '20px', marginLeft: '0px'}}>
                                    <SprintSectionContainer sprintDetailsExpanded={sprintDetailsExpanded} setSprintDetailsExpanded={setSprintDetailsExpanded} sprint={sprint} key={index} index={index} />
                                    </div>
                                }
                            
                        </div>
                        </SprintSectionBacklog>
                    </>
                )
            )
        }
        </DragDropContext>

        </>
    )
});
