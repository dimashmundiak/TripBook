using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TripBook.API.Entities;

namespace TripBook.API.Services
{
    public class TripBookRepository : ITripBookRepository
    {
        private readonly TripBookContext _context;

        public TripBookRepository(TripBookContext context)
        {
            _context = context;
        }

        public Task<List<Country>> GetCountries()
        {
            return _context.Countries.ToListAsync();
        }

        public Task<Country> GetCountry(int id)
        {
            return _context.Countries.FirstOrDefaultAsync(c => c.Id == id);
        }

        public void AddCountry(Country entity)
        {
            _context.Countries.AddAsync(entity);
        }

        public void DeleteCountry(Country entity)
        {
            _context.Countries.Remove(entity);
        }

        public Task<List<City>> GetCitiesForCountry(int id)
        {
            return _context.Cities.Where(c => c.CountryId == id).ToListAsync();
        }

        public Task<City> GetCityForCountry(int id, int cityId)
        {
            return _context.Cities.FirstOrDefaultAsync(c => c.CountryId == id && c.Id == cityId);
        }

        public Task<City> GetCity(int cityId)
        {
            return _context.Cities.FirstOrDefaultAsync(c => c.Id == cityId);
        }

        public void AddCityForCountry(City entity)
        {
            _context.Cities.AddAsync(entity);
        }

        public void DeleteCityForCountry(City entity)
        {
            _context.Cities.Remove(entity);
        }

        public Task<List<Place>> GetPlacesForCity(int cityId)
        {
            return _context.Places.Where(p => p.CityId == cityId).ToListAsync();
        }

        public Task<Place> GetPlaceForCity(int cityId, int placeId)
        {
            return _context.Places.FirstOrDefaultAsync(p => p.CityId == cityId && p.Id == placeId);
        }

        public void AddPlaceForCity(Place entity)
        {
            _context.Places.AddAsync(entity);
        }

        public void DeletePlaceForCity(Place entity)
        {
            _context.Places.Remove(entity);
        }

        public void AddCommentForPlace(Comment entity)
        {
            _context.Comments.AddAsync(entity);
        }

        public Task<List<Comment>> GetCommentsForPlace(int placeId)
        {
            return _context.Comments.Where(c => c.PlaceId == placeId).OrderByDescending(c=>c.Date).ToListAsync();
        }

        public Task<User> GetUser(string id)
        {
            return _context.Users.Include(u => u.UserPlaces).ThenInclude(u => u.Place)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return (result >= 0);
        }
    }
}
