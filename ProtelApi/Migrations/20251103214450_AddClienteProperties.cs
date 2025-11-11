using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProtelApi.Migrations
{
    /// <inheritdoc />
    public partial class AddClienteProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DOCUMENTO",
                table: "CLIENTE",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "PERSONA_CONTACTO",
                table: "CLIENTE",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TIPO_CLIENTE",
                table: "CLIENTE",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DOCUMENTO",
                table: "CLIENTE");

            migrationBuilder.DropColumn(
                name: "PERSONA_CONTACTO",
                table: "CLIENTE");

            migrationBuilder.DropColumn(
                name: "TIPO_CLIENTE",
                table: "CLIENTE");
        }
    }
}
