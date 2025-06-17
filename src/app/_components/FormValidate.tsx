"use client"

import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'


//types
interface SignUpFormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

//schema
const signUpSchema = z.object({
    name: z.string().min(2, "Nome deve conter no minimo dois caracteres"),
    email:z.string().email("E-mail invalido"),
    password: z.string().min(6, "senha deve conter no minimo 6 caracteres"),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem"
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

//component


export function ValidateForm(){
    const firstInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema)
    })


    const onSubmit = (data: SignUpSchemaType) => {
        console.log("Dados enviaods", data);
        reset();
        firstInputRef.current?.focus()
    }

    return(
        <form 
        action=""
        onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 border rounded"
        >

            <div>
                <label htmlFor="">Nome:</label>
                <input
                 type="text"
                 {...register("name")}
                 ref={(e) => {
                    register("name").ref(e);
                    firstInputRef.current = e
                 }}
                 className="w-full border rounded px-2 py-1"
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p> }
            </div>

            
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>Senha:</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label>Confirmar Senha:</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border rounded px-2 py-1"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
      >
        Cadastrar
      </button>

        </form>
    )
}