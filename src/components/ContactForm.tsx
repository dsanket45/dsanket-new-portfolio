import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please share your name." })
    .max(100, { message: "Name is too long." }),
  email: z
    .string()
    .trim()
    .email({ message: "That doesn't look like a valid email." })
    .max(255, { message: "Email is too long." }),
  subject: z
    .string()
    .trim()
    .max(200, { message: "Subject is too long." })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "A few more words, please (10+ chars)." })
    .max(2000, { message: "Let's keep it under 2000 characters." }),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("contact_messages").insert({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject?.trim() || null,
      message: values.message.trim(),
    });

    if (error) {
      console.error(error);
      toast.error("Couldn't send your message", {
        description: "Please try again in a moment.",
      });
      return;
    }

    toast.success("Message sent", {
      description: "Sanket will get back to you soon.",
    });
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <p className="font-mono-label text-muted-foreground">/ send a message</p>
      <h3 className="mt-2 font-display text-3xl leading-tight">
        Drop a line<span className="text-ember">.</span>
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            className="input-bare"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@domain.com"
            className="input-bare"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Subject (optional)" error={errors.subject?.message}>
          <input
            {...register("subject")}
            type="text"
            placeholder="Project, role, or just hi"
            className="input-bare"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Tell me a little about what you're building…"
            className="input-bare resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || sent}
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 text-base text-paper transition-all hover:bg-ember disabled:opacity-70 sm:w-auto"
      >
        {sent ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Sent
          </>
        ) : isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message
            <span className="grid h-7 w-7 place-items-center rounded-full bg-paper text-foreground transition-transform group-hover:translate-x-0.5">
              <Send className="h-3.5 w-3.5" />
            </span>
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono-label text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <span className="mt-1.5 block text-xs text-ember">{error}</span>
      ) : null}
    </label>
  );
}
