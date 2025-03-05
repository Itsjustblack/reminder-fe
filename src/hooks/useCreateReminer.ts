import { createReminder } from "@/api/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateReminder = () => {
	return useMutation({
		mutationFn: createReminder,
		onSuccess: (reminder) => toast.success(`New Reminder: ${reminder?.title}`),
	});
};
