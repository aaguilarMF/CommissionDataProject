using CommissionDataApp.Models;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace CommissionDataApp.Controllers
{
    [RoutePrefix("Account")]
    [Authorize(Roles = "FIN_COMM_REPORT_RW, FIN_COMM_REPORT_RO")]
    public class AccountController : ApiController
    {
        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public IHttpActionResult Login([FromBody]Models.Account.LoginModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return Ok(true);// i dunno when it goes here............ this.View(model);
            }

            if (Membership.ValidateUser(model.UserName, model.Password))
            {

                //connect to directory and axe it to look for user name memberOf properties
                DirectoryEntry de = new DirectoryEntry(System.Configuration.ConfigurationManager.ConnectionStrings["ADConnectionString"].ConnectionString);// "LDAP"+"://magnaflow.com:389/DC=magnaflow,DC=com");
                var searcher =
                    new DirectorySearcher(de)
                    {
                        Filter = String.Format("(&(objectClass=user)(samaccountname={0}))", model.UserName)
                    };
                searcher.PropertiesToLoad.Add("MemberOf");

                //get directory entries of username. Should only be one?
                var directoryEntriesFound = searcher.FindAll()
                    .Cast<SearchResult>()
                    .Select(result => result.GetDirectoryEntry());
                List<String> rolesList = new List<string>();

                //extract roles for this user
                foreach (DirectoryEntry entry in directoryEntriesFound)
                {
                    var info = entry.Properties["MemberOf"].Value.GetType();
                    if (entry.Properties["MemberOf"].Value is string)
                    {
                        rolesList.Add(Regex.Replace(entry.Properties["MemberOf"].Value.ToString(), @"^CN=(.*?)(?<!\\),.*", "$1"));
                    }
                    else
                    {
                        foreach (var objs in (Object[])entry.Properties["MemberOf"].Value)
                        {
                            rolesList.Add(Regex.Replace((string)objs, @"^CN=(.*?)(?<!\\),.*", "$1"));
                        }
                    }
                }

                //plase them in a string as FormsAuthenticationTicket expects data this way. Or more like that's how we want to recieve the data. 
                //Really could be anything but we're expecting list of roles
                string roles = "";
                var firstTime = true;
                foreach (var role in rolesList)
                {
                    if (firstTime)
                    {
                        roles = role;
                        firstTime = false;
                    }
                    else
                    {
                        roles += "," + role;
                    }
                }

                //This may or may not be necessary
                var expectedRolesList = Constants.GetRoles();
                var containsExpectedRole = false;
                foreach (var role in expectedRolesList)
                {
                    if (roles.Contains(role))
                    {
                        containsExpectedRole = true;
                    }
                }

                if (containsExpectedRole)
                {
                    //setup ticket
                    var authTicket = new FormsAuthenticationTicket(1, model.UserName, DateTime.Now, DateTime.Now.AddMinutes(20), false, roles);
                    string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                    var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                    HttpContext.Current.Response.Cookies.Add(authCookie);
                    //HttpContext.Response.Cookies.Add(authCookie);

                    return Ok(true);
                }
                else
                {
                    #region Error Handling
                    var resp2 = new HttpResponseMessage(HttpStatusCode.Unauthorized)
                    {
                        ReasonPhrase = "Unauthorized to use this site. Sorry."
                    };
                    #endregion
                    throw new HttpResponseException(resp2);
                }
            }

            #region Error Handling
            var resp = new HttpResponseMessage(HttpStatusCode.Unauthorized)
            {
                ReasonPhrase = "Invalid Credentials"
            };
            #endregion
            throw new HttpResponseException(resp);
        }

        [HttpPost]
        [Route("LogOff")]
        public IHttpActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return Ok(true);
        }
    }
}