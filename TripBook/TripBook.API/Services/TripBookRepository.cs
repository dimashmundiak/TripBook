using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<Country> GetCountries()
        {
            return _context.Countries.ToList();
        }

        public Country GetCountry(int id)
        {
            return _context.Countries.FirstOrDefault(c => c.Id == id);
        }

        public void AddCountry(Country entity)
        {
            _context.Countries.Add(entity);
        }

        public void DeleteCountry(Country entity)
        {
            _context.Countries.Remove(entity);
        }

        public IEnumerable<City> GetCitiesForCountry(int id)
        {
            return _context.Cities.Where(c => c.CountryId == id).ToList();
        }

        public City GetCityForCountry(int id, int cityId)
        {
            return _context.Cities.FirstOrDefault(c => c.CountryId == id && c.Id == cityId);
        }

        public void AddCityForCountry(City entity)
        {
            _context.Cities.Add(entity);
        }

        public void DeleteCityForCountry(City entity)
        {
            _context.Cities.Remove(entity);
        }

        public IEnumerable<Place> GetPlacesForCity(int cityId)
        {
            return _context.Places.Where(p => p.CityId == cityId).ToList();
        }

        public Place GetPlaceForCity(int cityId, int placeId)
        {
            return _context.Places.FirstOrDefault(p => p.CityId == cityId && p.Id == placeId);
        }

        public void AddPlaceForCity(Place entity)
        {
            _context.Places.Add(entity);
        }

        public void DeletePlaceForCity(Place entity)
        {
            _context.Places.Remove(entity);
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
