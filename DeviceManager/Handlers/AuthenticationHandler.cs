using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using DeviceManager.Services;

namespace DeviceManager.Handlers
{
	public class AuthenticationHandler : DelegatingHandler
	{
		protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
		{
			var response = await base.SendAsync(request, cancellationToken);
			response.EnsureSuccessStatusCode();

			string jsonString = await response.Content.ReadAsStringAsync();
			JObject jsonObject = JObject.Parse(jsonString);
			string token = jsonObject["token"].ToString();
			AccountService.AuthenticationToken = token;

			return response;
		}
	}
}

