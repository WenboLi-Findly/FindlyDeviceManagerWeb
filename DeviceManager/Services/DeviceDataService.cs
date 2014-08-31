using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviceManager.Factory;
using DeviceManager.Handlers;
using DeviceManager.Models;
using System;

namespace DeviceManager.Services
{
	public class DeviceDataService
	{
		public async Task Insert()
		{
			using (var handler = new ZumoAuthHeaderHandler())
			{
				using (var client = ClientFactory.CreateClient(handler))
				{
					var data = new Device {
						device_id = "testid"
					};
	
					var table = client.GetTable<Device>();

					await table.InsertAsync(data);
				}
			}
		}

		public async Task<IList<Device>> GetAllDevices()
		{
			using (var handler = new ZumoAuthHeaderHandler())
			{
				using (var client = ClientFactory.CreateClient(handler))
				{
					var table = client.GetTable<Device>();

					var query = table.OrderBy(d => d.device_name);

					var data = await query.ToListAsync();

					return data;
				}
			}
		}
	}
}

