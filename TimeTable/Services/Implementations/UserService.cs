using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models;
using TimeTable.Models.DTO;
using TimeTable.Services.Interfaces;

namespace TimeTable.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        public UserService(SignInManager<ApplicationUser> signInManager,UserManager<ApplicationUser> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        public async Task<string> Register(SignInDTO signInDTO)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<SignInDTO, ApplicationUser>());
            Mapper mapper = new Mapper(mapperConfiguration);

            ApplicationUser user = mapper.Map<ApplicationUser>(signInDTO);
            try
            {
                IdentityResult res = await userManager.CreateAsync(user, signInDTO.Password);
                if (!res.Succeeded)
                {
                    throw new Exception();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            
            user = await userManager.FindByNameAsync(signInDTO.UserName);
            return user.Id;
        }

        public async Task<string> SignInAsync(SignInDTO signInDTO)
        {
            var res=await signInManager.PasswordSignInAsync(signInDTO.UserName, signInDTO.Password, signInDTO.RememberMe,false);
            if (!res.Succeeded)
            {
                throw new Exception("Hibás email cím vagy jelszó");
            }
            return (await userManager.FindByNameAsync(signInDTO.UserName)).Id.ToString();
        }

        public async Task SignOutAsync()
        {
            await signInManager.SignOutAsync();
        }
    }
}
