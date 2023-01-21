import { Check } from "phosphor-react";

export function NewHabitForm() {
    return (
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input 
                type="text" 
                id="title" 
                placeholder="ex.: Exercicios, dormir bem, etc" 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
             />

             <label htmlFor="">
                Qual a Recorrencia?
             </label>

             <button type="submit" className="mt-6 rounded-lg p-4 flex items-center gap-3 justify-center font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold"/>
                    Confirmar
             </button>
        </form>
    )
}