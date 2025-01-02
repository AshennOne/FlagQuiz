using FlagsQuizApi.Data;
using FlagsQuizApi.Dtos;
using FlagsQuizApi.Entities;
using FlagsQuizApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FlagsQuizApi.Repositories
{
    public class CountryRepository: ICountryRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Country> _dbSet;

        public CountryRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Country>();
        }

        public async Task<GuessCountryByFlagResponseDto> GetGuessCountryByFlagAsync(int countryId)
        {
            var specificCountry = await _dbSet
                .Where(f => f.Id == countryId)
                .FirstOrDefaultAsync();

            if(specificCountry == null)
            {
                throw new InvalidOperationException("Id not found");
            }

            var randomCountries = await  _dbSet
                .Where(c => c.Id != countryId)
                .OrderBy(r => Guid.NewGuid())
                .Take(3)
                .Select(r => r.CommonName)
                .ToListAsync();

            if(randomCountries.IsNullOrEmpty())
            {
                throw new InvalidOperationException("Countries Not Found");
            }

            return new GuessCountryByFlagResponseDto
            {
                CountryNames = randomCountries
                .Append(specificCountry.CommonName)
                .OrderBy(r => Guid.NewGuid()),
                FlagUrl = specificCountry.FlagUrl,
                RightAnswerCountryId = countryId!
            };
        }

        public async Task<GuessCapitalResponseDto> GetGuessCapitalAsync(int countryId)
        {
            var specificCountry = await _dbSet
                .Where(f => f.Id == countryId)
                .FirstOrDefaultAsync();

            if (specificCountry == null)
            {
                throw new InvalidOperationException("Id not found");
            }

            var randomCountries = await _dbSet
                .Where(c => c.Id != countryId)
                .OrderBy(r => Guid.NewGuid())
                .Take(3)
                .Select(r => r.CommonName)
                .ToListAsync();

            if (randomCountries.IsNullOrEmpty())
            {
                throw new InvalidOperationException("Countries Not Found");
            }

            return new GuessCapitalResponseDto
            {
                CountryNames = randomCountries
                .Append(specificCountry.CommonName)
                .OrderBy(r => Guid.NewGuid()),
                CapitalName = specificCountry.Capital,
                RightAnswerCountryId = countryId
            };
        }

        public async Task<IEnumerable<int>> GetIdsInRandomOrder()
        {
            return await _dbSet
                .Select(r => r.Id)
                .OrderBy(r => Guid.NewGuid())
                .ToListAsync();
        }

        public string GetAnswer(int validCountryId)
        {
            var validCountry = _dbSet.Where(r => r.Id == validCountryId).Select(r => r.CommonName).First();
            return validCountry.ToString();
        }
        
    }
}
