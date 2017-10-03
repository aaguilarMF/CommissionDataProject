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
                      "~/Content/ui-bootstrap-csp.css",
                      "~/Content/ui-grid.min.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/Angular")
                .Include("~/Scripts/angular.min.js")
                .Include("~/Scripts/angular-route.min.js")
                .Include("~/Scripts/ui-grid.min.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/AngularDev")
                .Include("~/Scripts/angular.js")
                .Include("~/Scripts/angular-route.js")
                .Include("~/Scripts/angular-animate.js")
                .Include("~/Scripts/ui-grid.js")
                );
            bundles.Add(new ScriptBundle("~/bundles/ui-bootstrap")
                .IncludeDirectory("~/Scripts/angular-ui", "*.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/CommissionDataApp")
                .IncludeDirectory("~/Scripts/Controllers", "*.js")
                .IncludeDirectory("~/Scripts/Services", "*.js")
                .IncludeDirectory("~/Scripts/Directives", "*.js")
                .IncludeDirectory("~/Scripts/Factories", "*.js")
                .Include("~/Scripts/_CommissionDataApp.js")
                );

            //BundleTable.EnableOptimizations = true;
        }


    }
}
