import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReminder } from "@/hooks/useCreateReminer";
import { cn, hoursOptions, minutesOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Create a schema for form validation
const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	date: z.date({
		required_error: "Please select a date",
	}),
	hours: z
		.string()
		.regex(/^([0-1]?[0-9]|2[0-3])$/, "Hours must be between 0-23"),
	minutes: z.string().regex(/^[0-5]?[0-9]$/, "Minutes must be between 0-59"),
});

export default function ReminderForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			hours: "12",
			minutes: "00",
		},
	});

	const { isPending, mutate: createReminder } = useCreateReminder();

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Create a new Date object with the selected date and time
		const executionDate = new Date(values.date);
		executionDate.setHours(Number.parseInt(values.hours));
		executionDate.setMinutes(Number.parseInt(values.minutes));

		createReminder({
			title: values.title,
			description: values.description,
			executionDate,
		});
	}

	return (
		<div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-sm">
			<h2 className="text-3xl font-bold text-center mb-6">Reminder Form</h2>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter reminder title"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description (optional)</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter reminder details"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-between gap-4">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col w-full">
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="hours"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hours</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Hours" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{hoursOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="minutes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Minutes</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Minutes" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{minutesOptions.map((option) => (
												<SelectItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						Create Reminder
					</Button>
				</form>
			</Form>
		</div>
	);
}
