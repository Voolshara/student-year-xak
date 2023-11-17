using System;
using System.Collections.Generic;

namespace Treker.Models;

public partial class Tread
{
    public int Id { get; set; }

    public int? Parent { get; set; }

    public int Creator { get; set; }

    public string? Comment { get; set; }

    public int Project { get; set; }

    public virtual User CreatorNavigation { get; set; } = null!;

    public virtual Project ProjectNavigation { get; set; } = null!;

    public virtual ICollection<Report> Reports { get; } = new List<Report>();
}
