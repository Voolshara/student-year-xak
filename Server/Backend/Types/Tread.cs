using Treker.Models;
using static Treker.Backend.Types.Enums;

namespace Treker.Backend.Types
{
    public class Tread
    {
        public Models.Tread tread { get; set; }

        public Task Add()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {
                        await db.Treads.AddAsync(this.tread);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while adding new tread\n{ex.Message}");
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

                        var tread = db.Treads.Where(trd => trd.Id == this.tread.Id).FirstOrDefault();
                        db.Update(tread).CurrentValues.SetValues(this.tread);
                        await db.SaveChangesAsync();

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while updating tread {this.tread.Id}\n{ex.Message}");
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

                        var tread = db.Treads.Where(trd => trd.Id == this.tread.Id).FirstOrDefault();
                        if (tread != null)
                            return;

                        this.tread = tread;

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting  tread {this.tread.Id}\n{ex.Message}");
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

                        var tread = db.Treads.Where(trd => trd.Id == this.tread.Id).FirstOrDefault();
                        db.Treads.Remove(tread);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting tread {this.tread.Id}\n{ex.Message}");
                    }

                }

            });
        }

        public List<Report> GetReports()
        {
            using (TrakerContext db = new TrakerContext())
            {
                try
                {
                    return (db.Reports.Where(report => report.Tread == this.tread.Id).ToList().Select(rp => new Types.Report { report = rp })).ToList();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error while geting reports in tread {this.tread.Id}\n{ex.Message}");
                }

            }
        }
        public TreadStatistics GetStatistics()
        {

            using (TrakerContext db = new TrakerContext())
            {
                try
                {
                    var trs = new TreadStatistics()
                    {
                        Ok_count = db.Treads.Where(tread => (TreadState)tread.State == TreadState.OK).ToList().Count,
                        Failed_count = db.Treads.Where(tread => (TreadState)tread.State == TreadState.FAILED).ToList().Count,
                        Impossible_count = db.Treads.Where(tread => (TreadState)tread.State == TreadState.IMPOSSIBLE).ToList().Count,
                        Skip_count = db.Treads.Where(tread => (TreadState)tread.State == TreadState.SKIP).ToList().Count,
                    };

                    return trs;

                }
                catch (Exception ex)
                {
                    throw new Exception($"Error while geting tread statistics in tread {this.tread.Id}\n{ex.Message}");
                }

            }


        }
        public User GetExecutor()
        {
            using (TrakerContext db = new TrakerContext())
            {
                try
                {
                    return db.Users.Where(user => user.Link == this.tread.Executor).Select(usr => new User() { user = usr }).FirstOrDefault();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error while geting executor in tread {this.tread.Id}\n{ex.Message}");
                }

            }
        }
        public User GetCreator()
        {
            using (TrakerContext db = new TrakerContext())
            {
                try
                {
                    return db.Users.Where(user => user.Id == this.tread.Creator).Select(usr => new User() { user = usr }).FirstOrDefault();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error while geting executor in tread {this.tread.Id}\n{ex.Message}");
                }

            }
        }
    }
}
