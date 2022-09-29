import React, { useEffect, useState } from 'react';
import IssueForm from '../form/CreateIssueForm';
import {useStore} from '../../../stores/store';
import {observer} from 'mobx-react-lite';
import IssueLists from '../../../layout/Lists/IssueLists';
import IssueListsNoActiveSprint from '../../../layout/Lists/IssueListsNoActiveSprint';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import Filters from './Filters/Filters';
import _, { concat } from 'lodash';
import moment from 'moment';
import IssueStatusRadar from './Charts/IssueStatusRadar';



export default observer(function InsightsDashboard() {

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


    const getDaysRemaining = () => {
        var date_end = moment(selectedProject!.sprints.find(sprint => sprint.is_active)!.date_end);
        return concat(moment(date_end).diff(moment(), 'days').toString(), " days remaining");
    }

   

    return(
        <div>
                {
                    //loading === true && <LoadingComponent />
                }
                <Filters />
                <div style={{width: '20%', height: '300px'}} >
                    <IssueStatusRadar />
                </div>
            
              
        </div>
    )
})