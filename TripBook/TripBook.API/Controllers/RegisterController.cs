using IdentityModel;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TripBook.API.Models;

namespace TripBook.API.Controllers
{
    [Route("register")]
    public class RegisterController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;

        public RegisterController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost()]
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
    }
}
