using FlagsQuizApi.Data;
using FlagsQuizApi.Dtos;
using FlagsQuizApi.Entities;
using FlagsQuizApi.Interfaces;
using FlagsQuizApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FlagsQuizApi.Controllers
{
    [Route("api/quiz")]
    [ApiController]
    public class FlagQuizController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public FlagQuizController(ICountryService countryService)
        {
            _countryService = countryService;
        }
        
        [HttpGet("guess-country-by-flag/question/{countryId}")]
        public async Task<ActionResult<GuessCountryByFlagResponseDto>> GetGuessCountryByFlag(int countryId)
        {
            GuessCountryByFlagResponseDto countries = await _countryService.GetGuessCountryByFlagAsync(countryId);
            return Ok(countries);
        }

        [HttpGet("guess-capital/question/{countryId}")]
        public async Task<ActionResult<GuessCapitalResponseDto>> GetGuessCapital(int countryId)
        {
            GuessCapitalResponseDto countries = await _countryService.GetGuessCapitalAsync(countryId);
            return Ok(countries);
        }

        [HttpGet("chronology")]
        public async Task<ActionResult<IEnumerable<int>>> GetQuiestionsChronology()
        {
            IEnumerable<int> ids = await _countryService.GetIdsInRandomOrder();
            return Ok(ids);
        }

        [HttpGet("verify/{validCountryId}")]
        public ActionResult<string> GetAnswer([FromRoute] int validCountryId)
        {
            return _countryService.GetAnswer(validCountryId);
        }

        
    }

}
