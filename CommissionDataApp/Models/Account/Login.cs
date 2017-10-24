using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace CommissionDataApp.Models.Account
{
    [DataContract]
    public class LoginModel
    {
        [Required]
        [DataMember]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataMember]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataMember]
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}