

const Achievements = () => {

    const achievements = [
        {id: "01", name: "Winner of 2021 hackathon held at ITS, Mohan Nagar College"},
        {id: "02", name: "Project lead for the Outback Resorts website at Astra Techz in April 2024"},
        {id: "03", name: "Star Performer of the Month in October 2024 at Metadrob Company"},
        {id: "04", name: "Star Performer of the Month in November 2024 at Metadrob Company"},
    ]

  return (
    <div className="w-full h-screen flex flex-col">
        
        {achievements.map((ach)=>{
            return (
                <h1 
                key={ach.id} 
                className={`achievements italic text-4xl border-t border-t-[#BFFF00] py-12 ${ach.id === "04" && "border-b border-b-[#BFFF00]"} overflow-hidden hover:text-black hover:transition-all`} 
                style={{ '--content': `"${ach.id}. ${ach.name}"` }}
            >
                {ach.id}. {ach.name}
            </h1>
            )
        })}

    </div>
  )
}

export default Achievements;