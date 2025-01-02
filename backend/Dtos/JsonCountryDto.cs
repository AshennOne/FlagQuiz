namespace FlagsQuizApi.Dtos
{

    public class FlagDto
    {
        public string Png { get; set; }
        public string Svg { get; set; }
        public string Alt { get; set; }
    }

    public class NameDto
    {
        public string Common { get; set; }
        public string Official { get; set; }
        public object nativeName { get; set; }
    }

    public class JsonCountryDto
    {
        public FlagDto Flags { get; set; }
        public NameDto Name { get; set; }
        public string Cca2 { get; set; }
        public List<string> Capital { get; set; }
    }

}
