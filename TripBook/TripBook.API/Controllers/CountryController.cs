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
    [Authorize()]
    [Route("api/countries")]
    public class CountriesController : Controller
    {
        private readonly ITripBookRepository _repository;

        public CountriesController(ITripBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public IActionResult GetCountries()
        {
            var countriesFromRepo = _repository.GetCountries();
            var countriesToReturn = Mapper.Map<IEnumerable<CountryDto>>(countriesFromRepo);
            return Ok(countriesToReturn);
        }

        [HttpGet("{id}", Name = "GetCountry")]
        public IActionResult GetCountry(int id)
        {
            var countryToReturn = _repository.GetCountry(id);
            if (countryToReturn == null)
            {
                return NotFound();
            }

            return Ok(countryToReturn);
        }

        [HttpPost()]
        public IActionResult AddCountry([FromBody] CountryForCreationDto country)
        {
            if (country == null)
            {
                return BadRequest();
            }
            var countryToAdd = Mapper.Map<Country>(country);
            _repository.AddCountry(countryToAdd);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            var authorToReturn = Mapper.Map<CountryDto>(countryToAdd);
            return CreatedAtRoute("GetCountry", new {id = authorToReturn.Id}, authorToReturn);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCountry(int id)
        {
            var countryToDelete = _repository.GetCountry(id);
            if (countryToDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteCountry(countryToDelete);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult EditCounty([FromBody] CountryForUpdateDto country, int id)
        {
            if (country == null)
            {
                return BadRequest();
            }
            var countryToUpdate = _repository.GetCountry(id);
            if (countryToUpdate == null)
            {
                return NotFound();
            }
            Mapper.Map(country, countryToUpdate);
            if (!_repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }
    }
}
