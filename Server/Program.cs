using Treker;
using Treker.Services;
using Treker.Services.Project;
using Treker.Services.TreadServices;
using Treker.Services.UserServices;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGrpcService<ProjectGetterService>();
app.MapGrpcService<ProjectWorkerService>();
app.MapGrpcService<UserWorkerService>();
app.MapGrpcService<UserGetterService>();
app.MapGrpcService<TreadWorkerService>();
app.MapGrpcService<TreadGetterService>();


app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
