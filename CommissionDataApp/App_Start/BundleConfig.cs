using System.Web;
using System.Web.Optimization;

namespace CommissionDataApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-1.9.1.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap-theme.min.css",
                      "~/Content/bootstrap.min.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/CommissionDataApp")
                .IncludeDirectory("~/Scripts/Controllers", "*.js")
                .IncludeDirectory("~/Scripts/Services", "*.js")
                .Include("~/Scripts/_CommissionDataApp.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/Angular")
                .Include("~/Scripts/angular.min.js")
                .Include("~/Scripts/angular-route.min.js")
                );

            //BundleTable.EnableOptimizations = true;
        }


    }
}
