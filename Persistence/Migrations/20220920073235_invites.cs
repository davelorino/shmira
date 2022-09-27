using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class invites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invites",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    inviter_account_id = table.Column<string>(type: "TEXT", nullable: true),
                    invitee_account_email = table.Column<string>(type: "TEXT", nullable: true),
                    project_to_collaborate_on_id = table.Column<string>(type: "TEXT", nullable: true),
                    invitation_status = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invites");
        }
    }
}
