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

public static class MembershipEndPoints
{
    public static void MapMembershipEndPoints(this WebApplication app)
    {
        var memberships = app.MapGroup("/memberships");

        // Create Membership
        memberships.MapPost("/", async (CatloopsDbContext db, MembershipDTO dto, HttpContext httpContext) =>
        {
            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Results.Unauthorized();

            var userId = int.Parse(userIdClaim.Value);

            var membership = new Membership
            {
                UserId = userId,
                Category = dto.Category,
                Price = dto.Category.ToLower() == "student" || dto.Category.ToLower() == "senior" ? 60.00 : 75.00,
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            db.Memberships.Add(membership);
            await db.SaveChangesAsync();
            return Results.Created($"/memberships/{membership.Id}", membership);
        }).RequireAuthorization();

        // Get All Memberships
        memberships.MapGet("/", async (CatloopsDbContext db) =>
        {
            var allMemberships = await db.Memberships.ToListAsync();
            return Results.Ok(allMemberships);
        }).RequireAuthorization("AdminOnly");

        // Get Membership by Id
        memberships.MapGet("/{id}", async (CatloopsDbContext db, int id) =>
        {
            var membership = await db.Memberships.FindAsync(id);
            if (membership == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(membership);
        });

        // Get Memberships by Status
        memberships.MapGet("/status/{status}", async (CatloopsDbContext db, string status) =>
        {
            var memberships = await db.Memberships.Where(m => m.Status == status).ToListAsync();
            return Results.Ok(memberships);
        }).RequireAuthorization("AdminOnly");

        // Update Membership Status (Admin Only)
        memberships.MapPut("/{id}/activate", async (CatloopsDbContext db, int id, HttpContext httpContext) =>
        {
            var membership = await db.Memberships.FindAsync(id);
            if (membership == null)
            {
                return Results.NotFound();
            }

            membership.Status = "active";
            membership.ActivatedAt = DateTime.UtcNow;
            membership.NextPaymentDate = DateTime.UtcNow.AddMonths(1);
            membership.ActivatedBy = int.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            await db.SaveChangesAsync();
            return Results.Ok(membership);
        }).RequireAuthorization("AdminOnly");

        memberships.MapGet("/me", async (CatloopsDbContext db, HttpContext httpContext) =>
        {
            var userId = int.Parse(httpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var membership = await db.Memberships.FirstOrDefaultAsync(m => m.UserId == userId);
            if (membership == null) return Results.NotFound();
            return Results.Ok(membership);
        }).RequireAuthorization();

        // Cancel Membership
        memberships.MapDelete("/{id}", async (CatloopsDbContext db, int id) =>
        {

            var membership = await db.Memberships.FindAsync(id);
            if (membership == null)
            {
                return Results.NotFound();
            }
            else
            {
                membership.Status = "cancelled";
            }

            return Results.Ok(membership);
        });

        // Change Membership Category
        memberships.MapPut("/{id}", async (CatloopsDbContext db, int id, MembershipDTO dto) =>
        {
            var membership = await db.Memberships.FindAsync(id);
            if (membership == null)
            {
                return Results.NotFound();
            }

            membership.Category = dto.Category;
            membership.Price = dto.Category.ToLower() == "student" || dto.Category.ToLower() == "senior" ? 60.00 : 75.00;
            membership.NextPaymentDate = DateTime.UtcNow.AddMonths(1);
            membership.CreatedAt = DateTime.UtcNow;
            membership.Status = "pending";
            await db.SaveChangesAsync();
            return Results.Ok(membership);
        });
    }
}