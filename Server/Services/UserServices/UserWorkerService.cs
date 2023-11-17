using Grpc.Core;
using Treker;
using Treker.Backend.Types;
using Treker.Services.Project;

namespace Treker.Services.UserServices
{
    public class UserWorkerService : UserWorker.UserWorkerBase
    {
        private readonly ILogger<UserWorkerService> _logger;

        public UserWorkerService(ILogger<UserWorkerService> logger)
        {
            _logger = logger;
        }

        public override Task<RegistrationResponse> Registration(RegistrationRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Reg new user request");

            string state = "OK";
            int code = 200;
            var response = new RegistrationResponse();


            var user = new Backend.Types.User() { user = new Models.User() { Link = request.Link } };

            int user_id = user.Add().Result;

            response.State = state;
            response.Code = code;
            response.UserId = user_id;

            return Task.FromResult(response);
        }
    }
}
