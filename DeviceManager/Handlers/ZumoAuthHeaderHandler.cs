using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using DeviceManager.Services;
using System;

namespace DeviceManager.Handlers
{
	public class ZumoAuthHeaderHandler : DelegatingHandler
	{
		protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
		{
			if (string.IsNullOrWhiteSpace(AccountService.AuthenticationToken))
			{
				throw new InvalidOperationException("User is not currently logged in");
			}

			request.Headers.Add("X-ZUMO-AUTH", AccountService.AuthenticationToken);

			return base.SendAsync(request, cancellationToken);
		}
	}
}

