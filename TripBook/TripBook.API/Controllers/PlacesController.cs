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
    [Route("api/countries/{id}/cities/{cityId}/places")]
    public class PlacesController : Controller
    {
        private readonly ITripBookRepository _repository;

        public PlacesController(ITripBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public IActionResult GetPlaces(int cityId)
        {
            var placesFromRepo = _repository.GetPlacesForCity(cityId);
            var placesToReturn = Mapper.Map<IEnumerable<PlaceDto>>(placesFromRepo);
            return Ok(placesToReturn);
        }

        [HttpGet("{placeId}", Name = "GetPlace")]
        public IActionResult GetPlace(int cityId, int placeId)
        {
            var placeFromRepo = _repository.GetPlaceForCity(cityId, placeId);
            if (placeFromRepo == null)
            {
                return NotFound();
            }
            var placeToReturn = Mapper.Map<CityDto>(placeFromRepo);
            return Ok(placeToReturn);
        }

        [HttpPost()]
        public IActionResult AddPlace([FromBody] PlaceForCreationDto place, int id, int cityId)
        {
            if (place == null)
            {
                return BadRequest();
            }
            var placeToAdd = Mapper.Map<Place>(place);
            var city = _repository.GetCityForCountry(id, cityId);
            if (city == null)
            {
                return NotFound();
            }
            _repository.AddPlaceForCity(placeToAdd);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            var placeToReturn = Mapper.Map<PlaceDto>(placeToAdd);
            return CreatedAtRoute("GetPlace", new { id = placeToReturn.Id }, placeToReturn);
        }

        [HttpDelete("{placeId}")]
        public IActionResult DeleteCity(int cityId, int placeId)
        {
            var placeToDelete = _repository.GetPlaceForCity(cityId, placeId);
            if (placeToDelete == null)
            {
                return NotFound();
            }
            _repository.DeletePlaceForCity(placeToDelete);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [HttpPut("{placeId}")]
        public IActionResult EditCity([FromBody] PlaceForUpdateDto place, int placeId, int cityId)
        {
            if (place == null)
            {
                return BadRequest();
            }
            var placeToUpdate = _repository.GetPlaceForCity(cityId, placeId);
            if (placeToUpdate == null)
            {
                return NotFound();
            }
            Mapper.Map(place, placeToUpdate);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }
    }
}
