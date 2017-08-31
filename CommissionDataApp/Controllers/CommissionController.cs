using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CommissionDataApp.Controllers
{
    public class CommissionController : Controller
    {
        // GET: Commission
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SearchByCustomerNo()
        {
            return View();
        }

        [HttpGet]
        public bool GetCustomer(int? customerNumber)
        {

            return true;
        }
    }
}