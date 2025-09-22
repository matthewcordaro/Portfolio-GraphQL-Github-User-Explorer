import { FormEvent, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type SearchFormProps = {
  userNamePrefill?: string
  setUserName: React.Dispatch<React.SetStateAction<string>>
}

function SearchForm({ userNamePrefill, setUserName }: SearchFormProps) {
  const { toast } = useToast()

  const [userName, setName] = useState(userNamePrefill || "")

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userName === "") {
      toast({
        title: "Error",
        description: "Please enter a GitHub username",
      })
      return
    }
    setUserName(userName)
  }

  return (
    <form
      onSubmit={handleSearch}
      className='flex items-center gap-x-2 w-full lg:w-1/3 mb-8'
    >
      <Label htmlFor='search' className='sr-only'>
        Search
      </Label>
      <Input
        type='text'
        id='search'
        value={userName}
        onChange={(e) => setName(e.target.value)}
        placeholder='Search GitHub username'
        className='flex-grow bg-background'
      />
      <Button type='submit'>Search</Button>
    </form>
  )
}
export default SearchForm
