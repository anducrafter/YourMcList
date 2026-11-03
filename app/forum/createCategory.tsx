import React from "react";
import {prisma} from "@/lib/actions/prisma";

const CreateCategory = async () => {
    async function createCategory(formData: FormData) {
        "use server";

        const categoryName = formData.get("name") as string;
        const overName = formData.get("over") as string;

        const beschreibungName = formData.get("beschreibung") as string;
       const primsa = await prisma.category.create({
          data:  {name: categoryName, overtitel:  overName.toUpperCase(),beschreibung: beschreibungName},
       })
    }

    return (
        <form className={"bg-blue-50 p-5 rounded-xl"} action={createCategory}>
            <input className={" bg-white m-1 text-lg"} type="text" name="name" id="name" placeholder="Category" required/>
            <input className={" bg-white m-1 text-lg"} type="text" name="over" id="over" placeholder="overtitel" required/>
            <input className={" bg-white m-1 text-lg"} type="text" name="beschreibung" id="beschreibung" placeholder="beschreibung" required />
            <button className={"bg-white m-4"} type="submit">Submit</button>
        </form>
    );
};

export default CreateCategory;