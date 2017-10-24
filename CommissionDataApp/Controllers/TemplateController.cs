using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CommissionDataApp.Controllers
{
    [Authorize(Roles = "FIN_COMM_REPORT_RW, FIN_COMM_REPORT_RO")]
    public class TemplateController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
    }
}