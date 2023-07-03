using Dapper;
using PaylocityEmployeeBenefits.Models.Dapper;
using PaylocityEmployeeBenefits.Models.Employees;
using PaylocityEmployeeBenefits.Services.Interfaces;
using System.Data;

namespace PaylocityEmployeeBenefits.Services.Employees
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DapperContext _context;
        private readonly ILogger<EmployeeService> _logger;

        public EmployeeService(DapperContext context, ILogger<EmployeeService> logger)
        {
            _context = context;
            _logger = logger;
        }
        public List<Employee>? GetEmployeeData()
        {
            List<Employee>? employees = null;

            try
            {
                SqlMapper.AddTypeHandler(typeof(List<Dependent>), new JsonTypeHandler());

                string storedProcedureName = "[dbo].[Employee_With_Dependent_Select]";

                using var connection = _context.CreateConnection();

                var res = connection.Query<Employee>(storedProcedureName, commandType: CommandType.StoredProcedure);
                employees = res.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return employees;
        }
    }
}
