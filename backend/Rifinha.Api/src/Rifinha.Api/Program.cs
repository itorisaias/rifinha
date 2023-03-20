var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//auth google
//builder.Services.AddAuthentication()
//    .AddGoogle(googleOptions =>
//{
//    googleOptions.ClientId = "220084088476-f3reflgame0svjj35q4r7smg0po15ing.apps.googleusercontent.com";
//    googleOptions.ClientSecret = "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";
//});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
