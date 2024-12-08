"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/lib/api/mutations"
import { countryPhoneCodes } from "@/lib/constants"
import { getSectors } from "@/services/form-field-sector"
import { Sector } from "@/types"

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Ad boş bırakılamaz" }),
    surname: z.string().min(1, { message: "Soyad boş bırakılamaz" }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
    countryCode: z.string().min(1, { message: "Ülke kodu seçiniz" }),
    phone: z.string().min(1, { message: "Geçerli bir telefon numarası giriniz" }),
    message: z.string().min(5, { message: "Mesaj boş bırakılamaz" }),
    sector: z.string().min(1, { message: "Sektör seçiniz" }),
    sectorOther: z.string().optional(),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.sector === "other" && (!data.sectorOther || data.sectorOther.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Diğer sektör belirtilmelidir",
        path: ["sectorOther"],
      })
    }

    if (!data.consent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "KVKK Onayı gereklidir",
        path: ["consent"],
      })
    }
  })

type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
  const [showMessage, setShowMessage] = useState(false)

  const { data: sectors } = useQuery<Sector[], Error>({
    queryKey: ["sectors"],
    queryFn: () => getSectors(),
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      countryCode: "",
      phone: "",
      sector: "",
      sectorOther: "",
      message: "",
      consent: false,
    },
  })

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      form.reset()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [mutation.isSuccess, mutation.isError])

  const onSubmit = (data: FormData) => {
    console.log("form data", data)

    let newData

    if (data.sector === "other") {
      newData = {
        ...data,
        sector: data.sectorOther,
      }
    } else {
      newData = { ...data }
    }

    delete (newData as Partial<FormData>).sectorOther

    mutation.mutate(newData as FormData)
  }

  // const isFormValid = form.formState.isValid
  const sector = form.watch("sector")

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Ad*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Soyad*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="E-posta*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sektör seçiniz*" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-lenis-prevent className="shadcn-select">
                      {sectors &&
                        sectors.length > 0 &&
                        sectors.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      <SelectItem value="other">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {sector === "other" && (
              <FormField
                control={form.control}
                name="sectorOther"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Diğer sektör" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="w-40">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ülke kodu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent data-lenis-prevent className="shadcn-select">
                        {countryPhoneCodes.map((code) => (
                          <SelectItem key={code.name} value={code.code}>
                            {code.name} - {code.code}
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1 ml-2">
                    <FormControl>
                      <Input placeholder="Cep Telefonu *" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Mesaj*" className="h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-12 font-mukta font-light leading-tight text-muted-foreground">
                      Kişisel verilerimin işlenmesi ve tarafıma SMS, e-posta veya telefon yoluyla kampanya, duyuru ve
                      bilgilendirme yapılması amacıyla iletişime geçilmesine Açık Rıza Metni ve KVKK Aydınlatma Metni
                      kapsamında onay veriyorum.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-64 mt-12" type="submit" size="md" padding="fat">
            {mutation.isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="var(--quarterdeck)"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              "Gönder"
            )}
          </Button>
          {showMessage && mutation.isSuccess && (
            <p className="text-green-500 text-12 font-mukta font-light mt-3">{mutation.data.message}</p>
          )}
          {showMessage && mutation.isError && (
            <p className="text-red-500 text-12 font-mukta font-light mt-3">Bir hata oluştu. Lütfen tekrar deneyin.</p>
          )}
        </form>
      </Form>
    </FormProvider>
  )
}
