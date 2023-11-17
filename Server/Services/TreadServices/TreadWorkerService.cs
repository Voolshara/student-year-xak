using Grpc.Core;
using Treker.Backend.Types;
using Treker.Models;

namespace Treker.Services.TreadServices
{
    public class TreadWorkerService : TreadWorker.TreadWorkerBase
    {
        private readonly ILogger<TreadWorkerService> _logger;

        public TreadWorkerService(ILogger<TreadWorkerService> logger)
        {
            _logger = logger;
        }

        public override Task<AddReportResponse> AddReport(AddReportRequest request, ServerCallContext context)
        {

            _logger.LogInformation("Add Tread Report request");

            var response = new AddReportResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var report = new Backend.Types.Report()
                {
                    report = new Models.Report()
                    {
                        Tread = request.TreadId
                    }
                };

                report.Add();

            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }

            response.State = state;
            response.Code = code;
            return Task.FromResult(response);
        }

        public override Task<AtachExecutorResponse> AtachExecutor(AtachExecutorRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Atach Tread Executor request");

            var response = new AtachExecutorResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var tread = new Backend.Types.Tread()
                {
                    tread = new Models.Tread()
                    {
                        Id = request.TreadId
                    }
                };
                var creator = new Backend.Types.User() { user = new Models.User() { Id = request.UserId } };
                creator.Get().Wait();

                tread.tread.Executor = creator.user.Link;
                tread.Update();

            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }

            response.State = state;
            response.Code = code;
            return Task.FromResult(response);
        }

        public override Task<ChangeCommentResponse> ChangeComment(ChangeCommentRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Change Tread Comment request");

            var response = new ChangeCommentResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var tread = new Backend.Types.Tread()
                {
                    tread = new Models.Tread()
                    {
                        Id = request.TreadId
                    }
                };

                tread.tread.Comment = request.Comment;
                tread.Update();

            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }

            response.State = state;
            response.Code = code;
            return Task.FromResult(response);
        }

        public override Task<ChangeStateResponse> ChangeState(ChangeStateRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Change Tread State request");

            var response = new ChangeStateResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var tread = new Backend.Types.Tread()
                {
                    tread = new Models.Tread()
                    {
                        Id = request.TreadId
                    }
                };

                tread.tread.State = request.State;
                tread.Update();

            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }

            response.State = state;
            response.Code = code;
            return Task.FromResult(response);
        }

        public override Task<ChangeTagResponse> ChangeTag(ChangeTagRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Change Tread Tag request");

            var response = new ChangeTagResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var tread = new Backend.Types.Tread()
                {
                    tread = new Models.Tread()
                    {
                        Id = request.TreadId
                    }
                };

                tread.tread.Tag = request.Tag;
                tread.Update();

            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }

            response.State = state;
            response.Code = code;
            return Task.FromResult(response);
        }

        public override Task<CreateTreadResponse> CreateTread(CreateTreadRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Create new Tread request");

            var response = new CreateTreadResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var tread = new Backend.Types.Tread()
                {
                    tread = new Models.Tread()
                    {
                        Project = request.ProjectId,
                        Creator = request.UserId,
                        Parent = request.Parent == 0 ? null : request.Parent,
                        Title = request.Title
                    }
                };


                tread.Add();
            }
            catch (Exception ex)
            {
                code = 401;
                state = $"ERORR!\n{ex.Message}";
            }

            response.State = state;
            response.Code = code;
            return Task.FromResult(response);
        }

        public override Task<DeleteTreadResponse> DeleteTread(DeleteTreadRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Delete Tread request");

            var response = new DeleteTreadResponse();
            int code = 200;
            string state = "OK";

            try
            {
                var tread = new Backend.Types.Tread()
                {
                    tread = new Models.Tread()
                    {
                        Id = request.TreadId
                    }
                };

                tread.Delete();

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
