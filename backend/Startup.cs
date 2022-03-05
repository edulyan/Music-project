using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using backend.Data.Models;
using Microsoft.Extensions.FileProviders;
using System.Linq;
using System.IO;

namespace backend
{
    public class Startup
    {

        public Startup(IConfiguration configuration){

            Configuration = configuration;

        }
        
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddCors();
            services.AddControllers(options => 
            {
                var jsonInputFormatter = options.InputFormatters
                .OfType<Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonInputFormatter>()
                .Single();
                jsonInputFormatter.SupportedMediaTypes.Add("application/csp-report");
            });
            // .AddNewtonsoftJson(options =>
            // {
            //     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //     // options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            // });
            services.AddDbContext<MusicDbContext>(options =>options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            // services.AddMvc(option => option.EnableEndpointRouting = false);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(options => 
                options.WithOrigins(
                    new string[]{
                        "http://localhost:4200"
                    }
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
            );

            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            });

            // app.UseHttpsRedirection();
            // app.UseMvc();
        }
    }
}
