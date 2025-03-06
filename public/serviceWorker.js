self.addEventListener("push", (event) => {
	if (event.data) {
		const data = event.data.json();

		const options = {
			body: data.message || "New notification",
			icon: data.icon || "/vite.svg",
			badge: data.badge || "/vite.svg",
			vibrate: [200, 100, 200],
			data: data.url || "/",
			actions: data.actions || [
				{ action: "open", title: "Open" },
				{ action: "dismiss", title: "Dismiss" },
			],
		};

		event.waitUntil(
			self.registration.showNotification(data.title || "Notification", options)
		);
	}
});
