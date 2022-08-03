using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class FixedERD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assignees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    first_name = table.Column<string>(type: "TEXT", nullable: true),
                    second_name = table.Column<string>(type: "TEXT", nullable: true),
                    employment_contract_type = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    updated_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    id_of_direct_report = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assignees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    team_id = table.Column<string>(type: "TEXT", nullable: true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    description_text = table.Column<string>(type: "TEXT", nullable: true),
                    priority = table.Column<string>(type: "TEXT", nullable: true),
                    owner_id = table.Column<string>(type: "TEXT", nullable: true),
                    status = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    updated_at = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssigneeProject",
                columns: table => new
                {
                    assigneesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    projectsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssigneeProject", x => new { x.assigneesId, x.projectsId });
                    table.ForeignKey(
                        name: "FK_AssigneeProject_Assignees_assigneesId",
                        column: x => x.assigneesId,
                        principalTable: "Assignees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssigneeProject_Projects_projectsId",
                        column: x => x.projectsId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sprints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    description_text = table.Column<string>(type: "TEXT", nullable: true),
                    priority = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    updated_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    date_start = table.Column<DateTime>(type: "TEXT", nullable: false),
                    date_end = table.Column<DateTime>(type: "TEXT", nullable: false),
                    project_id = table.Column<string>(type: "TEXT", nullable: true),
                    status = table.Column<string>(type: "TEXT", nullable: true),
                    closing_summary = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sprints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sprints_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Issues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    description_text = table.Column<string>(type: "TEXT", nullable: true),
                    priority = table.Column<string>(type: "TEXT", nullable: true),
                    original_estimated_duration = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    currently_estimated_duration = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    time_logged = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    status = table.Column<string>(type: "TEXT", nullable: true),
                    created_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    updated_at = table.Column<DateTime>(type: "TEXT", nullable: false),
                    reporter_id = table.Column<string>(type: "TEXT", nullable: true),
                    team_id = table.Column<string>(type: "TEXT", nullable: true),
                    project_id = table.Column<string>(type: "TEXT", nullable: true),
                    reviewer_id = table.Column<string>(type: "TEXT", nullable: true),
                    sprint_id = table.Column<string>(type: "TEXT", nullable: true),
                    SprintId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Issues_Sprints_SprintId",
                        column: x => x.SprintId,
                        principalTable: "Sprints",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AssigneeIssue",
                columns: table => new
                {
                    assigneesId = table.Column<Guid>(type: "TEXT", nullable: false),
                    issuesId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssigneeIssue", x => new { x.assigneesId, x.issuesId });
                    table.ForeignKey(
                        name: "FK_AssigneeIssue_Assignees_assigneesId",
                        column: x => x.assigneesId,
                        principalTable: "Assignees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssigneeIssue_Issues_issuesId",
                        column: x => x.issuesId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssigneeIssue_issuesId",
                table: "AssigneeIssue",
                column: "issuesId");

            migrationBuilder.CreateIndex(
                name: "IX_AssigneeProject_projectsId",
                table: "AssigneeProject",
                column: "projectsId");

            migrationBuilder.CreateIndex(
                name: "IX_Issues_SprintId",
                table: "Issues",
                column: "SprintId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_ProjectId",
                table: "Sprints",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssigneeIssue");

            migrationBuilder.DropTable(
                name: "AssigneeProject");

            migrationBuilder.DropTable(
                name: "Issues");

            migrationBuilder.DropTable(
                name: "Assignees");

            migrationBuilder.DropTable(
                name: "Sprints");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
