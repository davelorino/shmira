import React, {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Project } from '../../../models/project';
import { Issue } from '../../../models/issue';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/store';

import { IssueStatusCopy } from '../../../shared/constants/issues';

import ProjectBoardListIssue from './Issue/ProjectDashboardIssue';
import { List, Title, IssuesCount, Issues } from './Styles';

interface Props {
  status: string;
  project: Project;
  issues: Issue[];
}


export default observer(function ProjectBoardList({status, project, issues}: Props) {
  
  const { issueStore } = useStore();
  const { issuesByDate, activeUsers} = issueStore;
  
  var status_name = status.substring(0, status.indexOf('-'));

  return (
    <Droppable key={status} droppableId={status}>
      { (provided) => {
        return(
        <List>
          <Title>
            {status_name}
          </Title>
          <Issues
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {issues!.sort((a, b) => a.sort_order - b.sort_order).map((issue, index) => (
                  <ProjectBoardListIssue key={issue.id} issue={issue} index={index}  />
            ))
          }
          
            {provided.placeholder}
          </Issues>
        </List>
            )}
            }
    </Droppable>
  );
});


