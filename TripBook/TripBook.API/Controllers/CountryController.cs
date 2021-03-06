﻿using AutoMapper;
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
    [Route("api/countries")]
    public class CountriesController : Controller
    {
        private readonly ITripBookRepository _repository;

        public CountriesController(ITripBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public async Task<IActionResult> GetCountries()
        {
            var countriesFromRepo = await _repository.GetCountries();
            var countriesToReturn = Mapper.Map<IEnumerable<CountryDto>>(countriesFromRepo);
            return Ok(countriesToReturn);
        }

        [HttpGet("{id}", Name = "GetCountry")]
        public async Task<IActionResult> GetCountry(int id)
        {
            var countryFromRepo = await _repository.GetCountry(id);
            if (countryFromRepo == null)
            {
                return NotFound();
            }
            var countryToReturn = Mapper.Map<CountryDto>(countryFromRepo);
            var citiesFromRepo = await _repository.GetCitiesForCountry(id);
            var citiesToReturn = Mapper.Map<IEnumerable<CityDto>>(citiesFromRepo);
            countryToReturn.Cities = citiesToReturn;
            return Ok(countryToReturn);
        }

        [Authorize()]
        [HttpPost()]
        public async Task<IActionResult> AddCountry([FromBody] CountryForCreationDto country)
        {
            if (country == null)
            {
                return BadRequest();
            }
            var countryToAdd = Mapper.Map<Country>(country);
            _repository.AddCountry(countryToAdd);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [Authorize()]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var countryToDelete = await _repository.GetCountry(id);
            if (countryToDelete == null)
            {
                return NotFound();
            }
            _repository.DeleteCountry(countryToDelete);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [Authorize()]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCounty([FromBody] CountryForUpdateDto country, int id)
        {
            if (country == null)
            {
                return BadRequest();
            }
            var countryToUpdate = await _repository.GetCountry(id);
            if (countryToUpdate == null)
            {
                return NotFound();
            }
            Mapper.Map(country, countryToUpdate);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }
    }
}
