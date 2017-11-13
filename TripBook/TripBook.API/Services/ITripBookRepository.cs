using System.Collections.Generic;
using System.Threading.Tasks;
using TripBook.API.Entities;

namespace TripBook.API.Services
{
    public interface ITripBookRepository
    {
        Task<List<Country>> GetCountries();
        Task<Country> GetCountry(int id);
        void AddCountry(Country entity);
        void DeleteCountry(Country entity);
        Task<List<City>> GetCitiesForCountry(int id);
        Task<City> GetCityForCountry(int id, int cityId);
        void AddCityForCountry(City entity);
        void DeleteCityForCountry(City entity);
        Task<List<Place>> GetPlacesForCity(int cityId);
        Task<Place> GetPlaceForCity(int cityId, int placeId);
        void AddPlaceForCity(Place entity);
        void DeletePlaceForCity(Place entity);
        void AddCommentForPlace(Comment entity);
        Task<List<Comment>> GetCommentsForPlace(int placeId);
        Task<User> GetUser(string id);
        Task<bool> Save();
    }
}
