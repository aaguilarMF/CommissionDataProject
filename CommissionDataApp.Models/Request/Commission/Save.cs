using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommissionDataApp.Models.Request.Commission
{
    public class Save
    {
        public string customerNumber { get; set; }
        public int? representativeId { get; set; }
        public decimal? commission { get; set; }
    }
}
