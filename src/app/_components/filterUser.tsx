"use client"

import { useEffect, useState } from "react"

interface UserProps {
    id: number,
    name: string,
    email: string
}


export function FilterUser() {
    const [user, setUser] = useState<UserProps[]>([])
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState<UserProps[]>([])

    useEffect(() => {
        async function getApi() {
            const data = await fetch('https://jsonplaceholder.typicode.com/users')
            const res: UserProps[] = await data.json()
            setUser(res)
            setFiltered(res)
        }

        getApi()
    }, [])

    useEffect(()=>{
        const filt = user.filter(prev =>
            prev.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )

        setFiltered(filt)

    }, [search, user])



    return (
        <div className="p-8">
            <input type="text"
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
             />
            {filtered.length === 0 ? ("Nenhum usuario encontdo") :(
                <section className="flex flex-col gap-6 p-4">
                {filtered.map((item) => (
                    <ul key={item.id}>
                        <div>
                            <li>{item.name}</li>
                            <li>{item.email}</li>
                        </div>
                        
                    </ul>
                ))}
            </section>
            )}


        </div>

    )
}