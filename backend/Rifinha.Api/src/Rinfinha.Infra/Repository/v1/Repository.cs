using Rifinha.Domain.Models.Contracts.v1;

namespace Rinfinha.Infra.Repository.v1;
public class Repository<T> : IRepository<T> where T : class
{
    public Task<T> CreateAsync(T entity)
    {
        throw new NotImplementedException();
    }

    public Task<T> DeleteAsync(T entity)
    {
        throw new NotImplementedException();
    }

    public Task<T> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<T> UpdateAsync(T entity)
    {
        throw new NotImplementedException();
    }
}
