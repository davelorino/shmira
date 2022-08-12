import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Issue }from '../models/issue';
import {Container} from 'semantic-ui-react';
import { css } from 'styled-components';
import Icon from './Icon';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import './fontStyles.css';
import { NavLink } from 'react-router-dom';
import NavbarRight from './NavbarRight';
import Sidebar from './Sidebar';
import useApi from '../api';
import {v4 as uuid} from 'uuid';
import IssueDashboard from '../features/issues/dashboard/IssuesDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { is } from '../shared/utils/validation';

function App() {
  const [issues,setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Issues.list().then(response => {
      let issues: Issue[] = [];
       response.forEach((issue: Issue) => {
          issue.created_at = issue.created_at.split('T')[0]
          issues.push(issue);
       })
       setIssues(response);
       setLoading(false);
    })
  }, [])

function handleSelectIssue(id: string){
  setSelectedIssue(issues.find(x => x.id === id));
}

function handleCancelSelectIssue(){
  setSelectedIssue(undefined);
}

function handleFormOpen(id?: string) {
  id ? handleSelectIssue(id) : handleCancelSelectIssue();
  setEditMode(true);
}

function handleFormClose(id?: string) {
  setEditMode(false);
}

function handleCreateOrEditIssue(issue: Issue) {
  setSubmitting(true);
  if(issue.id) {
    agent.Issues.update(issue).then(() => {
      setIssues([...issues.filter(x => x.id !== issue.id), issue])
      setSelectedIssue(issue);
      setEditMode(false);
      setSubmitting(false);
    })
  } else {
    issue.id = uuid();
    agent.Issues.create(issue).then(() => {
      setIssues([...issues, issue]);
      setSelectedIssue(issue);
      setEditMode(false);
      setSubmitting(false);
    })
  }
}

function handleDeleteIssue(id: string) {
  setSubmitting(true);
  agent.Issues.delete(id).then(() => {
    setIssues([...issues.filter(x => x.id !== id)]);
    setSubmitting(false);
  })
  setIssues([...issues.filter(x => x.id !== id)]);
}

  //const [{ data, error, setLocalData }, fetchProject] = useApi.get('/project');

  //if (!data) return <PageLoader />;
  //if (error) return <PageError />;

  //const { project } = data;

  //const updateLocalProjectIssues = (issueId, updatedFields) => {
   // setLocalData(currentData => ({
   //   project: {
   //     ...currentData.project,
   //     issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
   //   },
   // }));
  //};


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

  backgroundDarkPrimary: '#0747A6',
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
height: 100vh;
width: ${sizes.appNavBarLeftWidth}px;
background: ${color.backgroundDarkPrimary};
transition: all 0.1s;
${mixin.hardwareAccelerate}
&:hover {
  width: 200px;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
}
`
const Item = styled.div`
  position: relative;
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding-left: 64px;
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

const ItemText = styled.div`
  position: relative;
  right: 12px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;
  ${font.bold}
  ${font.size(12)}
  ${NavLeft}:hover & {
    right: 0;
    visibility: visible;
    opacity: 1;
  }
`;

if (loading) return <LoadingComponent content='Loading...'/>

  return (
    <div >

    <NavbarRight openForm={handleFormOpen}/>
    <Container style={{marginTop: '7em'}}>
        <IssueDashboard 
        issues={issues}
        selectedIssue={selectedIssue}
        selectIssue={handleSelectIssue}
        cancelSelectIssue={handleCancelSelectIssue}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditIssue}
        deleteIssue={handleDeleteIssue}
        submitting={submitting}

        />
    </Container>
    </div>
  );
}

export default App;
