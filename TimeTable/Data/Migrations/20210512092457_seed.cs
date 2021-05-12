using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeTable.Data.Migrations
{
    public partial class seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Location",
                columns: new[] { "LocationId", "ApplicationUserId", "Name" },
                values: new object[,]
                {
                    { 1, null, "Q1" },
                    { 2, null, "QA131" }
                });

            migrationBuilder.InsertData(
                table: "Subject",
                columns: new[] { "SubjectId", "ApplicationUserId", "Name" },
                values: new object[,]
                {
                    { 1, null, "Szoftverfejlesztés .NET platformra" },
                    { 2, null, "Szerver oldali Javascript" }
                });

            migrationBuilder.InsertData(
                table: "Lesson",
                columns: new[] { "LessonId", "ApplicationUserId", "DayOfWeek", "LessonNumber", "LocationId", "SubjectId" },
                values: new object[,]
                {
                    { 1, null, 2, 3, 1, 1 },
                    { 2, null, 2, 4, 1, 1 },
                    { 3, null, 4, 5, 2, 2 },
                    { 4, null, 4, 6, 2, 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Lesson",
                keyColumn: "LessonId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Lesson",
                keyColumn: "LessonId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Lesson",
                keyColumn: "LessonId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Lesson",
                keyColumn: "LessonId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Location",
                keyColumn: "LocationId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Location",
                keyColumn: "LocationId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Subject",
                keyColumn: "SubjectId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Subject",
                keyColumn: "SubjectId",
                keyValue: 2);
        }
    }
}
