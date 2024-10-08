import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
}

//Codigo para reducir o evitar estar repitiendo codigo. 
const initialSate : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}


export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialSate)

    useEffect(() => {
       if(state.activeId){
        const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
        setActivity(selectedActivity)
       }
    },[state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      const isNumberField = ['category', 'calories'].includes(e.target.id)

      setActivity({
        ...activity,                   // Mantiene lo que esta en el state. 
        [e.target.id]: isNumberField ? +e.target.value : e.target.value  // Escribe en el state
      })
    }

    const isValidActivity = () => {
       const { name, calories } = activity
       return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      dispatch({ type: 'save-activity', payload: {newActivity: activity}})

      // Esto codigo nos sirve para reiniciar el formulario y le estamos pasando un id unico
      setActivity({
        ...initialSate,
        id: uuidv4()
      })

    }

  return (
    <form 
      className="space-y-4 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit }
    >
       <div className="grid gird-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select 
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
            onChange={handleChange}
        >
            {categories.map(category => (
                <option
                   key={category.id}
                   value={category.id}
                >
                    {category.name}
                </option>
            ))}
        </select>
       </div>

       <div className="grid grid-cols gap-3">
         <label htmlFor="name" className="font-bold">Actividad: </label>
          <input
             id="name"
             type="text"
             className="border border-slate-300 p-2 rounded-lg "
             placeholder="Ej. Food, Orange Juice, salad, exercise, bicycle."
             value={activity.name}
             onChange={handleChange}
          />
       </div>

       <div className="grid grid-cols gap-3">
         <label htmlFor="calories" className="font-bold">Calorias: </label>
          <input
             id="calories"
             type="number"
             className="border border-slate-300 p-2 rounded-lg "
             placeholder="Calories. ej. 300 or 500"
             value={activity.calories}
             onChange={handleChange}
          />
       </div>

       <input
         type="submit"
         className="bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase text-white cursor-pointer disabled:opacity-20"
         value={activity.category === 1 ? 'Guardar comida' : 'Guardar Ejercicio'}
         disabled={!isValidActivity()}
       />

    </form>
  )
}
