using Treker.Models;

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


    }
}
