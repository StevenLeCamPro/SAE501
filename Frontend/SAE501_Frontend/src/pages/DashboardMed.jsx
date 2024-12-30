import { useState } from "react";
import MedList from "../components/MedList";
import PostMedForm from "../components/PostMedForm";

function DashboardMed () {
    const [select, setSelect] = useState("list")

    const optionSelected = () => {
        if(select === "post") {
            return <PostMedForm />
        } else {
            return <MedList />
        }
    }

    return(
        <>
            <select name="select" id="select" onChange={(e) => {setSelect(e.target.value)}}>
                <option value="list">Liste des médicaments</option>
                <option value="post">Créer un médicament</option>
            </select>
            {optionSelected()}
        </>
    )
}

export default DashboardMed