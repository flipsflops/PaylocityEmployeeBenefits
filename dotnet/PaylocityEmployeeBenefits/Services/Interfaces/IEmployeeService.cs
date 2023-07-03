using PaylocityEmployeeBenefits.Models.Employees;

namespace PaylocityEmployeeBenefits.Services.Interfaces
{
    public interface IEmployeeService
    {
        List<Employee>? GetEmployeeData();
    }
}