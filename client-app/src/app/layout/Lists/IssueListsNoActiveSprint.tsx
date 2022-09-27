import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DraggableLocation,
  DropResult,
  DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot, ResponderProvided
} from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import List from './List/IssueList';
import ListNoActiveSprint from './List/IssueListNoActiveSprint';
import { Lists } from './Styles';
import { useStore } from '../../stores/store';
import { Issue } from '../../models/issue';
import { Sprint } from '../../models/sprint';



export default observer(function ProjectBoardListsNoActiveSprint() {

  const {issueStore} = useStore();
  const { updateIssue, issuesByDate, selectedProject } = issueStore;
  //var issuesInCurrentSprint = issuesByDate.filter(issue => issue.sprint_id === sprint.id);
  

  var issue_status = ['To Do', 'In Progress', 'Review', 'Done']

  return (
    
      <Lists>
        {issue_status.map(status => (
          <ListNoActiveSprint
            key={status}
            //project={selectedProject!}
            //issues={sprint.issues.filter(issue => issue.status === status.substring(0, status.indexOf('-')))}
            status={status}
          />
        ))}
      </Lists>

  );
});



/*
const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (allIssues, destination, source, droppedIssueId) => {
  const beforeDropDestinationIssues = getSortedListIssues(allIssues, destination.droppableId);
  const droppedIssue = allIssues.find(issue => issue.id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index)
    : insertItemIntoArray(beforeDropDestinationIssues, droppedIssue, destination.index);

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);
*/