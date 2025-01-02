using FlagsQuizApi.Interfaces;
using FlagsQuizApi.Repositories;
using FlagsQuizApi.Services;

namespace FlagsQuizApi.Configuration
{
    public static class Configuration
    {
        public static void ConfigureBuilderServices(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

        }
    }
}
