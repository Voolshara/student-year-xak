
using Grpc.Core;
using Treker.Models;
namespace Treker.Services.TreadServices
{
    public class TreadGetterService : TreadGetter.TreadGetterBase
    {
        private readonly ILogger<TreadGetterService> _logger;

        public TreadGetterService(ILogger<TreadGetterService> logger)
        {
            _logger = logger;
        }

        public override Task<GetTreadReportsResponse> GetReports(GetTreadReportsRequest request, ServerCallContext context)
        {

            _logger.LogInformation("Get Tread Reports request");

            var response = new GetTreadReportsResponse();
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

                var lst = tread.GetReports();

                response.Reports.AddRange(lst.Select(item => new Report() { ReportId = item.report.Id, Url = item.report.Url }));


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

        public override Task<TreadResponse> GetTread(GetTreadRequest request, ServerCallContext context)
        {
            _logger.LogInformation("Get Tread Reports request");

            var response = new TreadResponse();
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


                tread.Get().Wait();




                response.Parent = (tread.tread.Parent == null ? 0 : (int)tread.tread.Parent);
                response.Creator = tread.tread.Creator;
                response.Title = tread.tread.Title;
                response.Comment = tread.tread.Comment;
                response.Project = tread.tread.Project;
                response.State = tread.tread.State;
                response.Tag = tread.tread.Tag;
                response.Executor = tread.tread.Executor;

                response.SubTreads.AddRange(tread.GetSubTreads().Select(x => x.tread.Id));
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
