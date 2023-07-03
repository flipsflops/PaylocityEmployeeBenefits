using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace PaylocityEmployeeBenefits.Models.Employees
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime DOB { get; set; }
        public string? DepartmentName { get; set; }
        public List<Dependent>? Dependents { get; set; }
    }
}
