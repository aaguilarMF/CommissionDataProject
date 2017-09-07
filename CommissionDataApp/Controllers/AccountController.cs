using CommissionDataApp.Models;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace CommissionDataApp.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationUserManager _userManager;
        private ApplicationSignInManager _signInManager;
        private bool alreadyHardcoded = true;

        public AccountController() {
        }
        public async Task<bool> HardCodeLogin()
        {
            var user = new ApplicationUser() { UserName = "commissionReportUser@magnaflow.com", Email = "commissionReportUser@magnaflow.com" };
            var result = await UserManager.CreateAsync(user, "BattleToad77!");
            return true;// result.Succeeded;

        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationUserManager UserManager
        {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
        }

        public ApplicationSignInManager SignInManager
        {
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }
        // GET: Account
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<bool> Login(LoginViewModel model)
        {
            if (!alreadyHardcoded)
            {
                alreadyHardcoded = await HardCodeLogin();
            }
            //var guat = await HardCodeLogin();
            //this.UserManager.FindByNameAsync
            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
            switch (result)
            {
                case SignInStatus.Success:
                    return true;
                default:
                    ModelState.AddModelError("", "Invalid login attempt.");
                    return false;
            }
        }
        /*
        [HttpPost]
        [AllowAnonymous]
        public async Task<bool> Register(RegisterViewModel model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await UserManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return false;
            await SignInManager.SignInAsync(user, false, false);
            return true;
        }*/
        [HttpGet]
        [AllowAnonymous]
        public ActionResult SignOut()
        {
            var AuthenticationManager = HttpContext.GetOwinContext().Authentication;
            AuthenticationManager.SignOut();
            //return true;
            return View(true);
        }
    }
}