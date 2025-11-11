using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProtelApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueConstraintToDocumento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_CLIENTE_DOCUMENTO",
                table: "CLIENTE",
                column: "DOCUMENTO",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CLIENTE_DOCUMENTO",
                table: "CLIENTE");
        }
    }
}
