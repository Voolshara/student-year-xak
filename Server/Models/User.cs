using System;
using System.Collections.Generic;

namespace Treker.Models;

public partial class User
{
    public int Id { get; set; }

    public string Link { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; } = new List<Project>();

    public virtual ICollection<Tread> TreadCreatorNavigations { get; } = new List<Tread>();

    public virtual ICollection<Tread> TreadExecutorNavigations { get; } = new List<Tread>();
}
