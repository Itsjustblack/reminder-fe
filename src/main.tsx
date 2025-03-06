import { Toaster } from "@/components/ui/sonner";
import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import App from "./App.tsx";
import "./index.css";
import { AxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErrors = async (response: any) => {
	console.log(response);

	// Handle network errors
	if (!response) {
		toast.error("Network Error");
		return;
	}

	toast.error(response.data.message);

	// const errors = Array.isArray(response.data.error)
	// 	? response.data.error
	// 	: [response.data.error];

	// // Display each error message with a delay
	// for (const error of errors) {
	// 	toast.error(error);

	// 	// Wait for 300ms before showing the next toast
	// 	await new Promise((resolve) => setTimeout(resolve, 300));
	// }
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			gcTime: 60 * 60 * 1000,
		},
	},
	mutationCache: new MutationCache({
		onError: (error) => {
			handleErrors((error as AxiosError).response);
		},
	}),
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools />
		</QueryClientProvider>
		<Toaster />
	</StrictMode>
);
