using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

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
        }
    }
}