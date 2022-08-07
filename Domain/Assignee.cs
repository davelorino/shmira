using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Assignee
    {
        public Guid Id { get; set; }

        public string first_name { get; set; }

        public string second_name { get; set; }

        public string employment_contract_type { get; set; }

        public DateTime created_at { get; set; }

        public DateTime updated_at { get; set; }

        public string id_of_direct_report { get; set; }

        public ICollection<Project> projects { get; set; } = new List<Project>();

        public ICollection<Issue> issues {get; set; } = new List<Issue>();

    }
}