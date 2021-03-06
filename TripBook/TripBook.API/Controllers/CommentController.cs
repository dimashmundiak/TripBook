﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripBook.API.Entities;
using TripBook.API.Models;
using TripBook.API.Services;

namespace TripBook.API.Controllers
{
    [Authorize()]
    [Route("api/countries/{id}/cities/{cityId}/places/{placeId}/comment")]
    public class CommentController : Controller
    {
        private readonly ITripBookRepository _repository;

        public CommentController(ITripBookRepository repository)
        {
            _repository = repository;
        }

        [HttpPost()]
        public async Task<IActionResult> AddComment([FromBody] CommentForCreationDto newComment, int id, int cityId, int placeId)
        {
            var placeFromRepo = await _repository.GetPlaceForCity(cityId, placeId);
            if (placeFromRepo == null)
            {
                return NotFound();
            }
            var commentToAdd = Mapper.Map<Comment>(newComment);
            commentToAdd.Date = DateTime.Now;
            _repository.AddCommentForPlace(commentToAdd);
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            var commentsFromRepo = await _repository.GetCommentsForPlace(placeId);
            var avgRating = commentsFromRepo.Average(c => c.Rating);
            placeFromRepo.Rating = avgRating;
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            var placesFromRepo = await _repository.GetPlacesForCity(cityId);
            avgRating = placesFromRepo.Average(p => p.Rating);
            var cityFromRepo = await _repository.GetCityForCountry(id, cityId);
            cityFromRepo.Rating = avgRating;
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            var citiesFromRepo = await _repository.GetCitiesForCountry(id);
            avgRating = citiesFromRepo.Average(c => c.Rating);
            var countryFromRepo = await _repository.GetCountry(id);
            countryFromRepo.Rating = avgRating;
            if (!await _repository.Save())
            {
                throw new Exception("Failed");
            }
            return NoContent();
        }

        [HttpGet()]
        public async Task<IActionResult> GetComments(int placeId)
        {
            var commentsFromRepo = await _repository.GetCommentsForPlace(placeId);
            var commentsToReturn = Mapper.Map<IEnumerable<CommentDto>>(commentsFromRepo);
            return Ok(commentsToReturn);
        }
    }
}
