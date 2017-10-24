using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CommissionDataApp.Controllers
{
    [Authorize(Roles = "FIN_COMM_REPORT_RW, FIN_COMM_REPORT_RO")]
    public class HomeController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            ViewBag.Name = User.Identity.Name;
#if DEBUG
            ViewBag.DEBUG = true;
#else
            ViewBag.DEBUG = false;
#endif
            return View();
        }

        
    }
}