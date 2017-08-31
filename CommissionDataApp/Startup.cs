using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CommissionDataApp.Startup))]
namespace CommissionDataApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
