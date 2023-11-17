using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Treker.Models;

public partial class TrakerContext : DbContext
{
    public TrakerContext()
    {
    }

    public TrakerContext(DbContextOptions<TrakerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Tread> Treads { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=traker;Username=postgres;Password=root;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("projects _pkey");

            entity.ToTable("projects ");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreationDate).HasColumnName("creation_date ");
            entity.Property(e => e.Creator).HasColumnName("creator");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");

            entity.HasOne(d => d.CreatorNavigation).WithMany(p => p.Projects)
                .HasForeignKey(d => d.Creator)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("projects _creator_fkey");
        });

        modelBuilder.Entity<Tread>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Tread_pkey");

            entity.ToTable("tread");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("nextval('\"Tread_id_seq\"'::regclass)")
                .HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .HasColumnName("comment");
            entity.Property(e => e.Creator).HasColumnName("creator");
            entity.Property(e => e.Parent).HasColumnName("parent");
            entity.Property(e => e.Project).HasColumnName("project");

            entity.HasOne(d => d.CreatorNavigation).WithMany(p => p.Treads)
                .HasForeignKey(d => d.Creator)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Tread_creator_fkey");

            entity.HasOne(d => d.ProjectNavigation).WithMany(p => p.Treads)
                .HasForeignKey(d => d.Project)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Tread_project_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Link, "users_link_link1_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Link)
                .HasMaxLength(255)
                .HasColumnName("link");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
