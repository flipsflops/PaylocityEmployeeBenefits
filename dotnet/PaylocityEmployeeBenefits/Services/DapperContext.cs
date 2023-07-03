using Dapper;
using System.Data.SqlClient;

namespace PaylocityEmployeeBenefits.Services
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection");
        }

        internal SqlConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public IEnumerable<T> Query<T>(string sql, object? parameters = null)
        {
            using (SqlConnection connection = CreateConnection())
            {
                connection.Open();
                return connection.Query<T>(sql, parameters);
            }
        }

        public int Execute(string sql, object? parameters = null)
        {
            using (SqlConnection connection = CreateConnection())
            {
                connection.Open();
                return connection.Execute(sql, parameters);
            }
        }
    }
}
