using System.Collections.Generic;
using TripBook.API.Entities;

namespace TripBook.API.Services
{
    public interface ITripBookRepository
    {
        IEnumerable<Country> GetCountries();
        Country GetCountry(int id);
        void AddCountry(Country entity);
        void DeleteCountry(Country entity);
        IEnumerable<City> GetCitiesForCountry(int id);
        City GetCityForCountry(int id, int cityId);
        void AddCityForCountry(City entity);
        void DeleteCityForCountry(City entity);
        IEnumerable<Place> GetPlacesForCity(int cityId);
        Place GetPlaceForCity(int cityId, int placeId);
        void AddPlaceForCity(Place entity);
        void DeletePlaceForCity(Place entity);
        bool Save();
    }
}
