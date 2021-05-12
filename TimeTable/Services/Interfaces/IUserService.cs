using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DTO;

namespace TimeTable.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> SignInAsync(SignInDTO signInDTO);
        Task SignOutAsync();
        Task<string> Register(SignInDTO signInDTO);
    }
}
