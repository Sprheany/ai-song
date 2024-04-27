"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  instrumental: z.boolean().default(false),
  customMode: z.boolean().default(false),
  prompt: z.string().optional(),
  title: z.string().optional(),
  lyrics: z.string().optional(),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Studio = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onGenerateLyricsClick = async () => {
    const prompt = form.watch("prompt");
    if (!prompt) {
      form.setError("prompt", { message: "Prompt is required" });
      return;
    }

    console.log(prompt);
  };

  const onSubmit = (data: FormData) => {
    if (data.customMode) {
      if (data.instrumental) {
        if (!data.prompt) {
          form.setError("prompt", { message: "Prompt is required" });
          return;
        }
      } else {
        if (!data.lyrics) {
          form.setError("lyrics", { message: "Lyrics is required" });
          return;
        }
      }
      if (!data.title) {
        form.setError("title", { message: "Title is required" });
        return;
      }
      if (!data.tags) {
        form.setError("tags", { message: "Style is required" });
        return;
      }
    } else {
      if (!data.prompt) {
        form.setError("prompt", { message: "Prompt is required" });
        return;
      }
    }

    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="customMode"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Custom Mode</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your prompt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("customMode") && !form.watch("instrumental") && (
          <FormField
            control={form.control}
            name="lyrics"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Lyrics</FormLabel>
                  <Button
                    size={"sm"}
                    type="button"
                    onClick={onGenerateLyricsClick}
                  >
                    Generate Lyrics
                  </Button>
                </div>
                <FormControl>
                  <Textarea placeholder="Enter your lyrics" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="instrumental"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Instrumental</FormLabel>
            </FormItem>
          )}
        />
        {form.watch("customMode") && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Style of Music</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter style of music" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit">
          Create <MusicIcon className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
};

export default Studio;
