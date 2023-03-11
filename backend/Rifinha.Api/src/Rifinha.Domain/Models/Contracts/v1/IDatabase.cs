namespace Rifinha.Domain.Models.Contracts.v1;

public interface IDatabase<T> where T: class 
{
    public Task<T> GetAsync(int id);
    public Task<T> GetAsync();
    public Task<T> UpdateAsync(T entity);
    public Task<T> DeleteAsync(T entity);
    public Task<T> CreateAsync(T entity);
}
