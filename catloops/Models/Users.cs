namespace catloops.Models;

public class Users
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string Role { get; set; } = "member"; // Default role is "member"
    public DateTime CreatedAt { get; set; }
    public required string Category { get; set; }
}