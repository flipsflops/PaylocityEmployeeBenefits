namespace PaylocityEmployeeBenefits.Models.Responses
{
    public class ItemsResponse<T> : BaseResponse
    {
        public List<T>? Items { get; set; }

        public ItemsResponse()
        {

        }

        public ItemsResponse(List<T> items)
        {
            this.Items = items;
        }
    }
}
