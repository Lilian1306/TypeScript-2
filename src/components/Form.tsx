import { useState } from "react"
import { categories } from "../data/categories"


export default function Form() {

    const [activity, setActivity] = useState({
        category: '',
        name: '',
        calories: 0
    })


  return (
    <form className="space-y-4 bg-white shadow p-10 rounded-lg">
       <div className="grid gird-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select 
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
            value={activity.category}
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
          />
       </div>

       <input
         type="submit"
         className="bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase text-white cursor-pointer"
         value='Save changes or save exercise'
       />

    </form>
  )
}
