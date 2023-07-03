namespace PaylocityEmployeeBenefits.Models.Employees
{
    public class Dependent
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int EmployeeId { get; set; }
        public bool IsCovered { get; set; }
        public string? RelationshipType { get; set; }
    }
}
