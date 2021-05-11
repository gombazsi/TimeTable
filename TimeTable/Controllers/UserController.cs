using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DTO;
using TimeTable.Services.Interfaces;

namespace TimeTable.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        [HttpPost("signin")]
        public async Task<string> SignIn(SignInDTO signInDTO)
        {
            var Body = HttpContext.Request.Body;
            return await userService.SignInAsync(signInDTO);
        }
        [Authorize]
        [HttpGet("signout")]
        public async Task SignOut()
        {
            await userService.SignOutAsync();
        }
        [HttpPost("register")]
        public async Task<string> Register(SignInDTO signInDTO)
        {
            return await userService.Register(signInDTO);
        }
    }
}
