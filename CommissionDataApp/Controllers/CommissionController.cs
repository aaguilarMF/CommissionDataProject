using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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
        public ActionResult ViewAllData()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetCustomer(string customerNumber)
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var commissionData = context.CARS_CPR_COMMISSION_TAB.Where(x => x.CUSTOMER_NO == customerNumber).FirstOrDefault();
            var response = new Models.Response();

            if (commissionData == null)
            {

                //Used to make property name as camel case
                /*Microsoft.Data.OData.ODataError error = new Microsoft.Data.OData.ODataError()
                {
                    ErrorCode = "404",
                    Message = "Customer Not Fount"
                }
                return JsonConvert.SerializeObject(error, Formatting.None, settings);*/ //Returns students list as JSON
                response = new Models.Response()
                {
                    Success = false,
                    JSON_RESPONSE_DATA = null,
                    Message = "Customer Number provided yeilds no result."
                };
                return this.Json(response, JsonRequestBehavior.AllowGet);
            }
            var commissionDataResponseObject = new Models.CommissionData()
            {
                COMMISSION_ID = commissionData.COMMISSION_ID,
                CUSTOMER_NO = commissionData.CUSTOMER_NO,
                OUTSIDE_REP_NAME = commissionData.CARS_CPR_OUTSIDE_REP_TAB.OUTSIDE_REP,
                REP_ID = commissionData.REP_ID,
                COMMISSION = commissionData.COMMISSION
            };


            response = new Models.Response()
            {
                Success = true,
                JSON_RESPONSE_DATA = JsonConvert.SerializeObject( commissionDataResponseObject)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
            };
            return this.Json(response, JsonRequestBehavior.AllowGet);
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }

        /// <summary>
        /// use customer_no 100 for testing
        /// </summary>
        /// <param name="saveModel"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Save(Models.Request.Commission.Save saveModel)
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var response = new Models.Response();
            CARS_CPR_COMMISSION_TAB commissionEntry = null;
            Models.CommissionData commissionDataResponseObject = null;
            string repName = null;
            /*
             * Do checks here making sure input is as expectied
             */
            if (saveModel.COMMISSION_ID != null)
            {
                commissionEntry = context.CARS_CPR_COMMISSION_TAB.Where(x => x.COMMISSION_ID == saveModel.COMMISSION_ID).FirstOrDefault();
                if(commissionEntry == null)
                {
                    response = new Models.Response()
                    {
                        Success = false,
                        JSON_RESPONSE_DATA = null, //JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
                        Message = "Data to edit does not exist."
                    };
                    return this.Json(response, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    commissionEntry.COMMISSION = (decimal)saveModel.commission;
                    context.SaveChanges();

                    repName = context.CARS_CPR_OUTSIDE_REP_TAB.Where(x => x.REP_ID == commissionEntry.REP_ID).Select(x => x.OUTSIDE_REP).FirstOrDefault();
                    commissionDataResponseObject = new Models.CommissionData()
                    {
                        COMMISSION_ID = commissionEntry.COMMISSION_ID,
                        CUSTOMER_NO = commissionEntry.CUSTOMER_NO,
                        OUTSIDE_REP_NAME = repName, //here goest he actuat name after you retrieve it from db
                        REP_ID = commissionEntry.REP_ID,
                        COMMISSION = commissionEntry.COMMISSION
                    };
                    response = new Models.Response()
                    {
                        Success = true,
                        JSON_RESPONSE_DATA = JsonConvert.SerializeObject(commissionDataResponseObject)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
                    };
                    return this.Json(response, JsonRequestBehavior.AllowGet);
                }

            }else
            {
                commissionEntry = new CARS_CPR_COMMISSION_TAB()
                {
                    CUSTOMER_NO = saveModel.customerNumber,
                    REP_ID = (decimal)saveModel.representativeId,
                    COMMISSION = (decimal)saveModel.commission

                };

                context.CARS_CPR_COMMISSION_TAB.Add(commissionEntry);
                context.SaveChanges();

                commissionEntry.COMMISSION_ID = context.CARS_CPR_COMMISSION_TAB.Where(x => x.CUSTOMER_NO == commissionEntry.CUSTOMER_NO
                    && x.REP_ID == commissionEntry.REP_ID && x.COMMISSION == commissionEntry.COMMISSION).Select(x => x.COMMISSION_ID).FirstOrDefault();

                repName = context.CARS_CPR_OUTSIDE_REP_TAB.Where(x => x.REP_ID == commissionEntry.REP_ID).Select(x => x.OUTSIDE_REP).FirstOrDefault();
                commissionDataResponseObject = new Models.CommissionData()
                {
                    COMMISSION_ID = commissionEntry.COMMISSION_ID,
                    CUSTOMER_NO = commissionEntry.CUSTOMER_NO,
                    OUTSIDE_REP_NAME = repName, //here goest he actuat name after you retrieve it from db
                    REP_ID = commissionEntry.REP_ID,
                    COMMISSION = commissionEntry.COMMISSION
                };


                response = new Models.Response()
                {
                    Success = true,
                    JSON_RESPONSE_DATA = JsonConvert.SerializeObject(commissionDataResponseObject)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
                };
                return this.Json(response, JsonRequestBehavior.AllowGet);
            }

            
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }
        
        [HttpGet]
        public ActionResult GetAllCommissionData()
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var commissionData = context.CARS_CPR_COMMISSION_TAB.ToList();
            var response = new Models.Response();

            if (commissionData == null)
            {

                //Used to make property name as camel case
                /*Microsoft.Data.OData.ODataError error = new Microsoft.Data.OData.ODataError()
                {
                    ErrorCode = "404",
                    Message = "Customer Not Fount"
                }
                return JsonConvert.SerializeObject(error, Formatting.None, settings);*/ //Returns students list as JSON
                response = new Models.Response()
                {
                    Success = false,
                    JSON_RESPONSE_DATA = null,
                    Message = "Customer Number provided yeilds no result."
                };
                return this.Json(response, JsonRequestBehavior.AllowGet);
            }

            var commissionDatalist = new List<Models.CommissionData>();
            foreach( var entry in commissionData)
            {
                var row = new Models.CommissionData()
                {
                    COMMISSION_ID = entry.COMMISSION_ID,
                    CUSTOMER_NO = entry.CUSTOMER_NO,
                    OUTSIDE_REP_NAME = entry.CARS_CPR_OUTSIDE_REP_TAB.OUTSIDE_REP,
                    REP_ID = entry.REP_ID,
                    COMMISSION = entry.COMMISSION
                };
                commissionDatalist.Add(row);
            }

            


            response = new Models.Response()
            {
                Success = true,
                JSON_RESPONSE_DATA = JsonConvert.SerializeObject(commissionDatalist)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
            };
            return this.Json(response, JsonRequestBehavior.AllowGet);
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }

        [HttpGet]
        public ActionResult GetActiveCustomers(int? customerId)
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var commissionData = context.CARS_CPR_COMMISSION_TAB.ToList();
            var response = new Models.Response();

            if (customerId != null)
            {
                response = new Models.Response()
                {
                    Success = false,
                    JSON_RESPONSE_DATA = null,
                    Message = "Customer Number provided yeilds no result."
                };
                return this.Json(response, JsonRequestBehavior.AllowGet);
            }

            #region time the queries
            //timed both (!A || !B), and !(A && B) and the latter was faster by about 25%
            /*
            System.Diagnostics.Stopwatch stopWatch1 = new System.Diagnostics.Stopwatch();
            System.Diagnostics.Stopwatch stopWatch2 = new System.Diagnostics.Stopwatch();
            stopWatch1.Start();
            var activeCustomers = context.CUSTOMER_INFO.Where(x => (!x.ASSOCIATION_NO.ToLower().Contains("account") || !x.ASSOCIATION_NO.ToLower().Contains("closed"))
                || x.ASSOCIATION_NO == null)
                .Select(x => new { x.CUSTOMER_ID, x.NAME }).ToList();
            stopWatch1.Stop();
            // Get the elapsed time as a TimeSpan value.
            TimeSpan ts1 = stopWatch1.Elapsed;
            */
            #endregion

            var activeCustomers = context.CUSTOMER_INFO.Where(x => !(x.ASSOCIATION_NO.ToLower().Contains("account") && x.ASSOCIATION_NO.ToLower().Contains("closed"))
                || x.ASSOCIATION_NO == null)
                .Select(x => new { x.CUSTOMER_ID, x.NAME }).ToList();

            response = new Models.Response()
            {
                Success = true,
                JSON_RESPONSE_DATA = JsonConvert.SerializeObject(activeCustomers)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
            };
            return this.Json(response, JsonRequestBehavior.AllowGet);
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }
        [HttpPost]
        public ActionResult Delete(CARS_CPR_COMMISSION_TAB commissionModel)
        {
            var context = new CommissionEntities();
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var response = new Models.Response();

            /*
             * Do checks here making sure input is as expectied
             */

            var deleteEntry = context.CARS_CPR_COMMISSION_TAB.Where(x => x.COMMISSION_ID == commissionModel.COMMISSION_ID).FirstOrDefault();

            if (deleteEntry != null)
            {
                context.CARS_CPR_COMMISSION_TAB.Remove(deleteEntry);
                context.SaveChanges();
                response = new Models.Response()
                {
                    Success = true,
                    JSON_RESPONSE_DATA = null // JsonConvert.SerializeObject(commissionDataResponseObject)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
                };
            }else
            {
                response = new Models.Response()
                {
                    Success = false,
                    JSON_RESPONSE_DATA = null, // JsonConvert.SerializeObject(commissionDataResponseObject)// JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings)
                    Message = "Data submitted to delete does not exist."
                };
            }
            return this.Json(response, JsonRequestBehavior.AllowGet);
            //return JsonConvert.SerializeObject(commissionDataResponseObject, Formatting.None, settings); //Returns students list as JSON
        }
    }
}
 