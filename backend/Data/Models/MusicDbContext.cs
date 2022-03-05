using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Collections.Generic;

namespace backend.Data.Models {
  
  public class MusicDbContext : DbContext     
  {
    public MusicDbContext(DbContextOptions<MusicDbContext> options): base(options) {

    }       
    public DbSet<Track> Tracks { get; set; }
    public DbSet<Comment> Comments { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Track>()
            .HasMany(p => p.comments)
            .WithOne(t => t.tracks)
            .OnDelete(DeleteBehavior.Cascade);
    }
    
  }
}