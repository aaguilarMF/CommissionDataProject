using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CommissionDataApp.Controllers
{
    public class RepresentativeController : Controller
    {
        // GET: Representative
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult GetRepresentatives()
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var representatives = context.CARS_CPR_OUTSIDE_REP_TAB.ToList();
            var response = new Models.Response();

            
           /* var representativesDataResponseObject = new Models.CommissionData()
            {
                COMMISSION_ID = commissionData.COMMISSION_ID,
                CUSTOMER_NO = commissionData.CUSTOMER_NO,
                OUTSIDE_REP_NAME = commissionData.CARS_CPR_OUTSIDE_REP_TAB.OUTSIDE_REP,
                REP_ID = commissionData.REP_ID,
                COMMISSION = commissionData.COMMISSION
            };*/


            response = new Models.Response()
            {
                Success = true,
                JSON_RESPONSE_DATA = JsonConvert.SerializeObject(representatives)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
            };
            return this.Json(response, JsonRequestBehavior.AllowGet);
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }
    }
}