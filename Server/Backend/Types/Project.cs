using Treker.Models;

namespace Treker.Backend.Types
{
    public class Project
    {
        public Models.Project project { get; set; }
        public Task Add()
        {
            return Task.Run(async () =>
            {
                using (TrakerContext db = new TrakerContext())
                {
                    try
                    {
                        await db.Projects.AddAsync(this.project);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while adding new project\n{ex.Message}");
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

                        var project = db.Projects.Where(proj => proj.Id == this.project.Id).FirstOrDefault();
                        db.Update(project).CurrentValues.SetValues(this.project);
                        await db.SaveChangesAsync();

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while updating project {this.project.Id}\n{ex.Message}");
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

                        var project = db.Projects.Where(proj => proj.Id == this.project.Id).FirstOrDefault();
                        if (project != null)
                            return;

                        this.project = project;

                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting  project {this.project.Id}\n{ex.Message}");
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

                        var project = db.Projects.Where(proj => proj.Id == this.project.Id).FirstOrDefault();
                        db.Projects.Remove(project);
                        await db.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Error while geting project {this.project.Id}\n{ex.Message}");
                    }

                }

            });
        }

    }
}
