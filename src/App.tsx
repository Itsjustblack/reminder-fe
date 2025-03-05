import { useEffect } from "react";
import { connectToPushService } from "./api/actions";
import ReminderForm from "./components/ReminderForm";

function App() {
	useEffect(() => {
		async function registerServiceWorker() {
			if ("serviceWorker" in navigator) {
				try {
					const registration = await navigator.serviceWorker.register(
						"/serviceWorker.js"
					);
					console.log("Service Worker registered:", registration);
					return registration;
				} catch (error) {
					console.log("Service Worker registration failed:", error);
				}
			}
		}

		async function subscribeToPush(registration: ServiceWorkerRegistration) {
			if (!registration.pushManager) {
				console.error("Push Manager not available");
				return;
			}

			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: import.meta.env.VITE_PUBLIC_KEY,
			});

			console.log("Push Subscription:", subscription);

			// Send subscription to backend
			await connectToPushService(subscription);
		}

		Notification.requestPermission().then(async (permission) => {
			if (permission === "granted") {
				const registration = await registerServiceWorker();
				if (registration) {
					await subscribeToPush(registration);
				}
			} else alert("Notification Permission not Granted");
		});
	}, []);

	return (
		<div className="h-screen flex items-center">
			<div className="w-full h-fit">
				<ReminderForm />
			</div>
		</div>
	);
}

export default App;
