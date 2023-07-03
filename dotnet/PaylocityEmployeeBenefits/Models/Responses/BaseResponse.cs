namespace PaylocityEmployeeBenefits.Models.Responses
{
    public abstract class BaseResponse
    {
        public bool IsSuccessful { get; set; }

        public string? TransactionId { get; set; }
    }
}
