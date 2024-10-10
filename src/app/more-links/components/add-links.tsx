"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextInput from "@/components/input";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "@/components/button";

const formSchema = z.object({
  url: z.string().min(2, {
    message: "URL is required",
  }),
  title: z.string().min(2, {
    message: "Project title is required",
  }),
  description: z.string().min(2, {
    message: "Description is required",
  }),
});

const AddLinksComponent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="mt-1 grid gap-3">
      <p className="text-sm font-normal font-plus-jakarta text-[#667085] max-w-[320px] leading-5">
        Add as many links as you need, like portfolios, projects, or anything
        else that represents you.
      </p>
      <div className="bg-[#EAECF0] h-[1px] w-full my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                  URL
                </FormLabel>
                <FormControl>
                  <TextInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                  Title
                </FormLabel>
                <FormControl>
                  <TextInput {...field} />
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
                <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                  Brief Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="rounded-xl min-h-[120px] bg-[#F9FAFC] border-[#EBEFF3] outline-[#7880E9] font-plus-jakarta"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col self-end justify-end relative">
            <AppButton text="Save" className="mt-5" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddLinksComponent;
