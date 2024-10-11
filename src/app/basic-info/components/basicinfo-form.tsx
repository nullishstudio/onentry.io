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
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username is required",
  }),
  fullname: z.string().min(2, {
    message: "Full name is required",
  }),
  bio: z.string().min(2, {
    message: "Bio is required",
  }),
});

interface DataProps {
  data: {
    fullname: string;
    username: string;
    bio: string;
  };
}

const BasicInfoForm = ({ data }: DataProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data?.username || "",
      fullname: data?.fullname || "",
      bio: data?.bio || "",
    },
  });

  useEffect(() => {
    form.reset({
      username: data?.username || "",
      fullname: data?.fullname || "",
      bio: data?.bio || "",
    });
  }, [data?.bio, data?.fullname, data?.username, form]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await axiosInstance.patch(apiRoutes.USER, {
        fullname: values?.fullname,
        username: values?.username,
        bio: values?.bio,
      });
    },
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.refetchQueries({
        queryKey: ["basicprofile"],
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                Full name
              </FormLabel>
              <FormControl>
                <TextInput
                  placeholder="Enter your first name and last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                Username
              </FormLabel>
              <FormControl>
                <TextInput placeholder="Set your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                Brief Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe yourself or something else (you can cry here too)"
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
  );
};

export default BasicInfoForm;
