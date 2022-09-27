import { makeAutoObservable, runInAction } from 'mobx';
import { useHistory } from 'react-router-dom';
import { Issue } from '../models/issue';
import { Sprint } from '../models/sprint';
import { Assignee } from '../models/assignee';
import { Project } from '../models/project';
import { ProjectSprintAndBacklog } from '../models/projectSprintAndBacklog';
import { SprintIssue } from '../models/sprintissue';
import { IssueAssignee } from '../models/issueAssignee';
import { store } from './store';
import agent from '../api/agent';
import {v4 as uuid} from 'uuid';


export default class IssueStore {
    projectRegistry = new Map<string, Project>();
    sprintRegistry = new Map<string, Sprint>();
    issueRegistry = new Map<string, Issue>();
    relevant_sprints = new Map<string, Sprint>();
    selectedProject: Project | undefined = undefined;
    filteredProject: any = undefined;
    tempProject: any = undefined;
    activeUsers: string[] = [];
    selectedIssue: Issue | undefined = undefined;
    selectedSprint: Sprint | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    searchFilter = '';

    

    constructor() {
        makeAutoObservable(this)
    }

    get issuesByDate() {
        return Array.from(this.issueRegistry.values())
    }

    get allProjects() {
        return Array.from(this.projectRegistry.values());
    }

    get allSprints() {
        return Array.from(this.sprintRegistry.values());
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private setIssue = (issue: Issue) => {
        this.issueRegistry.set(issue.id, issue);
    }

    

    loadIssues = async () => {
        try {
           const issues = await agent.Issues.list();
           runInAction(() => {
            
            issues.map((issue: Issue, index: number) => {
                //issue.sort_order = 0;
                this.issueRegistry.set(issue.id, issue);
           })
         })
         //this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            //this.setLoadingInitial(false);
        }
    }

    loadProjectsInitial = async () => {
        try {
            const projects = await agent.Projects.list();
            runInAction(() => {
                projects.forEach((project: Project) => {
                    this.projectRegistry.set(project.id, project);
                })
                if(window.localStorage.getItem('selected_project_id') !== null){
                    this.selectProject(window.localStorage.getItem('selected_project_id')!)
                } else {
                    this.selectProject(projects[0].id);
                }
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadProjects = async () => {
        try {
            const projects = await agent.Projects.list();
            runInAction(() => {
                projects.forEach((project: Project) => {
                    this.projectRegistry.set(project.id, project);
                })
                //this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadProject = async (id: string) => {
        try {
            const project = await agent.Projects.details(id);
            runInAction(() => {
                this.projectRegistry.set(project.id, project);
                project.sprints.map((sprint: any) => {
                    if(sprint.is_active){
                        sprint.issues.map((issue: any) => {
                            console.log("Loaded sort order");
                            console.log(issue.name);
                            console.log(issue.sort_order);
                        })
                    }
                })
                //this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            //this.setLoadingInitial(false);
        }
    }

    loadSprints = async () => {
        try {
            const sprints = await agent.Sprints.list();
            runInAction(() => {
                sprints.forEach((sprint: Sprint) => {
                    this.sprintRegistry.set(sprint.id, sprint);
                })
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }




    updateRelevantIssues = (relevant_sprints: Sprint[]) => {
        console.log("update relevant issues triggered")
        
        runInAction(() => {
            this.issueRegistry.clear();
            relevant_sprints.map((sprint) => {
                sprint.issues.map((issue, index) => {
                    /*
                    if(issue.sort_order == 0){
                        if(issue.status == "To Do"){
                            issue.sort_order = index;
                        }
                        if(issue.status == "In Progress"){
                            issue.sort_order = parseInt('20'.concat(index.toString()));
                        }
                        if(issue.status == "Review"){
                            issue.sort_order = parseInt('300'.concat(index.toString()));
                        }
                        if(issue.status == "Done"){
                            issue.sort_order = parseInt('4000'.concat(index.toString()));
                        }
                    
                    }
                    */
                    //console.log("Updated sort order");
                    //console.log(issue.sort_order);
                    this.issueRegistry.set(issue.id, issue);
                    
                })
            })
        })
        
    }

    filterProject = async () => {
        await this.loadProject(this.selectedProject!.id);
        runInAction(() => {
            console.log("Search filter =");
            console.log(this.searchFilter);
            console.log("Search filter length =");
            console.log(this.searchFilter.length);
            if(this.activeUsers.length > 0){
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                var sprints: Sprint[] = [];
                if(this.searchFilter.length > 0){
                    current_project!.sprints!.map(sprint => {
                        var issues: Issue[] = [];
                        if(sprint.is_active){
                            sprint.issues.map(issue => {
                                var assignees = issue.assignees.filter(assignee => this.activeUsers.includes(assignee.id));
                                if(assignees.length > 0){
                                    if(issue.name.toLowerCase().includes(this.searchFilter.toLowerCase())){
                                        issues.push(issue);
                                    }
                                }
                            })
                        }
                            sprint.issues = issues;
                            sprints.push(sprint);
                        })
                } else {
                    current_project!.sprints!.map(sprint => {
                        var issues: Issue[] = [];
                        if(sprint.is_active){
                            sprint.issues.map(issue => {
                                var assignees = issue.assignees.filter(assignee => this.activeUsers.includes(assignee.id));
                                if(assignees.length > 0){
                                    issues.push(issue);
                                }
                            })
                        }
                            sprint.issues = issues;
                            sprints.push(sprint);
                        })
                }        
                    this.tempProject.sprints = sprints;
                    this.selectedProject = this.tempProject;
        }
        else if(this.searchFilter.length > 0){
            console.log("Search filter length is greater than zero");
            var project_id = this.selectedProject!.id;
            var current_project = this.projectRegistry.get(project_id);
            this.tempProject = current_project;
            var sprints: Sprint[] = [];
            
            current_project!.sprints!.map(sprint => {
                var issues: Issue[] = [];
                if(sprint.is_active){
                    sprint.issues.map(issue => {             
                        if(issue.name.toLowerCase().includes(this.searchFilter.toLowerCase())){
                            console.log("Found a matching issue");
                            console.log(issue);
                            issues.push(issue);
                        }
                    })
                }
                    sprint.issues = issues;
                    sprints.push(sprint);
                })
                this.tempProject.sprints = sprints;
                this.selectedProject = this.tempProject;
        }
        else{
            var project_id = this.selectedProject!.id;
            //this.loadProjects();
            this.selectedProject = this.projectRegistry.get(project_id);
        }
    })
    }

    updateActiveUsers = (user_ids: any) => {
        user_ids.map((user_id: any) => {
            var found = 0;
            var index = 0;  
            for(var i in this.activeUsers){
                if(this.activeUsers[i] === user_id){
                    found = 1;
                    index = this.activeUsers.indexOf(i);
                }
            }
            if(found === 1){
                console.log("Found");
                this.activeUsers = this.activeUsers.filter(user => user !== user_id)
            }
            if(found === 0){
                console.log("Not found");
                this.activeUsers.push(user_id);
            }      
        })
    }

    updateRelevantSprints = (selectedProject: Project) => {
        runInAction(() => {
            this.sprintRegistry.clear();
            var relevant_sprints: Sprint[] = []
            selectedProject.sprints.forEach(sprint => {
                relevant_sprints.push(sprint);
                this.sprintRegistry.set(sprint.id, sprint);
            })
            console.log("Update relevant sprints triggered");
            this.updateRelevantIssues(relevant_sprints);
        })

    }

    selectProject = (project_id: string) => {
        runInAction(() => {
            this.loadProjects();
            this.selectedProject = this.projectRegistry.get(project_id);
            if(this.selectedProject !== undefined){
                window.localStorage.setItem('selected_project_id', this.selectedProject.id);
                this.updateRelevantSprints(this.selectedProject!);
            }  
        })
    }

    
    selectIssue = (id: string) => {
        this.selectedIssue = this.issueRegistry.get(id);
    }

    selectSprint = (id: string) => {
        this.selectedSprint = this.sprintRegistry.get(id);
    }

    cancelSelectedIssue = () => {
        this.selectedIssue = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectIssue(id) : this.cancelSelectedIssue();
        //this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    addIssueToSprint = async (id: string, sprint_issue: SprintIssue) => {
        this.loading = true;
        try {
            await agent.Sprints.addIssueToSprint(id, sprint_issue);
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    reloadSelectedProject = async () => {
        var project_id = this.selectedProject!.id;
        await this.loadProjects();
        runInAction(() => {
            this.selectProject(project_id);
            this.loading = false;
        })
    }

    refreshProjectStateCloseModal = async () => {
        try {
            await this.loadProjects();
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error);
        }
    }
   

    createIssue = async (issue: Issue, sprint_id: string, sprint_issue: SprintIssue, issue_assignees: IssueAssignee[]) => {
        this.loading = true;
        try {
            await agent.Issues.create(issue);
            await agent.Sprints.addIssueToSprint(sprint_id, sprint_issue);
            await agent.Issues.addAssigneesToIssue(issue_assignees);
            await this.loadProjects();
            runInAction(() => {
                var current_project = this.projectRegistry.get(this.selectedProject!.id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                
                this.selectedProject!.sprints.map((sprint: Sprint) => {
                    if(sprint.id.toLowerCase() === sprint_issue.sprint_id.toLowerCase()){
                        var the_issue = sprint.issues.find((current_issue: Issue) => current_issue.id.toLowerCase() === issue.id.toLowerCase());
                        var issue_to_pass: any = {
                            ...the_issue
                        }
                        this.issueRegistry.set(issue_to_pass.id, issue_to_pass);
                    }
                })
                
                this.loading = false;
                store.modalStore.closeModal();
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                store.modalStore.closeModal();
                })
        }
    }

    createIssueFrontEnd = (issue: Issue, sprint_id: string) => {
        var project_id = this.selectedProject!.name;
        this.loadProjects();
        var current_project = this.projectRegistry.get(project_id);

        this.tempProject = current_project;
        this.selectedProject! = this.tempProject;

        var sprints: Sprint[] = [];
        current_project!.sprints.map(sprint => {
            if(sprint.id.toLowerCase() === sprint_id.toLowerCase()){
                sprint.issues.push(issue);
            }
            sprints.push(sprint);
        })
        this.tempProject.sprints = sprints;
        this.selectedProject! = this.tempProject;
    }

    removeAssigneeFromIssueFrontend = async (sprint_id: string, assignee_id: string) => {
        var project_id = this.selectedProject!.id;
        await this.loadProjects();
        runInAction(() => { 
        
            var current_project = this.projectRegistry.get(project_id);
            this.tempProject = current_project;
            this.selectedProject! = this.tempProject;

            var sprints: Sprint[] = [];
            current_project!.sprints.map(sprint => {
                var issues: Issue[] = [];
                if(sprint.id === sprint_id){
                    sprint.issues.map(issue => {
                        if(issue.id.toLowerCase() === this.selectedIssue!.id.toLowerCase()){
                            var assignees: Assignee[] = [];
                            issue.assignees.map(assignee => {
                                if(assignee.id.toLowerCase() !== assignee_id.toLowerCase()){
                                    assignees.push(assignee);
                                }
                            })
                            issue.assignees = assignees;
                        }
                        issues.push(issue);
                    })
                    sprint.issues = issues;
                }
                sprints.push(sprint);
            })
            this.tempProject!.sprints = sprints;
            this.selectedProject! = this.tempProject;
        })
    }

    removeAssigneeFromIssue = async (issue_assignee: IssueAssignee) => {
        this.loading = true;
        try {
            await agent.Issues.removeAssigneeFromIssue(issue_assignee);
            await this.loadProjects();
            await this.loadIssues();
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


    addAssigneeToIssue = async (issue_assignee: IssueAssignee) => {
        this.loading = true;
        try {
            await agent.Issues.addAssigneeToIssue(issue_assignee);
            await this.loadProjects();
            await this.loadIssues();
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    createProject = async (project: Project, project_sprint: any, project_assignees: any) => {
        this.loading = true;
        try {
            await agent.Projects.create(project);
            await agent.Projects.addSprintToProject(project_sprint);
            await agent.Projects.addAssigneesToProject(project_assignees);
            runInAction(() => {
                this.loadProjects();
                this.loadSprints();
                this.loadIssues();
                this.editMode = false;
                this.loading = false;
                store.modalStore.closeModal();
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    createSprint = async (sprint: Sprint, project_sprint: any) => {
        this.loading = true;
        try {
            await agent.Sprints.create(sprint);
            await agent.Projects.addSprintToProject(project_sprint);
            await this.loadProjects();
            await this.loadSprints();
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                var current_sprint = this.sprintRegistry.get(sprint.id);
                this.sprintRegistry.set(sprint.id, current_sprint!);
                store.smallModalStore.closeSmallModal();
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateSprint = async (sprint: Sprint) => {
        this.loading = true;
        try {
            await agent.Sprints.update(sprint);
            await this.loadProject(this.selectedProject!.id);
            runInAction(() => {
                this.sprintRegistry.set(sprint.id, sprint);
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateIssueAndSprint = async (
        source_sprint_id: string,
        destination_sprint_id: string,
        issue_name: string,
        issue_id: string,
        issue: Issue
    ) => {
        this.loading = true;
        var issue_to_send: any = {
            ...issue
        }
        delete issue_to_send['assignees'];
        delete issue_to_send['created_at'];
        delete issue_to_send['updated_at'];
        var issue_to_update: any = {
            issue: issue_to_send,
            source_sprint_id: source_sprint_id,
            destination_sprint_id: destination_sprint_id,
            issue_name: issue_to_send.name,
            issue_id: issue_to_send.id
        }
        try {
            await agent.Sprints.moveIssueToDifferentSprint(issue_to_update)
            await this.loadIssues();
            await this.loadProject(this.selectedProject!.id);
            runInAction(() => {                
            var project_id = this.selectedProject!.id;
            var current_project = this.projectRegistry.get(project_id);
            this.tempProject = current_project;
            this.selectedProject! = this.tempProject;
            this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;      
            })
        }
    }

    closeSprintAndPushIssuesToBacklog = async (project_sprint: ProjectSprintAndBacklog) => {
        this.loading = true;
        try {
            await agent.Sprints.closeSprintAndMoveIssuesToBacklog(project_sprint);
            await this.loadProject(this.selectedProject!.id);
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                store.modalStore.closeModal();
                this.loading = false;
            })
        } catch  (error) {
            console.log(error);
            this.loading = false;
        }
    }

    getIssue = async (issueId: string) => {
        this.loading = true;
        try {
            await agent.Issues.details(issueId);
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateIssue = async (issue: Issue) => {
        this.loading = true;
        var issueToSend: any = {
            ...issue
        }
        delete issueToSend['assignees'];
        try {
            await agent.Issues.update(issueToSend);
            await this.loadProject(this.selectedProject!.id);
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateIssues = async (issuesToSend: any[]) => {
        this.loading = true;
        console.log("issuesToSend =");
        console.log(issuesToSend);
        try {
            await agent.Issues.updateMultiple(issuesToSend);
            await this.loadProject(this.selectedProject!.id);
            runInAction(() => {
                var project_id = this.selectedProject!.id;
                var current_project = this.projectRegistry.get(project_id);
                this.tempProject = current_project;
                this.selectedProject! = this.tempProject;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteIssue = async (id: string) => {
        this.loading = true;
        try {
            await agent.Issues.delete(id);
            runInAction(() => {
                this.issueRegistry.delete(id);
                if (this.selectedIssue?.id === id) this.cancelSelectedIssue();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}