using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CommissionDataApp.Controllers
{/*
    public class CommissionDataController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetCustomer(string customerNumber)
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var commissionData = context.CARS_CPR_COMMISSION_TAB.Where(x => x.CUSTOMER_NO == customerNumber).FirstOrDefault();

            if (commissionData == null)
            {
                //Used to make property name as camel case
                Microsoft.Data.OData.ODataError error = new Microsoft.Data.OData.ODataError()
                {
                    ErrorCode = "404",
                    Message = "Customer Not Fount"
                };
                return Ok(error); //Returns students list as JSON
            }
            var commissionDataResponseObject = new Models.CommissionData()
            {
                COMMISSION_ID = commissionData.COMMISSION_ID,
                CUSTOMER_NO = commissionData.CUSTOMER_NO,
                OUTSIDE_REP_NAME = commissionData.CARS_CPR_OUTSIDE_REP_TAB.OUTSIDE_REP,
                REP_ID = commissionData.REP_ID,
                COMMISSION = commissionData.COMMISSION
            };


            return Ok(commissionDataResponseObject);
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }
    }*/
}