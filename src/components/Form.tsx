import { categories } from "../data/categories"


export default function Form() {
  return (
    <form className="space-y-4 bg-white shadow p-10 rounded-lg">
       <div className="grid gird-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select 
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            id="category"
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
         <label htmlFor="activity" className="font-bold">Actividad: </label>
          <input
             id="activity"
             type="text"
             className="border border-slate-300 p-2 rounded-lg "
             placeholder="Ej. Food, Orange Juice, salad, exercise, bicycle."
          />
       </div>

       <div className="grid grid-cols gap-3">
         <label htmlFor="calorias" className="font-bold">Calorias: </label>
          <input
             id="calories"
             type="number"
             className="border border-slate-300 p-2 rounded-lg "
             placeholder="Calories. ej. 300 or 500"
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
