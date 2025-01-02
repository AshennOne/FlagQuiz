using FlagsQuizApi.Dtos;
using FlagsQuizApi.Entities;

namespace FlagsQuizApi.Interfaces
{
    public interface ICountryService
    {
        public Task<GuessCountryByFlagResponseDto> GetGuessCountryByFlagAsync(int countryId);
        public Task<IEnumerable<int>> GetIdsInRandomOrder();

        public string GetAnswer(int validCountryId);

        public Task<GuessCapitalResponseDto> GetGuessCapitalAsync(int countryId);
    }
}
