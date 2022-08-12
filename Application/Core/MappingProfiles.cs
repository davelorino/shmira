using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Application.Projects;
using Application.Issues;
using Application.Assignees;
using Application.Sprints;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Issue, Issue>();
            CreateMap<Assignee, Assignee>();
            CreateMap<Project, Project>();
            CreateMap<Sprint, Sprint>();
            CreateMap<Project, ProjectDto>();
            CreateMap<Issue, IssueDto>();
            CreateMap<IssueAssignee, AssigneeDto>();

            CreateMap<IssueAssignee, AssigneeDto>()
                .ForMember(d => d.first_name, o => o.MapFrom(s => s.Assignee.first_name))
                .ForMember(d => d.second_name, o => o.MapFrom(s => s.Assignee.second_name))
                .ForMember(d => d.email, o => o.MapFrom(s => s.Assignee.email))
                .ForMember(d => d.employment_contract_type, o => o.MapFrom(s => s.Assignee.employment_contract_type));
                
            CreateMap<SprintIssue, IssueDto>()
                .ForMember(d => d.name, o => o.MapFrom(s => s.Issue.name))
                .ForMember(d => d.description, o => o.MapFrom(s => s.Issue.description))
                .ForMember(d => d.description_text, o => o.MapFrom(s => s.Issue.description_text))
                .ForMember(d => d.priority, o => o.MapFrom(s => s.Issue.priority))
                .ForMember(d => d.original_estimated_duration, o => o.MapFrom(s => s.Issue.original_estimated_duration))
                .ForMember(d => d.assignees, o => o.MapFrom(s => s.Issue.assignees));

            CreateMap<ProjectSprint, SprintDto>()
                .ForMember(d => d.name, o => o.MapFrom(s => s.Sprint.name))
                .ForMember(d => d.description, o => o.MapFrom(s => s.Sprint.description))
                .ForMember(d => d.description_text, o => o.MapFrom(s => s.Sprint.description_text))
                .ForMember(d => d.priority, o => o.MapFrom(s => s.Sprint.priority))
                .ForMember(d => d.date_start, o => o.MapFrom(s => s.Sprint.date_start))
                .ForMember(d => d.date_end, o => o.MapFrom(s => s.Sprint.date_end))
                .ForMember(d => d.issues, o => o.MapFrom(s => s.Sprint.issues));

            CreateMap<Project, ProjectDto>()
                .ForMember(d => d.name, o => o.MapFrom(s => s.name))
                .ForMember(d => d.description, o => o.MapFrom(s => s.description))
                .ForMember(d => d.sprints, o => o.MapFrom(s => s.sprints))
                .ForMember(d => d.created_at, o => o.MapFrom(s => s.created_at))
                .ForMember(d => d.updated_at, o => o.MapFrom(s => s.updated_at));
                
            CreateMap<Sprint, SprintDto>();

        }
    }
}