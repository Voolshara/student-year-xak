using Grpc.Core;
using Treker;
using Treker.Backend.Types;

namespace Treker.Services.Project
{
    public class ProjectWorkerService : ProjectWorker.ProjectWorkerBase
    {
        private readonly ILogger<ProjectWorkerService> _logger;

        public ProjectWorkerService(ILogger<ProjectWorkerService> logger)
        {
            _logger = logger;
        }


        public override  Task<CreateProjectResponse> CreateProject(CreateProjectRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Create new project request");

            string state = "OK";
            int code = 200;
            int project_id = 0;
            var response = new CreateProjectResponse();

            try
            {
                var project = new Backend.Types.Project() { project = new Models.Project() 
                { 
                    Title = request.Title,
                    CreationDate = TimeOnly.FromDateTime(DateTime.Now), 
                    Creator = request.CreatorId }
                };

    

                try
                {
                    project_id =   project.Add().Result;
                }
                catch (Exception ex)
                {

                    code = 401;
                    state = "Error!";
                    project_id = -1;
                    _logger.LogError($"Error in add new project request\n{ex.Message}");

                }

                response.Code = code;
                response.ProjectId = project_id;
               
                response.State = state;

                return Task.FromResult(response);

            }
            catch (Exception ex)
            {
                code = 402;
                state = "Error!";
                project_id = -1;
                _logger.LogError($"Error in add new project request\n{ex.Message}");
            }

             return Task.FromResult(response);


        }

        public override Task<DeleteProjectResponse> DeleteProject(DeleteProjectRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Delete  project request");

            string state = "OK";
            int code = 200;
            var response = new DeleteProjectResponse(); 
            try
            {
                var project = new Backend.Types.Project()
                {
                    project = new Models.Project() {Id = request.ProjectId }
                };

                project.Delete();

                code = 200;
                state = "OK";

                response.Code = code;
                response.State = state;
                return Task.FromResult(response);
            }
            catch (Exception ex)
            {
                code = 401;
                state = $"Error!";

                response.Code = code;
                response.State = state;
                _logger.LogError($"Error in add new project request\n{ex.Message}");

            }
            return Task.FromResult(response);
        }
    }
}
