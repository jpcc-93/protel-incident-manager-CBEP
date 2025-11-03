using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProtelApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ESTADO_CLIENTE",
                columns: table => new
                {
                    ID_ESTADO_CLIENTE = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ESTADO_CLIENTE", x => x.ID_ESTADO_CLIENTE);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ESTADO_FACTIBILIDAD",
                columns: table => new
                {
                    ID_ESTADO_FACTIBILIDAD = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ESTADO_FACTIBILIDAD", x => x.ID_ESTADO_FACTIBILIDAD);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CLIENTE",
                columns: table => new
                {
                    ID_CLIENTE = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NOMBRE = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DIRECCION = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TELEFONO = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EMAIL = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FECHA_CREACION = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FECHA_ACTUALIZACION = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ID_ESTADO_CLIENTE = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CLIENTE", x => x.ID_CLIENTE);
                    table.ForeignKey(
                        name: "FK_CLIENTE_ESTADO_CLIENTE_ID_ESTADO_CLIENTE",
                        column: x => x.ID_ESTADO_CLIENTE,
                        principalTable: "ESTADO_CLIENTE",
                        principalColumn: "ID_ESTADO_CLIENTE",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FACTIBILIDAD",
                columns: table => new
                {
                    ID_FACTIBILIDAD = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ID_CLIENTE = table.Column<int>(type: "int", nullable: false),
                    NOMBRE_PROYECTO = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DESCRIPCION = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UBICACION = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FECHA_SOLICITUD = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FECHA_RESPUESTA = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ID_ESTADO_FACTIBILIDAD = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FACTIBILIDAD", x => x.ID_FACTIBILIDAD);
                    table.ForeignKey(
                        name: "FK_FACTIBILIDAD_CLIENTE_ID_CLIENTE",
                        column: x => x.ID_CLIENTE,
                        principalTable: "CLIENTE",
                        principalColumn: "ID_CLIENTE",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FACTIBILIDAD_ESTADO_FACTIBILIDAD_ID_ESTADO_FACTIBILIDAD",
                        column: x => x.ID_ESTADO_FACTIBILIDAD,
                        principalTable: "ESTADO_FACTIBILIDAD",
                        principalColumn: "ID_ESTADO_FACTIBILIDAD",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CLIENTE_ID_ESTADO_CLIENTE",
                table: "CLIENTE",
                column: "ID_ESTADO_CLIENTE");

            migrationBuilder.CreateIndex(
                name: "IX_FACTIBILIDAD_ID_CLIENTE",
                table: "FACTIBILIDAD",
                column: "ID_CLIENTE");

            migrationBuilder.CreateIndex(
                name: "IX_FACTIBILIDAD_ID_ESTADO_FACTIBILIDAD",
                table: "FACTIBILIDAD",
                column: "ID_ESTADO_FACTIBILIDAD");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FACTIBILIDAD");

            migrationBuilder.DropTable(
                name: "CLIENTE");

            migrationBuilder.DropTable(
                name: "ESTADO_FACTIBILIDAD");

            migrationBuilder.DropTable(
                name: "ESTADO_CLIENTE");
        }
    }
}
