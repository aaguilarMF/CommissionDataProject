using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CommissionDataApp
{
    public static class Constants
    {
        public const string FIN_COMM_REPORT_RW = "FIN_COMM_REPORT_RW";
        public const string FIN_COMM_REPORT_RO = "FIN_COMM_REPORT_RO";


        public static List<string> GetRoles()
        {
            List<string> returnList = new List<string>();
            returnList.Add(FIN_COMM_REPORT_RW);
            returnList.Add(FIN_COMM_REPORT_RO);
            return returnList;
        }

    }
}