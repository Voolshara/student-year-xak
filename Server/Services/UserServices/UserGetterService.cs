using Grpc.Core;
using Treker.Models;

namespace Treker.Services.UserServices
{
    public class UserGetterService : UserGetter.UserGetterBase
    {
        private readonly ILogger<UserGetterService> _logger;

        public UserGetterService(ILogger<UserGetterService> logger)
        {
            _logger = logger;
        }
        public override Task<GetUserResponse> GetUser(GetUserRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Get User request");
            var response = new GetUserResponse();

            response.State = "OK";
            response.Code = 200;
            try
            {
                var user = new Backend.Types.User() { user = new Models.User() { Id = request.UserId } };
                user.Get().Wait();

                Console.WriteLine(user.user.Link==null);
                response.Link = user.user.Link;
            }
            catch (Exception ex) 
            {
                _logger.LogInformation($"Get User error!\n{ex}");

                response.State = "FUCK";
                response.Code = 401;

            }

            return Task.FromResult( response );
        }
    }
}
