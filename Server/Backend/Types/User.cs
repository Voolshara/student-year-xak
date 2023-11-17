using Treker.Models;

namespace Treker.Backend.Types
{
    public class User
    {
        public Models.User user { get; set; }

        public Task<int> Add()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {
                        var add_obj = await db.Users.AddAsync(this.user);
                        await db.SaveChangesAsync();

                        return add_obj.Entity.Id;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while adding new user\n{ex.Message}");
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

                        var user = db.Users.Where(user => user.Link == this.user.Link || user.Id == this.user.Id).FirstOrDefault();
                        db.Update(user).CurrentValues.SetValues(this.user);
                        await db.SaveChangesAsync();

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while updating user {this.user.Link}\n{ex.Message}");
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

                        var user = db.Users.Where(user => user.Link == this.user.Link || user.Id == this.user.Id).FirstOrDefault();
                        if (user != null)
                            return;

                        this.user = user;

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting user {this.user.Link}\n{ex.Message}");
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

                        var user = db.Users.Where(user => user.Link == this.user.Link || user.Id == this.user.Id).FirstOrDefault();
                        db.Users.Remove(user);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting user {this.user.Link}\n{ex.Message}");
                    }

                }

            });
        }

        
    }
}
