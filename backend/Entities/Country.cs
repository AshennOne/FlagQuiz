namespace FlagsQuizApi.Entities;
public class Country
{
    public int Id { get; set; }
    public required string FlagUrl { get; set; }
    public required string CommonName { get; set; }
    public required string Code { get; set; }
    public required string Capital { get; set; }
}
