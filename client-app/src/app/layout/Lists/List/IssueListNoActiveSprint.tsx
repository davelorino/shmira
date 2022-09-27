import React, {useState} from 'react';
import { useHistory, Link }from 'react-router-dom';
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
}


export default observer(function ProjectBoardListNoActiveSprint({status}: Props) {
  
  var status_name = status
  var history = useHistory();

  return (
    <Droppable key={status} droppableId={status}>
      { (provided) => {
        return(
        <List>
          <Title>
            {status_name}
            {/*<IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount> */}
          </Title>
          <Issues
            {...provided.droppableProps}
            ref={provided.innerRef}
            //data-testid={`board-list:${status}`} 
          >
            {provided.placeholder}
            {status_name === 'To Do' && <div style={{fontSize: '14px', display: 'flex', paddingTop: '100px', paddingLeft: '33px', paddingRight: '20px' }}>
                <p>You can't do anything right now because there is no active sprint. Head to your <Link style={{display: 'inline-block'}} to='/sprints'>backlog</Link> to start a sprint.</p>
                </div>
            }
          </Issues>
          
        </List>
            )}
            }
    </Droppable>
  );
});


