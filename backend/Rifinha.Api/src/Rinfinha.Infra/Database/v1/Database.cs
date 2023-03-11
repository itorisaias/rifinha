using Rifinha.Domain.Models.Contracts.v1;
using Rinfinha.Infra.Context.v1;

namespace Rinfinha.Infra.Database.v1
{
    internal class Database<T> : IDatabase<T> where T : class
    {
        private readonly AppDbContext _db;

        public Database(AppDbContext db) => _db = db;

        public Task<T> CreateAsync(T entity)
        {
            try
            {
                var result = _db.Set<T>().Add(entity);
                _db.SaveChanges();
                return Task.FromResult(result.Entity);
            }
            catch (Exception e)
            {
                throw new ArgumentException($"Message error: {e.Message}");
            }
        }

        public Task<T> DeleteAsync(T entity)
        {
            try
            {
                var result = _db.Set<T>().Remove(entity);
                _db.SaveChanges();
                return Task.FromResult(result.Entity);
            }
            catch (Exception e)
            {
                throw new ArgumentException($"Message error: {e.Message}");
            }
        }

        public Task<T> GetAsync(int id)
        {
            try
            {
                var result = _db.Set<T>().Find(id);
                return Task.FromResult(result)!;
            }
            catch (Exception e)
            {
                throw new ArgumentException($"Message error: {e.Message}");
            }
        }

        public Task<T> UpdateAsync(T entity)
        {
            try
            {
                var result = _db.Set<T>().Update(entity);
                _db.SaveChanges();
                return Task.FromResult(result.Entity);
            }
            catch (Exception e)
            {
                throw new ArgumentException($"Message error: {e.Message}");
            }
            throw new NotImplementedException();
        }

        public Task<T> GetAsync()
        {
            throw new NotImplementedException();
        }
    }
}
