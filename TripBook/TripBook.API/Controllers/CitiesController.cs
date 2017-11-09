using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TripBook.API.Entities;
using TripBook.API.Models;
using TripBook.API.Services;

namespace TripBook.API.Controllers
{
    [Authorize]
    [Route("api/countries/{id}/cities")]
    public class CitiesController : Controller
    {
        private readonly ITripBookRepository _repository;

        public CitiesController(ITripBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public IActionResult GetCities(int id)
        {
            var citiesFromRepo = _repository.GetCitiesForCountry(id);
            var citiesToReturn = Mapper.Map<IEnumerable<CityDto>>(citiesFromRepo);
            return Ok(citiesToReturn);
        }

        [HttpGet("{cityId}", Name = "GetCity")]
        public IActionResult GetCity(int id, int cityId)
        {
            var cityFromRepo = _repository.GetCityForCountry(id, cityId);
            if (cityFromRepo == null)
            {
                return NotFound();
            }
            var cityToReturn = Mapper.Map<CityDto>(cityFromRepo);
            return Ok(cityToReturn);
        }

        [HttpPost()]
        public IActionResult AddCity([FromBody] CityForCreationDto city, int id)
        {
            if (city == null)
            {
                return BadRequest();
            }
            var cityToAdd = Mapper.Map<City>(city);
            var country = _repository.GetCountry(id);
            if (country == null)
            {
                return NotFound();
            }
            cityToAdd.CountryId = country.Id;
            _repository.AddCityForCountry(cityToAdd);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            var cityToReturn = Mapper.Map<CityDto>(cityToAdd);
            return CreatedAtRoute("GetCity", new { cityId = cityToReturn.Id }, cityToReturn);
        }

        [HttpDelete("{cityId}")]
        public IActionResult DeleteCity(int cityId, int id)
        {
            var cityToDelete = _repository.GetCityForCountry(id, cityId);
            if (cityToDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteCityForCountry(cityToDelete);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [HttpPut("{cityId}")]
        public IActionResult EditCity([FromBody] CityForUpdateDto city, int id, int cityId)
        {
            if (city == null)
            {
                return BadRequest();
            }
            var cityToUpdate = _repository.GetCityForCountry(id, cityId);
            if (cityToUpdate == null)
            {
                return NotFound();
            }
            Mapper.Map(city, cityToUpdate);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }
    }
}
