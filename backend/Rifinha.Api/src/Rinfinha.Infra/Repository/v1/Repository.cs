using Rifinha.Domain.Models.Contracts.v1;

namespace Rinfinha.Infra.Repository.v1;
public class Repository<T> : IRepository<T> where T : class
{
    private readonly IDatabase<T> _database;

    public Repository(IDatabase<T> database) => _database = database;   

    public Task<T> CreateAsync(T entity) => _database.CreateAsync(entity);

    public Task<T> DeleteAsync(T entity) => _database.DeleteAsync(entity);  

    public Task<T> GetAsync(int id) => _database.GetAsync(id);

    public Task<T> UpdateAsync(T entity) => _database.UpdateAsync(entity);  
}
