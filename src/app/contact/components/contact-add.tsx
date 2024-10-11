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
import AppButton from "@/components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/service/api.service";
import { apiRoutes } from "@/service/api.route";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  value: z.string().min(2, {
    message: "Field is required",
  }),
});

interface DataProps {
  data: {
    id: string;
    email: string;
    phone: string;
  };
}

const ContactAddLinksComponent = ({ data }: DataProps) => {
  const queryClient = useQueryClient();
  const param = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  useEffect(() => {
    form.reset({
      value: param.type === "email" ? data?.email : data?.phone,
    });
  }, [data?.email, data?.phone, form, param]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createcontact"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (param.type === "email") {
        await axiosInstance.patch(apiRoutes.USER, {
          email: values?.value,
        });
      }

      if (param.type === "phone") {
        await axiosInstance.patch(apiRoutes.USER, {
          phone: values?.value,
        });
      }
    },
    onSuccess: () => {
      toast.success("Link added successfully");
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
    <div className="mt-1 grid gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-plus-jakarta text-sm text-[#616C74]">
                  {param.type === "email" && "Email Address"}
                  {param.type === "phone" && "Phone Number"}
                </FormLabel>
                <FormControl>
                  <TextInput {...field} />
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

export default ContactAddLinksComponent;
