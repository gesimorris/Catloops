namespace catloops.Models;

public class Membership
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string Category { get; set; }
    public double Price { get; set; }
    public string Status { get; set; } = "pending"; // Default to pending
    public int? ActivatedBy { get; set; } // Nullable, not set until admin activates
    public DateTime? ActivatedAt { get; set; } // Nullable
    public DateTime CreatedAt { get; set; }
    public DateTime? NextPaymentDate { get; set; } // Nullable until activated
    public Users? User { get; set; }
}