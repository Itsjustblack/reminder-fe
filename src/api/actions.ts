import { AxiosError } from "axios";
import apiClient from "../lib/axios";
import { Reminder } from "../types";

export async function connectToPushService(subscription: PushSubscription) {
	try {
		const res = await apiClient.post("/reminders/subscribe", subscription);
		return res.data;
	} catch (error) {
		console.log((error as AxiosError).message);
	}
}

export async function createReminder(
	newReminder: Reminder
): Promise<Reminder | undefined> {
	try {
		const res = await apiClient.post("/reminders/create", newReminder);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
