using Grpc.Core;
using Treker.Services.UserServices;

namespace Treker.Services.Project
{
    public class ProjectGetterService : ProjectGetter.ProjectGetterBase
    {
        private readonly ILogger<ProjectGetterService> _logger;

        public ProjectGetterService(ILogger<ProjectGetterService> logger)
        {
            _logger = logger;
        }
        public override Task<GetProjectResponse> GetProject(GetProjectRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Get project request");

            var response = new GetProjectResponse();
            string state = "OK";
            int code = 200;

            var project = new Backend.Types.Project() { project = new Models.Project() {Id = request.ProjectId } };
            try
            {
                project.Get().Wait();
                var creator = new Backend.Types.User() { user = new Models.User() { Id = project.project.Creator } }; 
                creator.Get().Wait();

                response.Title = project.project.Title;
                response.CreationDate = project.project.CreationDate.ToString();
                response.CreatorLink = creator.user.Link;

            }
            catch (Exception ex)
            {
                 state = "BUG";
                 code = 401;
                _logger.LogError($"Erorr in get Project by id\n{ex.Message}");
            }

            response.State = state;
            response.Code = code;



            return Task.FromResult(response);
        }

        public override Task<GetProjectTopicsResponse> GetProjectTopics(GetProjectTopicsRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Get project topics");


            var response = new GetProjectTopicsResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var project = new Backend.Types.Project()
                {
                    project = new Models.Project()
                    {
                        Id = request.ProjectId
                    }
                };

                var lst = project.GetRootTreads();

               // response.Titles.AddRange(lst.Select(item => item.tread.));


            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }


            return Task.FromResult(response);
        }
    }
}
