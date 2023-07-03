using Microsoft.AspNetCore.Mvc;
using PaylocityEmployeeBenefits.Models.Employees;
using PaylocityEmployeeBenefits.Models.Responses;
using PaylocityEmployeeBenefits.Services.Interfaces;

namespace PaylocityEmployeeBenefits.Controllers.Admin
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private IEmployeeService _employeeService;

        public EmployeeController(ILogger<EmployeeController> logger, IEmployeeService employeeService)
        {
            _logger = logger;
            _employeeService = employeeService;
        }

        [HttpGet("all")]
        public ActionResult<ItemsResponse<List<Employee>>> Get()
        {
            int iCode = 200;
            BaseResponse response;

            try
            {
                List<Employee>? employees = _employeeService.GetEmployeeData();

                if (employees == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No employees found.");
                }
                else
                {
                    response = new ItemsResponse<Employee>() { Items = employees, IsSuccessful = true };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                _logger.LogError(ex.Message);
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }
    }
}
