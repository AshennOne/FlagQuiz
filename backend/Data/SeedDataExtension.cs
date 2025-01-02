using FlagsQuizApi.Dtos;
using FlagsQuizApi.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FlagsQuizApi.Data
{
    public static class SeedDataExtension
    {
        public static async Task SeedDataAsync(this IServiceProvider services)
        {
            using (var scope = services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
                var jsonData = await File.ReadAllTextAsync("Data/json.json");
                var countries = JsonConvert.DeserializeObject<List<JsonCountryDto>>(jsonData);
                int i = 0;
                foreach (var country in countries)
                {
                    if (!context.Countries.Any(u => u.CommonName == country.Name.Common))
                    {
                        try
                        {
                            context.Countries.Add(new Country
                            {
                                CommonName = country.Name.Common,
                                FlagUrl = country.Flags.Svg,
                                Code = country.Cca2,
                                Capital = country.Capital[0]
                            });
                        }
                        catch (Exception)
                        {

                            throw new Exception($"Dupa: ${country.Name.Common}");
                        }
                        
                    }
                    Console.WriteLine(i);
                    i++;
                    
                }
                await context.SaveChangesAsync();
            }
        }
    }
}
