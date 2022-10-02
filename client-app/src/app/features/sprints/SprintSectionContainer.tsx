
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Sprint } from '../../models/sprint';
import {SprintSection, SprintSectionIssueContainer, SprintSectionIssueContainerEmpty, SprintSectionBacklog} from './Styles';
import Icon from '../../layout/Icon';
import BetterIcon from '../../layout/BetterIcon';
import styled, {css} from 'styled-components';
import SprintDashboardIssue from '../../layout/Lists/List/Issue/SprintDashboardIssue';
import { Droppable } from 'react-beautiful-dnd';
import SprintForm from './form/SprintForm';
import AddDatesToSprintForm from './form/AddDatesToSprintForm';
import ConfirmCloseSprintForm from './form/ConfirmCloseSprintForm';
import NewCreateIssueForm from './form/NewCreateIssueForm';
import moment from 'moment';

interface Props {
    sprint: Sprint;
    index: number;
    sprintDetailsExpanded: boolean[],
    setSprintDetailsExpanded: Function
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

  const font = {
    regular: 'font-family: "CircularStdBook"; font-weight: normal;',
    medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
    bold: 'font-family: "CircularStdBold"; font-weight: normal;',
    black: 'font-family: "CircularStdBlack"; font-weight: normal;',
    size: (size: any) => `font-size: ${size}px;`,
  };



  const Item = styled.div`
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding-left: 10px;
  transition: color 0.1s;
  ${mixin.clickable}
  i {
    position: absolute;
    left: 18px;
  }
`;

const ItemText = styled.div`
  margin-right: 12px;
  visibility: visible;
  opacity: 1;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;
  ${font.bold}
  ${font.size(12)}
`;

export default observer(function SprintSectionContainer({ sprint }: Props) {

    const { smallModalStore, modalStore, issueStore } = useStore();

    const { selectSprint, selectedSprint, updateSprint, selectedProject } = issueStore;

    var history = useHistory();

    function handleStartSprint() {
        var current_sprint: Partial<Sprint> = {
            ...selectedSprint!
        }
    
        delete current_sprint['issues'];
    
        current_sprint.is_active = true;
    
        var updated_sprint: any = current_sprint;
    
        selectedSprint!.is_active = true;
    
        updateSprint(updated_sprint);

        history.push(`/`);
    }

    
    function a_sprint_is_currently_active() {
        var currently_active = false;
        selectedProject!.sprints.map(sprint => {
            if(sprint.is_active === true) {
                currently_active = true;
            }
        })
        return(currently_active);
    }
    



    return(

        <Droppable key={sprint.id} droppableId={sprint.id}>
            {
                (provided) => {
                    return (
                        <>
                        <SprintSection sprint_name={sprint.name}>
                        <Item >
                            <BetterIcon bottom='5' left='6' size='24' code='\032C' />
                            
                            <p style={{fontSize: '8x !important', display: 'relative', paddingTop: '24px', paddingLeft: '30px'}}>{sprint.name}
                            {sprint.date_start.toString().substr(0, 4) === "0001" && sprint.name !== "Backlog" &&
                                <>
                                <BetterIcon style={{bottom: '0px', position: 'relative'}} top='0' size='11' code='\1F58B' />
                                <div onClick={() => { issueStore.selectSprint(sprint.id); modalStore.openModal(<AddDatesToSprintForm />)}} style={{fontSize: '12px', display: 'inline-block', paddingLeft: '22px'}}>Add dates</div>
                                {
                                    a_sprint_is_currently_active() === false &&
                                    <div style={{cursor: 'not-allowed', fontSize: '12px', float: 'right', display: 'inline-block', marginRight: '20px', paddingLeft: '0px'}}>Start sprint</div>
                                }
                                {
                                    sprint.is_active === true &&
                                    <div onClick={() => smallModalStore.openSmallModal(<ConfirmCloseSprintForm />)} style={{cursor: 'pointer', fontSize: '12px', float: 'right', display: 'inline-block', marginRight: '20px', paddingLeft: '0px'}}>Complete sprint</div>

                                }
                                
                                </>
                            }
                            {sprint.date_start.toString().substr(0, 4) !== "0001" && sprint.name !== "Backlog" &&
                            <>
                            <BetterIcon style={{bottom: '0px', position: 'relative'}} top='0' size='11' code='\1F58B' /* pencil icon */ />
                            <div onClick={() => { issueStore.selectSprint(sprint.id); modalStore.openModal(<AddDatesToSprintForm />)}} 
                                 style={{fontSize: '12px', display: 'inline-block', paddingLeft: '22px'}}
                                 >
                                {moment(sprint.date_start.substr(0, 10)).format("MMM Do") } - {moment(sprint.date_end.substr(0,10)).format("MMM Do")} 
                            </div>
                            {
                                sprint.is_active === true &&
                                <div style={{fontSize: '12px', display: 'inline-block', paddingLeft: '15px'}}>Active Sprint</div>
                            }
                            {
                                !sprint.is_active === true &&
                                <div style={{fontSize: '12px', display: 'inline-block', paddingLeft: '15px'}}>Inactive Sprint</div>
                            }
                            {
                                a_sprint_is_currently_active() === false &&
                                <div onClick={() => {selectSprint(sprint.id); handleStartSprint();}} style={{fontSize: '12px', float: 'right', display: 'inline-block', marginRight: '20px', paddingLeft: '0px'}}>Start sprint</div>
                            }
                            {
                                sprint.is_active === true &&
                                <div onClick={() => {selectSprint(sprint.id); smallModalStore.openSmallModal(<ConfirmCloseSprintForm />)}} style={{cursor: 'pointer', fontSize: '12px', float: 'right', display: 'inline-block', marginRight: '20px', paddingLeft: '0px'}}>Complete sprint</div>

                            }
                            </>
                            }
                            {sprint.name === "Backlog" &&
                            <>
                            <div onClick={() => smallModalStore.openSmallModal(<SprintForm />)} style={{fontSize: '12px', float: 'right', display: 'inline-block', marginRight: '20px', paddingLeft: '0px'}}>Create sprint</div>
                            </>
                            }
                            </p>
                            
                           
                        </Item>
                        
                            {
                        <SprintSectionIssueContainer   
                                    {...provided.droppableProps}
                                    ref={provided.innerRef} 
                                    style={{top: '0', marginBottom: '0', marginLeft: '22px'}}
                                    >
                                    {
                                        sprint.issues.sort((a, b) => a.sort_order - b.sort_order).map( (issue, index) => (
                                            <SprintDashboardIssue issue={issue} key={issue.id} index={index} />
                                        ))
                                    }
                                    {provided.placeholder}
                        </SprintSectionIssueContainer>
                                
                            }
                            
                         <div></div>
                        <Item onClick={() => modalStore.openModal(<NewCreateIssueForm />)}>
                             <Icon left={'11'} top={'0'} type='plus' size='14' />
                             <ItemText style={{paddingLeft: '36px', bottom: '4px'}} >Create issue</ItemText>
                        </Item>
                        </SprintSection>
                        <br/>
                        </>
                    )
                }
            }
       
        </Droppable>
    )
});


