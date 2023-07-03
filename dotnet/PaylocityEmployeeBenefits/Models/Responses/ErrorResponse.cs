namespace PaylocityEmployeeBenefits.Models.Responses
{
    public class ErrorResponse : BaseResponse
    {
        public List<String> Errors { get; set; }

        public ErrorResponse(Exception ex)
        {
            Errors = new List<string>();

            Errors.Add(ex.ToString());

            this.IsSuccessful = false;
        }

        public ErrorResponse(string errMsg)
        {
            Errors = new List<string>
            {
                errMsg
            };

            this.IsSuccessful = false;
        }
    }
}
