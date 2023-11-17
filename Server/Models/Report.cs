using System;
using System.Collections.Generic;

namespace Treker.Models;

public partial class Report
{
    public int Id { get; set; }

    public int Tread { get; set; }

    public string Url { get; set; } = null!;

    public virtual Tread TreadNavigation { get; set; } = null!;
}
