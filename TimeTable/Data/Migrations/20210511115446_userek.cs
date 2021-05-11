using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeTable.Data.Migrations
{
    public partial class userek : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Subject",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Location",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Lesson",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subject_ApplicationUserId",
                table: "Subject",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_ApplicationUserId",
                table: "Location",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Lesson_ApplicationUserId",
                table: "Lesson",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lesson_AspNetUsers_ApplicationUserId",
                table: "Lesson",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Location_AspNetUsers_ApplicationUserId",
                table: "Location",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Subject_AspNetUsers_ApplicationUserId",
                table: "Subject",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lesson_AspNetUsers_ApplicationUserId",
                table: "Lesson");

            migrationBuilder.DropForeignKey(
                name: "FK_Location_AspNetUsers_ApplicationUserId",
                table: "Location");

            migrationBuilder.DropForeignKey(
                name: "FK_Subject_AspNetUsers_ApplicationUserId",
                table: "Subject");

            migrationBuilder.DropIndex(
                name: "IX_Subject_ApplicationUserId",
                table: "Subject");

            migrationBuilder.DropIndex(
                name: "IX_Location_ApplicationUserId",
                table: "Location");

            migrationBuilder.DropIndex(
                name: "IX_Lesson_ApplicationUserId",
                table: "Lesson");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Subject");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Lesson");
        }
    }
}
