using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<IActionResult> GetPlaces(int cityId)
        {
            var placesFromRepo = await _repository.GetPlacesForCity(cityId);
            var placesToReturn = Mapper.Map<IEnumerable<PlaceDto>>(placesFromRepo);
            return Ok(placesToReturn);
        }

        [HttpGet("{placeId}", Name = "GetPlace")]
        public async Task<IActionResult> GetPlace(int cityId, int placeId)
        {
            var placeFromRepo = await _repository.GetPlaceForCity(cityId, placeId);
            if (placeFromRepo == null)
            {
                return NotFound();
            }
            var placeToReturn = Mapper.Map<CityDto>(placeFromRepo);
            return Ok(placeToReturn);
        }

        [HttpPost()]
        public async Task<IActionResult> AddPlace([FromBody] PlaceForCreationDto place, int id, int cityId)
        {
            if (place == null)
            {
                return BadRequest();
            }
            var placeToAdd = Mapper.Map<Place>(place);
            var city = await _repository.GetCityForCountry(id, cityId);
            if (city == null)
            {
                return NotFound();
            }
            _repository.AddPlaceForCity(placeToAdd);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            var placeToReturn = Mapper.Map<PlaceDto>(placeToAdd);
            return CreatedAtRoute("GetPlace", new { id = placeToReturn.Id }, placeToReturn);
        }

        [HttpDelete("{placeId}")]
        public async Task<IActionResult> DeleteCity(int cityId, int placeId)
        {
            var placeToDelete = await _repository.GetPlaceForCity(cityId, placeId);
            if (placeToDelete == null)
            {
                return NotFound();
            }
            _repository.DeletePlaceForCity(placeToDelete);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [HttpPut("{placeId}")]
        public async Task<IActionResult> EditCity([FromBody] PlaceForUpdateDto place, int placeId, int cityId)
        {
            if (place == null)
            {
                return BadRequest();
            }
            var placeToUpdate = await _repository.GetPlaceForCity(cityId, placeId);
            if (placeToUpdate == null)
            {
                return NotFound();
            }
            Mapper.Map(place, placeToUpdate);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }
    }
}
