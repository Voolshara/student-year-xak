using Treker.Models;

namespace Treker.Backend.Types
{
    public class Report
    {
        public Models.Report report { get; set; }

        public Task Add()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {
                        await db.Reports.AddAsync(this.report);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while adding new report\n{ex.Message}");
                    }

                }

            });
        }

        public Task Update()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {

                        var report = db.Reports.Where(rep => rep.Id == this.report.Id).FirstOrDefault();
                        db.Update(report).CurrentValues.SetValues(this.report);
                        await db.SaveChangesAsync();

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while updating report {this.report.Id}\n{ex.Message}");
                    }

                }

            });

        }

        public Task Get()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {

                        var report = db.Reports.Where(rep => rep.Id == this.report.Id).FirstOrDefault();
                        if (report == null)
                            return;

                        this.report = report;

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting  report {this.report.Id}\n{ex.Message}");
                    }

                }

            });
        }

        public Task Delete()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {

                        var report = db.Reports.Where(rep => rep.Id == this.report.Id).FirstOrDefault();
                        db.Reports.Remove(report);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting report {this.report.Id}\n{ex.Message}");
                    }

                }

            });
        }


    }
}
