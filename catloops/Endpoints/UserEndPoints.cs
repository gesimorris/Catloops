using catloops.Data;
using catloops.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using catloops.DTOs;

namespace catloops.EndPoints;

public static class UserEndPoints
{
    public static void MapUserEndPoints(this WebApplication app)
    {
        var users = app.MapGroup("/users");

        // Register
        users.MapPost("/register", async (CatloopsDbContext db, RegisterDto dto) =>
        {
            var existing_user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existing_user != null)
            {
                return Results.BadRequest("Email already exists.");
            }

            var user = new Users
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                CreatedAt = DateTime.UtcNow,
                Category = dto.Category,
                Role = "member"
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();
            return Results.Created($"/users/{user.Id}", user);
        });

        // Login
        users.MapPost("/login", async (CatloopsDbContext db, LoginDto dto, IConfiguration config) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return Results.Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(config["Jwt:Key"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Results.Ok(new { Token = tokenString });
        });
        // Admin login
        users.MapPost("/seed-admin", async (CatloopsDbContext db) =>
        {
            var admin = new Users
                {
                    FirstName = "Admin",
                    LastName = "Catloops",
                    Email = "admin@catloops.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("temporarypassword123"),
                    Role = "admin",
                    CreatedAt = DateTime.UtcNow,
                    Category = "staff"
                };

            db.Users.Add(admin);
            await db.SaveChangesAsync();
            return Results.Ok("Admin created");
        });
    }
}