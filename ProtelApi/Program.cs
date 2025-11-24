using Microsoft.EntityFrameworkCore;
using ProtelApi.Data;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer; // Añadir
using Microsoft.IdentityModel.Tokens;             // Añadir
using System.Text;                                // Añadir

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Ignora los ciclos de referencia en la serialización JSON (ej: Cliente -> Factibilidad -> Cliente)
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar el DbContext para MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ProtelDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
        mySqlOptions => mySqlOptions.EnableRetryOnFailure())); // Habilitar reintentos en caso de fallo de conexión

// --- Configuración JWT ---
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT Secret Key no configurada en appsettings.json");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = false,    // Para desarrollo, puedes ponerlo en true y configurar un Issuer
            ValidateAudience = false,  // Para desarrollo, puedes ponerlo en true y configurar una Audience
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero  // No permitir sesgos de tiempo
        };
    });
// --- Fin Configuración JWT ---

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // URL de la aplicación Angular
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

// --- Middleware de Autenticación ---
app.UseAuthentication(); // Añadir antes de UseAuthorization
// --- Fin Middleware de Autenticación ---

app.UseAuthorization();

app.MapControllers();

app.Run();
