using FlagsQuizApi.Dtos;
using FlagsQuizApi.Entities;
using FlagsQuizApi.Interfaces;

namespace FlagsQuizApi.Services
{
    public class CountryService: ICountryService
    {
        private readonly ICountryRepository _countryRepository;
        public CountryService(ICountryRepository countryRepository) {
            _countryRepository = countryRepository;
        }
        
        public async Task<GuessCountryByFlagResponseDto> GetGuessCountryByFlagAsync(int countryId)
        {
            return await _countryRepository.GetGuessCountryByFlagAsync(countryId);
        }

        public async Task<IEnumerable<int>> GetIdsInRandomOrder()
        {
            return await _countryRepository.GetIdsInRandomOrder();
        }

        public string GetAnswer(int validCountryId)
        {
            return _countryRepository.GetAnswer(validCountryId);
        }

        public async Task<GuessCapitalResponseDto> GetGuessCapitalAsync(int countryId)
        {
            return await _countryRepository.GetGuessCapitalAsync(countryId);
        }
    }
}
