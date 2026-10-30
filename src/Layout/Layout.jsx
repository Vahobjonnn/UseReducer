import React, { useReducer, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
const initialState = {

  count: 0,
  value: 0,
  setName: "",

  data: [
    {
      id: 1,
      name: "Ahmad",
      desk: "Faridunov"
    },
    {
      id: 2,
      name: "Vahob",
      desk: "Shamsudiniov"
    },
    {
      id: 3,
      name: "Amrullo",
      desk: "Mavlonzoda"
    },
  ]
}

const countReducer = (state, action) => {
  if (action.type == "increment") {
    return { ...state, count: state.count + 1 }
  }
  if (action.type == "delete") {
    return { ...state, data: state.data.filter((e) => e.id != action.value) }
  }
  if (action.type == "add") {
    return { ...state, data: [...state.data, action.value] }
  }
  if (action.type == "edit") {
    return { ...state, data: state.data.map((el) => el.id == action.value.id ? action.value : el) }
  }
}

const Layout = () => {
  const [state, dispatch] = useReducer(countReducer, initialState)
  const [editUser, setEditUser] = useState({})
  const [search,setSearch]=useState("")
  function handleSubmitAdd(e) {
    e.preventDefault();
    let newUser = {
      id: Date.now(),
      name: e.target.name.value,
      desk: e.target.desk.value,
    }
    dispatch({ type: "add", value: newUser })
    e.target.reset()
  }

  return (
    <>

      <div>
        <div className='flex items-center gap-4'>
          <Dialog>
            <DialogTrigger className="p-2"><Button className="bg-blue-700 p-4">Add Users</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <form className='flex flex-col gap-4' action="" onSubmit={handleSubmitAdd}>
                  <Input type="text" name='name' placeholder='name' />
                  <Input type="text" name='desk' placeholder='desk' />
                  <DialogClose><Button variant='outline' className="w-full" type='submit'>Add</Button></DialogClose>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Input className="border-2 w-[200px]" placeholder="Search..." value={search} onChange={(e)=> setSearch(e.target.value)} />
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px] px-10">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              state.data.filter((el)=> el.name.toLowerCase().trim().includes(search.toLowerCase().trim())).map((el) => {
                return <TableRow className="border-2 p-10" key={el.id} >
                  <TableCell className="w-[400px] px-10" >{el.name}</TableCell>
                  <TableCell>{el.desk}</TableCell>
                  <Button type='submit' className="bg-red-800" onClick={() => dispatch({ type: "delete", value: el.id })}>Delete</Button>
                  <Dialog>
                    <DialogTrigger><Button onClick={() => setEditUser(el)} className="bg-green-700">EditUser</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <form className='flex flex-col gap-4' action="" onSubmit={(e) => {
                          e.preventDefault();
                          dispatch({ type: "edit", value: editUser })
                        }}>
                          <Input value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} type="text" name='name' placeholder='name' />
                          <Input value={editUser.desk} onChange={(e) => setEditUser({ ...editUser, desk: e.target.value })} type="text" name='desk' placeholder='desk' />
                          <DialogClose><Button variant='outline' className="w-full" type='submit'>EDIT</Button></DialogClose>
                        </form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableRow>
              })
            }
          </TableBody>
        </Table>

        <div className='flex gap-4'>

        </div>

      </div>
    </>
  )
}

export default Layout