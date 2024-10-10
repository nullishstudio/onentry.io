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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/input";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "@/components/button";

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

export default function Onboarding() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex justify-between items-center min-h-dvh p-6">
      <div className="flex flex-col w-full ml-14">
        <h2 className="font-bricolage-grotesque text-[28px] font-bold">
          Welcome to Onentry
        </h2>
        <p className="font-plus-jakarta text-sm text-[#667085]">
          Let’s set up your basic profile. You can always edit this later.
        </p>
        <div className="mt-10 max-w-[543px]">
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
                        className="rounded-xl min-h-[120px] bg-[#F9FAFC] border-[#EBEFF3] outline-[#7880E9]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AppButton text="Save" className="mt-5" />
            </form>
          </Form>
        </div>
      </div>
      <div className="bg-[linear-gradient(156deg,_#C0DFFF_0.83%,_#FFF2FC_44.55%,_#DEDBFF_89.92%)] min-h-[976px] w-full rounded-[32px]"></div>
    </div>
  );
}
