using AutoMapper;
using IdentityModel;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TripBook.API.Models;
using TripBook.API.Services;

namespace TripBook.API.Controllers
{
    [Authorize()]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITripBookRepository _repository;

        public UserController(UserManager<IdentityUser> userManager, ITripBookRepository repository)
        {
            _userManager = userManager;
            _repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForCreationDto newUser)
        {
            var userToAdd = new TestUser
            {
                SubjectId = Guid.NewGuid().ToString(),
                Username = newUser.Username,
                Password = newUser.Password,
                Claims = new List<Claim>
                {
                    new Claim(JwtClaimTypes.Email, newUser.Email),
                    new Claim(JwtClaimTypes.Role, "user")
                }
            };
            var newIdentityUser = new IdentityUser(newUser.Username)
            {
                Id = userToAdd.SubjectId
            };
            foreach (var claim in userToAdd.Claims)
            {
                newIdentityUser.Claims.Add(new IdentityUserClaim<string>
                {
                    UserId = newIdentityUser.Id,
                    ClaimType = claim.Type,
                    ClaimValue = claim.Value,
                });
            }
            var a = await _userManager.CreateAsync(newIdentityUser, newUser.Password);
            if (!a.Succeeded)
            {
                return BadRequest(a);
            }
            return NoContent();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> Account(string userId)
        {
            var userFromRepo = await _repository.GetUser(userId);
            var userToReturn = Mapper.Map<UserDto>(userFromRepo);
            var placeFromRepo = userFromRepo.UserPlaces.Select(e => e.Place);
            var placeToReturn = Mapper.Map<List<PlaceFavouriteDto>>(placeFromRepo);
            foreach (var place in placeToReturn)
            {
                var cityId = await _repository.GetCity(place.CityId);
                place.CountryId = cityId.CountryId;
            }
            userToReturn.Places = placeToReturn;
            return Ok(userToReturn);
        }

        [HttpPost("user/{userId}")]
        public async Task<IActionResult> Account([FromBody] PlaceForCheckDto place, string userId)
        {
            var userFromRepo = await _repository.GetUser(userId);
            var placeFromRepo = userFromRepo.UserPlaces.Select(e => e.Place).ToList();
            var response = new {result =  placeFromRepo.Any(p => p.Id == place.Id)};
            return Ok(response);
        }
    }
}
