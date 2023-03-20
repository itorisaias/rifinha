using Rifinha.Domain.Models.Contracts.v1;
using Rifinha.Domain.Models.Entities.v1;

namespace Rifinha.Domain.Services.v1
{
    public class CustumerServices : ICostumerServices
    {
        private readonly IRepository<Custumer> _repository;
        public CustumerServices(IRepository<Custumer> repository)
        {
            _repository = repository;
        }

        public Task<Custumer> CreateAsync(Custumer entity)
        {
            return _repository.CreateAsync(entity);
        }

        public Task<Custumer> DeleteAsync(Custumer entity)
        {
            return _repository.DeleteAsync(entity);
        }

        public Task<Custumer> GetAsync(int id)
        {
            return _repository.GetAsync(id);
        }

        public Task<Custumer> UpdateAsync(Custumer entity)
        {
            return _repository.UpdateAsync(entity); 
        }
        public Task<Custumer> GetAsync()
        {
            throw new NotImplementedException();
        }
    }
}
