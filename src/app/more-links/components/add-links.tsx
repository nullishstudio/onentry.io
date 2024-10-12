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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

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
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["updateportfolio"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await axiosInstance.post(apiRoutes.PORTFOLIO, {
        url: values?.url,
        title: values?.title,
        description: values?.description,
      });
    },
    onSuccess: () => {
      toast.success("Link added successfully");
      queryClient.refetchQueries({
        queryKey: ["fulluser"],
      });
    },
    onError: () => {
      toast("Something went wrong");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync(values);
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
            {!isPending && <AppButton text="Save" className="mt-5" />}
            {isPending && <Spinner />}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddLinksComponent;
