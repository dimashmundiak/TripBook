﻿using Microsoft.EntityFrameworkCore;

namespace TripBook.API.Entities
{
    public class TripBookContext : DbContext
    {
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=TripBookDb;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPlace>()
                .HasKey(t => new { t.UserId, t.PlaceId });

            modelBuilder.Entity<UserPlace>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.UserPlaces)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<UserPlace>()
                .HasOne(pt => pt.Place)
                .WithMany(t => t.UserPlaces)
                .HasForeignKey(pt => pt.PlaceId);
        }
    }
}
