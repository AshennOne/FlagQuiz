namespace FlagsQuizApi.Dtos
{
    public class GuessCapitalResponseDto
    {
        public required string CapitalName { get; set; }
        public required IEnumerable<string> CountryNames { get; set; }
        public required int RightAnswerCountryId { get; set; }
    }
}
