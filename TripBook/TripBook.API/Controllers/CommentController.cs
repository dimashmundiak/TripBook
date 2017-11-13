using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
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
        public async Task<IActionResult> AddComment([FromBody] CommentForCreationDto newComment, int cityId, int placeId)
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
