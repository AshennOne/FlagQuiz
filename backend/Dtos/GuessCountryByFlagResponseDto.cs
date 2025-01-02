namespace FlagsQuizApi.Dtos
{
    public class GuessCountryByFlagResponseDto
    {
        public required string FlagUrl { get; set; }
        public required IEnumerable<string> CountryNames { get; set; }
        public required int RightAnswerCountryId { get; set; }

    }
}
