using Grpc.Core;

namespace Treker.Services.Project
{
    public class ProjectGetterService : ProjectGetter.ProjectGetterBase
    {
        public override Task<GetProjectResponse> GetProject(GetProjectRequest request, ServerCallContext context)
        {
            return base.GetProject(request, context);
        }

        public override Task<GetProjectTopicsResponse> GetProjectTopics(GetProjectTopicsRequest request, ServerCallContext context)
        {
            return base.GetProjectTopics(request, context);
        }
    }
}
