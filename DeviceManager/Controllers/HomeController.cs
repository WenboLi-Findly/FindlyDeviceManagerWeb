using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using DeviceManager.Services;
using Microsoft.Ajax.Utilities;
using System.Web.Security;
using WebMatrix.WebData;

namespace DeviceManager.Controllers
{	
	[Authorize]
	public class HomeController : Controller
	{
		public ActionResult Index()
		{

			ViewBag.Authorized = WebSecurity.IsAuthenticated;
			ViewBag.IsAdmin = WebSecurity.CurrentUserName == "admin";
			return View();
		}


		
		
		public async Task<ActionResult> GetDevices()
		{
			
			DeviceDataService service = new DeviceDataService();

			if (AccountService.AuthenticationToken.IsNullOrWhiteSpace())
			{
				return Json(null, JsonRequestBehavior.AllowGet);
			}

			var models = await service.GetAllDevices();

			return Json(models, JsonRequestBehavior.AllowGet);
		}

		public async Task<ActionResult> GetUsers()
		{

			AccountService service = new AccountService();

			if (AccountService.AuthenticationToken.IsNullOrWhiteSpace())
			{
				return Json(null, JsonRequestBehavior.AllowGet);
			}

			var models = await service.GetAllUsers();

			return Json(models, JsonRequestBehavior.AllowGet);
		}
	}
}
