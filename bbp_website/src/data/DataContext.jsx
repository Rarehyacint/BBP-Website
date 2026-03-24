import React, { createContext, useContext, useEffect, useState } from "react";

const context = createContext(null)

export default function ContentProvider({children}){
    const [VisaTypes, SetVisaTypes] = useState([])
    const [VisaCategory, SetVisaCategory] = useState([])
    const [Articles, SetArticles] = useState([])

    return (
        <context.Provider value={{VisaTypes, SetVisaTypes, VisaCategory, SetVisaCategory, Articles, SetArticles}}>
            {children}
        </context.Provider>
    )

}

export function ContentData(){
    const cntx = useContext(context)
    if(!cntx) throw new Error("Content Data is not Sucessful")

    return cntx
}