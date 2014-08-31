using Microsoft.WindowsAzure.MobileServices;
using System.Net.Http;

namespace DeviceManager.Factory
{
	public class ClientFactory
	{
		public static MobileServiceClient CreateClient()
		{
			return new MobileServiceClient("https://mcom-device-list.azure-mobile.net/", "fevVWOAOauhjDswvLdefrcWMQgUuOi19");
		}

		public static MobileServiceClient CreateClient(params HttpMessageHandler[] handlers)
		{
			return new MobileServiceClient("https://mcom-device-list.azure-mobile.net/",
				"fevVWOAOauhjDswvLdefrcWMQgUuOi19",
				handlers);
		}
	}
}