using System;
using System.Collections.Generic;

namespace Treker.Models;

public partial class Project
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public TimeOnly CreationDate { get; set; }

    public int Creator { get; set; }

    public virtual User CreatorNavigation { get; set; } = null!;

    public virtual ICollection<Tread> Treads { get; } = new List<Tread>();
}
